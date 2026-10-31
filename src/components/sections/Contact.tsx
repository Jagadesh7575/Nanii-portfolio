import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, Download, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { GithubIcon, LinkedinIcon } from '../icons/SocialIcons';
import { prefersReducedMotion } from '../../styles/motion';

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

    // Header reveal with continuous scrub
    gsap.fromTo(sec.querySelectorAll('.contact-header-item'),
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

    // Left info card and right form card converge with scroll scrub
    gsap.fromTo(sec.querySelector('.contact-info-panel'),
      { x: -50, opacity: 0.2 },
      {
        x: 0,
        opacity: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: sec,
          start: "top 80%",
          end: "top 35%",
          scrub: 0.8
        }
      }
    );

    gsap.fromTo(sec.querySelector('.contact-form-panel'),
      { x: 50, opacity: 0.2 },
      {
        x: 0,
        opacity: 1,
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
    <section id="contact" ref={sectionRef} className="py-24 bg-foundation-pearl relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="contact-header-container max-w-2xl mb-16">
          <div className="contact-header-item inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-black" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-editorial-subtle font-mono">
              LET'S COLLABORATE
            </span>
          </div>
          <h2 className="contact-header-item font-heading font-extrabold text-3xl sm:text-5xl text-editorial-heading tracking-tight mb-4">
            Have an idea? Let's build something extraordinary.
          </h2>
          <p className="contact-header-item text-base sm:text-lg text-editorial-body leading-relaxed">
            Open for technical roles, software collaborations, entrepreneurial partnerships, and innovative product discussions.
          </p>
        </div>

        {/* 2-Column Contact Layout */}
        <div className="contact-grid-container grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Info Cards & Resume Preview */}
          <div className="contact-info-panel lg:col-span-5 space-y-6">
            
            {/* Direct Channels Card */}
            <div className="bg-white rounded-card p-6 sm:p-8 border border-silver-light shadow-xs">
              <h3 className="font-heading font-bold text-xl text-editorial-heading mb-6">
                Direct Contact
              </h3>

              <div className="space-y-4">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-foundation-pearl transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-foundation-cloud flex items-center justify-center shrink-0 group-hover:bg-black group-hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-editorial-subtle">Email Address</div>
                    <div className="text-sm font-semibold text-editorial-heading group-hover:underline">
                      {PERSONAL_INFO.email}
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-3 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-foundation-cloud flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-editorial-heading" />
                  </div>
                  <div>
                    <div className="text-xs text-editorial-subtle">Phone & WhatsApp</div>
                    <div className="text-sm font-semibold text-editorial-heading">
                      {PERSONAL_INFO.phone}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-foundation-cloud flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-editorial-heading" />
                  </div>
                  <div>
                    <div className="text-xs text-editorial-subtle">Location</div>
                    <div className="text-sm font-semibold text-editorial-heading">
                      {PERSONAL_INFO.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-6 mt-6 border-t border-silver-light/60 flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-silver-light hover:bg-black hover:text-white hover:border-black transition-all text-xs font-semibold"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border border-silver-light hover:bg-black hover:text-white hover:border-black transition-all text-xs font-semibold"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Official ATS Resume Card */}
            <div className="bg-white rounded-card p-6 border border-silver-light shadow-xs flex items-center justify-between">
              <div>
                <h4 className="font-heading font-bold text-base text-editorial-heading">
                  Verified Two-Page ATS Resume
                </h4>
                <p className="text-xs text-editorial-body mt-0.5">
                  Updated October 2026 • PDF & DOCX Available
                </p>
              </div>

              <a
                href={PERSONAL_INFO.resumePdf}
                download="S_Jagadeshwar_Reddy_Resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-2 bg-editorial-heading text-white text-xs font-semibold rounded-full hover:bg-black transition-all shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF</span>
              </a>
            </div>

          </div>

          {/* Right Column: High-Fidelity Contact Form */}
          <div className="contact-form-panel lg:col-span-7">
            <div className="bg-white rounded-panel p-8 sm:p-10 border border-silver-light shadow-ambient">
              <h3 className="font-heading font-bold text-2xl text-editorial-heading mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs sm:text-sm text-editorial-body mb-8">
                Your message is formatted and delivered straight to Jagadeshwar's verified inbox.
              </p>

              {status === 'success' ? (
                <div className="p-8 text-center bg-emerald-50 rounded-card border border-emerald-200">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                  <h4 className="font-heading font-bold text-xl text-emerald-950 mb-1">
                    Thank You!
                  </h4>
                  <p className="text-sm text-emerald-800 leading-relaxed mb-6">
                    Your email client has been prepared with your message, and an alert was dispatched. I will respond promptly!
                  </p>
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="px-6 py-2.5 bg-editorial-heading text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {status === 'error' && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-700 text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-editorial-body mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-silver-light bg-foundation-pearl/50 focus:bg-white focus:outline-none focus:border-black text-sm text-editorial-heading transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-editorial-body mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-silver-light bg-foundation-pearl/50 focus:bg-white focus:outline-none focus:border-black text-sm text-editorial-heading transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-editorial-body mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Project Opportunity / Collaboration / Inquiry"
                      className="w-full px-4 py-3 rounded-xl border border-silver-light bg-foundation-pearl/50 focus:bg-white focus:outline-none focus:border-black text-sm text-editorial-heading transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-editorial-body mb-2">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your idea, inquiry, or project requirements..."
                      className="w-full px-4 py-3 rounded-xl border border-silver-light bg-foundation-pearl/50 focus:bg-white focus:outline-none focus:border-black text-sm text-editorial-heading transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-editorial-heading text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-black transition-all hover:gap-4 disabled:opacity-50"
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
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
