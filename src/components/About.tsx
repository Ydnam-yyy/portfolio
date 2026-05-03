"use client";

import { motion } from "framer-motion";
import PolaroidStack from "./PolaroidStack";

const galleryImages = [
  { src: "", alt: "Portrait", color: "#1a1a2e" },
  { src: "", alt: "Studio", color: "#16213e" },
  { src: "", alt: "Travel", color: "#0f3460" },
  { src: "", alt: "Creative", color: "#1a1a2e" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative max-w-[1440px] mx-auto px-8 md:px-16 py-32 md:py-40"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Left: Polaroid photo stack */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <PolaroidStack images={galleryImages} />
        </motion.div>

        {/* Right: Short intro */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-xs font-medium tracking-[0.3em] text-[#00A19C] uppercase mb-4">
            About
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Hi, I&apos;m{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A19C] to-[#00D4C8]">
              Your Name
            </span>
          </h2>

          <p className="text-lg md:text-xl font-light text-white/45 tracking-wide leading-relaxed mt-4">
            Designer &amp; Developer
          </p>

          <p className="text-sm md:text-base font-light text-white/30 leading-relaxed max-w-md mt-8">
            I craft digital experiences at the intersection of aesthetics and
            function — building products that feel as good as they look.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
