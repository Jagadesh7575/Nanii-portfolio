import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let globalLenisInstance: Lenis | null = null;

export const getLenis = (): Lenis | null => globalLenisInstance;

export const scrollToId = (id: string, offset = -64) => {
  const target = document.getElementById(id);
  if (!target) return;

  if (globalLenisInstance) {
    globalLenisInstance.scrollTo(target, {
      offset,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    globalLenisInstance = lenis;

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenisTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenisTicker);
    gsap.ticker.lagSmoothing(0);

    // Global scroll progress tracker
    const handleScrollProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', handleScrollProgress, { passive: true });

    return () => {
      gsap.ticker.remove(updateLenisTicker);
      lenis.destroy();
      globalLenisInstance = null;
      window.removeEventListener('scroll', handleScrollProgress);
    };
  }, []);

  return (
    <>
      {/* Top Global Scroll Progress Accent Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[9999] pointer-events-none bg-black/5">
        <div
          className="h-full bg-gradient-to-r from-[#00B4D8] via-[#0284C7] to-[#00F0FF] transition-all duration-75 ease-out shadow-[0_0_10px_rgba(0,180,216,0.6)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </>
  );
};