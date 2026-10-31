import React, { useRef, useState, useEffect } from 'react';
import { EXPERIENCES } from '../../data/portfolioData';
import type { ExperienceItem } from '../../data/portfolioData';
import { CheckCircle2, Clock, FileText, ExternalLink, Download, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion } from '../../styles/motion';
import { TiltCard } from '../ui/TiltCard';

gsap.registerPlugin(ScrollTrigger);

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedExpCert, setSelectedExpCert] = useState<{
    company: string;
    role: string;
    activeTab: number;
    items: {
      title: string;
      id?: string;
      image: string;
      pdfUrl: string;
    }[];
  } | null>(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedExpCert(null);
      }
    };
    if (selectedExpCert) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedExpCert]);

  const handleOpenCertificate = (exp: ExperienceItem) => {
    if (exp.certificates && exp.certificates.length > 0) {
      setSelectedExpCert({
        company: exp.company,
        role: exp.role,
        activeTab: 0,
        items: exp.certificates,
      });
    } else if (exp.certificatePdf) {
      setSelectedExpCert({
        company: exp.company,
        role: exp.role,
        activeTab: 0,
        items: [
          {
            title: `${exp.company} — Certificate of Completion`,
            id: exp.certificateId,
            image: exp.certificateImage || exp.certificatePdf,
            pdfUrl: exp.certificatePdf,
          },
        ],
      });
    }
  };

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const sec = sectionRef.current;
    if (!sec) return;

    // Header reveal with continuous scrub
    gsap.fromTo(sec.querySelectorAll('.exp-header-item'),
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

    // Timeline cards scroll-linked progressive reveals
    const expCards = sec.querySelectorAll('.exp-timeline-card');
    expCards.forEach((card) => {
      gsap.fromTo(card,
        { y: 35, opacity: 0.2 },
        {
          y: 0,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            end: "top 60%",
            scrub: 0.6
          }
        }
      );
    });
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
                      <button
                        type="button"
                        onClick={() => handleOpenCertificate(exp)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-editorial-heading hover:text-black hover:underline cursor-pointer transition-colors"
                        data-cursor-text="PREVIEW"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#0096C7]" />
                        <span>View Completion Certificate</span>
                      </button>
                    )}
                  </div>

                </div>
              </TiltCard>

            </div>
          ))}
        </div>

      </div>

      {/* Full Certificate Lightbox Modal for Experience Credentials */}
      {selectedExpCert && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={() => setSelectedExpCert(null)}
        >
          <div 
            className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-silver-light"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 border-b border-silver-light gap-3 bg-foundation-pearl/50">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-silver-steel">
                  {selectedExpCert.company} • {selectedExpCert.role}
                </span>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-editorial-heading mt-0.5">
                  {selectedExpCert.items[selectedExpCert.activeTab]?.title}
                </h3>
                {selectedExpCert.items[selectedExpCert.activeTab]?.id && (
                  <p className="text-xs font-mono text-editorial-subtle mt-0.5">
                    Credential ID: <span className="font-semibold text-editorial-heading">{selectedExpCert.items[selectedExpCert.activeTab]?.id}</span>
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <a
                  href={encodeURI(selectedExpCert.items[selectedExpCert.activeTab]?.pdfUrl || '')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0096C7] text-white text-xs font-semibold hover:bg-[#0077B6] transition-colors shadow-xs"
                >
                  <span>Open PDF</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={encodeURI(selectedExpCert.items[selectedExpCert.activeTab]?.pdfUrl || '')}
                  download
                  className="p-2 rounded-lg hover:bg-foundation-cloud text-editorial-heading transition-colors"
                  aria-label="Download Certificate PDF"
                  title="Download Certificate PDF"
                >
                  <Download className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedExpCert(null)}
                  className="p-2 rounded-lg hover:bg-foundation-cloud text-editorial-heading transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Multiple Certificates Selector Tabs (For iStudio Internship & Training Documents) */}
            {selectedExpCert.items.length > 1 && (
              <div className="flex border-b border-silver-light px-4 sm:px-6 bg-white gap-2 pt-2">
                {selectedExpCert.items.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedExpCert(prev => prev ? { ...prev, activeTab: idx } : null)}
                    className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                      selectedExpCert.activeTab === idx
                        ? 'border-black text-black'
                        : 'border-transparent text-editorial-subtle hover:text-editorial-body'
                    }`}
                  >
                    {idx === 0 ? 'Certificate of Internship' : 'Certificate of Training'}
                  </button>
                ))}
              </div>
            )}

            {/* Modal Body: High Resolution Certificate Image */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-[#F7F8FA] min-h-[360px]">
              <img
                src={selectedExpCert.items[selectedExpCert.activeTab]?.image}
                alt={selectedExpCert.items[selectedExpCert.activeTab]?.title}
                className="max-w-full max-h-[68vh] object-contain rounded-lg shadow-md border border-silver-light"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
