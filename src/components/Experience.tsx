"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

interface ExperienceEntry {
  month: string;
  year: string;
  description: string;
  image?: string;
}

const experiences: ExperienceEntry[] = [
  {
    month: "FEB",
    year: "2026",
    description:
      "Achieved USACO Silver — demonstrating strong problem-solving and algorithmic thinking.",
    image: "/photos/usaco.jpg",
  },
  {
    month: "MAR",
    year: "2026",
    description:
      "Selected as Mercedes-Benz 140th Anniversary Brand Ambassador.",
    image: "/photos/benz.jpg",
  },
  {
    month: "MAR",
    year: "2026",
    description:
      "IEO National China Gold Award & Business Case Final Round.",
  },
  {
    month: "NOV",
    year: "2025",
    description:
      "Elected Student Council President — leading school-wide initiatives and student representation.",
    image: "/photos/student_council.jpg",
  },
  {
    month: "SEPT",
    year: "2025",
    description:
      "Founded ICBC Business Club — building a platform for business exploration and collaboration.",
    image: "/photos/business_club.jpg",
  },
  {
    month: "SEPT",
    year: "2024",
    description:
      "Co-founded TOKENS Economics Club — fostering interest in economics and analytical thinking.",
  },
  {
    month: "NOV",
    year: "2024",
    description:
      "Elected Student Council Vice President.",
    image: "/photos/student_council.jpg",
  },
  {
    month: "SEPT",
    year: "2023",
    description:
      "Chief Violist in School Orchestra — combining discipline and creativity in performance.",
    image: "/photos/orchestra.jpg",
  },
];

function PlaceholderImage() {
  return (
    <div className="w-full h-full rounded-[18px] bg-gradient-to-br from-[#0d0d0d] to-[#111] flex items-center justify-center border border-white/[0.03]">
      <span className="text-white/[0.06] text-6xl font-light select-none">
        &phi;
      </span>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const hoveredImage =
    hoveredIndex !== null ? experiences[hoveredIndex].image : null;

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative max-w-[1440px] mx-auto px-8 md:px-16 py-32 md:py-40"
    >
      {/* Section header */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p className="text-xs font-medium tracking-[0.3em] text-[#00A19C] uppercase mb-3">
          Experience
        </p>
        <div className="w-8 h-[1px] bg-[#00A19C]/40" />
      </motion.div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Left: Timeline */}
        <div className="relative flex-1 max-w-2xl">
          {/* Timeline track */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/[0.04]" />

          <div className="flex flex-col">
            {experiences.map((exp, i) => {
              const isLatest = i === 0;

              return (
                <motion.div
                  key={`${exp.month}-${exp.year}-${exp.description.slice(0, 20)}`}
                  className="relative pl-10 pb-14 last:pb-0 group cursor-default"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.45,
                    delay: i * 0.06,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1 -translate-x-1/2">
                    {isLatest ? (
                      <div className="relative">
                        <div className="w-3 h-3 rounded-full bg-[#00A19C] shadow-[0_0_10px_rgba(0,161,156,0.35)]" />
                        <div className="absolute inset-0 w-3 h-3 rounded-full bg-[#00A19C] animate-ping opacity-20" />
                      </div>
                    ) : (
                      <div
                        className={`w-2.5 h-2.5 rounded-full border-2 transition-all duration-400 ${
                          hoveredIndex === i
                            ? "bg-[#00A19C] border-[#00A19C] shadow-[0_0_8px_rgba(0,161,156,0.2)]"
                            : "bg-[#0a0a0a] border-white/[0.06]"
                        }`}
                      />
                    )}
                  </div>

                  {/* Month + Year */}
                  <div className="flex items-baseline gap-2 mb-1.5">
                    <span
                      className={`text-sm font-semibold tracking-[0.15em] uppercase transition-colors duration-300 ${
                        isLatest
                          ? "text-[#00A19C]"
                          : hoveredIndex === i
                          ? "text-white/70"
                          : "text-white/50"
                      }`}
                    >
                      {exp.month}
                    </span>
                    <span className="text-[11px] font-medium tracking-[0.1em] text-white/12 uppercase">
                      {exp.year}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-white/25 font-light leading-relaxed max-w-lg transition-colors duration-300 group-hover:text-white/35">
                    {exp.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right: Image preview (desktop) */}
        <div className="hidden lg:block w-[340px] flex-shrink-0">
          <div className="sticky top-32">
            <div className="relative w-full aspect-[3/4]">
              <AnimatePresence mode="wait">
                {hoveredImage ? (
                  <motion.div
                    key={hoveredImage}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <img
                      src={hoveredImage}
                      alt=""
                      className="w-full h-full object-cover rounded-[18px]"
                    />
                    <div className="absolute inset-0 rounded-[18px] ring-1 ring-inset ring-white/[0.04]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <PlaceholderImage />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Subtle outer glow */}
              {hoveredImage && (
                <div className="absolute -inset-2 rounded-[22px] bg-[#00A19C]/[0.02] blur-xl pointer-events-none" />
              )}
            </div>

            {/* Hint text */}
            <p className="text-[10px] font-medium tracking-[0.15em] text-white/08 uppercase mt-5 text-center">
              Hover timeline to preview
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
