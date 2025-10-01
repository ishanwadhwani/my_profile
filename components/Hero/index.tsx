"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const LINES = [
  "const Ishan = () => 'I build fast, accessible web apps and data pipelines.'",
  "helloWorld(); — Full-stack engineer",
  "// currently shipping features in Next.js & Snowflake",
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % LINES.length);
    }, 2800);
    return () => clearTimeout(t);
  }, [index, paused]);

  const current = LINES[index];

  return (
    <section className="max-w-5xl mx-auto px-6 py-12 bg-surface section-surface rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">
            <span className="block">Ishan Wadhwani</span>
            <span className="block text-primary text-lg font-mono mt-1">
              Full-stack engineer • Next.js & Snowflake
            </span>
          </h1>

          <p className="text-muted mb-6">
            I build production web apps and data pipelines — readable,
            performant, and user-friendly.
          </p>

          <div className="flex gap-3">
            <Link
              href="#projects"
              className="inline-flex items-center px-2 py-1 md:px-4 md:py-2 rounded-lg bg-[var(--color-primary)] text-on-primary font-medium shadow-md hover:bg-[var(--color-primary)]/80 duration-500 ease-in-out"
            >
              View projects
            </Link>
            <Link
              href="/IshanWadhwani_Resume.pdf"
              className="inline-flex items-center px-4 py-2 rounded-lg border border-[var(--color-accent)] hover:border-[var(--color-accent)]/80 text-[var(--color-accent)] hover:text-[var(--color-accent)]/80 font-medium hover:bg-[rgba(255,255,255,0.02)] duration-500 ease-in-out"
            >
              Download resume
            </Link>
          </div>
        </div>

        {/* Right: rotating code stack */}
        <div
          className="relative w-full h-40 md:h-36 lg:h-32 flex items-center justify-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* stacked background pieces for depth */}
          <div
            aria-hidden
            className="absolute inset-0 transform -rotate-3 scale-[.99] bg-[rgba(255,255,255,0.02)] rounded-lg pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute -inset-[6px] transform rotate-2 scale-[.995] bg-[rgba(255,255,255,0.01)] rounded-lg pointer-events-none"
          />

          <div className="relative w-full max-w-lg px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 18, rotateX: -12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                exit={{ opacity: 0, y: -18, rotateX: 12, scale: 0.98 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="bg-bg/20 border border-[rgba(255,255,255,0.04)] rounded-lg p-5 font-mono text-text text-sm md:text-base shadow-lg"
                aria-live="polite"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-2 items-center">
                    <span className="w-3 h-3 rounded-full bg-[rgba(255,100,90,0.95)] block" />
                    <span className="w-3 h-3 rounded-full bg-[rgba(255,200,90,0.9)] block" />
                    <span className="w-3 h-3 rounded-full bg-[rgba(80,200,120,0.9)] block" />
                  </div>

                  <div className="text-xs text-muted font-medium">
                    ishans-code.js
                  </div>
                </div>

                <div className="leading-tight overflow-hidden">
                  <code className="block break-words">{current}</code>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-muted">
                  <div className="flex gap-2 items-center">
                    <span className="px-2 py-1 rounded bg-[rgba(255,255,255,0.02)] text-muted text-[11px]">
                      React
                    </span>
                    <span className="px-2 py-1 rounded bg-[rgba(255,255,255,0.02)] text-muted text-[11px]">
                      Next.js
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      aria-label="Previous line"
                      onClick={() =>
                        setIndex((i) => (i - 1 + LINES.length) % LINES.length)
                      }
                      className="px-2 py-1 rounded hover:bg-[rgba(255,255,255,0.02)]"
                    >
                      ‹
                    </button>

                    <button
                      aria-label="Next line"
                      onClick={() => setIndex((i) => (i + 1) % LINES.length)}
                      className="px-2 py-1 rounded hover:bg-[rgba(255,255,255,0.02)]"
                    >
                      ›
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
