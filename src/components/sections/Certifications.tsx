import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CERTIFICATES } from '../../data/portfolioData';
import type { CertificateItem } from '../../data/portfolioData';
import { ExternalLink, Eye, X, Download } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion } from '../../styles/motion';
import { MaskedTextReveal } from '../ui/MaskedTextReveal';

gsap.registerPlugin(ScrollTrigger);

export const Certifications: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const categories = ['All', 'Hackathon', 'Internship', 'Technical', 'Simulation'];

  const filteredCerts = activeFilter === 'All'
    ? CERTIFICATES
    : CERTIFICATES.filter((c) => c.category === activeFilter);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const sec = sectionRef.current;
    if (!sec) return;

    // Header reveal with smooth cinematic easing
    gsap.fromTo(sec.querySelectorAll('.cert-header-item'), 
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

    // Certificate cards progressive grid reveal
    const gridContainer = sec.querySelector('.cert-grid-container');
    if (gridContainer) {
      gsap.fromTo(gridContainer.querySelectorAll('.cert-card-item'),
        { y: 50, opacity: 0, scale: 0.94 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.75,
          stagger: 0.07,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: gridContainer,
            start: "top 82%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
    }
  }, { scope: sectionRef, dependencies: [activeFilter] });

  return (
    <section id="certifications" ref={sectionRef} className="py-24 bg-[#050505] border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="cert-header-container flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="cert-header-item inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#00D9FF] shadow-[0_0_8px_#00D9FF] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#00D9FF] font-mono">
                CREDENTIALS & RECOGNITION
              </span>
            </div>
            <MaskedTextReveal
              as="h2"
              text="Verified Certifications"
              italicWords={["Certifications"]}
              className="font-heading font-black text-3xl sm:text-5xl text-[#F5F5F5] tracking-tight mb-2 leading-tight"
            />
            <p className="cert-header-item text-sm sm:text-base text-[#929292]">
              Authentic industry, institutional, and simulation completions verified by official certificates.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="cert-header-item flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-[#00D9FF] text-[#050505] font-bold shadow-[0_0_15px_rgba(0,217,255,0.4)]'
                    : 'bg-[#111111] text-[#929292] border border-white/10 hover:text-white hover:border-white/25'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Certificate Cards Grid */}
        <div className="cert-grid-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="cert-card-item group bg-[#0A0A0A] hover:bg-[#111111] rounded-card p-5 border border-white/10 hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Certificate Thumbnail Preview */}
                <div
                  onClick={() => setSelectedCert(cert)}
                  className="relative aspect-[16/11] rounded-xl overflow-hidden bg-[#16171B] border border-[#262626] mb-4 cursor-pointer group/img"
                  data-cursor-text="PREVIEW"
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-[2px]">
                    <Eye className="w-4 h-4 text-[#00D2FF]" />
                    <span>View Full Certificate</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-[#666666] mb-2">
                  <span className="px-2 py-0.5 rounded bg-[#16171B] border border-[#262626] font-medium text-[#8E94A0]">
                    {cert.category}
                  </span>
                  <span>{cert.date}</span>
                </div>

                <h3 className="font-heading font-bold text-base text-[#F2F0ED] line-clamp-2 mb-1 group-hover:text-white">
                  {cert.title}
                </h3>
                <p className="text-xs text-[#8E94A0] line-clamp-1 mb-2">
                  {cert.issuer}
                </p>

                {cert.certificateId && (
                  <div className="text-[10px] font-mono font-semibold text-[#666666] mb-4 truncate">
                    ID: <span className="text-[#A1A1AA]">{cert.certificateId}</span>
                  </div>
                )}
              </div>

              {/* Action Link */}
              <div className="pt-3 border-t border-[#1C1D21] flex items-center justify-between">
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00D2FF] hover:text-white hover:underline cursor-pointer transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>

                <div className="flex items-center gap-3">
                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#00D2FF] hover:underline"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  {cert.pdfUrl && (
                    <a
                      href={cert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#8E94A0] hover:text-white transition-colors"
                    >
                      <span>PDF</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Full Certificate Lightbox Modal - Rendered via Portal */}
      {selectedCert && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setSelectedCert(null)}
        >
          <div 
            className="relative bg-[#0E0F12] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-[#262626]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 border-b border-[#262626] bg-[#121316] gap-3">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#00D2FF]">
                  {selectedCert.category} • {selectedCert.date}
                  {selectedCert.certificateId && ` • ID: ${selectedCert.certificateId}`}
                </span>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-[#F2F0ED] mt-0.5">
                  {selectedCert.title}
                </h3>
                <p className="text-xs text-[#8E94A0]">
                  Issued by {selectedCert.issuer}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 self-end sm:self-auto">
                {selectedCert.verifyUrl && (
                  <a
                    href={selectedCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00D2FF] text-[#080808] text-xs font-bold hover:bg-white transition-colors shadow-xs"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {selectedCert.pdfUrl && (
                  <>
                    <a
                      href={encodeURI(selectedCert.pdfUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#16171B] border border-[#262626] text-[#F2F0ED] text-xs font-semibold hover:border-white/30 transition-colors shadow-xs"
                    >
                      <span>Open PDF</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={encodeURI(selectedCert.pdfUrl)}
                      download
                      className="p-2 rounded-lg hover:bg-[#1A1C21] text-[#A1A1AA] hover:text-white transition-colors"
                      aria-label="Download Certificate PDF"
                      title="Download Certificate PDF"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-lg hover:bg-[#1A1C21] text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: High Res Image */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-[#080808]">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl border border-[#262626]"
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};
