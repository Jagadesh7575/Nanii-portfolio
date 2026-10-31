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
      setScrolled(window.scrollY > 30);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-[#E5E7EB]/80 py-2.5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)]'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 flex items-center justify-between">
        
        {/* Left Monogram: JR with Specular Dot */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="flex items-center gap-2.5 group focus:outline-none shrink-0"
          aria-label="S. Jagadeshwar Reddy Home"
          data-cursor-text="HOME"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#111216] text-white shadow-xs group-hover:scale-105 transition-transform">
            <span className="font-heading font-black text-sm tracking-tighter">
              JR
            </span>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#00B4D8] ring-2 ring-white animate-pulse" />
          </div>
          <span className="hidden sm:inline-block font-heading font-extrabold text-sm tracking-tight text-[#111216]">
            Jagadeshwar
          </span>
        </a>

        {/* Center-Left Navigation Links with Smooth Sliding Kinetic Pill */}
        <nav 
          ref={navContainerRef}
          className="hidden lg:flex items-center relative py-1 px-1 rounded-full bg-[#F3F4F6]/85 border border-black/5 backdrop-blur-md ml-8 mr-auto shadow-inner"
          aria-label="Main Navigation"
        >
          {/* Fluid Sliding Active Capsule */}
          <div
            className="absolute top-1 bottom-1 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-black/5 pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
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
                className={`relative z-10 px-3.5 py-1 text-[13px] tracking-tight transition-colors duration-200 rounded-full select-none ${
                  isActive
                    ? 'text-[#111216] font-bold'
                    : 'text-[#616670] hover:text-[#111216] font-medium'
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
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 bg-[#111216] text-white text-xs font-semibold rounded-full hover:bg-black transition-all shadow-xs hover:shadow-md hover:gap-2.5 border border-black/10 overflow-hidden"
            data-cursor-text="TALK"
          >
            <span className="relative z-10">Let's Connect</span>
            <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-0.5 transition-transform text-[#00D2FF]" />
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-[#00B4D8]/30 to-transparent transition-transform duration-500 ease-out" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-[#111216] hover:bg-black/5 transition-colors focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-[#E5E7EB] px-6 py-6 space-y-3 animate-fadeIn shadow-xl">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`block px-4 py-2.5 rounded-xl text-xs font-semibold tracking-tight transition-all ${
                    isActive
                      ? 'bg-[#111216] text-white font-bold'
                      : 'bg-[#F7F8FA] text-[#616670] hover:text-[#111216]'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#E5E7EB]">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#111216] text-white text-xs font-bold rounded-xl shadow-sm"
            >
              <span>Let's Connect</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#00B4D8]" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
