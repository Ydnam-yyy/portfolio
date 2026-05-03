"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle radial accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,161,156,0.05)_0%,transparent_60%)]" />

      {/* Single decorative ring */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full border border-white/[0.03]"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Central content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.div
          className="mb-8"
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-[10rem] md:text-[14rem] font-light leading-none tracking-tighter text-white/8 select-none">
            &phi;
          </span>
        </motion.div>

        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white">
          Mandy<span className="text-[#00A19C]">S:)</span>
        </h1>

        <p className="text-lg md:text-xl font-light text-white/40 tracking-wide mt-5">
          Developer &middot; Designer &middot; Innovator
        </p>

        <p className="text-sm font-light text-white/20 tracking-wide mt-3">
          Current student at Shanghai Starriver Bilingual School
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="text-[10px] font-medium tracking-[0.3em] text-white/15 uppercase">
          Scroll
        </span>
        <motion.div
          className="w-[1px] h-8 bg-gradient-to-b from-white/25 to-transparent"
          animate={{ scaleY: [1, 1.5, 1], opacity: [0.25, 0.7, 0.25] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
