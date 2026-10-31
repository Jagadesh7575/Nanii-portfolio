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
            ? 'w-2 h-2 bg-[#00B4D8]'
            : 'w-2 h-2 bg-[#111216]'
        }`}
      />

      {/* Fluid Trailing Follower Ring */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-300 ${
          isHovered
            ? 'w-12 h-12 bg-[#00B4D8]/15 border border-[#00B4D8]/50 backdrop-blur-[1px] scale-125'
            : 'w-8 h-8 border border-[#111216]/25 bg-transparent scale-100'
        }`}
      >
        {cursorText && (
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#0096C7] select-none">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
