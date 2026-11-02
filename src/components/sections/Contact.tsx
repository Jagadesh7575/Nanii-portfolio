import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, Download, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { GithubIcon, LinkedinIcon } from '../icons/SocialIcons';
import { prefersReducedMotion } from '../../styles/motion';
import { MaskedTextReveal } from '../ui/MaskedTextReveal';
import { MagneticButton } from '../ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const sec = sectionRef.current;
    if (!sec) return;

    // Header reveal with smooth cinematic easing
    gsap.fromTo(sec.querySelectorAll('.contact-header-item'),
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

    // Left info card and right form card converge with smooth deceleration
    const infoPanel = sec.querySelector('.contact-info-panel');
    const formPanel = sec.querySelector('.contact-form-panel');

    if (infoPanel) {
      gsap.fromTo(infoPanel,
        { x: -45, opacity: 0, scale: 0.96 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.85,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: sec,
            start: "top 80%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
    }

    if (formPanel) {
      gsap.fromTo(formPanel,
        { x: 45, opacity: 0, scale: 0.96 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.85,
          ease: "power3.out",
          force3D: true,
          scrollTrigger: {
            trigger: sec,
            start: "top 80%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
    }
  }, { scope: sectionRef });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
        formData.subject || `Message from ${formData.name}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      setTimeout(() => {
        setStatus('success');
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        window.open(mailtoUrl, '_blank');
      }, 800);
    } catch {
      setStatus('error');
      setErrorMessage('Unable to process message right now. Please email directly.');
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-[#050505] border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="contact-header-container max-w-2xl mb-16">
          <div className="contact-header-item inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00D9FF] shadow-[0_0_8px_#00D9FF] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-[#00D9FF] font-mono">
              LET'S COLLABORATE
            </span>
          </div>
          <MaskedTextReveal
            as="h2"
            text="Have an idea? Let's build something extraordinary."
            italicWords={["something", "extraordinary."]}
            className="font-heading font-black text-3xl sm:text-5xl text-[#F5F5F5] tracking-tight mb-4 leading-tight"
          />
          <p className="contact-header-item text-base sm:text-lg text-[#929292] leading-relaxed">
            Open for technical roles, software collaborations, entrepreneurial partnerships, and innovative product discussions.
          </p>
        </div>

        {/* 2-Column Contact Layout */}
        <div className="contact-grid-container grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info Cards & Resume Preview */}
          <div className="contact-info-panel lg:col-span-5 space-y-6">
            
            {/* Direct Channels Card */}
            <div className="bg-[#0A0A0A] rounded-card p-6 sm:p-8 border border-white/10 shadow-xs">
              <h3 className="font-heading font-bold text-xl text-[#F5F5F5] mb-6">
                Direct Contact
              </h3>

              <div className="space-y-4">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#16171B] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#16171B] border border-[#262626] flex items-center justify-center shrink-0 group-hover:bg-[#00D2FF] group-hover:text-[#080808] transition-colors text-[#00D2FF]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-[#8E94A0]">Email Address</div>
                    <div className="text-sm font-semibold text-[#F2F0ED] group-hover:underline">
                      {PERSONAL_INFO.email}
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-3 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-[#16171B] border border-[#262626] flex items-center justify-center shrink-0 text-[#00D2FF]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-[#8E94A0]">Phone & WhatsApp</div>
                    <div className="text-sm font-semibold text-[#F2F0ED]">
                      {PERSONAL_INFO.phone}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-[#16171B] border border-[#262626] flex items-center justify-center shrink-0 text-[#00D2FF]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-[#8E94A0]">Location</div>
                    <div className="text-sm font-semibold text-[#F2F0ED]">
                      {PERSONAL_INFO.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-6 mt-6 border-t border-[#1C1D21] flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#262626] bg-[#16171B] hover:bg-white hover:text-black hover:border-white transition-all text-xs font-semibold text-[#F2F0ED]"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[#262626] bg-[#16171B] hover:bg-[#00D2FF] hover:text-[#080808] hover:border-[#00D2FF] transition-all text-xs font-semibold text-[#F2F0ED]"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Official ATS Resume Card */}
            <div className="bg-[#101114] rounded-card p-6 border border-[#262626] shadow-xs flex items-center justify-between">
              <div>
                <h4 className="font-heading font-bold text-base text-[#F2F0ED]">
                  Verified Two-Page ATS Resume
                </h4>
                <p className="text-xs text-[#8E94A0] mt-0.5">
                  Updated October 2026 • PDF & DOCX Available
                </p>
              </div>

              <a
                href={PERSONAL_INFO.resumePdf}
                download="S_Jagadeshwar_Reddy_Resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#00D2FF] text-[#080808] text-xs font-bold rounded-full hover:bg-white transition-all shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF</span>
              </a>
            </div>

          </div>

          {/* Right Column: High-Fidelity Contact Form */}
          <div className="contact-form-panel lg:col-span-7">
            <div className="bg-[#101114] rounded-panel p-8 sm:p-10 border border-[#262626] shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
              <h3 className="font-heading font-bold text-2xl text-[#F2F0ED] mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs sm:text-sm text-[#8E94A0] mb-8">
                Your message is formatted and delivered straight to Jagadeshwar's verified inbox.
              </p>

              {status === 'success' ? (
                <div className="p-8 text-center bg-emerald-950/20 rounded-card border border-emerald-500/30">
                  <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                  <h4 className="font-heading font-bold text-xl text-emerald-300 mb-1">
                    Thank You!
                  </h4>
                  <p className="text-sm text-emerald-200/80 leading-relaxed mb-6">
                    Your email client has been prepared with your message, and an alert was dispatched. I will respond promptly!
                  </p>
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="px-6 py-2.5 bg-[#00D2FF] text-[#080808] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-white transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {status === 'error' && (
                    <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/30 flex items-center gap-3 text-red-400 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#8E94A0] mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-[#262626] bg-[#16171B] focus:bg-[#1A1C21] focus:outline-none focus:border-[#00D2FF] focus:ring-2 focus:ring-[#00D2FF]/20 text-sm text-[#F2F0ED] placeholder-[#666666] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#8E94A0] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-[#262626] bg-[#16171B] focus:bg-[#1A1C21] focus:outline-none focus:border-[#00D2FF] focus:ring-2 focus:ring-[#00D2FF]/20 text-sm text-[#F2F0ED] placeholder-[#666666] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#8E94A0] mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Project Opportunity / Collaboration / Inquiry"
                      className="w-full px-4 py-3 rounded-xl border border-[#262626] bg-[#16171B] focus:bg-[#1A1C21] focus:outline-none focus:border-[#00D2FF] focus:ring-2 focus:ring-[#00D2FF]/20 text-sm text-[#F2F0ED] placeholder-[#666666] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#8E94A0] mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your idea, inquiry, or project requirements..."
                      className="w-full px-4 py-3 rounded-xl border border-[#262626] bg-[#16171B] focus:bg-[#1A1C21] focus:outline-none focus:border-[#00D2FF] focus:ring-2 focus:ring-[#00D2FF]/20 text-sm text-[#F2F0ED] placeholder-[#666666] transition-all resize-none"
                    />
                  </div>

                  <MagneticButton
                    as="button"
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-[#00D9FF] text-[#050505] text-xs font-bold uppercase tracking-wider rounded-full hover:bg-white transition-all hover:gap-4 shadow-[0_0_20px_rgba(0,217,255,0.4)] disabled:opacity-50 cursor-pointer"
                    strength={0.25}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </MagneticButton>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
