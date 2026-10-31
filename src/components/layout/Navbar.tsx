import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { scrollToId } from './ScrollProgress';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToId(id, id === 'home' ? 0 : -72);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/88 backdrop-blur-xl border-b border-[#E5E7EB]/80 py-3 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 flex items-center justify-between">
        
        {/* Left Monogram: JR with Specular Dot */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'home')}
          className="flex items-center gap-2 group focus:outline-none"
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

        {/* Center Navigation Links with Kinetic Underline */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`relative text-[13px] font-medium tracking-tight transition-all duration-200 py-1 ${
                  isActive
                    ? 'text-[#111216] font-bold'
                    : 'text-[#616670] hover:text-[#111216]'
                }`}
                data-cursor-text={link.name.toUpperCase()}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00B4D8] to-[#0284C7] rounded-full shadow-[0_0_8px_rgba(0,180,216,0.6)]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Button: Let's Connect */}
        <div className="hidden sm:flex items-center">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 bg-[#111216] text-white text-xs font-semibold rounded-full hover:bg-black transition-all shadow-xs hover:shadow-md hover:gap-2.5 border border-black/10 overflow-hidden"
            data-cursor-text="TALK"
          >
            <span className="relative z-10">Let's Connect</span>
            <ArrowRight className="w-3.5 h-3.5 relative z-10 group-hover:translate-x-0.5 transition-transform text-[#00D2FF]" />
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-[#00B4D8]/20 to-transparent transition-transform duration-500 ease-out" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl text-[#111216] hover:bg-black/5 transition-colors focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-2xl border-b border-[#E5E7EB] px-6 py-6 shadow-2xl animate-in fade-in duration-200">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`text-sm font-semibold py-2.5 px-3 rounded-lg flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-[#111216] text-white'
                      : 'text-[#111216] hover:bg-[#F5F6F8]'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#00B4D8]" />}
                </a>
              );
            })}
            <div className="pt-4 mt-2 border-t border-[#EEF0F2]">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold uppercase tracking-wider bg-[#111216] text-white rounded-full shadow-sm"
              >
                <span>Let's Connect</span>
                <ArrowRight className="w-4 h-4 text-[#00D2FF]" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};