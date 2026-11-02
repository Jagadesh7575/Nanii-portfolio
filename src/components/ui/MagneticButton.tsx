import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '../../styles/motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: 'button' | 'a';
  href?: string;
  download?: string | boolean;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  'data-cursor-text'?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 0.28,
  as = 'button',
  href,
  download,
  target,
  rel,
  type = 'button',
  disabled = false,
  onClick,
  'data-cursor-text': cursorText,
}) => {
  const elRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Respect user's motion preference or touch devices
    if (prefersReducedMotion()) return;
    const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const el = elRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.65,
        ease: 'elastic.out(1, 0.35)',
        overwrite: 'auto',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(el);
    };
  }, [strength]);

  const commonProps = {
    ref: elRef as any,
    className: `inline-block will-change-transform ${className}`,
    onClick,
    'data-cursor-text': cursorText,
  };

  if (as === 'a' && href) {
    return (
      <a
        {...commonProps}
        href={href}
        download={download}
        target={target}
        rel={rel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      {...commonProps}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
