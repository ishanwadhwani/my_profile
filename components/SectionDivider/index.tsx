"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Shell = "powershell" | "bash";

export default function SectionDivider({
  commands = ["cd frontend", "pnpm dev", 'echo "→ Features"'],
  shell = "powershell",
  interval = 2800,
  className = "",
}: {
  commands?: string[];
  shell?: Shell;
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const mounted = useRef(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => {
      setIndex((i) => (i + 1) % commands.length);
    }, interval);
    return () => clearTimeout(id);
  }, [index, paused, interval, commands.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(document.activeElement)) return;
      if (e.key === "ArrowLeft") {
        setIndex((i) => (i - 1 + commands.length) % commands.length);
      } else if (e.key === "ArrowRight") {
        setIndex((i) => (i + 1) % commands.length);
      } else if (e.key === " " || e.key === "Spacebar") {
        setPaused((p) => !p);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [commands.length]);

  const prompt =
    shell === "powershell" ? "PS C:\\Ishan_Portfolio>" : "ishans-portfolio$";

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Terminal divider"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={`terminal-ticker w-full ${className}`}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="rounded-md border border-[rgba(255,255,255,0.03)] px-3 py-2 bg-[rgba(0,0,0,0.04)] flex items-center gap-3">
          <div className="font-mono text-xs md:text-sm text-primary/95 select-text">
            <span className="prompt">{prompt}</span>
          </div>

          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.32 }}
                className="font-mono text-sm md:text-base text-text/95 whitespace-pre-wrap"
                aria-live="polite"
              >
                {commands[index]}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2">
            <button
              aria-label="Previous command"
              onClick={() =>
                setIndex((i) => (i - 1 + commands.length) % commands.length)
              }
              className="text-muted hover:text-text px-2 py-1 rounded focus:outline-none"
            >
              ‹
            </button>

            <button
              aria-label={paused ? "Resume auto-rotate" : "Pause auto-rotate"}
              onClick={() => setPaused((p) => !p)}
              className="text-muted hover:text-text px-2 py-1 rounded focus:outline-none"
            >
              {paused ? "▶" : "⏸"}
            </button>

            <button
              aria-label="Next command"
              onClick={() => setIndex((i) => (i + 1) % commands.length)}
              className="text-muted hover:text-text px-2 py-1 rounded focus:outline-none"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <div className="sr-only" aria-live="polite">
        {commands[index]}
      </div>
    </div>
  );
}
