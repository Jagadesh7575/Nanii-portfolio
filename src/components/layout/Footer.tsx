import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { GithubIcon, LinkedinIcon } from '../icons/SocialIcons';
import { scrollToId } from './ScrollProgress';
import { MagneticButton } from '../ui/MagneticButton';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    scrollToId('home', 0);
  };

  return (
    <footer className="bg-[#050505] border-t border-white/[0.08] py-12 text-[#929292]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Monogram and Name */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0A0A0A] border border-white/10 flex items-center justify-center font-heading font-black text-sm text-[#00D9FF] shadow-[0_0_10px_rgba(0,217,255,0.2)]">
            JR
          </div>
          <span className="h-4 w-px bg-white/10" />
          <div className="text-xs">
            <span className="font-bold text-[#F5F5F5] block">{PERSONAL_INFO.fullName}</span>
            <span className="text-[#929292]">{PERSONAL_INFO.title}</span>
          </div>
        </div>

        {/* Center Copyright & Verification */}
        <div className="text-xs text-center text-[#666666]">
          © {CURRENT_YEAR} S. Jagadeshwar Reddy. Crafted with precision, React, TypeScript, GSAP & Three.js.
        </div>

        {/* Right Socials & Scroll to Top */}
        <div className="flex items-center gap-3">
          <MagneticButton
            as="a"
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="p-2 rounded-lg bg-[#0A0A0A] border border-white/10 hover:bg-[#141414] hover:text-[#00D9FF] text-[#A1A1AA] transition-colors"
            strength={0.2}
          >
            <GithubIcon className="w-4 h-4" />
          </MagneticButton>

          <MagneticButton
            as="a"
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="p-2 rounded-lg bg-[#0A0A0A] border border-white/10 hover:bg-[#141414] hover:text-[#00D9FF] text-[#A1A1AA] transition-colors"
            strength={0.2}
          >
            <LinkedinIcon className="w-4 h-4" />
          </MagneticButton>

          <MagneticButton
            as="a"
            href={`mailto:${PERSONAL_INFO.email}`}
            aria-label="Email directly"
            className="p-2 rounded-lg bg-[#0A0A0A] border border-white/10 hover:bg-[#141414] hover:text-[#00D9FF] text-[#A1A1AA] transition-colors"
            strength={0.2}
          >
            <Mail className="w-4 h-4" />
          </MagneticButton>

          <MagneticButton
            as="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="p-2 rounded-full border border-white/10 bg-[#0A0A0A] text-[#A1A1AA] hover:text-white hover:bg-[#141414] hover:border-[#00D9FF] transition-all ml-2 cursor-pointer shadow-xs"
            strength={0.3}
          >
            <ArrowUp className="w-4 h-4" />
          </MagneticButton>
        </div>

      </div>
    </footer>
  );
};
