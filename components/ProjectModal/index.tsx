// components/ProjectModal.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import clsx from "clsx";
import Image from "next/image";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  screenshots?: string[];
  repoHref?: string;
};

const SLIDE_THRESHOLD = 80;
const SLIDE_VELOCITY = 500;

export default function ProjectModal({
  open,
  onClose,
  title,
  description,
  screenshots = [],
  repoHref,
}: Props) {
  const [index, setIndex] = useState(0);
  const total = screenshots.length || 1;
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const slides = screenshots.length
    ? screenshots
    : ["/screens/placeholder.png"];

  useEffect(() => {
    if (open) {
      restoreFocusRef.current = document.activeElement as HTMLElement | null;
      setTimeout(() => closeBtnRef.current?.focus(), 60);
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    } else {
      restoreFocusRef.current?.focus?.();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index]);

  function prev() {
    setIndex((i) => (i - 1 + total) % total);
  }
  function next() {
    setIndex((i) => (i + 1) % total);
  }

  function onDragEnd(
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -SLIDE_THRESHOLD || velocity < -SLIDE_VELOCITY) {
      next();
    } else if (offset > SLIDE_THRESHOLD || velocity > SLIDE_VELOCITY) {
      prev();
    }
  }

  const srMessage = `Slide ${index + 1} of ${total}`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal-overlay"
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-60 flex items-center justify-center p-4"
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="relative z-10 w-full max-w-[1100px] h-[min(80vh,900px)] bg-surface section-surface rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            initial={{ y: 16, opacity: 0, scale: 0.985 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 8, opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.28 }}
          >
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
              <button
                ref={closeBtnRef}
                onClick={onClose}
                aria-label="Close project preview"
                className="w-9 h-9 rounded-md inline-flex items-center justify-center bg-[rgba(255,255,255,0.02)] text-text hover:bg-[rgba(255,255,255,0.03)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 flex flex-col">
              <div
                className="flex-1 relative flex items-center justify-center select-none"
                style={{ minHeight: 0 }}
              >
                <button
                  aria-hidden
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full p-2 hidden md:inline-flex items-center justify-center bg-[rgba(0,0,0,0.0)] hover:bg-[rgba(255,255,255,0.02)] focus:outline-none"
                  style={{ zIndex: 20 }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="var(--color-text)"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <button
                  aria-hidden
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 hidden md:inline-flex items-center justify-center bg-[rgba(0,0,0,0.0)] hover:bg-[rgba(255,255,255,0.02)] focus:outline-none"
                  style={{ zIndex: 20 }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="var(--color-text)"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-full max-w-[980px] h-full flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center">
                      <AnimatePresence initial={false} custom={index}>
                        <motion.div
                          key={index}
                          className="w-full h-full flex items-center justify-center"
                          initial={{ x: 60, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -60, opacity: 0 }}
                          transition={{ duration: 0.36, ease: "easeInOut" }}
                        >
                          <motion.div
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragEnd={onDragEnd}
                            dragElastic={0.2}
                            className="w-full h-full flex items-center justify-center"
                          >
                            <div className="w-full h-full flex items-center justify-center p-6">
                              <Image
                                src={slides[index]}
                                alt={`${title ?? "Project"} screenshot ${
                                  index + 1
                                }`}
                                className="max-h-[75%] max-w-full object-contain rounded-md shadow-inner"
                                style={{
                                  background:
                                    "linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.04))",
                                }}
                                loading="eager"
                                width={800}
                                height={600}
                              />
                            </div>
                          </motion.div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Go to slide ${i + 1}`}
                      onClick={() => setIndex(i)}
                      className={clsx(
                        "w-2 h-2 rounded-full",
                        i === index
                          ? "bg-primary"
                          : "bg-[rgba(255,255,255,0.04)]"
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="px-6 py-4 border-t border-[rgba(255,255,255,0.02)] flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-text">{title}</h3>
                  {description && (
                    <p className="text-sm text-muted mt-1 max-w-[60ch]">
                      {description}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {repoHref ? (
                    <a
                      href={repoHref}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 rounded-md bg-primary text-on-primary text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      Repo
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="sr-only" aria-live="polite">
            {srMessage}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
