import React, { useRef } from 'react';
import { EDUCATION } from '../../data/portfolioData';
import { Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion } from '../../styles/motion';
import { TiltCard } from '../ui/TiltCard';

gsap.registerPlugin(ScrollTrigger);

export const Education: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const sec = sectionRef.current;
    if (!sec) return;

    // Header reveal with continuous scrub
    gsap.fromTo(sec.querySelectorAll('.edu-header-item'),
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

    // Milestone cards scroll-linked progressive scrub
    gsap.fromTo(sec.querySelectorAll('.edu-card-item'),
      { y: 45, opacity: 0.2 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
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
    <section id="education" ref={sectionRef} className="py-24 bg-foundation-pearl relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="edu-header-container max-w-2xl mb-16">
          <div className="edu-header-item inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-black" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-editorial-subtle font-mono">
              ACADEMIC BACKGROUND
            </span>
          </div>
          <h2 className="edu-header-item font-heading font-extrabold text-3xl sm:text-5xl text-editorial-heading tracking-tight mb-4">
            Education Milestones
          </h2>
          <p className="edu-header-item text-base sm:text-lg text-editorial-body leading-relaxed">
            Formal engineering education and technical foundations supporting continuous growth.
          </p>
        </div>

        {/* 3 Education Milestone Cards */}
        <div className="edu-cards-container space-y-6">
          {EDUCATION.map((edu, idx) => (
            <div key={idx} className="edu-card-item">
              <TiltCard maxTilt={3} perspective={1400} className="rounded-card">
                <div
                  className="bg-white rounded-card p-6 sm:p-8 border border-silver-light hover:border-black/30 hover:shadow-elevated transition-all duration-300 grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                  data-cursor-text="EDU"
                >
                  {/* Year & Period Column */}
                  <div className="md:col-span-3 flex md:flex-col items-center md:items-start justify-between border-b md:border-b-0 md:border-r border-silver-light/60 pb-3 md:pb-0 md:pr-6">
                    <span className="font-mono text-sm font-bold text-editorial-heading">
                      {edu.period}
                    </span>
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-foundation-cloud text-[11px] font-semibold text-editorial-body">
                      {edu.status}
                    </span>
                  </div>

                  {/* Institution and Degree Details */}
                  <div className="md:col-span-9">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h3 className="font-heading font-bold text-xl sm:text-2xl text-editorial-heading">
                        {edu.degree}
                      </h3>
                      {edu.grade && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 bg-black text-white rounded-full shrink-0">
                          <Award className="w-3.5 h-3.5" />
                          <span>{edu.grade}</span>
                        </span>
                      )}
                    </div>

                    <div className="text-sm font-medium text-editorial-body mb-3">
                      {edu.institution} {edu.focus && `• Focus: ${edu.focus}`}
                    </div>

                    <ul className="space-y-1">
                      {edu.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="text-xs sm:text-sm text-editorial-body leading-relaxed flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-silver-steel mt-2 shrink-0" />
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
