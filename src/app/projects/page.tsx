"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const projects = [
  {
    id: "project-1",
    title: "Coming Soon",
    description: "This project is currently in development. Details will be available soon.",
    tags: [],
    accent: "#00A19C",
  },
  {
    id: "project-2",
    title: "Coming Soon",
    description: "This project is currently in development. Details will be available soon.",
    tags: [],
    accent: "#4A90D9",
  },
  {
    id: "project-3",
    title: "Coming Soon",
    description: "This project is currently in development. Details will be available soon.",
    tags: [],
    accent: "#E8A838",
  },
  {
    id: "project-4",
    title: "Coming Soon",
    description: "This project is currently in development. Details will be available soon.",
    tags: [],
    accent: "#C060A0",
  },
  {
    id: "project-5",
    title: "Coming Soon",
    description: "This project is currently in development. Details will be available soon.",
    tags: [],
    accent: "#00A19C",
  },
  {
    id: "project-6",
    title: "Coming Soon",
    description: "This project is currently in development. Details will be available soon.",
    tags: [],
    accent: "#4A90D9",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    if (cardRef.current) {
      cardRef.current.style.setProperty("--rx", `${y * 2.5}deg`);
      cardRef.current.style.setProperty("--ry", `${x * 4}deg`);
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.setProperty("--rx", "0deg");
      cardRef.current.style.setProperty("--ry", "0deg");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
    >
      <Link href={`/projects/${project.id}`} className="block group">
        <div
          ref={cardRef}
          className="relative p-7 rounded-2xl border border-white/[0.04] bg-[#0d0d0d] transition-all duration-400 group-hover:border-white/[0.08] group-hover:-translate-y-0.5"
          style={{
            transform:
              "perspective(800px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
            transition:
              "transform 0.12s ease-out, border-color 0.35s ease, translate 0.35s ease",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Accent bar + badge */}
          <div className="flex items-center justify-between mb-5">
            <div
              className="w-1 h-5 rounded-full"
              style={{ backgroundColor: project.accent }}
            />
            <span className="text-[9px] font-medium tracking-[0.15em] text-white/10 uppercase border border-white/[0.04] rounded-full px-2.5 py-0.5">
              Coming Soon
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-white tracking-tight mb-2">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-white/20 font-light leading-relaxed mb-6 max-w-sm">
            {project.description}
          </p>

          {/* Tags */}
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-medium tracking-wider text-white/12 uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 pt-32 pb-40">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Link
            href="/"
            className="text-xs font-medium tracking-[0.2em] text-white/25 hover:text-[#00A19C] transition-colors duration-300 uppercase mb-5 inline-block"
          >
            &larr; Back
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mt-4">
            Projects
          </h1>
          <p className="text-sm text-white/20 font-light mt-3 max-w-md leading-relaxed">
            A curated collection of work spanning design, development, and
            creative exploration.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
