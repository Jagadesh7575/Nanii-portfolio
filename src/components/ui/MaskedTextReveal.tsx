import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion } from '../../styles/motion';

gsap.registerPlugin(ScrollTrigger);

interface MaskedTextRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div';
  delay?: number;
  duration?: number;
  stagger?: number;
  italicWords?: string[];
  triggerOnScroll?: boolean;
  start?: string;
}

export const MaskedTextReveal: React.FC<MaskedTextRevealProps> = ({
  text,
  className = '',
  as: Component = 'div',
  delay = 0,
  duration = 0.85,
  stagger = 0.04,
  italicWords = [],
  triggerOnScroll = true,
  start = 'top 85%',
}) => {
  const containerRef = useRef<HTMLElement | null>(null);

  const words = text.split(' ');

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const el = containerRef.current;
    if (!el) return;

    const targets = el.querySelectorAll('.masked-word-inner');
    if (targets.length === 0) return;

    const animConfig: gsap.TweenVars = {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease: 'power4.out',
      force3D: true,
      clearProps: 'transform,opacity',
    };

    if (triggerOnScroll) {
      gsap.fromTo(targets, 
        { y: '115%', opacity: 0 },
        {
          ...animConfig,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: 'play reverse play reverse',
          },
          delay,
        }
      );
    } else {
      gsap.fromTo(targets,
        { y: '115%', opacity: 0 },
        {
          ...animConfig,
          delay,
        }
      );
    }
  }, { scope: containerRef, dependencies: [text] });

  return (
    <Component
      ref={containerRef as any}
      className={`overflow-visible ${className}`}
    >
      {words.map((word, idx) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '');
        const isItalic = italicWords.some(
          iw => iw.toLowerCase() === cleanWord.toLowerCase() || iw.toLowerCase() === word.toLowerCase()
        );

        return (
          <span
            key={idx}
            className="inline-block overflow-hidden align-baseline mr-[0.24em] last:mr-0 pb-[0.08em]"
          >
            <span
              className={`masked-word-inner inline-block will-change-transform ${
                isItalic ? 'italic text-white/90 drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]' : ''
              }`}
            >
              {word}
            </span>
          </span>
        );
      })}
    </Component>
  );
};
