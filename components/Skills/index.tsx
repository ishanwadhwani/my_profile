// components/Skills.tsx
"use client";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

type Skill = {
  name: string;
  tag?: string;
  level?: "advanced" | "intermediate" | "beginner";
};

const SKILLS: Record<string, Skill[]> = {
  Frontend: [
    { name: "React", tag: "UI", level: "intermediate" },
    { name: "Next.js", tag: "SSG/SSR", level: "intermediate" },
    { name: "TypeScript", tag: "typed", level: "intermediate" },
    { name: "JavaScript", tag: "typed", level: "intermediate" },
    { name: "React Native", tag: "typed", level: "intermediate" },
    { name: "Tailwind CSS", tag: "styling", level: "advanced" },
  ],
  "Backend & Data": [
    { name: "Node.js", tag: "server", level: "intermediate" },
    { name: "Express", tag: "server", level: "intermediate" },
    { name: "Snowflake", tag: "data", level: "intermediate" },
    { name: "SQL", tag: "query", level: "intermediate" },
    { name: "AWS", tag: "query", level: "beginner" },
    { name: "Airflow / Astronomer", tag: "ETL", level: "intermediate" },
    { name: "Python", tag: "scripting", level: "intermediate" },
  ],
  Tools: [
    { name: "Git", tag: "vcs", level: "advanced" },
    { name: "Prisma / Postgres", tag: "db", level: "intermediate" },
    { name: "Postman", tag: "deploy", level: "advanced" },
    { name: "VS Code", tag: "containers", level: "advanced" },
    { name: "Docker", tag: "containers", level: "beginner" },
    { name: "Jira", tag: "containers", level: "beginner" },
  ],
};

const CATEGORIES = Object.keys(SKILLS);

export default function Skills() {
  const [active, setActive] = useState<string>("All");

  const list = useMemo(() => {
    if (active === "All") {
      return Object.values(SKILLS).flat();
    }
    return SKILLS[active] ?? [];
  }, [active]);

  return (
    <section
      id="skills"
      className="flex max-w-5xl items-center mx-auto section"
    >
      <div className="">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="bg-surface section-surface rounded-xl p-8"
        >
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-text">
                Skills
              </h2>
              <p className="hidden md:block text-muted text-sm mt-1">
                {`// select: pkg@skills $ filter --scope=<different areas>`}
              </p>
            </div>

            <div className="flex md:gap-1 items-center flex-wrap">
              <button
                onClick={() => setActive("All")}
                className={clsx(
                  "hidden md:block px-3 py-2 rounded-md text-sm font-medium focus:outline-none cursor-pointer",
                  active === "All"
                    ? "bg-primary text-on-primary"
                    : "text-muted hover:text-text"
                )}
              >
                All
              </button>

              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={clsx(
                    "hidden md:block px-1.5 py-2 rounded-md text-sm font-medium focus:outline-none cursor-pointer",
                    active === c
                      ? "bg-primary text-on-primary"
                      : "text-muted hover:text-text"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <motion.div
            layout
            transition={{ duration: 0.32 }}
            className="mt-6 min-h-[12rem]"
          >
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
            >
              <AnimatePresence>
                {list.map((s) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.28 }}
                    className="p-3 rounded-md bg-[rgba(255,255,255,0.02)] flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-text font-medium text-sm">
                        {s.name}
                      </div>
                      {/* <div className="text-xs text-muted uppercase">{s.tag}</div> */}
                    </div>

                    <div className="flex items-center gap-2">
                      <div
                        className={clsx(
                          "h-2 rounded-full w-16",
                          s.level === "advanced"
                            ? "bg-primary"
                            : s.level === "intermediate"
                            ? "bg-[linear-gradient(to_right,#ff7aa2_50%,rgba(255,255,255,0.06)_50%)]"
                            : "bg-[linear-gradient(to_right,#ff7aa2_20%,rgba(255,255,255,0.06)_20%)]"
                        )}
                      />
                      <div className="text-xs text-muted">{s.level}</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
