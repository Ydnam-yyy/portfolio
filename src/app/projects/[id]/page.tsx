"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";

const projectData: Record<
  string,
  {
    title: string;
    description: string;
    longDescription: string;
    accent: string;
    tags: string[];
    role: string;
    timeline: string;
    highlights: { metric: string; context: string }[];
    visual: string; // hex color for abstract visual block
  }
> = {
  "project-1": {
    title: "Design System",
    description:
      "A comprehensive component library built for scalability and consistency.",
    longDescription:
      "Built a unified design system serving 40+ engineers and designers across three product teams. The system includes 200+ components, design tokens, accessibility guidelines, and automated visual regression testing.",
    accent: "#00A19C",
    tags: ["React", "TypeScript", "Storybook"],
    role: "Lead Designer & Developer",
    timeline: "2024 — Present",
    visual: "#00A19C",
    highlights: [
      {
        metric: "60% faster",
        context:
          "Reduced design-to-dev handoff time by standardizing tokens, components, and documentation across all product teams.",
      },
      {
        metric: "98% coverage",
        context:
          "Achieved near-complete test coverage with automated visual regression testing and snapshot diffing in CI.",
      },
      {
        metric: "3 product launches",
        context:
          "The design system served as the foundation for three major product releases within its first year of adoption.",
      },
    ],
  },
  "project-2": {
    title: "Analytics Dashboard",
    description:
      "Real-time data visualization platform with interactive charts.",
    longDescription:
      "Designed and built a real-time analytics platform processing millions of events per day. Features include customizable dashboards, anomaly detection, and collaborative annotations.",
    accent: "#4A90D9",
    tags: ["Next.js", "D3.js", "WebSocket"],
    role: "Full-Stack Developer",
    timeline: "2023 — 2024",
    visual: "#4A90D9",
    highlights: [
      {
        metric: "5M+ events/day",
        context:
          "Processes over five million events daily with sub-second query latency through a custom stream-processing pipeline.",
      },
      {
        metric: "12 chart types",
        context:
          "Custom visualization engine supports bar, line, area, scatter, heatmap, funnel, sankey, and five more chart types.",
      },
      {
        metric: "200+ weekly users",
        context:
          "Adopted by engineering, product, and executive teams as their primary source of truth for product metrics.",
      },
    ],
  },
  "project-3": {
    title: "Creative Studio",
    description:
      "A collaborative workspace for designers and developers.",
    longDescription:
      "Created a real-time collaborative prototyping tool that bridges the gap between design and code. Supports multiplayer editing, version history, and one-click handoff to production.",
    accent: "#E8A838",
    tags: ["Figma", "React", "Node.js"],
    role: "Product Designer",
    timeline: "2023",
    visual: "#E8A838",
    highlights: [
      {
        metric: "Days to hours",
        context:
          "Cut prototype iteration cycles from 3-5 days to under 4 hours by enabling real-time collaboration between design and engineering.",
      },
      {
        metric: "Seamless integration",
        context:
          "Plugged directly into existing Figma and GitHub workflows with bidirectional sync, eliminating manual export/import steps.",
      },
      {
        metric: "Product of the Year",
        context:
          "Recognized by the internal engineering org as the most impactful tooling investment of the year.",
      },
    ],
  },
  "project-4": {
    title: "Mobile Experience",
    description:
      "Cross-platform mobile application with fluid gestures.",
    longDescription:
      "Developed a cross-platform mobile application focusing on gesture-driven navigation and native-feel animations. Built with React Native and custom native modules for performance-critical features.",
    accent: "#C060A0",
    tags: ["React Native", "Swift", "Kotlin"],
    role: "Mobile Developer",
    timeline: "2022 — 2023",
    visual: "#C060A0",
    highlights: [
      {
        metric: "4.8 stars",
        context:
          "Maintained a 4.8+ average rating across both the App Store and Google Play, with over 50K downloads in the first quarter.",
      },
      {
        metric: "60fps gestures",
        context:
          "Every transition, swipe, and spring animation runs at a locked 60 frames per second on all supported devices.",
      },
      {
        metric: "85% code sharing",
        context:
          "Shared 85% of the codebase between iOS and Android while preserving platform-native feel on both operating systems.",
      },
    ],
  },
  "project-5": {
    title: "E-Commerce Platform",
    description:
      "High-performance storefront with dynamic merchandising.",
    longDescription:
      "Architected a high-performance e-commerce platform with server-side rendering, edge caching, and a headless CMS. Features include dynamic pricing, personalized recommendations, and a one-click checkout flow.",
    accent: "#00A19C",
    tags: ["Next.js", "Stripe", "Postgres"],
    role: "Tech Lead",
    timeline: "2022",
    visual: "#00807D",
    highlights: [
      {
        metric: "Lighthouse 98",
        context:
          "Achieved a perfect performance baseline with 98+ Lighthouse scores across all pages through aggressive SSR and edge caching.",
      },
      {
        metric: "35% conversion lift",
        context:
          "Redesigned checkout flow and product discovery, resulting in a 35% increase in conversion rate within the first month.",
      },
      {
        metric: "Zero downtime",
        context:
          "Built a blue-green deployment pipeline with automated canary releases, achieving zero-downtime deploys for 18 consecutive months.",
      },
    ],
  },
  "project-6": {
    title: "AI Content Tool",
    description:
      "Intelligent content generation powered by machine learning.",
    longDescription:
      "Built an AI-powered content platform that helps teams generate, curate, and optimize content at scale. Features include smart templates, tone adjustment, SEO optimization, and multi-language support.",
    accent: "#4A90D9",
    tags: ["Python", "FastAPI", "React"],
    role: "ML Engineer & Designer",
    timeline: "2021 — 2022",
    visual: "#2E6AB0",
    highlights: [
      {
        metric: "75% time reduction",
        context:
          "Cut average content production time from 4 hours to under 1 hour with AI-assisted generation and smart templates.",
      },
      {
        metric: "12 languages",
        context:
          "Built automatic translation and localization pipeline supporting 12 languages with tone and cultural adaptation.",
      },
      {
        metric: "50K+ monthly",
        context:
          "Platform generates and optimizes over 50,000 pieces of content each month across blog, social, and email channels.",
      },
    ],
  },
};

