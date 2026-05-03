"use client";

import { useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useContact } from "./ContactContext";

interface FolderItem {
  id: string;
  label: string;
  description: string;
  href: string;
  accent: string;
  isContact?: boolean;
}

const folders: FolderItem[] = [
  {
    id: "projects",
    label: "Projects",
    description: "Curated work spanning design, development, and creative exploration.",
    href: "/projects",
    accent: "#00A19C",
  },
  {
    id: "experience",
    label: "Experience",
    description: "Timeline of roles and milestones that shaped my craft.",
    href: "/#experience",
    accent: "#4A90D9",
  },
  {
    id: "skills",
    label: "Skills",
    description: "Capabilities across coding, design, physics, music, leadership, and sports.",
    href: "/#skills",
    accent: "#E8A838",
  },
  {
    id: "blog",
    label: "Blog",
    description: "Thoughts on design systems, creative coding, and the craft of making.",
    href: "/blog",
    accent: "#C060A0",
  },
  {
    id: "contact",
    label: "Contact",
    description: "Get in touch — always open to interesting conversations and opportunities.",
    href: "#contact",
    accent: "#00A19C",
    isContact: true,
  },
];

function FolderIcon({ accent }: { accent: string }) {
  return (
    <svg
      width="32"
      height="28"
      viewBox="0 0 40 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 10.5A2.5 2.5 0 0 1 2.5 8h10.75l3 2.5H37.5A2.5 2.5 0 0 1 40 13v18.5a2.5 2.5 0 0 1-2.5 2.5H2.5A2.5 2.5 0 0 1 0 31.5V10.5Z"
        fill={accent}
        fillOpacity="0.12"
        stroke={accent}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FolderCard({
  folder,
  index,
  onContactClick,
}: {
  folder: FolderItem;
  index: number;
  onContactClick?: () => void;
}) {
  const rawX = useMotionValue(50);
  const rawY = useMotionValue(50);
  const springX = useSpring(rawX, { stiffness: 100, damping: 24, mass: 0.35 });
  const springY = useSpring(rawY, { stiffness: 100, damping: 24, mass: 0.35 });

  const isHovering = useMotionValue(0);
  const lensOpacity = useTransform(isHovering, [0, 1], [0, 1]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      rawX.set(((e.clientX - rect.left) / rect.width) * 100);
      rawY.set(((e.clientY - rect.top) / rect.height) * 100);
    },
    [rawX, rawY]
  );

  const inner = (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.04] bg-[#0d0d0d] group-hover:border-white/[0.08] transition-colors duration-400">
      {/* Base layer — folder icon + label */}
      <div className="relative p-7 pb-6 transition-all duration-400 group-hover:opacity-40 group-hover:blur-[1px]">
        <FolderIcon accent={folder.accent} />
        <h3 className="text-sm font-semibold text-white tracking-tight mt-4">
          {folder.label}
        </h3>
      </div>

      {/* Lens */}
      <motion.div
        className="absolute pointer-events-none w-[120px] h-[120px] rounded-full"
        style={{
          left: useTransform(springX, (v) => `${v}%`),
          top: useTransform(springY, (v) => `${v}%`),
          x: "-50%",
          y: "-50%",
          background:
            "radial-gradient(circle, rgba(10,10,10,0.98) 0%, rgba(10,10,10,0.88) 50%, transparent 72%)",
          boxShadow: "0 0 40px 12px rgba(0,0,0,0.6)",
          opacity: lensOpacity,
        }}
      >
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
          style={{
            scale: useTransform(isHovering, [0, 1], [0.96, 1]),
            filter: useTransform(isHovering, [0, 1], ["blur(2px)", "blur(0px)"]),
          }}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: folder.accent }}
            />
            <span className="text-[11px] font-semibold text-white tracking-wide">
              {folder.label}
            </span>
          </div>
          <p className="text-[10px] leading-relaxed text-white/45 max-w-[160px]">
            {folder.description}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );

  return (
    <motion.div
      className="relative cursor-default"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => isHovering.set(1)}
      onMouseLeave={() => isHovering.set(0)}
    >
      {folder.isContact ? (
        <button
          onClick={onContactClick}
          className="block group w-full text-left bg-transparent border-none p-0 cursor-pointer"
        >
          {inner}
        </button>
      ) : (
        <Link href={folder.href} className="block group">
          {inner}
        </Link>
      )}
    </motion.div>
  );
}

export default function Menu() {
  const { open: openContact } = useContact();

  return (
    <section className="relative max-w-[1440px] mx-auto px-8 md:px-16 py-32 md:py-40">
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p className="text-xs font-medium tracking-[0.3em] text-[#00A19C] uppercase mb-3">
          Explore
        </p>
        <div className="w-8 h-[1px] bg-[#00A19C]/40" />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {folders.map((folder, i) => (
          <FolderCard
            key={folder.id}
            folder={folder}
            index={i}
            onContactClick={openContact}
          />
        ))}
      </div>
    </section>
  );
}
