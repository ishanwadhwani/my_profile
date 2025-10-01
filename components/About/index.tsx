// components/About.tsx
"use client";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="flex items-center justify-center mx-auto max-w-5xl section"
    >
      <div className="content-container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="grid grid-cols-1 gap-6"
        >
          {/* Left: prose */}
          <div className="bg-surface section-surface rounded-xl p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-text mb-3">
              About
            </h2>

            <p className="text-text text-base leading-relaxed mb-4">
              Hi — I&apos;m <strong className="font-medium">Ishan Wadhwani</strong>.
              I build fast, user-friendly web and mobile apps with a focus on
              clear UX and maintainable code. I love turning fuzzy product
              requirements into elegant interfaces and simple developer-first
              systems. I&apos;m most comfortable with React, Next.js, TypeScript
              and Tailwind.
            </p>

            <p className="text-muted text-sm mb-6">
              I enjoy performance optimization, readable code, and tiny
              delightful UI details. Outside work I love Sindhi food, making
              short videos, and tinkering with helpful side-projects.
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="text-muted text-sm shadow-lg px-4 py-2 rounded-lg bg-[var(--color-primary)] text-on-primary font-medium hover:bg-[var(--color-primary)]/80 duration-500 ease-in-out">
                Lucknow, India
              </span>
              {/* <span className="px-3 py-1 rounded-md bg-[rgba(255,255,255,0.02)] text-muted text-sm">
                React / Next.js
              </span> */}
              <span className="px-4 py-2 rounded-lg text-sm font-medium shadow-lg border border-[var(--color-accent)] text-[var(--color-accent)]">
                Open to collaborations
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.985 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="bg-bg/10 border border-[rgba(255,255,255,0.04)] rounded-xl p-6 md:p-8 section-surface font-mono text-sm text-text shadow-md"
            aria-hidden={false}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[rgba(255,100,90,0.95)] block" />
                <span className="w-3 h-3 rounded-full bg-[rgba(255,200,90,0.9)] block" />
                <span className="w-3 h-3 rounded-full bg-[rgba(80,200,120,0.9)] block" />
                <span className="ml-3 text-xs text-muted">
                  ishans-profile.js
                </span>
              </div>

              <div className="text-xs text-muted">v1.0</div>
            </div>

            <pre className="whitespace-pre-wrap break-words leading-relaxed text-[9px] md:text-sm">
              {`const ishan = {
  name: "Ishan Wadhwani",                           // full-stack dev
  focus: ["Web apps", "Mobile apps", "AI agents"],  // chosen application areas
  stack: ["Next.js", "React Native", "TypeScript", "Tailwind"], // main tech
  strengths: ["UX", "performance", "clean code"], // what I like to ship
  status: "building useful things 🚀"
};`}
            </pre>

            <div className="mt-5 flex items-center justify-between">
              <div>Available for freelance & collaboration</div>
              {/* <div className="flex items-center gap-2">
                <Link
                  href="/IshanWadhwani_Resume.pdf"
                  className="inline-flex items-center px-3 py-2 rounded-full bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/80 text-on-primary text-sm font-medium"
                >
                  Resume
                </Link>
                <Link
                  href="#contact"
                  className="text-sm hover:text-[var(--color-accent)] font-medium"
                >
                  Contact
                </Link>
              </div> */}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
