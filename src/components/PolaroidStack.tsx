"use client";

import { useState } from "react";
import { motion, AnimatePresence, PanInfo, useMotionValue, useTransform } from "framer-motion";

interface ImageItem {
  src: string;
  alt: string;
  color: string;
}

const defaultImages: ImageItem[] = [
  { src: "", alt: "Photo 1", color: "#1a1a2e" },
  { src: "", alt: "Photo 2", color: "#16213e" },
  { src: "", alt: "Photo 3", color: "#0f3460" },
  { src: "", alt: "Photo 4", color: "#1a1a2e" },
];

// Non-linear stack parameters for natural depth
const stackRotations = [0, -3, 2.5, -1.8];
const stackScales = [1, 0.96, 0.91, 0.86];
const stackOffsetsY = [0, 8, 17, 28];

function PolaroidCard({
  image,
  isTop,
  stackLevel,
  direction,
  onDragEnd,
}: {
  image: ImageItem;
  isTop: boolean;
  stackLevel: number;
  direction: number;
  onDragEnd?: (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-8, 0, 8]);

  return (
    <motion.div
      className="absolute inset-0 origin-bottom"
      initial={
        isTop
          ? { x: direction * 320, opacity: 0, rotate: direction * 10 }
          : false
      }
      animate={
        isTop
          ? { x: 0, opacity: 1, rotate: 0, zIndex: 20 }
          : {
              rotate: stackRotations[stackLevel],
              y: stackOffsetsY[stackLevel],
              scale: stackScales[stackLevel],
              zIndex: 10 - stackLevel,
            }
      }
      exit={isTop ? { x: -direction * 280, opacity: 0, rotate: -direction * 6 } : undefined}
      transition={{ duration: 0.42, ease: [0.25, 0.46, 0.45, 0.94] }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: -200, right: 200 }}
      dragElastic={0.4}
      onDragEnd={isTop ? onDragEnd : undefined}
      style={isTop ? { x, rotate } : undefined}
      whileDrag={isTop ? { scale: 1.03 } : undefined}
    >
      <div className="w-full h-full bg-white rounded-2xl overflow-hidden shadow-2xl shadow-black/30 flex flex-col p-2.5 pb-5">
        <div
          className="flex-1 w-full rounded-xl"
          style={{ backgroundColor: image.color }}
        >
          {image.src ? (
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover rounded-xl pointer-events-none"
              draggable={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center rounded-xl">
              <span className="text-white/15 text-6xl font-light select-none">φ</span>
            </div>
          )}
        </div>
        <div className="mt-3 text-center">
          <p className="text-[#0a0a0a]/60 text-[10px] font-medium tracking-wide uppercase select-none">
            {image.alt}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function PolaroidStack({ images = defaultImages }: { images?: ImageItem[] }) {
  const [[current, direction], setPage] = useState([0, 0]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Velocity-weighted swipe detection for natural "flick" feel
    const power = Math.abs(info.offset.x) * (Math.abs(info.velocity.x) + 0.5);

    if (power > 8000 && info.offset.x > 0) {
      paginate(-1);
    } else if (power > 8000 && info.offset.x < 0) {
      paginate(1);
    }
  };

  const mod = (n: number, m: number) => ((n % m) + m) % m;
  const currentIndex = mod(current, images.length);

  // Build visible stack: current card + up to 3 behind it
  const visibleCards: { imgIdx: number; stackLevel: number }[] = [];
  for (let i = 0; i < Math.min(4, images.length); i++) {
    visibleCards.push({
      imgIdx: mod(currentIndex - i, images.length),
      stackLevel: i,
    });
  }

  const paginate = (newDirection: number) => {
    setPage([current + newDirection, newDirection]);
  };

  const goTo = (targetIndex: number) => {
    const d = targetIndex > currentIndex ? 1 : -1;
    setPage([targetIndex, d]);
  };

  return (
    <div className="relative w-full max-w-[400px] h-[520px] mx-auto flex items-center justify-center">
      {/* Card stack */}
      <div className="relative w-[300px] h-[400px]">
        <AnimatePresence mode="popLayout">
          {visibleCards.map(({ imgIdx, stackLevel }) => (
            <PolaroidCard
              key={`card-${imgIdx}`}
              image={images[imgIdx]}
              isTop={stackLevel === 0}
              stackLevel={stackLevel}
              direction={direction}
              onDragEnd={handleDragEnd}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1 rounded-full transition-all duration-400 ${
              i === currentIndex
                ? "bg-[#00A19C] w-6 shadow-[0_0_8px_rgba(0,161,156,0.5)]"
                : "bg-white/25 hover:bg-white/45 w-1.5"
            }`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>

      {/* Arrow controls — positioned absolutely relative to the card area */}
      <button
        onClick={() => paginate(-1)}
        className="absolute -left-14 top-1/2 -translate-y-1/2 z-30 w-9 h-9 flex items-center justify-center rounded-full bg-white/[0.05] hover:bg-white/[0.12] backdrop-blur-sm border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
        aria-label="Previous"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M8.5 3L4.5 7L8.5 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute -right-14 top-1/2 -translate-y-1/2 z-30 w-9 h-9 flex items-center justify-center rounded-full bg-white/[0.05] hover:bg-white/[0.12] backdrop-blur-sm border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300"
        aria-label="Next"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M5.5 3L9.5 7L5.5 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
