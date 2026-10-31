import React, { useState, useRef } from 'react';
import { CERTIFICATES } from '../../data/portfolioData';
import type { CertificateItem } from '../../data/portfolioData';
import { ExternalLink, Eye, X, Download } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion } from '../../styles/motion';

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

    // Header reveal with continuous scrub
    gsap.fromTo(sec.querySelectorAll('.cert-header-item'), 
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

    // Certificate cards reveal with scroll-linked scrub
    gsap.fromTo(sec.querySelectorAll('.cert-card-item'),
      { y: 40, opacity: 0.2 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.06,
        ease: "power1.out",
        scrollTrigger: {
          trigger: sec,
          start: "top 80%",
          end: "top 35%",
          scrub: 0.7
        }
      }
    );
  }, { scope: sectionRef, dependencies: [activeFilter] });

  return (
    <section id="certifications" ref={sectionRef} className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="cert-header-container flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="cert-header-item inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-editorial-subtle font-mono">
                CREDENTIALS & RECOGNITION
              </span>
            </div>
            <h2 className="cert-header-item font-heading font-extrabold text-3xl sm:text-5xl text-editorial-heading tracking-tight mb-2">
              Verified Certifications
            </h2>
            <p className="cert-header-item text-sm sm:text-base text-editorial-body">
              Authentic industry, institutional, and simulation completions verified by official certificates.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="cert-header-item flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all ${
                  activeFilter === cat
                    ? 'bg-black text-white shadow-xs'
                    : 'bg-foundation-cloud text-editorial-body hover:bg-foundation-pearl hover:text-black'
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
              className="cert-card-item group bg-foundation-pearl/60 hover:bg-white rounded-card p-5 border border-silver-light hover:border-black/30 hover:shadow-elevated transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Certificate Thumbnail Preview */}
                <div
                  onClick={() => setSelectedCert(cert)}
                  className="relative aspect-[16/11] rounded-xl overflow-hidden bg-silver-light mb-4 cursor-pointer group/img"
                  data-cursor-text="PREVIEW"
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-bold uppercase tracking-wider">
                    <Eye className="w-4 h-4" />
                    <span>View Full Certificate</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-editorial-subtle mb-2">
                  <span className="px-2 py-0.5 rounded bg-foundation-cloud font-medium text-editorial-body">
                    {cert.category}
                  </span>
                  <span>{cert.date}</span>
                </div>

                <h3 className="font-heading font-bold text-base text-editorial-heading line-clamp-2 mb-1 group-hover:text-black">
                  {cert.title}
                </h3>
                <p className="text-xs text-editorial-body line-clamp-1 mb-2">
                  {cert.issuer}
                </p>

                {cert.certificateId && (
                  <div className="text-[10px] font-mono font-semibold text-editorial-subtle mb-4 truncate">
                    ID: <span className="text-editorial-heading">{cert.certificateId}</span>
                  </div>
                )}
              </div>

              {/* Action Link */}
              <div className="pt-3 border-t border-silver-light/60 flex items-center justify-between">
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-editorial-heading hover:underline"
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
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0096C7] hover:underline"
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
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-editorial-subtle hover:text-black"
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

      {/* Full Certificate Lightbox Modal */}
      {selectedCert && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedCert(null)}
        >
          <div 
            className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-silver-light">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-silver-steel">
                  {selectedCert.category} • {selectedCert.date}
                  {selectedCert.certificateId && ` • ID: ${selectedCert.certificateId}`}
                </span>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-editorial-heading mt-0.5">
                  {selectedCert.title}
                </h3>
                <p className="text-xs text-editorial-body">
                  Issued by {selectedCert.issuer}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {selectedCert.verifyUrl && (
                  <a
                    href={selectedCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0096C7] text-white text-xs font-semibold hover:bg-[#0077B6] transition-colors shadow-xs"
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
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111216] text-white text-xs font-semibold hover:bg-black transition-colors shadow-xs"
                    >
                      <span>Open PDF</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={encodeURI(selectedCert.pdfUrl)}
                      download
                      className="p-2 rounded-lg hover:bg-foundation-cloud text-editorial-heading transition-colors"
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
                  className="p-2 rounded-lg hover:bg-foundation-cloud text-editorial-heading transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: High Res Image */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-foundation-pearl">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-sm border border-silver-light"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
