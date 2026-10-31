import React, { useRef } from 'react';
import { Code2, BrainCircuit, Users2, Rocket, Infinity as InfinityIcon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion } from '../../styles/motion';

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

    // Scroll-linked continuous pillar items reveal
    gsap.fromTo(banner.querySelectorAll('.pillar-item'),
      { y: 35, opacity: 0.2 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        ease: "power1.out",
        scrollTrigger: {
          trigger: banner,
          start: "top 88%",
          end: "top 45%",
          scrub: 0.6
        }
      }
    );

    // Subtle parallax on decorative chrome ring
    const ring = banner.querySelector('.philosophy-ring');
    if (ring) {
      gsap.to(ring, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: banner,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6
        }
      });
    }
  }, { scope: bannerRef });

  return (
    <section 
      ref={bannerRef}
      className="relative bg-[#101114] text-white py-8 sm:py-10 overflow-hidden border-t border-white/10"
    >
      {/* Background Chrome Ring Gradient Arcs on the Right */}
      <div className="philosophy-ring absolute right-0 top-0 bottom-0 w-1/3 opacity-25 pointer-events-none select-none will-change-transform">
        <div className="w-[450px] h-[450px] rounded-full border-[36px] border-[#B9BDC4]/25 blur-[1px] translate-x-1/3 translate-y-1/4" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        
        {/* Left: Eyebrow + Heading */}
        <div className="shrink-0 lg:max-w-xs pillar-item">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-tr from-gray-400 to-white" />
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#7B818C]">
              WHY I BUILD
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-[1.15]">
            Technology<br />for a Better Tomorrow.
          </h2>
        </div>

        {/* Center: 4 Architectural Pillars with Vertical Dividers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 flex-1 lg:px-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="pillar-item flex items-start gap-3.5 relative"
              >
                {/* Thin vertical separator between items on desktop */}
                {idx > 0 && (
                  <div className="hidden lg:block absolute -left-3 top-2 bottom-2 w-px bg-white/10" />
                )}
                
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-white shrink-0">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-white tracking-tight">
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
