import React, { useRef } from 'react';
import { Target, Compass, Sparkles, Building2, GraduationCap } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { prefersReducedMotion } from '../../styles/motion';
import { TiltCard } from '../ui/TiltCard';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const sec = sectionRef.current;
    if (!sec) return;

    // Header reveal with scroll-driven scrub
    gsap.fromTo(sec.querySelectorAll('.about-header-item'),
      { y: 30, opacity: 0.2 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        ease: "power1.out",
        scrollTrigger: {
          trigger: sec,
          start: "top 90%",
          end: "top 60%",
          scrub: 0.6
        }
      }
    );

    // Portrait card reveal
    gsap.fromTo(sec.querySelector('.about-portrait-card'),
      { y: 60, opacity: 0.3 },
      {
        y: 0,
        opacity: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: sec,
          start: "top 85%",
          end: "top 45%",
          scrub: 0.7
        }
      }
    );

    // Continuous scroll parallax on standing portrait
    const portraitImg = sec.querySelector('.about-portrait-card img');
    if (portraitImg) {
      gsap.fromTo(portraitImg,
        { yPercent: 10 },
        {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: sec,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6
          }
        }
      );
    }

    // Content items reveal
    gsap.fromTo(sec.querySelectorAll('.about-content-item'),
      { y: 25, opacity: 0.2 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        ease: "power1.out",
        scrollTrigger: {
          trigger: sec,
          start: "top 80%",
          end: "top 40%",
          scrub: 0.6
        }
      }
    );

    // Value cards staggered entrance
    gsap.fromTo(sec.querySelectorAll('.about-driver-card'),
      { y: 35, opacity: 0.2 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: sec,
          start: "top 70%",
          end: "top 30%",
          scrub: 0.7
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* Section Header */}
        <div className="about-header-container max-w-2xl mb-16">
          <div className="about-header-item inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-black" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-editorial-subtle font-mono">
              ABOUT ME
            </span>
          </div>
          <h2 className="about-header-item font-heading font-extrabold text-3xl sm:text-5xl text-editorial-heading tracking-tight mb-4">
            From Curiosity to a Bigger Purpose.
          </h2>
          <p className="about-header-item text-base sm:text-lg text-editorial-body leading-relaxed">
            Bridging software engineering discipline with artificial intelligence to architect systems that are practical, durable, and human-centered.
          </p>
        </div>

        {/* 2-Column Editorial Grid */}
        <div className="about-grid grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Authentic Standing Portrait with TiltCard */}
          <div className="about-portrait-card lg:col-span-5 relative flex justify-center">
            <TiltCard maxTilt={6} perspective={1100} className="w-full max-w-[360px] sm:max-w-[400px]">
              <div className="relative w-full" data-cursor-text="ABOUT">
                {/* Subtle architectural frame */}
                <div className="absolute inset-0 bg-foundation-pearl rounded-panel transform -rotate-2 border border-silver-light/80 -z-10" />
                <div className="relative rounded-panel overflow-hidden bg-foundation-cloud border border-silver-light shadow-ambient p-4">
                  <img
                    src="/assets/portraits/supporting/portrait_standing_cutout.png"
                    alt="S. Jagadeshwar Reddy"
                    className="w-full h-auto object-contain filter contrast-[1.03]"
                    loading="lazy"
                  />
                </div>

                {/* Verified Education Floating Card */}
                <div className="absolute -bottom-6 -right-4 glass-card-light rounded-card p-4 shadow-elevated border border-silver-light max-w-[220px] backdrop-blur-md">
                  <div className="flex items-center gap-2 mb-1">
                    <GraduationCap className="w-4 h-4 text-editorial-heading" />
                    <span className="text-xs font-bold text-editorial-heading">B.Tech IT</span>
                  </div>
                  <p className="text-[11px] text-editorial-body leading-tight">
                    NRI Institute of Technology (2024–2028) • CGPA 8.20
                  </p>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-7 flex flex-col justify-center">

            <h3 className="about-content-item font-heading font-bold text-2xl text-editorial-heading mb-4">
              {PERSONAL_INFO.aboutIntro}
            </h3>

            <p className="about-content-item text-sm sm:text-base text-editorial-body leading-relaxed mb-6">
              {PERSONAL_INFO.aboutStory}
            </p>

            {/* Entrepreneurial Vision Quote Banner */}
            <div className="about-content-item p-6 rounded-card bg-foundation-pearl border-l-4 border-black mb-8">
              <div className="flex items-center gap-2 mb-2 text-editorial-heading">
                <Building2 className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">
                  ENTREPRENEURIAL VISION
                </span>
              </div>
              <p className="font-heading font-semibold text-base sm:text-lg text-editorial-heading leading-snug">
                "{PERSONAL_INFO.ambition}"
              </p>
            </div>

            {/* 3 Core Drivers */}
            <div className="about-drivers-grid grid grid-cols-1 sm:grid-cols-3 gap-4">
              <TiltCard maxTilt={6} perspective={900}>
                <div className="about-driver-card p-4 rounded-xl border border-silver-light/70 bg-white hover:border-black/30 hover:shadow-card transition-all h-full">
                  <div className="w-8 h-8 rounded-lg bg-foundation-cloud flex items-center justify-center mb-3">
                    <Target className="w-4 h-4 text-editorial-heading" />
                  </div>
                  <h4 className="font-heading font-bold text-sm text-editorial-heading mb-1">
                    Product Focus
                  </h4>
                  <p className="text-xs text-editorial-body leading-relaxed">
                    Building software that solves tangible, verified problems rather than chasing hype.
                  </p>
                </div>
              </TiltCard>

              <TiltCard maxTilt={6} perspective={900}>
                <div className="about-driver-card p-4 rounded-xl border border-silver-light/70 bg-white hover:border-black/30 hover:shadow-card transition-all h-full">
                  <div className="w-8 h-8 rounded-lg bg-foundation-cloud flex items-center justify-center mb-3">
                    <Sparkles className="w-4 h-4 text-editorial-heading" />
                  </div>
                  <h4 className="font-heading font-bold text-sm text-editorial-heading mb-1">
                    AI Integration
                  </h4>
                  <p className="text-xs text-editorial-body leading-relaxed">
                    Leveraging modern AI pipelines to automate complex workflows and empower end users.
                  </p>
                </div>
              </TiltCard>

              <TiltCard maxTilt={6} perspective={900}>
                <div className="about-driver-card p-4 rounded-xl border border-silver-light/70 bg-white hover:border-black/30 hover:shadow-card transition-all h-full">
                  <div className="w-8 h-8 rounded-lg bg-foundation-cloud flex items-center justify-center mb-3">
                    <Compass className="w-4 h-4 text-editorial-heading" />
                  </div>
                  <h4 className="font-heading font-bold text-sm text-editorial-heading mb-1">
                    Craftsmanship
                  </h4>
                  <p className="text-xs text-editorial-body leading-relaxed">
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
