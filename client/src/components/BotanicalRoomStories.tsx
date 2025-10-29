import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import GlassCard from "@/components/GlassCard";
import DecorativeFrame from "@/components/DecorativeFrame";
import { Badge } from "@/components/ui/badge";
import { BOTANICAL_ROOMS, CASA_DEL_PUENTE_HOUSE, type BotanicalRoom } from "@shared/botanicalRooms";

// Import room images statically for Vite bundling
import geishaRoom from "@assets/bedrooms/casa-flora-room-geisha-main.jpg";
import orquideaRoom from "@assets/bedrooms/casa-flora-room-orquidea-main.jpg";
import hortensiaRoom from "@assets/bedrooms/casa-flora-room-hortensia-twin-beds.jpg";
import veraneraRoom from "@assets/bedrooms/casa-flora-room-veranera-bunk-beds.jpg";

gsap.registerPlugin(ScrollTrigger);

// Map room IDs to imported images
const ROOM_IMAGES: Record<string, string> = {
  geisha: geishaRoom,
  orquidea: orquideaRoom,
  hortensia: hortensiaRoom,
  veranera: veraneraRoom
};

export default function BotanicalRoomStories() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      cardRefs.current.forEach((card) => {
        if (card) {
          gsap.set(card, {
            opacity: 0,
            y: 60,
            scale: 0.95
          });
        }
      });

      // Scroll-triggered stagger animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        animation: gsap.to(cardRefs.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out"
        })
      });

    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.killAll();
    };
  }, []);

  const setCardRef = (el: HTMLDivElement | null, index: number) => {
    cardRefs.current[index] = el;
  };

  // Get rooms in display order: Orquidea first (back room), then others
  const roomsInOrder: BotanicalRoom[] = [
    BOTANICAL_ROOMS.orquidea,
    BOTANICAL_ROOMS.geisha,
    BOTANICAL_ROOMS.hortensia,
    BOTANICAL_ROOMS.veranera
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-background to-background/50"
      data-testid="botanical-room-stories"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <DecorativeFrame position="top">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t('rooms.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('rooms.description')}
            </p>
          </DecorativeFrame>
        </div>

        {/* Premium Downstairs Rooms */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <Badge className="bg-casa-blue-deep text-white px-4 py-2 text-sm mb-3">
              {t('rooms.downstairs')}
            </Badge>
            <p className="text-muted-foreground">{t('rooms.privateBathrooms')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {roomsInOrder.slice(0, 2).map((room, index) => (
              <RoomCard
                key={room.id}
                room={room}
                index={index}
                setCardRef={setCardRef}
                isPremium={true}
                t={t}
              />
            ))}
          </div>
        </div>

        {/* Upstairs Rooms */}
        <div>
          <div className="text-center mb-8">
            <Badge className="bg-hydrangea-medium text-white px-4 py-2 text-sm mb-3">
              {t('rooms.upstairs')}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {roomsInOrder.slice(2).map((room, index) => (
              <RoomCard
                key={room.id}
                room={room}
                index={index + 2}
                setCardRef={setCardRef}
                isPremium={false}
                t={t}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface RoomCardProps {
  room: BotanicalRoom;
  index: number;
  setCardRef: (el: HTMLDivElement | null, index: number) => void;
  isPremium: boolean;
  t: any;
}

function RoomCard({ room, index, setCardRef, isPremium, t }: RoomCardProps) {
  return (
    <div
      ref={(el) => setCardRef(el, index)}
      data-testid={`room-card-${room.id}`}
    >
      <GlassCard className="p-0 overflow-hidden group hover-elevate h-full flex flex-col">
        {/* Room Image */}
        <div className="relative">
          <img
            src={ROOM_IMAGES[room.id]}
            alt={`${room.displayName} bedroom at Casa Del Puente`}
            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            {isPremium && (
              <Badge className="bg-casa-blue-deep text-white">
                {t('rooms.ensuite')}
              </Badge>
            )}
            <Badge className="bg-mountain-sage text-white">
              {room.floor}
            </Badge>
          </div>
        </div>

        {/* Room Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Room Name & Flower */}
          <div className="mb-4">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-1">
              {room.displayName}
            </h3>
            <p className="text-sm text-muted-foreground italic">
              {room.flowerNameEnglish} • {room.flowerNameSpanish}
            </p>
          </div>

          {/* Heritage Story */}
          <p className="text-foreground/90 leading-relaxed mb-4 flex-1">
            {t(`roomDetails.${room.id}.heritageStory`)}
          </p>

          {/* Garden Location */}
          <div className="mb-4 p-3 bg-mountain-sage/10 rounded-lg">
            <p className="text-sm text-foreground/80">
              <span className="font-semibold text-mountain-forest">{t('rooms.inGarden')}:</span> {t(`roomDetails.${room.id}.gardenLocation`)}
            </p>
          </div>

          {/* Room Details */}
          <div className="space-y-3 border-t border-foreground/10 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{t('rooms.beds')}:</span>
              <span className="text-sm font-medium text-foreground">{t(`roomDetails.${room.id}.bedConfiguration`)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{t('rooms.sleeps')}:</span>
              <span className="text-sm font-medium text-foreground">{room.capacity} {t('rooms.guestsCount')}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{t('rooms.blooms')}:</span>
              <span className="text-sm font-medium text-hydrangea-deep">{t(`roomDetails.${room.id}.bloomingSeason`)}</span>
            </div>
          </div>

          {/* Features */}
          <div className="mt-4">
            <div className="flex flex-wrap gap-2">
              {(t(`roomDetails.${room.id}.features`, { returnObjects: true }) as string[]).slice(0, 3).map((feature, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="text-xs"
                >
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
