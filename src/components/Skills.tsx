"use client";

import { motion } from "framer-motion";

const categories = [
  {
    title: "Coding",
    description:
      "Full-stack development with modern frameworks. Building systems that scale from prototype to production.",
    accent: "#00A19C",
    items: ["TypeScript", "React", "Next.js", "Node.js", "Python"],
  },
  {
    title: "Design",
    description:
      "Crafting interfaces that balance aesthetics with usability. Design systems, interaction patterns, and visual identity.",
    accent: "#C060A0",
    items: ["UI/UX", "Design Systems", "Figma", "Prototyping"],
  },
  {
    title: "Physics",
    description:
      "Applied physics and mathematical modeling. Understanding the principles that govern complex systems.",
    accent: "#E8A838",
    items: ["Modeling", "Simulation", "Data Analysis", "Research"],
  },
  {
    title: "Music",
    description:
      "Composition and sound design. Exploring rhythm, harmony, and the emotional language of audio.",
    accent: "#4A90D9",
    items: ["Composition", "Production", "Sound Design"],
  },
  {
    title: "Leadership",
    description:
      "Building and guiding teams toward shared goals. Communication, coordination, and creating environments where people thrive.",
    accent: "#00A19C",
    items: ["Team Building", "Strategy", "Communication", "Mentorship"],
  },
  {
    title: "Sports",
    description:
      "Discipline, resilience, and the pursuit of mastery through physical practice and competition.",
    accent: "#C060A0",
    items: ["Running", "Swimming", "Team Sports"],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative max-w-[1440px] mx-auto px-8 md:px-16 py-32 md:py-40"
    >
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            className="group p-7 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/[0.08] transition-all duration-400"
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

            {/* Items */}
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="text-[10px] font-medium tracking-wider text-white/18 uppercase group-hover:text-white/30 transition-colors duration-400"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
