import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Only enable on non-touch devices with fine pointers
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'power2.out',
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.28,
        ease: 'power2.out',
      });
    };

    const handleMouseEnterInteractive = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const text = target.getAttribute('data-cursor-text') || '';
      setCursorText(text);
      setIsHovered(true);
    };

    const handleMouseLeaveInteractive = () => {
      setCursorText('');
      setIsHovered(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Attach listeners to interactive elements
    const attachHoverListeners = () => {
      const interactives = document.querySelectorAll<HTMLElement>(
        'a, button, [data-cursor-interactive], input, textarea'
      );
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnterInteractive);
        el.addEventListener('mouseleave', handleMouseLeaveInteractive);
      });
    };

    attachHoverListeners();
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300">
      {/* Precision Core Dot */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-150 ${
          isHovered
            ? 'w-2.5 h-2.5 bg-[#00D9FF] shadow-[0_0_12px_#00D9FF]'
            : 'w-2 h-2 bg-[#F5F5F5] shadow-[0_0_8px_rgba(255,255,255,0.6)]'
        }`}
      />

      {/* Fluid Trailing Follower Ring */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-300 ${
          isHovered
            ? 'w-14 h-14 bg-[#00D9FF]/15 border border-[#00D9FF]/60 backdrop-blur-[2px] scale-125 shadow-[0_0_20px_rgba(0,217,255,0.35)]'
            : 'w-8 h-8 border border-white/20 bg-transparent scale-100'
        }`}
      >
        {cursorText && (
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#00D9FF] select-none drop-shadow-[0_0_6px_rgba(0,217,255,0.7)]">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
