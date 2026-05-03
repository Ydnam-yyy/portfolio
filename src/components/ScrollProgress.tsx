"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed right-0 top-0 bottom-0 w-[2px] bg-white/10 z-[9999] origin-top"
      style={{ scaleY }}
    >
      <div className="absolute inset-0 bg-[#00A19C] shadow-[0_0_12px_rgba(0,161,156,0.6)]" />
    </motion.div>
  );
}
