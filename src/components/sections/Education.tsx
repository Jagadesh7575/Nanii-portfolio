import React, { useRef } from 'react';
import { EDUCATION } from '../../data/portfolioData';
import { Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion } from '../../styles/motion';
import { TiltCard } from '../ui/TiltCard';
import { MaskedTextReveal } from '../ui/MaskedTextReveal';

gsap.registerPlugin(ScrollTrigger);

export const Education: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const sec = sectionRef.current;
    if (!sec) return;

    // Header reveal with smooth cinematic easing
    gsap.fromTo(sec.querySelectorAll('.edu-header-item'),
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

    // Milestone cards staggered cascade reveal
    gsap.fromTo(sec.querySelectorAll('.edu-card-item'),
      { y: 55, opacity: 0, scale: 0.94 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.14,
        ease: "power3.out",
        force3D: true,
        scrollTrigger: {
          trigger: sec,
          start: "top 80%",
          toggleActions: "play reverse play reverse"
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="education" ref={sectionRef} className="py-24 bg-[#050505] border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="edu-header-container max-w-2xl mb-16">
          <div className="edu-header-item inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00D9FF] shadow-[0_0_8px_#00D9FF] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#00D9FF] font-mono">
              ACADEMIC BACKGROUND
            </span>
          </div>
          <MaskedTextReveal
            as="h2"
            text="Education Milestones"
            italicWords={["Milestones"]}
            className="font-heading font-black text-3xl sm:text-5xl text-[#F5F5F5] tracking-tight mb-4 leading-tight"
          />
          <p className="edu-header-item text-base sm:text-lg text-[#929292] leading-relaxed">
            Formal engineering education and technical foundations supporting continuous growth.
          </p>
        </div>

        {/* 3 Education Milestone Cards */}
        <div className="edu-cards-container space-y-6">
          {EDUCATION.map((edu, idx) => (
            <div key={idx} className="edu-card-item">
              <TiltCard maxTilt={3} perspective={1400} className="rounded-card">
                <div
                  className="bg-[#0A0A0A] hover:bg-[#111111] rounded-card p-6 sm:p-8 border border-white/10 hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] transition-all duration-300 grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                  data-cursor-text="EDU"
                >
                  {/* Year & Period Column */}
                  <div className="md:col-span-3 flex md:flex-col items-center md:items-start justify-between border-b md:border-b-0 md:border-r border-white/10 pb-3 md:pb-0 md:pr-6">
                    <span className="font-mono text-sm font-bold text-[#F5F5F5]">
                      {edu.period}
                    </span>
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-[#141414] border border-white/10 text-[11px] font-semibold text-[#929292]">
                      {edu.status}
                    </span>
                  </div>

                  {/* Institution and Degree Details */}
                  <div className="md:col-span-9">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#F5F5F5]">
                        {edu.degree}
                      </h3>
                      {edu.grade && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 bg-[#00D9FF] text-[#050505] rounded-full shrink-0 shadow-[0_0_12px_rgba(0,217,255,0.4)]">
                          <Award className="w-3.5 h-3.5" />
                          <span>{edu.grade}</span>
                        </span>
                      )}
                    </div>

                    <div className="text-sm font-medium text-[#8E94A0] mb-3">
                      {edu.institution} {edu.focus && `• Focus: ${edu.focus}`}
                    </div>

                    <ul className="space-y-1">
                      {edu.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF]/60 mt-2 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
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
