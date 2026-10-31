import React, { useRef } from 'react';
import { ArrowRight, Download, MousePointer, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { prefersReducedMotion } from '../../styles/motion';
import { scrollToId } from '../layout/ScrollProgress';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const hero = heroRef.current;
    const content = contentRef.current;
    const portrait = portraitRef.current;
    const nameEl = nameRef.current;
    if (!hero || !content || !portrait || !nameEl) return;

    // Timeline for initial hero entrance
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Eyebrow badge entrance
    tl.fromTo(content.querySelectorAll('.hero-eyebrow'),
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, clearProps: "all", delay: 0.05 }
    );

    // Main name heading entrance with full descender clearance
    tl.fromTo(nameEl,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, clearProps: "all" },
      "-=0.2"
    );

    // Subtitle entrance
    tl.fromTo(content.querySelector('.hero-subtitle'),
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, clearProps: "all" },
      "-=0.3"
    );

    // Description, CTA buttons and metrics entrance
    tl.fromTo(content.querySelectorAll('.hero-fade-up'), 
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, clearProps: "all" },
      "-=0.3"
    );

    // Hero portrait fade + smooth zoom-in
    tl.fromTo(portrait, 
      { opacity: 0, scale: 1.04 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }, 
      "-=0.5"
    );

    // Scroll-linked smooth parallax
    gsap.to(portrait, {
      yPercent: 12,
      scale: 1.03,
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
      className="relative w-full overflow-hidden bg-[#FAFAFA] pt-[84px] pb-10 flex flex-col justify-between"
      style={{
        minHeight: '580px',
        height: 'clamp(580px, 75svh, 750px)',
        isolation: 'isolate',
      }}
    >
      {/* Background Decorative Metallic Grid & Ambient Ring */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03] z-0" 
        style={{
          backgroundImage: 'radial-gradient(#111216 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }}
      />
      <div className="pointer-events-none absolute top-12 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#00B4D8]/5 via-[#0284C7]/5 to-transparent blur-3xl -z-10" />

      {/* Right-Side Cinematic Chrome Composition with Jagadeshwar in Red Blazer */}
      <div 
        ref={portraitRef}
        className="absolute top-0 right-0 h-full w-full lg:w-[62%] pointer-events-none select-none z-0 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.08) 8%, rgba(0,0,0,0.9) 22%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.08) 8%, rgba(0,0,0,0.9) 22%, black 100%)',
        }}
      >
        <img
          src="/assets/portraits/hero/hero_master_red_blazer.png"
          alt="S. Jagadeshwar Reddy - Cinematic Editorial Portrait"
          className="w-full h-full object-cover object-[center_bottom] lg:object-[right_bottom]"
          loading="eager"
        />
      </div>

      {/* Main Content Container */}
      <div 
        ref={contentRef}
        className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 w-full my-auto grid grid-cols-1 lg:grid-cols-12 items-center"
      >
        {/* Left Column (Content Stage) */}
        <div className="lg:col-span-7 xl:col-span-6 flex flex-col justify-center">
          
          {/* Eyebrow Badge with Specular Dot */}
          <div className="hero-eyebrow inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-gradient-to-tr from-[#00B4D8] via-gray-200 to-white shadow-xs ring-1 ring-black/20 animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#616670] font-mono">
              BUILDING IDEAS FOR A SMARTER TOMORROW
            </span>
          </div>

          {/* Main Name Heading with Generous Line-Height & Descender Clearance */}
          <h1 
            ref={nameRef}
            className="font-heading font-black text-3xl sm:text-4xl md:text-[44px] lg:text-[48px] xl:text-[56px] 2xl:text-[62px] tracking-tight text-[#111216] leading-[1.2] pb-2 mb-1 overflow-visible"
          >
            S. Jagadeshwar Reddy
          </h1>

          {/* Subtitle */}
          <div className="mb-3">
            <h2 className="hero-subtitle font-heading font-semibold text-lg sm:text-xl lg:text-[23px] text-[#616670] tracking-tight">
              Full Stack Developer & AI Enthusiast
            </h2>
          </div>

          {/* Bio Description */}
          <p className="hero-fade-up text-[14px] sm:text-[15px] text-[#616670] max-w-[460px] leading-relaxed mb-6 font-normal">
            I build modern web applications and AI-driven solutions that solve real-world problems. Passionate about technology, meaningful impact, and continuous learning.
          </p>

          {/* Action CTA Buttons */}
          <div className="hero-fade-up flex flex-wrap items-center gap-3.5 mb-7">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToId('projects');
              }}
              className="group relative inline-flex items-center gap-2.5 px-6 py-2.5 bg-[#111216] text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-black transition-all shadow-sm hover:gap-3 overflow-hidden"
              data-cursor-text="VIEW"
            >
              <span className="relative z-10">View My Work</span>
              <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-0.5 transition-transform text-[#00D2FF]" />
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-[#00B4D8]/30 to-transparent transition-transform duration-500 ease-out" />
            </a>

            <a
              href={PERSONAL_INFO.resumePdf}
              download="S_Jagadeshwar_Reddy_Resume.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#111216] text-xs sm:text-sm font-semibold rounded-full border border-silver-light hover:border-[#25282F] hover:bg-[#F8F9FA] transition-all shadow-xs"
              data-cursor-text="RESUME"
            >
              <Download className="w-3.5 h-3.5 text-[#616670]" />
              <span>Download Resume</span>
            </a>
          </div>

          {/* Compact Bottom Statistics Row */}
          <div className="hero-fade-up flex items-center gap-4 sm:gap-6 pt-4 border-t border-silver-light/80 text-left">
            <div>
              <div className="font-heading font-extrabold text-xl sm:text-2xl text-[#111216] leading-none">
                5+
              </div>
              <div className="text-[11px] text-[#7B818C] font-medium uppercase tracking-wider mt-1">
                Projects
              </div>
            </div>

            <div className="h-6 w-px bg-silver-light" />

            <div>
              <div className="font-heading font-extrabold text-xl sm:text-2xl text-[#111216] leading-none">
                12
              </div>
              <div className="text-[11px] text-[#7B818C] font-medium uppercase tracking-wider mt-1">
                Certifications
              </div>
            </div>

            <div className="h-6 w-px bg-silver-light" />

            <div>
              <div className="font-heading font-extrabold text-xl sm:text-2xl text-[#111216] leading-none">
                Full Stack
              </div>
              <div className="text-[11px] text-[#7B818C] font-medium uppercase tracking-wider mt-1">
                Development
              </div>
            </div>

            <div className="h-6 w-px bg-silver-light" />

            <div>
              <div className="font-heading font-extrabold text-xl sm:text-2xl text-[#111216] leading-none flex items-center gap-1">
                <span>AI</span>
                <Sparkles className="w-3 h-3 text-[#0096C7]" />
              </div>
              <div className="text-[11px] text-[#7B818C] font-medium uppercase tracking-wider mt-1">
                Driven Solutions
              </div>
            </div>
          </div>
        </div>

        {/* Right side spacer for desktop layout balance */}
        <div className="hidden lg:block lg:col-span-5 xl:col-span-6 h-full relative" />
      </div>

      {/* Far Right Section Index Pill (01..04) */}
      <div className="hidden xl:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col items-center gap-3 z-20 text-[10px] font-mono tracking-widest text-[#7B818C]/70">
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); scrollToId('home'); }} 
          className="text-black font-bold hover:text-black transition-colors"
        >
          01
        </a>
        <div className="w-px h-3 bg-black/20" />
        <a 
          href="#projects" 
          onClick={(e) => { e.preventDefault(); scrollToId('projects'); }} 
          className="hover:text-black transition-colors"
        >
          02
        </a>
        <div className="w-px h-3 bg-black/20" />
        <a 
          href="#about" 
          onClick={(e) => { e.preventDefault(); scrollToId('about'); }} 
          className="hover:text-black transition-colors"
        >
          03
        </a>
        <div className="w-px h-3 bg-black/20" />
        <a 
          href="#contact" 
          onClick={(e) => { e.preventDefault(); scrollToId('contact'); }} 
          className="hover:text-black transition-colors"
        >
          04
        </a>
      </div>

      {/* Bottom Center Scroll Pill */}
      <div className="relative z-20 flex justify-center -mb-1">
        <a
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            scrollToId('projects');
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-silver-light bg-white/90 backdrop-blur-sm text-[10px] font-mono uppercase tracking-widest text-[#616670] hover:text-[#111216] hover:border-[#111216] transition-all shadow-xs"
          data-cursor-text="SCROLL"
        >
          <MousePointer className="w-2.5 h-2.5 animate-bounce text-[#0096C7]" />
          <span>SCROLL DOWN</span>
        </a>
      </div>
    </section>
  );
};