"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const posts = [
  {
    id: "post-1",
    title: "The Philosophy of Design Systems",
    date: "2026.04",
    excerpt:
      "Exploring the principles that make design systems last — composability, constraints, and the balance between consistency and creativity.",
  },
  {
    id: "post-2",
    title: "Building Interactions That Feel Real",
    date: "2026.03",
    excerpt:
      "How spring physics, gesture-driven interfaces, and thoughtful micro-interactions create digital experiences that feel tangible.",
  },
  {
    id: "post-3",
    title: "Why Minimalism Isn't About Removing Things",
    date: "2026.02",
    excerpt:
      "True minimalism is about clarity of intent. Every element that remains must carry its weight — and nothing more.",
  },
];

export default function BlogPage() {
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
            Blog
          </h1>
          <p className="text-sm text-white/20 font-light mt-3 max-w-md leading-relaxed">
            Thoughts on design, code, and the craft of making things.
          </p>
        </motion.div>

        <div className="max-w-2xl">
          {posts.map((post, i) => (
            <motion.article
              key={post.id}
              className="group py-7 border-b border-white/[0.04] last:border-b-0"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06, ease: "easeOut" }}
            >
              <span className="text-[10px] font-medium tracking-[0.15em] text-white/12 uppercase">
                {post.date}
              </span>
              <h2 className="text-lg font-bold text-white tracking-tight mt-2 mb-2 group-hover:text-[#00A19C] transition-colors duration-300">
                {post.title}
              </h2>
              <p className="text-sm text-white/20 font-light leading-relaxed">
                {post.excerpt}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
