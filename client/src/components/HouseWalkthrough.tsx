import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

import facadeStill from "@assets/foto-principal-casa-del-puente_1760137696009.jpg";
import gardenStill from "@assets/gardens/casa-flora-garden-covered-walkway-flowers.jpg";
import entryStill from "@assets/common-areas/casa-flora-interior-common-living-room.jpg";
import archesStill from "@assets/common-areas/casa-flora-interior-hallway.jpg";
import livingStill from "@assets/common-areas/casa-del-puente-interior-common-living-room-006.jpg";
import diningStill from "@assets/common-areas/casa-del-puente-interior-common-dining-room-001.jpg";
import kitchenStill from "@assets/common-areas/casa-del-puente-interior-common-kitchen-main.jpg";
import geishaStill from "@assets/bedrooms/casa-flora-room-geisha-main.jpg";
import orquideaStill from "@assets/bedrooms/casa-flora-room-orquidea-main.jpg";
import hortensiaStill from "@assets/bedrooms/casa-flora-room-hortensia-twin-beds.jpg";
import veraneraStill from "@assets/bedrooms/casa-flora-room-veranera-bunk-beds.jpg";
import terraceStill from "@assets/exteriors/casa-flora-exterior-terrace-patio.jpg";
import bridgeStill from "@assets/landscape/casa-flora-landscape-property-overview.jpg";

type RoomId =
  | "facade"
  | "garden"
  | "entry"
  | "arches"
  | "living"
  | "dining"
  | "kitchen"
  | "geisha"
  | "orquidea"
  | "hortensia"
  | "veranera"
  | "terrace"
  | "bridge";

interface Hotspot {
  to: RoomId;
  x: number;
  y: number;
}

interface Room {
  id: RoomId;
  src: string;
  hotspots: Hotspot[];
}

const ROOMS: Room[] = [
  { id: "facade", src: facadeStill, hotspots: [{ to: "garden", x: 50, y: 72 }] },
  { id: "garden", src: gardenStill, hotspots: [{ to: "entry", x: 48, y: 68 }, { to: "facade", x: 12, y: 82 }] },
  {
    id: "entry",
    src: entryStill,
    hotspots: [
      { to: "living", x: 80, y: 52 },
      { to: "arches", x: 36, y: 46 },
      { to: "geisha", x: 14, y: 50 },
      { to: "garden", x: 50, y: 90 },
    ],
  },
  {
    id: "arches",
    src: archesStill,
    hotspots: [
      { to: "dining", x: 48, y: 48 },
      { to: "entry", x: 50, y: 90 },
      { to: "kitchen", x: 22, y: 52 },
    ],
  },
  { id: "living", src: livingStill, hotspots: [{ to: "entry", x: 50, y: 90 }] },
  {
    id: "dining",
    src: diningStill,
    hotspots: [
      { to: "arches", x: 50, y: 90 },
      { to: "terrace", x: 22, y: 40 },
    ],
  },
  { id: "kitchen", src: kitchenStill, hotspots: [{ to: "arches", x: 50, y: 90 }] },
  { id: "geisha", src: geishaStill, hotspots: [{ to: "entry", x: 50, y: 90 }, { to: "orquidea", x: 88, y: 50 }] },
  { id: "orquidea", src: orquideaStill, hotspots: [{ to: "entry", x: 50, y: 90 }, { to: "hortensia", x: 88, y: 50 }] },
  { id: "hortensia", src: hortensiaStill, hotspots: [{ to: "entry", x: 50, y: 90 }, { to: "veranera", x: 88, y: 50 }] },
  { id: "veranera", src: veraneraStill, hotspots: [{ to: "entry", x: 50, y: 90 }] },
  {
    id: "terrace",
    src: terraceStill,
    hotspots: [
      { to: "garden", x: 28, y: 70 },
      { to: "bridge", x: 72, y: 55 },
    ],
  },
  { id: "bridge", src: bridgeStill, hotspots: [{ to: "garden", x: 50, y: 88 }] },
];

const PATH: RoomId[] = [
  "facade",
  "garden",
  "entry",
  "arches",
  "dining",
  "kitchen",
  "living",
  "geisha",
  "orquidea",
  "hortensia",
  "veranera",
  "terrace",
  "bridge",
];

const roomById = (id: RoomId): Room => ROOMS.find((room) => room.id === id) ?? ROOMS[0];

