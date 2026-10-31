// Shared Motion Design Tokens & Architecture for S. Jagadeshwar Reddy Portfolio
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const motionTokens = {
  // Easing curves
  easeOut: "power3.out",
  easeInOut: "power2.inOut",
  cinematic: "expo.out",
  smooth: "power1.out",
  spring: "elastic.out(1, 0.75)",
  
  // Durations (seconds)
  fast: 0.35,
  medium: 0.65,
  slow: 0.9,
  epic: 1.2,
  
  // Stagger intervals (seconds)
  staggerSmall: 0.06,
  staggerMedium: 0.1,
  staggerLarge: 0.16,
  
  // Spatial offsets (pixels)
  revealDistance: 24,
  parallaxDistance: 32,
  floatDistance: 8,
};

export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Standard section reveal helper with GSAP ScrollTrigger.
 * Safely falls back to immediate visibility when reduced motion is preferred.
 */
export const initSectionReveal = (
  container: HTMLElement | null,
  options?: {
    headerSelector?: string;
    itemsSelector?: string;
    stagger?: number;
    delay?: number;
    start?: string;
  }
) => {
  if (!container) return;

  if (prefersReducedMotion()) {
    // If reduced motion is preferred, immediately ensure everything is visible
    gsap.set(container.querySelectorAll('.reveal-item, .reveal-header'), {
      opacity: 1,
      y: 0,
      clearProps: 'all'
    });
    return;
  }

  const {
    headerSelector = '.reveal-header',
    itemsSelector = '.reveal-item',
    stagger = 0.08,
    delay = 0,
    start = 'top 85%'
  } = options || {};

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start,
        once: true,
      }
    });

    const headers = container.querySelectorAll(headerSelector);
    if (headers.length > 0) {
      tl.from(headers, {
        opacity: 0,
        y: motionTokens.revealDistance,
        duration: motionTokens.medium,
        stagger: 0.08,
        ease: motionTokens.easeOut,
        delay
      });
    }

    const items = container.querySelectorAll(itemsSelector);
    if (items.length > 0) {
      tl.from(items, {
        opacity: 0,
        y: motionTokens.revealDistance,
        duration: motionTokens.medium,
        stagger,
        ease: motionTokens.easeOut
      }, "-=0.35");
    }
  }, container);

  return () => ctx.revert();
};
