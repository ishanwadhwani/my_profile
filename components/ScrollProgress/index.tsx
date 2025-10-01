'use client';
import { useEffect } from 'react';

export default function ScrollProgress() {
  useEffect(() => {
    const el = document.querySelector('.scroll-progress > i') as HTMLElement | null;
    if (!el) return;
    function update() {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop / (doc.scrollHeight - doc.clientHeight);
      if (el) {
        el.style.height = `${Math.min(100, Math.max(0, scrolled * 100))}%`;
      }
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return null;
}
