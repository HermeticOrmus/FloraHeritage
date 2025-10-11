import { useEffect } from "react";
import { useRoute, Link } from "wouter";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bed, Users, MapPin, Calendar, Check } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import Footer from "@/components/Footer";
import { BOTANICAL_ROOMS, type RoomName } from "@shared/botanicalRooms";

gsap.registerPlugin(ScrollTrigger);

export default function RoomDetail() {
  const [match, params] = useRoute("/rooms/:id");
  const roomId = params?.id as RoomName;
  const room = roomId ? BOTANICAL_ROOMS[roomId] : null;

  useEffect(() => {
    gsap.defaults({
      duration: 1,
      ease: "power2.out"
    });

    // Animate sections on scroll
    gsap.from(".room-feature", {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".features-section",
        start: "top 80%",
      }
    });

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.killAll();
    };
  }, [roomId]);

  if (!match || !room) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-4">Room Not Found</h1>
          <p className="text-muted-foreground mb-8">The botanical room you're looking for doesn't exist.</p>
          <Link href="/" className="px-6 py-3 bg-casa-blue-medium text-white rounded-lg hover:bg-casa-blue-deep transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background">
      {/* Hero Section with Room Image */}
      <section className="relative h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${room.mainImage})`,
            filter: 'brightness(0.7)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        <div className="relative z-10 h-full flex items-end pb-16">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="inline-block px-4 py-2 bg-glass backdrop-blur-glass rounded-full mb-4">
              <p className="text-sm text-muted-foreground capitalize">
                {room.floor} • {room.bathroomType === 'ensuite' ? 'Private Bathroom' : 'Shared Bathroom'}
              </p>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">
              {room.displayName}
            </h1>
            <p className="text-2xl text-white/90">
              {room.flowerNameEnglish} • {room.flowerNameSpanish}
            </p>
          </div>
        </div>
      </section>

      <main className="relative">
        {/* Quick Info Cards */}
        <section className="py-12 bg-background -mt-8 relative z-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <GlassCard className="p-6 text-center">
                <Bed className="mx-auto mb-2 text-casa-blue-medium" size={32} />
                <p className="text-sm text-muted-foreground mb-1">Beds</p>
                <p className="font-semibold text-foreground">{room.bedConfiguration}</p>
              </GlassCard>

              <GlassCard className="p-6 text-center">
                <Users className="mx-auto mb-2 text-hydrangea-deep" size={32} />
                <p className="text-sm text-muted-foreground mb-1">Capacity</p>
                <p className="font-semibold text-foreground">{room.capacity} guests</p>
              </GlassCard>

              <GlassCard className="p-6 text-center">
                <MapPin className="mx-auto mb-2 text-mountain-forest" size={32} />
                <p className="text-sm text-muted-foreground mb-1">Floor</p>
                <p className="font-semibold text-foreground capitalize">{room.floor}</p>
              </GlassCard>

              <GlassCard className="p-6 text-center">
                <Calendar className="mx-auto mb-2 text-stone-dark" size={32} />
                <p className="text-sm text-muted-foreground mb-1">Blooming</p>
                <p className="font-semibold text-foreground text-sm">{room.bloomingSeason || 'Seasonal'}</p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Heritage Story Section */}
        <section className="py-20 bg-gradient-to-br from-background to-casa-blue-light/5">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
                Heritage Story
              </h2>
              <div className="w-24 h-1 bg-casa-blue-medium mx-auto"></div>
            </div>

            <GlassCard className="p-8 md:p-12">
              <p className="text-lg text-foreground leading-relaxed mb-8">
                {room.heritageStory}
              </p>

              <div className="border-l-4 border-hydrangea-deep pl-6">
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  Botanical Meaning
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {room.flowerStory}
                </p>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Garden Location */}
        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-6">
            <GlassCard className="p-8 md:p-12 bg-gradient-to-br from-mountain-sage/10 to-transparent">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-mountain-sage/20 rounded-lg">
                  <MapPin className="text-mountain-forest" size={32} />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                    Find These Flowers
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {room.gardenLocation}
                  </p>
                  {room.viewDescription && (
                    <p className="text-sm text-muted-foreground mt-4 italic">
                      View: {room.viewDescription}
                    </p>
                  )}
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section py-20 bg-gradient-to-br from-background to-hydrangea-soft/5">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
                Room Features
              </h2>
              <p className="text-xl text-muted-foreground">
                Everything you need for a comfortable stay
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {room.features.map((feature, index) => (
                <div key={index} className="room-feature">
                  <GlassCard className="p-6 flex items-start gap-4 hover-elevate">
                    <div className="p-2 bg-casa-blue-light/20 rounded-lg flex-shrink-0">
                      <Check className="text-casa-blue-deep" size={20} />
                    </div>
                    <p className="text-foreground pt-1">{feature}</p>
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <GlassCard className="p-12 bg-gradient-to-br from-casa-blue-light/10 to-hydrangea-soft/10">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Experience Casa Flora's Heritage
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                The {room.displayName} room is part of our whole-house rental. Book the entire heritage home and enjoy all four botanical bedrooms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/#booking"
                  className="px-8 py-4 bg-casa-blue-medium text-white rounded-lg hover:bg-casa-blue-deep transition-colors font-semibold"
                >
                  Book the Entire House
                </Link>
                <Link
                  href="/"
                  className="px-8 py-4 bg-glass text-foreground rounded-lg hover:bg-glass-medium transition-colors font-semibold"
                >
                  Explore Other Rooms
                </Link>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Other Rooms Preview */}
        <section className="py-20 bg-gradient-to-br from-background to-casa-blue-light/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl font-bold text-foreground mb-4">
                Explore Other Botanical Rooms
              </h2>
              <p className="text-xl text-muted-foreground">
                Each room tells a unique heritage story
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.values(BOTANICAL_ROOMS)
                .filter(r => r.id !== roomId)
                .map((otherRoom) => (
                  <Link key={otherRoom.id} href={`/rooms/${otherRoom.id}`}>
                    <GlassCard className="overflow-hidden hover-elevate cursor-pointer group">
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <img
                          src={otherRoom.mainImage}
                          alt={otherRoom.displayName}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
                          {otherRoom.displayName}
                        </h3>
                        <p className="text-muted-foreground">
                          {otherRoom.flowerNameEnglish}
                        </p>
                      </div>
                    </GlassCard>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
