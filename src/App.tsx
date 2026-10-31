import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/layout/Navbar';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { CustomCursor } from './components/ui/CustomCursor';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { PhilosophyBanner } from './components/sections/PhilosophyBanner';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Experience } from './components/sections/Experience';
import { Education } from './components/sections/Education';
import { Certifications } from './components/sections/Certifications';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Active section detection during scroll
    const handleScroll = () => {
      const sections = ['home', 'projects', 'about', 'skills', 'experience', 'education', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 220;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Refresh ScrollTrigger when images load to ensure precise pin spacing
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('load', handleLoad);

    // Multiple staggered refreshes to ensure all images, fonts, and layouts compute precise pin spacing
    const timer1 = setTimeout(() => ScrollTrigger.refresh(), 100);
    const timer2 = setTimeout(() => ScrollTrigger.refresh(), 500);
    const timer3 = setTimeout(() => ScrollTrigger.refresh(), 1200);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', handleLoad);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-editorial-heading antialiased selection:bg-black selection:text-white overflow-x-hidden">
      {/* Lenis Momentum Scroll Engine & Kinetic Progress Indicator */}
      <ScrollProgress />

      {/* Interactive Magnetic Custom Cursor with Desktop Hover Effects */}
      <CustomCursor />

      {/* Top Fixed Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Main Page Flow matching approved design */}
      <main>
        {/* 01: Hero Section */}
        <Hero />

        {/* 02: Featured Projects (5 Cards Across, Crisp White Theme, Horizontal Scroll Engine) */}
        <Projects />

        {/* 03: Black "Why I Build" Philosophy Section */}
        <PhilosophyBanner />

        {/* 04: About Me Section */}
        <About />

        {/* 05: Skills & Modern Tooling */}
        <Skills />

        {/* 06: Work & Internships Journey */}
        <Experience />

        {/* 07: Academic Education Milestones */}
        <Education />

        {/* 08: Verified Certifications Gallery */}
        <Certifications />

        {/* 09: Collaboration & Contact Form */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
