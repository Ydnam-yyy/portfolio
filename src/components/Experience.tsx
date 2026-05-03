"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    time: "2024 — Present",
    title: "Senior Product Designer",
    description:
      "Leading design system strategy and cross-platform experience design for a suite of enterprise products.",
  },
  {
    time: "2022 — 2024",
    title: "Full-Stack Developer",
    description:
      "Built and shipped data-intensive web applications, real-time dashboards, and internal tooling used by hundreds of users daily.",
  },
  {
    time: "2021 — 2022",
    title: "Creative Technologist",
    description:
      "Bridged design and engineering teams to prototype new interaction models and build creative tools for collaborative workflows.",
  },
  {
    time: "2020 — 2021",
    title: "Junior Designer",
    description:
      "Designed and shipped marketing sites, brand identities, and design templates while learning the craft of digital product design.",
  },
  {
    time: "2019 — 2020",
    title: "Design Intern",
    description:
      "Supported the design team on web and mobile projects, contributed to the component library, and learned design systems from the ground up.",
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });
  const progressHeight = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
  });

  return (
    <section
      id="experience"
      ref={sectionRef}
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
          Experience
        </p>
        <div className="w-8 h-[1px] bg-[#00A19C]/40" />
      </motion.div>

      <div className="relative max-w-3xl">
        {/* Timeline track */}
        <div className="absolute left-0 top-2 bottom-2 w-[1px] bg-white/[0.05]" />

        {/* Progress indicator on the timeline */}
        <motion.div
          className="absolute left-0 top-2 w-[1px] bg-[#00A19C] origin-top"
          style={{ scaleY: progressHeight }}
        />

        <div className="flex flex-col">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.time + exp.title}
              className="relative pl-12 pb-16 last:pb-0 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
            >
              {/* Timeline node */}
              <div className="absolute left-0 top-1.5 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#0a0a0a] border-2 border-white/[0.06] group-hover:border-[#00A19C] transition-all duration-400" />

              {/* Time */}
              <span className="text-[10px] font-medium tracking-[0.15em] text-white/15 uppercase">
                {exp.time}
              </span>

              {/* Title */}
              <h3 className="text-lg font-bold text-white tracking-tight mt-2 mb-2 group-hover:text-[#00A19C] transition-colors duration-300">
                {exp.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-white/25 font-light leading-relaxed max-w-lg">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
