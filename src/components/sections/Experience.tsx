import React, { useRef } from 'react';
import { EXPERIENCES } from '../../data/portfolioData';
import { CheckCircle2, Clock, FileText } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion } from '../../styles/motion';
import { TiltCard } from '../ui/TiltCard';

gsap.registerPlugin(ScrollTrigger);

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const sec = sectionRef.current;
    if (!sec) return;

    // Header reveal
    gsap.fromTo(sec.querySelectorAll('.exp-header-item'),
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sec,
          start: "top 90%",
          once: true
        }
      }
    );

    // Dynamic timeline scroll line progress
    const progressLine = sec.querySelector('.exp-progress-line');
    if (progressLine) {
      gsap.fromTo(progressLine,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: sec.querySelector('.exp-timeline-container'),
            start: "top 80%",
            end: "bottom 65%",
            scrub: 0.4
          }
        }
      );
    }

    // Timeline cards reveal
    gsap.fromTo(sec.querySelectorAll('.exp-timeline-card'),
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: sec,
          start: "top 85%",
          once: true
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section id="experience" ref={sectionRef} className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="exp-header-container max-w-2xl mb-16">
          <div className="exp-header-item inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-black" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-editorial-subtle font-mono">
              WORK & INTERNSHIPS
            </span>
          </div>
          <h2 className="exp-header-item font-heading font-extrabold text-3xl sm:text-5xl text-editorial-heading tracking-tight mb-4">
            My Journey — Experience & Growth
          </h2>
          <p className="exp-header-item text-base sm:text-lg text-editorial-body leading-relaxed">
            Hands-on internships and technical contributions documenting real software development practices.
          </p>
        </div>

        {/* Vertical Timeline Structure with Dynamic Scroll Line */}
        <div className="exp-timeline-container relative pl-6 sm:pl-10 ml-2 sm:ml-4 space-y-12">
          {/* Static track line */}
          <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-[#E5E7EB]" />
          
          {/* Dynamic animated progress line */}
          <div className="exp-progress-line absolute left-0 top-3 bottom-3 w-[2px] bg-black origin-top will-change-transform" />

          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="exp-timeline-card relative group">
              
              {/* Timeline Indicator Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-black group-hover:scale-125 transition-transform z-10" />

              {/* 3D Perspective Card Container */}
              <TiltCard maxTilt={4} perspective={1200} className="rounded-card">
                <div 
                  className="bg-foundation-pearl/80 hover:bg-white rounded-card p-6 sm:p-8 border border-silver-light hover:border-black/30 hover:shadow-elevated transition-all duration-300"
                  data-cursor-text="EXP"
                >
                  
                  {/* Header Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-heading font-bold text-xl sm:text-2xl text-editorial-heading">
                          {exp.company}
                        </h3>
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold ${
                            exp.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {exp.status === 'Completed' ? (
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          ) : (
                            <Clock className="w-3.5 h-3.5" />
                          )}
                          <span>{exp.status}</span>
                        </span>
                      </div>

                      <div className="text-sm font-semibold text-editorial-body mt-1">
                        {exp.role} {exp.duration && `• ${exp.duration}`}
                      </div>
                    </div>

                    <div className="text-xs font-mono font-medium text-editorial-subtle">
                      {exp.period}
                    </div>
                  </div>

                  {/* Description Bullets */}
                  <ul className="space-y-2 mb-6">
                    {exp.description.map((desc, dIdx) => (
                      <li key={dIdx} className="text-xs sm:text-sm text-editorial-body leading-relaxed flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-silver-steel mt-2 shrink-0" />
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Footer with Skills and Certificate Action */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-silver-light/60">
                    <div className="flex flex-wrap gap-1.5">
                      {exp.skills.map((s) => (
                        <span
                          key={s}
                          className="px-2.5 py-1 rounded-md bg-white border border-silver-light text-[11px] font-medium text-editorial-body"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {exp.certificatePdf && (
                      <a
                        href={exp.certificatePdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-editorial-heading hover:text-black underline"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View Completion Certificate</span>
                      </a>
                    )}
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
