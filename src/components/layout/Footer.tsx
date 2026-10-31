import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { GithubIcon, LinkedinIcon } from '../icons/SocialIcons';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-silver-light/80 py-12 text-editorial-body">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Monogram and Name */}
        <div className="flex items-center gap-3">
          <span className="font-heading font-black text-2xl text-editorial-heading">
            JR
          </span>
          <span className="h-4 w-px bg-silver-light" />
          <div className="text-xs">
            <span className="font-bold text-editorial-heading block">{PERSONAL_INFO.fullName}</span>
            <span className="text-editorial-subtle">{PERSONAL_INFO.title}</span>
          </div>
        </div>

        {/* Center Copyright & Verification */}
        <div className="text-xs text-center text-editorial-subtle">
          © {CURRENT_YEAR} S. Jagadeshwar Reddy. Built with precision, React, TypeScript & Three.js.
        </div>

        {/* Right Socials & Scroll to Top */}
        <div className="flex items-center gap-4">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="p-2 rounded-lg hover:bg-foundation-pearl text-editorial-heading transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="p-2 rounded-lg hover:bg-foundation-pearl text-editorial-heading transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            aria-label="Email directly"
            className="p-2 rounded-lg hover:bg-foundation-pearl text-editorial-heading transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="p-2 rounded-full border border-silver-light hover:bg-black hover:text-white transition-all ml-2"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
