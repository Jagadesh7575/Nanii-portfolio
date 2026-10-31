import React, { useRef } from 'react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { Layers, Terminal, Database, Cpu, Wrench, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion } from '../../styles/motion';
import { TiltCard } from '../ui/TiltCard';

gsap.registerPlugin(ScrollTrigger);

export const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Programming Languages':
        return <Terminal className="w-5 h-5 text-editorial-heading" />;
      case 'Frontend Development':
        return <Layers className="w-5 h-5 text-editorial-heading" />;
      case 'Backend & Databases':
        return <Database className="w-5 h-5 text-editorial-heading" />;
      case 'Tools & Platforms':
        return <Wrench className="w-5 h-5 text-editorial-heading" />;
      case 'AI & Innovation Workflows':
        return <Cpu className="w-5 h-5 text-editorial-heading" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-editorial-heading" />;
    }
  };

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const sec = sectionRef.current;
    if (!sec) return;

    // Header reveal with continuous scrub
    gsap.fromTo(sec.querySelectorAll('.skills-header-item'),
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

    // 6 Category cards staggered entrance with scroll-linked scrub
    gsap.fromTo(sec.querySelectorAll('.skill-card-item'),
      { y: 50, opacity: 0.2 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: sec,
          start: "top 80%",
          end: "top 35%",
          scrub: 0.8
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="skills" ref={sectionRef} className="py-24 bg-foundation-pearl relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="skills-header-container max-w-2xl mb-16">
          <div className="skills-header-item inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-black" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-editorial-subtle font-mono">
              TECHNICAL EXPERTISE
            </span>
          </div>
          <h2 className="skills-header-item font-heading font-extrabold text-3xl sm:text-5xl text-editorial-heading tracking-tight mb-4">
            Skills & Modern Tooling
          </h2>
          <p className="skills-header-item text-base sm:text-lg text-editorial-body leading-relaxed">
            A comprehensive, verified suite of programming languages, frontend systems, cloud databases, and AI workflows.
          </p>
        </div>

        {/* 6 Category Cards Grid with 3D Tilt */}
        <div className="skills-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div key={idx} className="skill-card-item">
              <TiltCard maxTilt={5} perspective={1000} className="h-full rounded-card">
                <div
                  className="group bg-white rounded-card p-6 sm:p-7 border border-silver-light hover:border-black/30 hover:shadow-elevated transition-all duration-300 flex flex-col justify-between h-full"
                  data-cursor-text="SKILL"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-foundation-cloud flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-xs">
                        {getCategoryIcon(cat.category)}
                      </div>
                      <span className="font-mono text-xs font-bold text-silver-steel">
                        0{idx + 1}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-xl text-editorial-heading mb-1.5">
                      {cat.category}
                    </h3>
                    <p className="text-xs text-editorial-body mb-6 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Skill Tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-silver-light/60">
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1.5 rounded-lg bg-foundation-cloud hover:bg-black hover:text-white text-xs font-medium text-editorial-heading border border-silver-light/40 transition-all duration-200 transform hover:-translate-y-0.5 cursor-default"
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