export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = projectData[id as string];

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Project not found
          </h1>
          <Link href="/projects" className="text-[#00A19C] hover:underline">
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

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
          {/* Abstract gradient visual — replace with actual screenshot when available */}
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
          {/* Decorative grid lines */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          {/* Centered visual label */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-[10px] font-semibold tracking-[0.3em] text-white/10 uppercase">
              Project Preview
            </p>
          </div>
          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 lg:gap-24">
          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Accent indicator */}
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
              {project.longDescription}
            </p>

            {/* Highlights — story blocks */}
            <h2 className="text-xs font-semibold tracking-[0.2em] text-white/20 uppercase mb-8">
              Highlights
            </h2>
            <div className="space-y-10">
              {project.highlights.map((h) => (
                <div key={h.metric} className="flex items-start gap-6">
                  {/* Metric — primary weight */}
                  <div className="min-w-[140px]">
                    <p className="text-lg font-bold text-white tracking-tight">
                      {h.metric}
                    </p>
                  </div>
                  {/* Context — secondary */}
                  <p className="text-sm text-white/30 font-light leading-relaxed pt-0.5">
                    {h.context}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.aside
            className="lg:pt-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-8 p-8 rounded-2xl border border-white/[0.05] bg-white/[0.01]">
              {/* Primary: Role */}
              <div>
                <p className="text-[10px] font-semibold tracking-[0.15em] text-white/20 uppercase mb-2">
                  Role
                </p>
                <p className="text-sm text-white/60 font-light">
                  {project.role}
                </p>
              </div>

              <div className="h-px bg-white/[0.04]" />

              {/* Secondary: Timeline */}
              <div>
                <p className="text-[10px] font-semibold tracking-[0.15em] text-white/15 uppercase mb-2">
                  Timeline
                </p>
                <p className="text-sm text-white/35 font-light">
                  {project.timeline}
                </p>
              </div>

              {/* Secondary: Stack */}
              <div>
                <p className="text-[10px] font-semibold tracking-[0.15em] text-white/15 uppercase mb-3">
                  Stack
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium tracking-wider text-white/20 uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
