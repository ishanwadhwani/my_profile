"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";

const LINKS = [
  // { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "experience", label: "Experience", href: "#experience" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "contact", label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section[id]")
    );
    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id || "home");
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.55 }
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onHash() {
      setOpen(false);
    }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  function handleNavClick(e: React.MouseEvent, id: string) {
    e.preventDefault();
    setOpen(false);

    const main = document.querySelector<HTMLElement>(".main-scroll");
    const target = document.getElementById(id);

    if (!main || !target) {
      window.location.hash = `#${id}`;
      return;
    }

    const mainRect = main.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const top = targetRect.top - mainRect.top + main.scrollTop;

    main.scrollTo({ top: Math.max(0, Math.round(top)), behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  }

  return (
    <header
      className={clsx(
        "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[92%] max-w-5xl rounded-xl",
        "backdrop-blur-sm",
        scrolled ? "shadow-xl" : "shadow-none"
      )}
      aria-label="Primary"
    >
      <div className="bg-surface/95 border border-[rgba(255,255,255,0.03)] rounded-xl px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 focus:outline-none"
            aria-label="Go to top"
          >
            <span className="font-mono text-primary text-lg leading-none">
              {"<Ishan/>"}
            </span>
          </Link>
        </div>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-2">
          {LINKS.map((l) => {
            const isActive =
              active === (l.id === "home" ? "top" : l.id) ||
              (l.href === "#top" && active === "home");
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={(e) => handleNavClick(e, l.id)}
                className={clsx(
                  "px-3 py-1 rounded-md text-sm font-medium hover:text-[var(--color-accent)]"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/IshanWadhwani_Resume.pdf"
            className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-full bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/80 text-on-primary text-sm font-medium"
            aria-label="Download resume"
          >
            Resume
          </Link>

          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md focus:ring-2 focus:ring-primary cursor-pointer"
          >
            <svg
              className="w-6 h-6 text-text"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="absolute inset-x-4 top-[64px] z-50 md:hidden"
            >
              <div className="bg-surface border border-[rgba(255,255,255,0.03)] rounded-xl p-4 shadow-lg">
                <nav className="flex flex-col gap-2">
                  {LINKS.map((l) => {
                    return (
                      <Link
                        key={l.href}
                        href={l.href}
                        onClick={(e) => handleNavClick(e, l.id)}
                        className={clsx(
                          "px-3 py-2 rounded-md text-sm font-medium focus:outline-none hover:text-[var(--color-accent)]"
                        )}
                      >
                        {l.label}
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-3 border-t border-[rgba(255,255,255,0.02)] pt-3 cursor-pointer">
                  <Link
                    href="/IshanWadhwani_Resume.pdf"
                    rel="noreferrer"
                    target="_blank"
                    className="inline-flex items-center px-3 py-2 rounded-md bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/80 text-on-primary text-sm font-medium"
                  >
                    Resume
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
