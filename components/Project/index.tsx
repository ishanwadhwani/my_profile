"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";
import Link from "next/link";
import { FaLock } from "react-icons/fa6";

import ProjectModal from "@/components/ProjectModal";
import Project from "@/utils/text";

// Filters (simple)
const FILTERS = [
  { key: "all", label: "all()" },
  { key: "web", label: "web()" },
  { key: "mobile", label: "mobile()" },
  { key: "ai", label: "ai()" },
  { key: "wip", label: "⧗ WIP" },
];

export default function Projects() {
  const [filter, setFilter] = useState<
    "all" | "web" | "mobile" | "perf" | "tools" | "ai" | "wip"
  >("all");
  const [modal, setModal] = useState<{ open: boolean; project?: Project }>({
    open: false,
  });

  const filtered = Project.filter((p) => {
    if (filter === "all") return true;
    if (filter === "wip") return !!p.wip;
    if (filter === "web")
      return p.tech.some((t) => ["Next.js", "React"].includes(t));
    if (filter === "mobile")
      return p.tech.some((t) =>
        ["React Native", "Flutter", "Mobile"].includes(t)
      );
    // if (filter === 'perf') return p.tech.some(t => ['SEO', 'Perf', 'Performance'].includes(t)) || p.title.toLowerCase().includes('digi');
    // if (filter === 'tools') return p.tech.some(t => ['Prisma', 'TypeScript', 'Tools'].includes(t));
    if (filter === "ai")
      return p.tech.some((t) => ["AI", "ML", "Tensorflow"].includes(t));
    return true;
  });

  const hoverMotion = { y: -6, scale: 1.01 };

  return (
    <section id="projects" className="section">
      <div className="content-container">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-text">
              Projects
            </h2>
            <p className="text-muted text-sm mt-1">{`<text>Tap to know more</text>`}</p>
          </div>

          <div className="flex gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key as any)}
                title={f.label}
                className={clsx(
                  "px-3 py-1 rounded-md text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  filter === f.key
                    ? "bg-primary text-on-primary"
                    : "text-muted hover:text-text"
                )}
              >
                <span className="font-mono cursor-pointer">{f.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <motion.article
              key={p.id}
              layout
              whileHover={hoverMotion}
              className="relative group bg-surface section-surface rounded-xl overflow-hidden shadow-sm focus-within:shadow-md"
            >
              {/* Image / visual */}
              <div className="w-full aspect-[16/10] bg-[rgba(0,0,0,0.06)] overflow-hidden">
                <img
                  src={p.screenshots?.[0] ?? "/screens/placeholder.png"}
                  alt={`${p.title} screenshot`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Hover overlay (appears on hover or focus) */}
                <div
                  className="absolute inset-0 flex items-center justify-center p-3 pointer-events-none bg-black/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300"
                  aria-hidden
                >
                  <div className="w-full opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-auto">
                    <div className="flex items-center justify-center gap-2">
                      {p.demo === "#" ? (
                        <span className="flex items-center gap-1 px-3 py-1 rounded-md bg-primary text-on-primary text-xs font-medium hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-not-allowed opacity-70">
                          Demo <FaLock />
                        </span>
                      ) : (
                        <Link
                          href={p.demo ?? "#"}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1 rounded-md bg-primary text-on-primary text-xs font-medium hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Open demo for ${p.title}`}
                        >
                          Demo
                        </Link>
                      )}
                      {p.repo && (
                        <Link
                          href={p.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1 rounded-md border border-[rgba(255,255,255,0.04)] text-xs font-medium text-text hover:bg-[rgba(255,255,255,0.02)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Open repo for ${p.title}`}
                        >
                          Repo
                        </Link>
                      )}
                      <button
                        onClick={() => setModal({ open: true, project: p })}
                        className="px-3 py-1 rounded-md bg-[rgba(255,255,255,0.02)] text-xs font-medium text-text hover:bg-[rgba(255,255,255,0.03)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        aria-label={`Preview ${p.title}`}
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-text font-semibold leading-tight">
                      {p.title}
                    </h3>
                    <p className="text-muted text-sm mt-1">{p.desc}</p>
                  </div>

                  {p.wip && (
                    <div className="text-xs px-2 py-1 rounded bg-[rgba(255,255,255,0.02)] text-muted font-mono">
                      WIP
                    </div>
                  )}
                </div>

                {/* small code-hint line */}
                {p.snippet && (
                  <div className="mt-3 font-mono text-xs text-text/80 leading-tight">
                    <code>{p.snippet}</code>
                  </div>
                )}

                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-[rgba(255,255,255,0.02)] text-xs text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <ProjectModal
        open={modal.open}
        onClose={() => setModal({ open: false })}
        title={modal.project?.title}
        description={modal.project?.desc}
        screenshots={modal.project?.screenshots ?? ["/screens/placeholder.png"]}
        repoHref={modal.project?.repo}
      />
    </section>
  );
}
