"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const project = {
  title: "Coming Soon",
  description:
    "This project is currently under development. I am working on refining the idea, design, and implementation.",
  accent: "#00A19C",
  tags: [] as string[],
  role: "—",
  timeline: "—",
  visual: "#00A19C",
  highlights: [] as { metric: string; context: string }[],
};

export default function ProjectDetailPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 pt-32 pb-40">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/projects"
            className="text-xs font-medium tracking-[0.2em] text-white/30 hover:text-[#00A19C] transition-colors duration-300 uppercase inline-block mb-16"
          >
            &larr; All Projects
          </Link>
        </motion.div>

        {/* Hero visual anchor */}
        <motion.div
          className="w-full h-[360px] md:h-[480px] rounded-3xl overflow-hidden mb-20 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${project.visual}15 0%, ${project.visual}05 40%, #0a0a0a 100%)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(600px circle at 30% 40%, ${project.visual}20, transparent 60%)`,
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-[10px] font-semibold tracking-[0.3em] text-white/10 uppercase">
              Project Preview
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 lg:gap-24">
          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div
              className="w-1.5 h-8 rounded-full mb-8"
              style={{ backgroundColor: project.accent }}
            />

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-5">
              {project.title}
            </h1>

            <p className="text-xl text-white/35 font-light leading-relaxed mb-10 max-w-2xl">
              {project.description}
            </p>

            <p className="text-base text-white/30 font-light leading-relaxed max-w-2xl mb-20">
              This space will be updated with project details once development is complete.
            </p>

            {/* Highlights — empty for now */}
            {project.highlights.length > 0 && (
              <>
                <h2 className="text-xs font-semibold tracking-[0.2em] text-white/20 uppercase mb-8">
                  Highlights
                </h2>
                <div className="space-y-10">
                  {project.highlights.map((h) => (
                    <div key={h.metric} className="flex items-start gap-6">
                      <div className="min-w-[140px]">
                        <p className="text-lg font-bold text-white tracking-tight">
                          {h.metric}
                        </p>
                      </div>
                      <p className="text-sm text-white/30 font-light leading-relaxed pt-0.5">
                        {h.context}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.aside
            className="lg:pt-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-8 p-8 rounded-2xl border border-white/[0.05] bg-white/[0.01]">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.15em] text-white/20 uppercase mb-2">
                  Role
                </p>
                <p className="text-sm text-white/60 font-light">
                  {project.role}
                </p>
              </div>

              <div className="h-px bg-white/[0.04]" />

              <div>
                <p className="text-[10px] font-semibold tracking-[0.15em] text-white/15 uppercase mb-2">
                  Timeline
                </p>
                <p className="text-sm text-white/35 font-light">
                  {project.timeline}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold tracking-[0.15em] text-white/15 uppercase mb-3">
                  Stack
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.length > 0 ? (
                    project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium tracking-wider text-white/20 uppercase"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-white/20 font-light">
                      —
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
