import React, { useRef } from 'react';
import { Code2, BrainCircuit, Users2, Rocket, Infinity as InfinityIcon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion } from '../../styles/motion';
import { MaskedTextReveal } from '../ui/MaskedTextReveal';

gsap.registerPlugin(ScrollTrigger);

export const PhilosophyBanner: React.FC = () => {
  const bannerRef = useRef<HTMLElement>(null);

  const pillars = [
    {
      icon: Code2,
      title: "Clean Code",
      subtitle: "Scalable & Maintainable Solutions"
    },
    {
      icon: BrainCircuit,
      title: "AI Driven",
      subtitle: "Solving Real World Problems"
    },
    {
      icon: Users2,
      title: "User Focused",
      subtitle: "Human Centered Design"
    },
    {
      icon: Rocket,
      title: "Continuous Growth",
      subtitle: "Always Learning New Technologies"
    }
  ];

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const banner = bannerRef.current;
    if (!banner) return;

    // Heading entrance reveal with smooth easing
    const headingBlock = banner.querySelector('.philosophy-heading-block');
    if (headingBlock) {
      gsap.fromTo(headingBlock,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: banner,
            start: "top 85%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
    }

    // 4 Architectural Pillar items reveal in an elegant staggered wave
    gsap.fromTo(banner.querySelectorAll('.pillar-item'),
      { y: 40, opacity: 0, scale: 0.94 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: banner,
          start: "top 82%",
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // Staggered vertical divider line reveal
    gsap.fromTo(banner.querySelectorAll('.pillar-divider'),
      { scaleY: 0, opacity: 0 },
      {
        scaleY: 1,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: banner,
          start: "top 80%",
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // Continuous scroll parallax on background decorative metallic ring
    const ring = banner.querySelector('.philosophy-ring');
    if (ring) {
      gsap.to(ring, {
        yPercent: -20,
        rotation: 15,
        ease: "none",
        scrollTrigger: {
          trigger: banner,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5
        }
      });
    }
  }, { scope: bannerRef });

  return (
    <section
      ref={bannerRef}
      className="relative bg-[#0A0A0A] text-[#F5F5F5] py-10 sm:py-12 overflow-hidden border-t border-b border-white/[0.08]"
    >
      {/* Background Chrome Ring Gradient Arcs on the Right */}
      <div className="philosophy-ring absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none select-none will-change-transform">
        <div className="w-[450px] h-[450px] rounded-full border-[36px] border-[#B9BDC4]/20 blur-[1px] translate-x-1/3 translate-y-1/4" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">

        {/* Left: Eyebrow + Heading */}
        <div className="philosophy-heading-block shrink-0 lg:max-w-xs">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] shadow-[0_0_8px_#00D9FF] animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#00D9FF]">
              WHY I BUILD
            </span>
          </div>
          <MaskedTextReveal
            as="h2"
            text="Technology for a Better Tomorrow."
            italicWords={["Better", "Tomorrow."]}
            className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F5F5F5] tracking-tight leading-[1.15]"
          />
        </div>

        {/* Center: 4 Architectural Pillars with Vertical Dividers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 flex-1 lg:px-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="pillar-item group/pillar flex items-start gap-3.5 relative p-2.5 rounded-xl hover:bg-white/[0.04] transition-colors duration-300"
              >
                {/* Thin vertical separator between items on desktop */}
                {idx > 0 && (
                  <div className="pillar-divider hidden lg:block absolute -left-3 top-2 bottom-2 w-px bg-white/10 origin-top" />
                )}

                <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white shrink-0 group-hover/pillar:border-[#00D2FF]/50 group-hover/pillar:bg-[#00D2FF]/10 group-hover/pillar:scale-110 transition-all duration-300 shadow-xs">
                  <Icon className="w-4 h-4 text-white group-hover/pillar:text-[#00D2FF] transition-colors" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-white tracking-tight group-hover/pillar:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-[#7B818C] leading-snug mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Ideas Code Impact Infinity */}
        <div className="pillar-item shrink-0 hidden xl:flex flex-col items-end text-[10px] font-mono text-[#7B818C] tracking-[0.25em] uppercase leading-relaxed pl-4 border-l border-white/10">
          <span>IDEAS</span>
          <span>CODE</span>
          <span>IMPACT</span>
          <div className="mt-1 text-white">
            <InfinityIcon className="w-4 h-4 inline" />
          </div>
        </div>

      </div>
    </section>
  );
};
