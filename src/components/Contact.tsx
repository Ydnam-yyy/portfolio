"use client";

import { motion } from "framer-motion";

const socialLinks = [
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Email", href: "mailto:hello@example.com" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative max-w-[1440px] mx-auto px-8 md:px-16 py-32 md:py-40"
    >
      <div className="max-w-xl">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-xs font-medium tracking-[0.3em] text-[#00A19C] uppercase mb-4">
            Contact
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
            Get in touch
          </h2>
          <p className="text-sm text-white/20 font-light leading-relaxed">
            Always open to interesting conversations and opportunities.
          </p>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-light text-white/30 hover:text-[#00A19C] transition-colors duration-300 px-4 py-2 rounded-full border border-white/[0.04] hover:border-white/[0.1]"
            >
              {link.label}
            </a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-24 pt-6 border-t border-white/[0.04]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
        >
          <p className="text-[10px] font-medium tracking-[0.2em] text-white/12 uppercase">
            &copy; {new Date().getFullYear()}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
