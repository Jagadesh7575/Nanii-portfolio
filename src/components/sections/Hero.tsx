import React, { useRef } from 'react';
import { ArrowRight, Download, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { prefersReducedMotion } from '../../styles/motion';
import { scrollToId } from '../layout/ScrollProgress';
import { MagneticButton } from '../ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const hero = heroRef.current;
    const img = imageRef.current;
    const content = contentRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    if (!hero || !content) return;

    // Master cinematic entrance timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 01. Background image subtle cinematic entrance (scale & opacity)
    if (img) {
      tl.fromTo(img,
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1.0, duration: 1.2, ease: "power2.out" }
      );
    }

    // 02. Eyebrow badge entrance
    tl.fromTo(content.querySelectorAll('.hero-eyebrow'),
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      "-=0.9"
    );

    // 03. Name Display Title entrance (with full descender clearance)
    tl.fromTo(content.querySelectorAll('.hero-name-title'),
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.85, ease: "power4.out" },
      "-=0.6"
    );

    // 04. Role Subtitle entrance
    tl.fromTo(content.querySelectorAll('.hero-role-subtitle'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      "-=0.6"
    );

    // 05. Bio description entrance
    tl.fromTo(content.querySelectorAll('.hero-bio-text'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      "-=0.55"
    );

    // 06. Action Buttons entrance
    tl.fromTo(content.querySelectorAll('.hero-cta-group'),
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
      "-=0.5"
    );

    // 07. Metrics & Availability entrance
    tl.fromTo(content.querySelectorAll('.hero-metrics-bar'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.4"
    );

    // 08. Scroll indicator entrance
    if (scrollIndicator) {
      tl.fromTo(scrollIndicator,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );
    }

    // Interactive subtle mouse parallax on desktop
    const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
    if (!isTouch && img) {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = hero.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
        const mouseY = (e.clientY - rect.top) / rect.height - 0.5;

        // Subtle background pan
        gsap.to(img, {
          x: mouseX * 15,
          y: mouseY * 10,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto"
        });

        // Subtle typography shift with cursor
        gsap.to(content, {
          x: -mouseX * 8,
          y: -mouseY * 6,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto"
        });
      };

      const handleMouseLeave = () => {
        gsap.to([img, content], {
          x: 0,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          overwrite: "auto"
        });
      };

      hero.addEventListener('mousemove', handleMouseMove);
      hero.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        hero.removeEventListener('mousemove', handleMouseMove);
        hero.removeEventListener('mouseleave', handleMouseLeave);
      };
    }

    // Scroll-linked smooth parallax
    if (img) {
      gsap.to(img, {
        yPercent: 8,
        scale: 1.02,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.6
        }
      });
    }

    gsap.to(content, {
      yPercent: -10,
      opacity: 0.35,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 0.5
      }
    });

  }, { scope: heroRef });

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative w-full h-screen min-h-[100svh] overflow-hidden bg-[#050505] flex flex-col justify-between selection:bg-[#00D9FF] selection:text-[#050505]"
      style={{ isolation: 'isolate' }}
    >
      {/* =========================================================================
          LAYER 01: FULL-SCREEN CINEMATIC BACKGROUND IMAGE
          - Sized 15-20% smaller than previous crop, centered vertically.
          - Entire composition visible: face, hair, spectacles, gold chain,
            red blazer, Apple laptop, coffee mug, notebook, pen, plant and desk.
          - No zoom into upper body, no elements extending beyond viewport.
          - 100% natural opacity, crisp and sharp.
          - Shifted slightly right to create visual harmony with the left typography.
         ========================================================================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 flex items-center justify-center lg:justify-end lg:pr-[2vw] xl:pr-[5vw] 2xl:pr-[7vw]">
        <img
          ref={imageRef}
          src="/assets/portraits/hero/hero_cinematic_portrait.jpg"
          alt="S. Jagadeshwar Reddy — Full Stack Developer & AI Enthusiast"
          className="h-[76vh] sm:h-[80vh] lg:h-[84vh] xl:h-[86vh] 2xl:h-[88vh] max-h-[780px] w-auto max-w-full lg:max-w-none object-contain will-change-transform"
          loading="eager"
          fetchPriority="high"
        />

        {/* Subtle Localized Left-Side Gradient to ensure 100% text readability without dimming the subject */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-[85vw] lg:w-[60vw] xl:w-[52vw] bg-gradient-to-r from-[#050505]/95 via-[#050505]/80 sm:via-[#050505]/50 to-transparent pointer-events-none" />

        {/* Subtle Bottom Vignette for smooth transition into Projects section */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent pointer-events-none" />

        {/* Atmospheric Cyan Ambient Glow behind right area */}
        <div className="pointer-events-none absolute top-1/4 right-[12vw] w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#00D9FF]/8 via-[#0284C7]/3 to-transparent blur-3xl" />
      </div>

      {/* =========================================================================
          LAYER 02: EDITORIAL CONTENT STAGE (Positioned on the Left)
          - Introduction, name, role, bio, CTAs and statistics.
          - Kept readable against the background, never overlaps the face.
          - Sagfeild heading font with full descender clearance (no clipped g/y).
          - Glyko Sans body font.
         ========================================================================= */}
      <div 
        ref={contentRef}
        className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 my-auto pt-24 pb-8 sm:pt-28 sm:pb-12"
      >
        <div className="flex flex-col justify-center max-w-[560px] lg:max-w-[600px]">
          
          {/* Eyebrow Headline Badge with Live Pulsing Dot */}
          <div className="hero-eyebrow inline-flex items-center gap-2.5 mb-3 sm:mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00D9FF] shadow-[0_0_12px_#00D9FF] animate-pulse" />
            <span className="text-[10px] sm:text-[11.5px] font-mono font-bold uppercase tracking-[0.24em] text-[#00D9FF]">
              BUILDING IDEAS FOR A SMARTER TOMORROW
            </span>
          </div>

          {/* Primary Name Display with Sagfeild Font & Complete Descender Clearance */}
          <h1 className="hero-name-title font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-[60px] xl:text-[68px] tracking-tight text-[#F5F5F5] leading-[1.12] pb-3 mb-1 overflow-visible">
            S. Jagadeshwar Reddy
          </h1>

          {/* Role Subtitle with Electric Cyan Highlight */}
          <div className="hero-role-subtitle mb-4 sm:mb-5">
            <p className="font-heading font-semibold text-base sm:text-xl lg:text-[22px] text-[#A1A1AA] tracking-tight flex flex-wrap items-center gap-2">
              <span>Full Stack Developer</span>
              <span className="text-white/20">•</span>
              <span className="text-[#00D9FF] drop-shadow-[0_0_12px_rgba(0,217,255,0.4)]">AI Enthusiast</span>
            </p>
          </div>

          {/* Bio Description in Glyko Sans */}
          <p className="hero-bio-text text-[14px] sm:text-[15.5px] text-[#A1A1AA] max-w-[490px] leading-relaxed mb-6 sm:mb-8 font-normal drop-shadow-sm">
            I build modern web applications and AI-driven solutions that solve real-world problems. Passionate about technology, meaningful impact, and continuous learning.
          </p>

          {/* Action CTA Buttons with Magnetic Physics Attraction */}
          <div className="hero-cta-group flex flex-wrap items-center gap-3 sm:gap-4 mb-7 sm:mb-9">
            <MagneticButton
              as="a"
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToId('projects', -60);
              }}
              className="group relative inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 bg-[#F5F5F5] text-[#050505] text-xs sm:text-sm font-bold rounded-full hover:bg-white transition-all shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(0,217,255,0.45)] overflow-hidden border border-white/20 cursor-pointer"
              data-cursor-text="VIEW"
              strength={0.25}
            >
              <span className="relative z-10">View My Work</span>
              <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-1 transition-transform text-[#00D9FF]" />
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-[#00D9FF]/20 to-transparent transition-transform duration-500 ease-out" />
            </MagneticButton>

            <MagneticButton
              as="a"
              href={PERSONAL_INFO.resumePdf}
              download="S_Jagadeshwar_Reddy_Resume.pdf"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-[#0A0A0A]/85 hover:bg-[#141414] backdrop-blur-md text-[#F5F5F5] text-xs sm:text-sm font-semibold rounded-full border border-white/10 hover:border-white/25 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.4)] cursor-pointer group"
              data-cursor-text="RESUME"
              strength={0.2}
            >
              <Download className="w-3.5 h-3.5 text-[#929292] group-hover:text-[#00D9FF] transition-colors" />
              <span>Download Resume</span>
            </MagneticButton>
          </div>

          {/* Refined Key Metrics HUD & Professional Availability */}
          <div className="hero-metrics-bar pt-5 border-t border-white/[0.08] flex flex-wrap items-center gap-6 sm:gap-8">
            <div>
              <div className="font-heading font-black text-2xl sm:text-3xl text-[#F5F5F5] leading-none">
                05
              </div>
              <div className="text-[10.5px] text-[#929292] font-mono uppercase tracking-wider mt-1">
                Projects
              </div>
            </div>

            <div className="h-7 w-px bg-white/10" />

            <div>
              <div className="font-heading font-black text-2xl sm:text-3xl text-[#F5F5F5] leading-none">
                30+
              </div>
              <div className="text-[10.5px] text-[#929292] font-mono uppercase tracking-wider mt-1">
                Core Skills
              </div>
            </div>

            <div className="h-7 w-px bg-white/10" />

            <div>
              <div className="font-heading font-black text-2xl sm:text-3xl text-[#F5F5F5] leading-none">
                12
              </div>
              <div className="text-[10.5px] text-[#929292] font-mono uppercase tracking-wider mt-1">
                Certifications
              </div>
            </div>

            <div className="hidden sm:block h-7 w-px bg-white/10" />

            {/* Subtle Live Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A0A0A]/80 backdrop-blur-md border border-white/10 text-[10.5px] font-mono text-[#00D9FF]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-ping" />
              <span>Available for Roles</span>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          LAYER 03: MINIMAL BOTTOM SCROLL INDICATOR
         ========================================================================= */}
      <div 
        ref={scrollIndicatorRef}
        className="relative z-10 w-full flex justify-center pb-5 pointer-events-none"
      >
        <button
          type="button"
          onClick={() => scrollToId('projects', -60)}
          className="pointer-events-auto inline-flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity cursor-pointer group"
          data-cursor-text="SCROLL"
          aria-label="Scroll to Projects"
        >
          <span className="text-[9px] font-mono tracking-[0.28em] text-[#929292] uppercase group-hover:text-[#00D9FF] transition-colors">
            SCROLL TO EXPLORE
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-[#00D9FF] animate-bounce" />
        </button>
      </div>

    </section>
  );
};
