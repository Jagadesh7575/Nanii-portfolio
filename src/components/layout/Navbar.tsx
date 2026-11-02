import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { scrollToId } from './ScrollProgress';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Projects', id: 'projects' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Experience', id: 'experience' },
    { name: 'Education', id: 'education' },
    { name: 'Certifications', id: 'certifications' },
    { name: 'Contact', id: 'contact' },
  ];

  // Update sliding indicator whenever activeSection changes
  useEffect(() => {
    const updateIndicator = () => {
      const activeEl = linkRefs.current[activeSection];
      const container = navContainerRef.current;
      if (activeEl && container) {
        const containerRect = container.getBoundingClientRect();
        const elRect = activeEl.getBoundingClientRect();
        setIndicatorStyle({
          left: elRect.left - containerRect.left,
          width: elRect.width,
          opacity: 1,
        });
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    const timer = setTimeout(updateIndicator, 150);
    return () => {
      window.removeEventListener('resize', updateIndicator);
      clearTimeout(timer);
    };
  }, [activeSection]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToId(id, id === 'home' ? 0 : -76);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#050505]/85 backdrop-blur-2xl border-b border-white/[0.08] py-2.5 shadow-[0_10px_35px_rgba(0,0,0,0.8)]'
          : 'bg-gradient-to-b from-[#050505]/80 via-[#050505]/40 to-transparent py-3.5 sm:py-4'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 flex items-center justify-between">
        
        {/* Left Monogram: JR with Subtle Electric Cyan Accent */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="flex items-center gap-2.5 group focus:outline-none shrink-0"
          aria-label="S. Jagadeshwar Reddy Home"
          data-cursor-text="HOME"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#0A0A0A] border border-white/10 text-[#F5F5F5] shadow-xs group-hover:border-[#00D9FF]/40 transition-all">
            <span className="font-heading font-black text-sm tracking-tighter">
              JR
            </span>
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#00D9FF] shadow-[0_0_8px_#00D9FF] animate-pulse" />
          </div>
          <span className="hidden sm:inline-block font-heading font-bold text-sm tracking-tight text-[#F5F5F5] group-hover:text-white transition-colors">
            Jagadeshwar
          </span>
        </a>

        {/* Center Navigation Links: Floating Minimal Glass Capsule */}
        <nav
          ref={navContainerRef}
          className="hidden lg:flex items-center relative py-1 px-1.5 rounded-full bg-[#0A0A0A]/80 border border-white/10 backdrop-blur-xl shadow-[0_4px_25px_rgba(0,0,0,0.5)]"
          aria-label="Main Navigation"
        >
          {/* Fluid Sliding Active Capsule */}
          <div
            className="absolute top-1 bottom-1 rounded-full bg-[#181818] border border-white/[0.12] pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
            }}
          />

          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                ref={(el) => { linkRefs.current[link.id] = el; }}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`relative z-10 px-3 py-1 text-[12.5px] tracking-tight transition-colors duration-200 rounded-full select-none ${
                  isActive
                    ? 'text-[#F5F5F5] font-semibold'
                    : 'text-[#929292] hover:text-[#F5F5F5] font-medium'
                }`}
                data-cursor-text={link.name.toUpperCase()}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Button: Let's Connect */}
        <div className="hidden sm:flex items-center shrink-0">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="group relative inline-flex items-center gap-2 px-4 py-2 bg-[#F5F5F5] text-[#050505] text-xs font-bold rounded-full hover:bg-white hover:shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all overflow-hidden border border-white/20"
            data-cursor-text="TALK"
          >
            <span className="relative z-10">Let's Connect</span>
            <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-0.5 transition-transform text-[#00D9FF]" />
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-[#00D9FF]/20 to-transparent transition-transform duration-500 ease-out" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-[#F5F5F5] hover:bg-white/10 transition-colors focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Drawer Menu with Impeccable Dark Styling */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0A0A]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4 animate-fadeIn shadow-[0_25px_50px_rgba(0,0,0,0.9)]">
          {/* Status availability badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/20 text-[11px] font-mono text-[#00D9FF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF] animate-pulse" />
            <span>Available for innovative engineering</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`flex items-center justify-between min-h-[42px] px-3.5 py-2 rounded-xl text-xs font-semibold tracking-tight transition-all ${
                    isActive
                      ? 'bg-[#181818] border border-[#00D9FF]/40 text-[#F5F5F5] font-bold shadow-xs'
                      : 'bg-[#111111] border border-white/5 text-[#929292] hover:text-[#F5F5F5] hover:bg-[#1A1A1A]'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF]" />
                  )}
                </a>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="w-full min-h-[44px] flex items-center justify-center gap-2 py-2.5 bg-[#F5F5F5] text-[#050505] text-xs font-bold rounded-xl shadow-sm hover:bg-white transition-all"
            >
              <span>Let's Connect</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#00D9FF]" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};