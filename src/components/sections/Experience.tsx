import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { EXPERIENCES } from '../../data/portfolioData';
import type { ExperienceItem } from '../../data/portfolioData';
import { CheckCircle2, Clock, FileText, ExternalLink, Download, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion } from '../../styles/motion';
import { TiltCard } from '../ui/TiltCard';
import { MaskedTextReveal } from '../ui/MaskedTextReveal';
import { MagneticButton } from '../ui/MagneticButton';

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

    // Header reveal with smooth cinematic easing
    gsap.fromTo(sec.querySelectorAll('.exp-header-item'),
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

    // Dynamic timeline scroll line progress drawing down with scroll
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
            scrub: 0.3
          }
        }
      );
    }

    // Timeline cards and indicator nodes progressive cinematic reveals
    const expCards = sec.querySelectorAll('.exp-timeline-card');
    expCards.forEach((card) => {
      const node = card.querySelector('.exp-node-dot');
      
      // Card entrance from right
      gsap.fromTo(card,
        { x: 45, opacity: 0, scale: 0.96 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.75,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play reverse play reverse"
          }
        }
      );

      // Node dot pop
      if (node) {
        gsap.fromTo(node,
          { scale: 0.4, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      }
    });
  }, { scope: sectionRef });

  return (
    <section id="experience" ref={sectionRef} className="py-24 bg-[#050505] border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="exp-header-container max-w-2xl mb-16">
          <div className="exp-header-item inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00D9FF] shadow-[0_0_8px_#00D9FF] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#00D9FF] font-mono">
              WORK & INTERNSHIPS
            </span>
          </div>
          <MaskedTextReveal
            as="h2"
            text="My Journey — Experience & Growth"
            italicWords={["Experience", "Growth"]}
            className="font-heading font-black text-3xl sm:text-5xl text-[#F5F5F5] tracking-tight mb-4 leading-tight"
          />
          <p className="exp-header-item text-base sm:text-lg text-[#929292] leading-relaxed">
            Hands-on internships and technical contributions documenting real software development practices.
          </p>
        </div>

        {/* Vertical Timeline Structure with Dynamic Scroll Line */}
        <div className="exp-timeline-container relative pl-6 sm:pl-10 ml-2 sm:ml-4 space-y-12">
          {/* Static track line */}
          <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-white/10" />
          
          {/* Dynamic animated progress line */}
          <div className="exp-progress-line absolute left-0 top-3 bottom-3 w-[2px] bg-[#00D9FF] origin-top will-change-transform shadow-[0_0_10px_#00D9FF]" />

          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="exp-timeline-card relative group">
              
              {/* Timeline Indicator Node */}
              <div className="exp-node-dot absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#050505] border-4 border-[#00D9FF] group-hover:scale-125 transition-transform z-10 shadow-[0_0_10px_#00D9FF]" />

              {/* 3D Perspective Card Container */}
              <TiltCard maxTilt={4} perspective={1200} className="rounded-card">
                <div 
                  className="bg-[#0A0A0A] hover:bg-[#111111] rounded-card p-6 sm:p-8 border border-white/10 hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] transition-all duration-300"
                  data-cursor-text="EXP"
                >
                  
                  {/* Header Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#F5F5F5]">
                          {exp.company}
                        </h3>
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold ${
                            exp.status === 'Completed'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
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

                      <div className="text-sm font-semibold text-[#929292] mt-1">
                        {exp.role} {exp.duration && `• ${exp.duration}`}
                      </div>
                    </div>

                    <div className="text-xs font-mono font-medium text-[#666666]">
                      {exp.period}
                    </div>
                  </div>

                  {/* Description Bullets */}
                  <ul className="space-y-2 mb-6">
                    {exp.description.map((desc, dIdx) => (
                      <li key={dIdx} className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF]/70 mt-2 shrink-0 shadow-[0_0_6px_#00D9FF]" />
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Footer with Skills and Certificate Action */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.08]">
                    <div className="flex flex-wrap gap-1.5">
                      {exp.skills.map((s) => (
                        <span
                          key={s}
                          className="px-2.5 py-1 rounded-md bg-[#141414] border border-white/10 text-[11px] font-medium text-[#929292]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {exp.certificatePdf && (
                      <MagneticButton
                        as="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenCertificate(exp);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00D9FF] hover:text-white transition-colors cursor-pointer"
                        data-cursor-text="PREVIEW"
                        strength={0.25}
                      >
                        <FileText className="w-3.5 h-3.5 text-[#00D9FF]" />
                        <span>View Completion Certificate</span>
                      </MagneticButton>
                    )}
                  </div>

                </div>
              </TiltCard>

            </div>
          ))}
        </div>

      </div>

      {/* Full Certificate Lightbox Modal for Experience Credentials - Rendered via Portal */}
      {selectedExpCert && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedExpCert(null)}
        >
          <div 
            className="relative bg-[#0E0F12] rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-[#262626]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 border-b border-[#262626] gap-3 bg-[#121316]">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00D2FF]">
                  {selectedExpCert.company} • {selectedExpCert.role}
                </span>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-[#F2F0ED] mt-0.5">
                  {selectedExpCert.items[selectedExpCert.activeTab]?.title}
                </h3>
                {selectedExpCert.items[selectedExpCert.activeTab]?.id && (
                  <p className="text-xs font-mono text-[#8E94A0] mt-0.5">
                    Credential ID: <span className="font-semibold text-[#F2F0ED]">{selectedExpCert.items[selectedExpCert.activeTab]?.id}</span>
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <a
                  href={encodeURI(selectedExpCert.items[selectedExpCert.activeTab]?.pdfUrl || '')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00D2FF] text-[#080808] text-xs font-bold hover:bg-white transition-colors shadow-xs"
                >
                  <span>Open PDF</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={encodeURI(selectedExpCert.items[selectedExpCert.activeTab]?.pdfUrl || '')}
                  download
                  className="p-2 rounded-lg hover:bg-[#1A1C21] text-[#A1A1AA] hover:text-white transition-colors"
                  aria-label="Download Certificate PDF"
                  title="Download Certificate PDF"
                >
                  <Download className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedExpCert(null)}
                  className="p-2 rounded-lg hover:bg-[#1A1C21] text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Multiple Certificates Selector Tabs (For iStudio Internship & Training Documents) */}
            {selectedExpCert.items.length > 1 && (
              <div className="flex border-b border-[#262626] px-4 sm:px-6 bg-[#101114] gap-2 pt-2">
                {selectedExpCert.items.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedExpCert(prev => prev ? { ...prev, activeTab: idx } : null)}
                    className={`pb-2.5 px-3.5 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                      selectedExpCert.activeTab === idx
                        ? 'border-[#00D2FF] text-[#00D2FF] bg-[#16171B]/50 rounded-t-md'
                        : 'border-transparent text-[#8E94A0] hover:text-[#F2F0ED]'
                    }`}
                  >
                    {idx === 0 ? 'Certificate of Internship' : 'Certificate of Training'}
                  </button>
                ))}
              </div>
            )}

            {/* Modal Body: High Resolution Certificate Image */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-[#080808] min-h-[360px]">
              <img
                src={selectedExpCert.items[selectedExpCert.activeTab]?.image}
                alt={selectedExpCert.items[selectedExpCert.activeTab]?.title}
                className="max-w-full max-h-[68vh] object-contain rounded-lg shadow-2xl border border-[#262626]"
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};
