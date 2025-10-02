"use client";
import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  caption?: string; // short pun / caption shown on tap
  className?: string; // additional wrapper classes
  hideOnDesktop?: boolean; // hide on md+ (default true)
};

export default function MobileDivider({
  caption = "// next module — unpacking…",
  className = "",
  hideOnDesktop = true,
}: Props) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  // Small animation variants (disabled if reduced motion)
  const pulse = reduce
    ? {}
    : {
        animate: { scale: [1, 1.03, 1] },
        transition: { duration: 2.2, repeat: Infinity },
      };

  // wrapper class hides on md+ by default
  const wrapper = hideOnDesktop ? `block md:hidden ${className}` : className;

  return (
    <div className={wrapper} aria-hidden={false}>
      <div className="max-w-5xl mx-auto px-4">
        <div className="relative py-4">
          {/* <svg
            viewBox="0 0 1440 60"
            preserveAspectRatio="none"
            className="w-full h-14 block"
            role="img"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="mdDivGrad" x1="0" x2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-primary)"
                  stopOpacity="0.12"
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-accent)"
                  stopOpacity="0.06"
                />
              </linearGradient>
            </defs>

            <path
              d="M0,30 C240,10 480,50 720,30 C960,10 1200,50 1440,30 L1440,60 L0,60 Z"
              fill="url(#mdDivGrad)"
            />
            <path
              d="M0,32 C240,12 480,48 720,32 C960,12 1200,48 1440,32"
              fill="none"
              stroke="var(--color-primary)"
              strokeOpacity="0.06"
              strokeWidth="1.2"
            />
          </svg> */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto">
              <motion.button
                onClick={() => setOpen((s) => !s)}
                aria-expanded={open}
                aria-controls="mobile-divider-caption"
                className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-[rgba(0,0,0,0.04)] text-xs font-mono text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                {...pulse}
              >
                <span className="text-primary" aria-hidden>
                  {"//"}{" "}
                </span>
                <span className="sr-only">
                  {open ? "Hide note" : "Show note"}
                </span>
                <span className="visible">
                  {open ? "hide hint" : "peek hint"}
                </span>
              </motion.button>

              <div
                id="mobile-divider-caption"
                role="region"
                aria-live="polite"
                className={`mt-2 w-full text-center transition-all duration-220 ${
                  open ? "opacity-100 max-h-20" : "opacity-0 max-h-0"
                } overflow-hidden`}
                style={{ willChange: "opacity, max-height" }}
              >
                <div className="px-3 py-1 rounded-md text-xs text-text/90 bg-[rgba(255,255,255,0.02)] inline-block">
                  <span className="font-mono">{caption}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
