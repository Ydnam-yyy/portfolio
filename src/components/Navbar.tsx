"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContact } from "./ContactContext";

interface NavItem {
  label: string;
  href: string;
  isAnchor?: boolean;
  isContact?: boolean;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/#experience", isAnchor: true },
  { label: "Skills", href: "/#skills", isAnchor: true },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact", isContact: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { open: openContact } = useContact();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";

  const isActive = (item: NavItem) => {
    if (item.isContact) return false;
    if (item.href === "/") return pathname === "/";
    if (item.isAnchor) return isHome && item.href === `/#${item.href.split("#")[1]}`;
    return pathname.startsWith(item.href);
  };

  const handleNavClick = (item: NavItem, e?: React.MouseEvent) => {
    if (item.isContact) {
      e?.preventDefault();
      openContact();
      setMobileOpen(false);
      return;
    }
    if (item.isAnchor && !isHome) {
      e?.preventDefault();
      const hash = item.href.split("#")[1];
      router.push(`/#${hash}`);
      setMobileOpen(false);
      return;
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled
            ? "bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <nav className="max-w-[1440px] mx-auto px-8 md:px-16 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-white hover:text-[#00A19C] transition-colors duration-300"
          >
            &phi;
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const active = isActive(item);

              if (item.isContact) {
                return (
                  <li key={item.label}>
                    <button
                      onClick={() => openContact()}
                      className="text-sm font-medium text-white/60 hover:text-[#00A19C] transition-colors duration-300 tracking-wide bg-transparent border-none cursor-pointer"
                    >
                      {item.label}
                    </button>
                  </li>
                );
              }

              if (item.isAnchor && !isHome) {
                return (
                  <li key={item.label}>
                    <button
                      onClick={(e) => handleNavClick(item, e)}
                      className={`text-sm font-medium transition-colors duration-300 tracking-wide bg-transparent border-none cursor-pointer ${
                        active
                          ? "text-[#00A19C]"
                          : "text-white/60 hover:text-[#00A19C]"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              }

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(item, e)}
                    className={`text-sm font-medium transition-colors duration-300 tracking-wide ${
                      active
                        ? "text-[#00A19C]"
                        : "text-white/60 hover:text-[#00A19C]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile toggle */}
          <button
            className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 cursor-pointer bg-transparent border-none"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-5 h-[1.5px] bg-white rounded-full origin-center"
              animate={mobileOpen ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="block w-5 h-[1.5px] bg-white rounded-full"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="block w-5 h-[1.5px] bg-white rounded-full origin-center"
              animate={mobileOpen ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-xl flex items-center justify-center md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {item.isContact ? (
                    <button
                      onClick={() => {
                        openContact();
                        setMobileOpen(false);
                      }}
                      className="text-2xl font-light text-white/70 hover:text-[#00A19C] transition-colors duration-300 bg-transparent border-none cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ) : item.isAnchor && !isHome ? (
                    <button
                      onClick={(e) => handleNavClick(item, e)}
                      className={`text-2xl font-light transition-colors duration-300 bg-transparent border-none cursor-pointer ${
                        isActive(item)
                          ? "text-[#00A19C]"
                          : "text-white/70 hover:text-[#00A19C]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(item, e)}
                      className={`text-2xl font-light transition-colors duration-300 ${
                        isActive(item)
                          ? "text-[#00A19C]"
                          : "text-white/70 hover:text-[#00A19C]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
