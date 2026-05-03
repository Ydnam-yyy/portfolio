"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

type Proficiency = "primary" | "intermediate" | "casual" | "fan";

interface Skill {
  label: string;
  level: Proficiency;
}

interface Category {
  title: string;
  description: string;
  accent: string;
  skills: Skill[];
}

const barWidths: Record<Proficiency, string> = {
  primary: "w-full",
  intermediate: "w-2/3",
  casual: "w-2/5",
  fan: "w-1/4",
};

const barOpacity: Record<Proficiency, string> = {
  primary: "opacity-100",
  intermediate: "opacity-70",
  casual: "opacity-45",
  fan: "opacity-30",
};

const categories: Category[] = [
  {
    title: "Coding",
    description:
      "Problem-solving through code — from algorithms to full applications.",
    accent: "#00A19C",
    skills: [
      { label: "Python", level: "primary" },
      { label: "C++", level: "intermediate" },
      { label: "JavaScript / TypeScript", level: "casual" },
    ],
  },
  {
    title: "Design",
    description:
      "Crafting interfaces and visuals that communicate with clarity and intention.",
    accent: "#C060A0",
    skills: [
      { label: "UI / Interaction Design", level: "primary" },
      { label: "Motion & Micro-interactions", level: "primary" },
      { label: "Video Editing & Visual Storytelling", level: "intermediate" },
    ],
  },
  {
    title: "Physics",
    description:
      "Understanding the forces and principles that govern motion and mechanics.",
    accent: "#E8A838",
    skills: [
      { label: "Vehicle Dynamics", level: "primary" },
      { label: "Mechanics Fundamentals", level: "intermediate" },
    ],
  },
  {
    title: "Music",
    description:
      "Discipline and creativity in harmony — from solo practice to ensemble performance.",
    accent: "#4A90D9",
    skills: [
      { label: "Viola", level: "primary" },
      { label: "Flute", level: "intermediate" },
      { label: "Guitar", level: "casual" },
      { label: "Ensemble Performance", level: "intermediate" },
    ],
  },
  {
    title: "Leadership",
    description:
      "Building teams, initiatives, and momentum — turning ideas into collective action.",
    accent: "#00A19C",
    skills: [
      { label: "Team Leadership", level: "primary" },
      { label: "Initiative Building", level: "primary" },
      { label: "Public Speaking", level: "intermediate" },
    ],
  },
  {
    title: "Sports",
    description:
      "Discipline, resilience, and the pursuit of mastery through physical practice.",
    accent: "#C060A0",
    skills: [
      { label: "Squash", level: "primary" },
      { label: "Running", level: "primary" },
      { label: "Hiking", level: "intermediate" },
      { label: "Volleyball", level: "casual" },
      { label: "Football", level: "fan" },
    ],
  },
];

export default function Skills() {
  const [selected, setSelected] = useState<Category | null>(null);

  const close = useCallback(() => setSelected(null), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (selected) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [selected, close]);

  return (
    <section
      id="skills"
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
          Capabilities
        </p>
        <div className="w-8 h-[1px] bg-[#00A19C]/40" />
      </motion.div>

      {/* Card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat, i) => (
          <motion.button
            key={cat.title}
            onClick={() => setSelected(cat)}
            className="group p-7 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/[0.08] transition-all duration-400 text-left cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.35, delay: i * 0.05, ease: "easeOut" }}
          >
            {/* Accent bar */}
            <div
              className="w-1 h-5 rounded-full mb-5 transition-all duration-400 group-hover:h-7"
              style={{ backgroundColor: cat.accent }}
            />

            {/* Title */}
            <h3 className="text-base font-bold text-white tracking-tight mb-2">
              {cat.title}
            </h3>

            {/* Description — expands on hover */}
            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-400 ease-out">
              <div className="overflow-hidden">
                <p className="text-xs text-white/25 font-light leading-relaxed mb-4 pt-1">
                  {cat.description}
                </p>
              </div>
            </div>

            {/* Skill labels */}
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {cat.skills.map((s) => (
                <span
                  key={s.label}
                  className="text-[10px] font-medium tracking-wider text-white/18 uppercase group-hover:text-white/30 transition-colors duration-400"
                >
                  {s.label}
                </span>
              ))}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Detail panel overlay */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={close}
            />

            {/* Panel */}
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="pointer-events-auto w-full max-w-md bg-[#0d0d0d] border border-white/[0.08] rounded-2xl p-8 shadow-2xl shadow-black/50"
                initial={{ scale: 0.96, opacity: 0, y: 8 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.96, opacity: 0, y: 8 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-7">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-1.5 h-6 rounded-full"
                      style={{ backgroundColor: selected.accent }}
                    />
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {selected.title}
                    </h3>
                  </div>
                  <button
                    onClick={close}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.04] hover:bg-white/[0.1] transition-colors duration-200"
                    aria-label="Close"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M1 1L11 11M11 1L1 11"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>

                {/* Skill bars */}
                <div className="space-y-5">
                  {selected.skills.map((skill) => (
                    <div key={skill.label}>
                      {/* Label */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-white/70 tracking-tight">
                          {skill.label}
                        </span>
                        <span className="text-[10px] font-medium tracking-[0.12em] text-white/12 uppercase">
                          {skill.level === "primary"
                            ? "Primary"
                            : skill.level === "intermediate"
                            ? "Intermediate"
                            : skill.level === "casual"
                            ? "Casual"
                            : "Fan"}
                        </span>
                      </div>

                      {/* Bar track */}
                      <div className="w-full h-1 rounded-full bg-white/[0.04] overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${barWidths[skill.level]} ${barOpacity[skill.level]}`}
                          style={{
                            backgroundColor: selected.accent,
                            transformOrigin: "left",
                          }}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.08,
                            ease: [0.25, 0.46, 0.45, 0.94],
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
