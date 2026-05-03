"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContact } from "./ContactContext";

const contactLinks = [
  {
    label: "Email",
    value: "Mandysun_ssbs@163.com",
    href: "mailto:Mandysun_ssbs@163.com",
  },
  {
    label: "Instagram",
    value: "MandySun",
    href: "https://instagram.com/MandySun",
  },
  {
    label: "LinkedIn",
    value: "Diman Sun",
    href: "https://linkedin.com/in/diman-sun",
  },
  {
    label: "YouTube",
    value: "YDNAMMM",
    href: "https://youtube.com/@YDNAMMM",
  },
  {
    label: "GitHub",
    value: "Ydnam-yyy",
    href: "https://github.com/Ydnam-yyy",
  },
];

export default function ContactModal() {
  const { isOpen, close } = useContact();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
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
              className="pointer-events-auto w-full max-w-sm bg-[#0d0d0d] border border-white/[0.08] rounded-2xl p-8 shadow-2xl shadow-black/50 backdrop-blur-xl"
              initial={{ scale: 0.96, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 8 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-7">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    Contact
                  </h2>
                  <p className="text-sm text-white/30 font-light mt-1">
                    Let&rsquo;s connect
                  </p>
                </div>
                <button
                  onClick={close}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.04] hover:bg-white/[0.1] transition-colors duration-200 cursor-pointer"
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

              {/* Links */}
              <div className="space-y-1">
                {contactLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/[0.03] transition-colors duration-200 group cursor-pointer"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.25,
                      delay: 0.06 + i * 0.04,
                      ease: "easeOut",
                    }}
                  >
                    <span className="text-sm font-medium text-white/50 group-hover:text-white/80 transition-colors duration-200">
                      {link.label}
                    </span>
                    <span className="text-sm font-light text-white/25 group-hover:text-[#00A19C] transition-colors duration-200">
                      {link.value}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
