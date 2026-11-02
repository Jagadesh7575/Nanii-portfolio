import React, { useRef } from 'react';
import { Target, Compass, Sparkles, Building2, GraduationCap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { prefersReducedMotion } from '../../styles/motion';
import { TiltCard } from '../ui/TiltCard';
import { MaskedTextReveal } from '../ui/MaskedTextReveal';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const sec = sectionRef.current;
    if (!sec) return;

    // Section Header reveal with smooth cinematic easing
    gsap.fromTo(sec.querySelectorAll('.about-header-item'),
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: sec,
          start: "top 85%",
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // Standing portrait frame reveal from depth
    gsap.fromTo(sec.querySelector('.about-portrait-card'),
      { y: 60, opacity: 0, scale: 0.92 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: sec,
          start: "top 82%",
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // Floating verified education badge pop
    const eduBadge = sec.querySelector('.about-edu-badge');
    if (eduBadge) {
      gsap.fromTo(eduBadge,
        { scale: 0.4, opacity: 0, y: 20 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.75,
          delay: 0.25,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: sec,
            start: "top 78%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
    }

    // Continuous smooth scrub parallax on standing portrait cutout
    const portraitImg = sec.querySelector('.about-portrait-card img');
    if (portraitImg) {
      gsap.fromTo(portraitImg,
        { yPercent: 12 },
        {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: sec,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5
          }
        }
      );
    }

    // Story narrative items reveal
    gsap.fromTo(sec.querySelectorAll('.about-content-item'),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.09,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: sec,
          start: "top 78%",
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // 3 Values & Drivers cards staggered entrance with lateral glide
    gsap.fromTo(sec.querySelectorAll('.about-driver-card'),
      { x: 35, opacity: 0, scale: 0.96 },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: sec,
          start: "top 72%",
          toggleActions: "play reverse play reverse"
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="about" ref={sectionRef} className="py-24 sm:py-32 bg-[#050505] text-[#F5F5F5] relative overflow-hidden border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">

        {/* Section Header */}
        <div className="about-header-container max-w-2xl mb-16 sm:mb-20">
          <div className="about-header-item inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00D9FF] shadow-[0_0_8px_#00D9FF] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-[#00D9FF]">
              ABOUT ME
            </span>
          </div>
          <MaskedTextReveal
            as="h2"
            text="From Curiosity to a Bigger Purpose."
            italicWords={["Bigger", "Purpose."]}
            className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-[#F5F5F5] tracking-tight mb-4 leading-tight"
          />
          <p className="about-header-item text-sm sm:text-base text-[#929292] leading-relaxed font-normal">
            Bridging software engineering discipline with artificial intelligence to architect systems that are practical, durable, and human-centered.
          </p>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="about-grid grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Authentic Standing Portrait with TiltCard */}
          <div className="about-portrait-card lg:col-span-5 relative flex justify-center">
            <TiltCard maxTilt={5} perspective={1100} className="w-full max-w-[360px] sm:max-w-[400px]">
              <div className="relative w-full" data-cursor-text="ABOUT">
                {/* Subtle architectural frame */}
                <div className="absolute inset-0 bg-[#121316] rounded-2xl transform -rotate-2 border border-[#262626] -z-10" />
                <div className="relative rounded-2xl overflow-hidden bg-[#0E0F12] border border-[#262626] shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-4">
                  <img
                    src="/assets/portraits/supporting/portrait_standing_cutout.png"
                    alt="S. Jagadeshwar Reddy"
                    className="w-full h-auto object-contain filter contrast-[1.05]"
                    loading="lazy"
                  />
                </div>

                {/* Verified Education Floating Card */}
                <div className="about-edu-badge absolute -bottom-4 right-1 sm:-bottom-6 sm:-right-4 bg-[#0E0F12]/90 rounded-xl p-3 sm:p-4 shadow-2xl border border-[#262626] max-w-[220px] backdrop-blur-md">
                  <div className="flex items-center gap-2 mb-1">
                    <GraduationCap className="w-4 h-4 text-[#00D2FF]" />
                    <span className="text-xs font-bold text-[#F2F0ED]">B.Tech IT</span>
                  </div>
                  <p className="text-[11px] text-[#8E94A0] leading-tight">
                    NRI Institute of Technology (2024–2028) • CGPA 8.20
                  </p>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-7 flex flex-col justify-center">

            <h3 className="about-content-item font-heading font-bold text-2xl sm:text-3xl text-[#F2F0ED] mb-4">
              {PERSONAL_INFO.aboutIntro}
            </h3>

            <p className="about-content-item text-sm sm:text-base text-[#8E94A0] leading-relaxed mb-6 font-normal">
              {PERSONAL_INFO.aboutStory}
            </p>

            {/* Entrepreneurial Vision Quote Banner */}
            <div className="about-content-item p-6 rounded-xl bg-[#101114] border-l-2 border-[#00D2FF] border-t border-r border-b border-[#22242B] mb-8">
              <div className="flex items-center gap-2 mb-2 text-[#00D2FF]">
                <Building2 className="w-4 h-4" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                  ENTREPRENEURIAL VISION
                </span>
              </div>
              <p className="font-heading font-semibold text-base sm:text-lg text-[#F2F0ED] leading-snug">
                "{PERSONAL_INFO.ambition}"
              </p>
            </div>

            {/* 3 Core Drivers */}
            <div className="about-drivers-grid grid grid-cols-1 sm:grid-cols-3 gap-4">
              <TiltCard maxTilt={5} perspective={900}>
                <div className="about-driver-card p-4 sm:p-5 rounded-xl border border-[#262626] bg-[#101114] hover:border-[#3E424D] hover:bg-[#141519] transition-all h-full">
                  <div className="w-8 h-8 rounded-lg bg-[#16171B] border border-[#262626] flex items-center justify-center mb-3">
                    <Target className="w-4 h-4 text-[#00D2FF]" />
                  </div>
                  <h4 className="font-heading font-bold text-sm text-[#F2F0ED] mb-1">
                    Product Focus
                  </h4>
                  <p className="text-xs text-[#8E94A0] leading-relaxed">
                    Building software that solves tangible, verified problems rather than chasing hype.
                  </p>
                </div>
              </TiltCard>

              <TiltCard maxTilt={5} perspective={900}>
                <div className="about-driver-card p-4 sm:p-5 rounded-xl border border-[#262626] bg-[#101114] hover:border-[#3E424D] hover:bg-[#141519] transition-all h-full">
                  <div className="w-8 h-8 rounded-lg bg-[#16171B] border border-[#262626] flex items-center justify-center mb-3">
                    <Sparkles className="w-4 h-4 text-[#00D2FF]" />
                  </div>
                  <h4 className="font-heading font-bold text-sm text-[#F2F0ED] mb-1">
                    AI Integration
                  </h4>
                  <p className="text-xs text-[#8E94A0] leading-relaxed">
                    Leveraging modern AI pipelines to automate complex workflows and empower end users.
                  </p>
                </div>
              </TiltCard>

              <TiltCard maxTilt={5} perspective={900}>
                <div className="about-driver-card p-4 sm:p-5 rounded-xl border border-[#262626] bg-[#101114] hover:border-[#3E424D] hover:bg-[#141519] transition-all h-full">
                  <div className="w-8 h-8 rounded-lg bg-[#16171B] border border-[#262626] flex items-center justify-center mb-3">
                    <Compass className="w-4 h-4 text-[#00D2FF]" />
                  </div>
                  <h4 className="font-heading font-bold text-sm text-[#F2F0ED] mb-1">
                    Craftsmanship
                  </h4>
                  <p className="text-xs text-[#8E94A0] leading-relaxed">
                    Insisting on rigorous performance, accessible design, and pixel-level precision.
                  </p>
                </div>
              </TiltCard>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
