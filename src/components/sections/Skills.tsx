import React, { useRef } from 'react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { Layers, Terminal, Database, Cpu, Wrench, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion } from '../../styles/motion';
import { TiltCard } from '../ui/TiltCard';
import { MaskedTextReveal } from '../ui/MaskedTextReveal';

gsap.registerPlugin(ScrollTrigger);

export const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Programming Languages':
        return <Terminal className="w-5 h-5 text-[#00D2FF]" />;
      case 'Frontend Development':
        return <Layers className="w-5 h-5 text-[#00D2FF]" />;
      case 'Backend & Databases':
        return <Database className="w-5 h-5 text-[#00D2FF]" />;
      case 'Tools & Platforms':
        return <Wrench className="w-5 h-5 text-[#00D2FF]" />;
      case 'AI & Innovation Workflows':
        return <Cpu className="w-5 h-5 text-[#00D2FF]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#00D2FF]" />;
    }
  };

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const sec = sectionRef.current;
    if (!sec) return;

    // Header reveal with smooth cinematic easing
    gsap.fromTo(sec.querySelectorAll('.skills-header-item'),
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

    // 6 Category cards staggered 3D wave entrance
    gsap.fromTo(sec.querySelectorAll('.skill-card-item'),
      { y: 55, opacity: 0, scale: 0.93 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: sec,
          start: "top 80%",
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // Individual skill pill badges micro-pop wave
    gsap.fromTo(sec.querySelectorAll('.skill-pill-badge'),
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.02,
        delay: 0.2,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: sec,
          start: "top 75%",
          toggleActions: "play reverse play reverse"
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="skills" ref={sectionRef} className="py-24 bg-[#050505] border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="skills-header-container max-w-2xl mb-16">
          <div className="skills-header-item inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00D9FF] shadow-[0_0_8px_#00D9FF] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#00D9FF] font-mono">
              TECHNICAL EXPERTISE
            </span>
          </div>
          <MaskedTextReveal
            as="h2"
            text="Skills & Modern Tooling"
            italicWords={["Modern", "Tooling"]}
            className="font-heading font-black text-3xl sm:text-5xl text-[#F5F5F5] tracking-tight mb-4 leading-tight"
          />
          <p className="skills-header-item text-base sm:text-lg text-[#929292] leading-relaxed">
            A comprehensive, verified suite of programming languages, frontend systems, cloud databases, and AI workflows.
          </p>
        </div>

        {/* 6 Category Cards Grid with 3D Tilt */}
        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div key={idx} className="skill-card-item">
              <TiltCard maxTilt={5} perspective={1000} className="h-full rounded-card">
                <div
                  className="group bg-[#0A0A0A] rounded-card p-6 sm:p-7 border border-white/10 hover:border-white/25 hover:bg-[#111111] hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] transition-all duration-300 flex flex-col justify-between h-full"
                  data-cursor-text="SKILL"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#141414] border border-white/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-xs">
                        {getCategoryIcon(cat.category)}
                      </div>
                      <span className="font-mono text-xs font-bold text-[#666666]">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-xl text-[#F5F5F5] mb-1.5">
                      {cat.category}
                    </h3>
                    <p className="text-xs text-[#929292] mb-6 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Skill Tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.08]">
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="skill-pill-badge px-3 py-1.5 rounded-lg bg-[#141414] hover:bg-[#F5F5F5] hover:text-[#050505] text-xs font-medium text-[#A1A1AA] border border-white/10 transition-all duration-200 transform hover:-translate-y-0.5 cursor-default"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
