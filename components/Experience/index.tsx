// components/Experience.tsx
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

type ExpItem = {
  id: string;
  company: string;
  role: string;
  date: string;
  location?: string;
  bullets: string[];
  links?: { label: string; href: string }[];
  tag?: string;
};

const EXPERIENCES: ExpItem[] = [
  {
    id: "accenture",
    company: "Accenture (Client: BHP)",
    role: "Data Engineer",
    date: "Jul 2024 — Present",
    location: "Gurugram, India",
    bullets: [
      "Created pipelines to reduce dev time by 40% into Astronomer (Airflow DAG) that standardized ETL.",
      "Implemented Snowflake-based data models to process TBs of operations data; improved query throughput by 50% via clustering and micro-partition strategies.",
    ],
    tag: "Data & Cloud",
  },
  {
    id: "nyx",
    company: "NYX",
    role: "Software Development Engineer Intern",
    date: "Feb 2024 — Jul 2024",
    location: "Remote, India",
    bullets: [
      "Redesigned homepage and PDPs with React/Next.js; cut bounce rate by 25% and increased retention by 15% while achieving 95+ Lighthouse scores.",
      "Led A/B experiments and rolled out UI changes that raised conversion by 20%; partnered with product & analytics for measurement and rollout.",
    ],
    tag: "Frontend",
  },
  {
    id: "freelance",
    company: "Freelance — Cred Bricks & Orbit Global",
    role: "Software Engineer",
    date: "Nov 2023 — Jan 2024",
    location: "Remote, India",
    bullets: [
      "Built DigiIndia Loans on Next.js/Tailwind achieving perfect Lighthouse SEO & performance scores and launching a secure, high-UX loan platform.",
      "Redesigned site sections for Shatam Jeeva — added modern animations & Next.js SPA improvements to raise interactivity.",
    ],
    links: [
      { label: "digiindialoan.com", href: "https://digiindialoan.com/" },
      { label: "shatamjeeva.life", href: "https://www.shatamjeeva.life" },
    ],
    tag: "Frontend",
  },
];

export default function Experience() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      id="experience"
      className="flex items-center mx-auto max-w-5xl section"
    >
      <div className="">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-text">
            Experience
          </h2>
          <p className="text-muted text-sm mt-1">
            Roles where I shipped features, improved metrics, and learned fast.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-8 top-6 bottom-6 w-0.5 bg-[rgba(255,255,255,0.04)] hidden md:block" />

          <div className="flex flex-col gap-6">
            {EXPERIENCES.map((exp, idx) => {
              const isOpen = openId === exp.id;
              return (
                <motion.article
                  key={exp.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.36, delay: idx * 0.04 }}
                  className={clsx("relative md:pl-16 pl-6")}
                >
                  <div className="absolute md:left-4 left-2 top-3 md:top-6 transform -translate-x-1/2">
                    <span
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]"
                      aria-hidden
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden
                      >
                        <path
                          d="M7 8L3 12L7 16"
                          stroke="var(--color-primary)"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M17 8L21 12L17 16"
                          stroke="var(--color-accent)"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>

                  <motion.div
                    layout
                    className="bg-surface section-surface rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-baseline gap-3">
                          <h3 className="text-text font-semibold">
                            {exp.role}
                          </h3>
                          <span className="text-xs text-muted font-mono">
                            {exp.company}
                          </span>
                        </div>
                        <div className="text-xs text-muted mt-1">
                          {exp.date} {exp.location ? `• ${exp.location}` : ""}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {exp.tag && (
                          <span className="hidden md:block px-2 py-1 rounded bg-[rgba(255,255,255,0.02)] text-xs border border-[var(--color-accent)] text-[var(--color-accent)]">
                            {exp.tag}
                          </span>
                        )}
                        <button
                          aria-expanded={isOpen}
                          aria-controls={`exp-${exp.id}`}
                          onClick={() =>
                            setOpenId((p) => (p === exp.id ? null : exp.id))
                          }
                          className="px-3 py-1 rounded-lg bg-[var(--color-primary)] text-on-primary hover:bg-[var(--color-primary)]/80 duration-500 ease-in-out text-sm font-medium focus:outline-none cursor-pointer"
                        >
                          {isOpen ? "Close" : "Details"}
                        </button>
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`exp-${exp.id}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.32 }}
                          className="mt-4 overflow-hidden"
                        >
                          <ul className="list-disc pl-5 space-y-2 text-sm text-text">
                            {exp.bullets.map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>

                          {exp.links?.length ? (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {exp.links.map((l) => (
                                <a
                                  key={l.href}
                                  href={l.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-xs text-primary font-mono underline-offset-2 hover:underline"
                                >
                                  {l.label}
                                </a>
                              ))}
                            </div>
                          ) : null}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