export default function HouseWalkthrough() {
  const { t } = useTranslation();
  const [roomId, setRoomId] = useState<RoomId>("facade");
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [hintVisible, setHintVisible] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  const room = roomById(roomId);
  const pathIndex = PATH.indexOf(roomId);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const walkTo = useCallback((nextId: RoomId, direction: "in" | "back" = "in") => {
    if (nextId === roomId) return;
    setHintVisible(false);
    const frame = frameRef.current;
    const apply = () => setRoomId(nextId);
    if (!frame || reduceMotion) {
      apply();
      return;
    }
    const outgoing = direction === "in" ? 1.08 : 0.94;
    const incoming = direction === "in" ? 1.06 : 0.96;
    gsap.timeline()
      .to(frame, { opacity: 0, scale: outgoing, duration: 0.32, ease: "power2.in" })
      .call(apply)
      .fromTo(
        frame,
        { opacity: 0, scale: incoming },
        { opacity: 1, scale: 1, duration: 0.42, ease: "power2.out" },
      );
  }, [roomId, reduceMotion]);

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    setLook({
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y)),
    });
  };

  const resetLook = () => {
    setLook({ x: 0, y: 0 });
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" && pathIndex < PATH.length - 1) {
        walkTo(PATH[pathIndex + 1], "in");
      } else if (event.key === "ArrowLeft" && pathIndex > 0) {
        walkTo(PATH[pathIndex - 1], "back");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pathIndex, walkTo]);

  return (
    <div className="space-y-4" data-testid="house-walkthrough">
      <div
        ref={stageRef}
        className="relative overflow-hidden rounded-lg bg-stone-950 aspect-[4/3] md:aspect-auto md:h-[min(72vh,760px)]"
        style={{ perspective: "1200px" }}
        onPointerMove={onPointerMove}
        onPointerLeave={resetLook}
      >
        <div
          ref={frameRef}
          className="absolute inset-0 will-change-transform"
          style={{
            transform: reduceMotion
              ? undefined
              : `translate3d(${look.x * 18}px, ${look.y * 12}px, 0) scale(1.12) rotateY(${look.x * -3.5}deg) rotateX(${look.y * 2.5}deg)`,
            transformOrigin: "center center",
            transition: "transform 80ms linear",
          }}
        >
          <img
            src={room.src}
            alt={t(`tour.rooms.${room.id}`)}
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />

        {room.hotspots.map((spot) => (
          <button
            key={`${room.id}-${spot.to}`}
            type="button"
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            onClick={() => walkTo(spot.to, PATH.indexOf(spot.to) < pathIndex ? "back" : "in")}
            data-testid={`tour-hotspot-${spot.to}`}
          >
            <span className="block h-5 w-5 rounded-full border-2 border-white bg-casa-blue-medium/80 shadow-lg animate-pulse group-hover:animate-none" />
            <span className="mt-2 block whitespace-nowrap rounded-full bg-black/65 px-3 py-1 font-serif text-sm text-white opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
              {t(`tour.rooms.${spot.to}`)}
            </span>
          </button>
        ))}

        {hintVisible && (
          <p className="absolute bottom-16 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/80 px-4 py-2 text-sm text-white">
            {t("tour.hint")}
          </p>
        )}

        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between gap-3">
          <button
            type="button"
            className="rounded-full bg-black/50 p-2 text-white disabled:opacity-30"
            disabled={pathIndex <= 0}
            onClick={() => walkTo(PATH[pathIndex - 1], "back")}
            aria-label={t("tour.back")}
            data-testid="tour-back"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <p className="font-serif text-lg md:text-2xl text-white drop-shadow">
            {t(`tour.rooms.${room.id}`)}
          </p>
          <button
            type="button"
            className="rounded-full bg-black/50 p-2 text-white disabled:opacity-30"
            disabled={pathIndex >= PATH.length - 1}
            onClick={() => walkTo(PATH[pathIndex + 1], "in")}
            aria-label={t("tour.forward")}
            data-testid="tour-forward"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {PATH.map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => walkTo(id, PATH.indexOf(id) < pathIndex ? "back" : "in")}
            className={cn(
              "rounded-full px-3 py-1.5 font-serif text-sm transition-colors",
              id === roomId
                ? "bg-casa-blue-deep text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80",
            )}
            data-testid={`tour-room-${id}`}
          >
            {t(`tour.rooms.${id}`)}
          </button>
        ))}
      </div>
    </div>
  );
}
