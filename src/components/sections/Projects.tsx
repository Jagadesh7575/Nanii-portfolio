import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowLeft, ArrowRight, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '../icons/SocialIcons';

gsap.registerPlugin(ScrollTrigger);

interface PremiumProject {
  id: string;
  number: string;
  title: string;
  eyebrow: string;
  category: string;
  liveUrl: string;
  githubUrl: string;
  tags: string[];
  description: string;
  fullDescription: string;
  highlights: [string, string];
  previewImage: string;
  accentColor: string;
  accentGlow: string;
}

const FEATURED_PROJECTS: PremiumProject[] = [
  {
    id: "drug-scope-ai",
    number: "01",
    title: "Drug Scope AI",
    eyebrow: "AI & BIOCHEMICAL RESEARCH",
    category: "Scientific Intelligence",
    liveUrl: "https://drugs-scope-ai.vercel.app/",
    githubUrl: "https://github.com/Jagadesh7575/Drugs-Scope-Ai",
    tags: ["AI/ML", "Healthcare", "3D Ligands", "Bio-Research", "Supabase"],
    description: "AI-powered drug discovery and molecular research platform for precision biochemical analysis.",
    fullDescription: "An AI-oriented biomedical research platform featuring medicine search, drug-drug interaction detection, 3D molecular structure visualization, and automated scientific evidence review dossiers.",
    highlights: [
      "Drug-drug interaction matrix & 3D ligand structural rendering",
      "Automated biomedical research dossiers & clinical evidence extraction"
    ],
    previewImage: "/assets/projects/drug_scope_cinematic.jpg",
    accentColor: "#00B4D8", // Cyan / Turquoise accent
    accentGlow: "rgba(0, 180, 216, 0.28)"
  },
  {
    id: "roadrisk-ai",
    number: "02",
    title: "RoadRisk AI",
    eyebrow: "COMPUTER VISION & TRANSIT SAFETY",
    category: "Intelligent Transportation",
    liveUrl: "https://roadrisk-ai.vercel.app/",
    githubUrl: "https://github.com/Jagadesh7575/roadrisk-ai",
    tags: ["Computer Vision", "Deep Learning", "Traffic Safety", "Geospatial Alerts"],
    description: "Real-time AI roadway risk detection system for accident mitigation and route risk assessment.",
    fullDescription: "Intelligent road risk assessment and accident-zone analysis system with interactive geospatial basemaps, hazard identification, and live transit safety alerts.",
    highlights: [
      "Live geospatial risk mapping with interactive hazard telemetry",
      "Predictive accident zone analytics & automated route safety alerts"
    ],
    previewImage: "/assets/projects/roadrisk_cinematic.jpg",
    accentColor: "#00C49F", // Turquoise / Mint accent
    accentGlow: "rgba(0, 196, 159, 0.28)"
  },
  {
    id: "orvix",
    number: "03",
    title: "ORVIX",
    eyebrow: "ENTERPRISE REAL-TIME COMMUNICATIONS",
    category: "Enterprise Intelligence",
    liveUrl: "https://nanii-orvix.vercel.app/",
    githubUrl: "https://github.com/Jagadesh7575/orvix",
    tags: ["Real-Time Chat", "Supabase", "End-to-End Encrypted", "Full Stack"],
    description: "Private real-time messaging platform with end-to-end security, instant presence, and theme personalization.",
    fullDescription: "Real-time private communication and analytical workflow platform featuring encrypted messaging channels, unread indicators, authentication, and Supabase integration.",
    highlights: [
      "End-to-end encrypted messaging channels with typing telemetry",
      "Supabase row-level security & instant presence synchronization"
    ],
    previewImage: "/assets/projects/orvix_cinematic.jpg",
    accentColor: "#0284C7", // Cyan / Sky Blue accent
    accentGlow: "rgba(2, 132, 199, 0.28)"
  },
  {
    id: "solara",
    number: "04",
    title: "SOLARA",
    eyebrow: "SOLAR WEARABLE & IOT HARDWARE",
    category: "Solar Technology & Hardware",
    liveUrl: "https://nanii-solara.vercel.app/",
    githubUrl: "https://github.com/Jagadesh7575/solara",
    tags: ["Wearable Tech", "Solar Energy", "Smart Charging", "IoT Analytics"],
    description: "Intelligent solar-powered smartwatch platform with real-time solar harvesting efficiency and telemetry.",
    fullDescription: "High-end product showcase for solar-powered wearable technology, featuring dynamic battery optimization analytics, telemetry views, and solar charging efficiency models.",
    highlights: [
      "Solar harvesting telemetry with real-time conversion models",
      "Dynamic battery preservation & ambient environmental sensors"
    ],
    previewImage: "/assets/projects/solara_cinematic.jpg",
    accentColor: "#D97706", // Solar Gold accent
    accentGlow: "rgba(217, 119, 6, 0.28)"
  },
  {
    id: "heliowatch",
    number: "05",
    title: "HelioWatch",
    eyebrow: "SOLAR-POWERED SMARTWATCH COMMERCE",
    category: "Sustainable Luxury Wearables",
    liveUrl: "https://nanii-heliowatch.vercel.app/",
    githubUrl: "https://github.com/Jagadesh7575/heliowatch",
    tags: ["Smart Wearables", "Solar Tech", "Luxury UX", "E-Commerce"],
    description: "Premium solar-powered smartwatch experience engineered with sustainable design and smart telemetry.",
    fullDescription: "E-commerce and interactive showcase for advanced smartwatches, blending technical telemetry with fluid shopping workflows, specifications comparison, and responsive design.",
    highlights: [
      "Fluid luxury commerce interface with interactive solar telemetry preview",
      "Comprehensive hardware comparisons & frictionless responsive checkout"
    ],
    previewImage: "/assets/projects/heliowatch_cinematic.jpg",
    accentColor: "#EA580C", // Amber / Coral accent
    accentGlow: "rgba(234, 88, 12, 0.28)"
  }
];

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const counterTextRef = useRef<HTMLSpanElement>(null);
  const activeTitleTextRef = useRef<HTMLSpanElement>(null);
  const accentDotRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const pillsContainerRef = useRef<HTMLDivElement>(null);
  const activeProjectRef = useRef<number>(0);
  const [activeIdxState, setActiveIdxState] = useState<number>(0);

  const total = FEATURED_PROJECTS.length;

  // Direct 60FPS DOM updates for instant scroll responsiveness without React re-render lag
  const updateActiveProjectUI = (idx: number, progress?: number) => {
    if (idx < 0 || idx >= total) return;
    activeProjectRef.current = idx;
    const project = FEATURED_PROJECTS[idx];
    if (!project) return;

    if (counterTextRef.current) {
      counterTextRef.current.textContent = `0${idx + 1}`;
    }

    if (activeTitleTextRef.current) {
      activeTitleTextRef.current.textContent = project.title;
      activeTitleTextRef.current.style.color = project.accentColor;
    }

    if (accentDotRef.current) {
      accentDotRef.current.style.backgroundColor = project.accentColor;
    }

    if (progressBarRef.current) {
      const pct = progress !== undefined 
        ? Math.min(100, Math.max(10, progress * 100))
        : Math.min(100, Math.max(12, ((idx + 1) / total) * 100));
      progressBarRef.current.style.width = `${pct}%`;
      progressBarRef.current.style.backgroundColor = project.accentColor;
    }

    // Number jump pills
    if (pillsContainerRef.current) {
      const pills = pillsContainerRef.current.querySelectorAll<HTMLButtonElement>('[data-project-pill]');
      pills.forEach((pill, i) => {
        if (i === idx) {
          pill.className = "w-7 h-7 rounded-full text-[11px] font-mono font-bold transition-all duration-300 flex items-center justify-center bg-[#111216] text-white shadow-sm scale-105";
        } else {
          pill.className = "w-7 h-7 rounded-full text-[11px] font-mono font-medium transition-all duration-300 flex items-center justify-center text-[#626974] hover:text-[#111216] hover:bg-[#F0F1F3]";
        }
      });
    }

    // Active Card Focus Styling
    const track = trackRef.current;
    if (track) {
      const cards = track.querySelectorAll('.premium-project-card');
      cards.forEach((card, i) => {
        const inner = card.querySelector('.project-card-inner');
        if (inner) {
          if (i === idx) {
            inner.classList.add('border-[#C2C7CE]', 'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12)]', 'scale-100', 'opacity-100');
            inner.classList.remove('border-[#E5E7EB]', 'shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]', 'lg:scale-[0.97]', 'lg:opacity-85');
          } else {
            inner.classList.remove('border-[#C2C7CE]', 'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12)]', 'scale-100', 'opacity-100');
            inner.classList.add('border-[#E5E7EB]', 'shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]', 'lg:scale-[0.97]', 'lg:opacity-85');
          }
        }
      });
    }
  };

  // GSAP ScrollTrigger Master Pinned Horizontal Scrub
  useGSAP(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;
    const track = trackRef.current;
    if (!section || !trigger || !track) return;

    const mm = gsap.matchMedia();

    // Desktop: Pinned horizontal scrolling when viewport height >= 600px and width >= 1024px
    mm.add("(min-width: 1024px) and (min-height: 600px)", () => {
      const getDistance = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        return Math.max(0, trackWidth - viewportWidth + 96);
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          id: "projects-scroll-pin",
          trigger: trigger,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            // Calculate active index based on scroll progress
            const idx = Math.min(total - 1, Math.max(0, Math.floor(progress * total + 0.1)));
            updateActiveProjectUI(idx, progress);
            setActiveIdxState(idx);
          }
        }
      });

      // Smooth horizontal travel
      tl.to(track, {
        x: () => -getDistance(),
        ease: "none"
      });

      // Subtle parallax on project imagery
      const cards = gsap.utils.toArray<HTMLElement>('.premium-project-card');
      cards.forEach((card) => {
        const image = card.querySelector('.project-preview-image');
        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.05, xPercent: 4 },
            {
              scale: 1,
              xPercent: -4,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tl,
                start: "left right",
                end: "right left",
                scrub: true
              }
            }
          );
        }
      });
    });

    // Tablet / Mobile: Smooth entrance animation
    mm.add("(max-width: 1023px), (max-height: 599px)", () => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        onEnter: () => {
          gsap.from(".mobile-project-card", {
            y: 30,
            opacity: 0,
            stagger: 0.12,
            duration: 0.7,
            ease: "power3.out"
          });
        }
      });
    });

    return () => {
      mm.revert();
    };
  }, { scope: sectionRef });

  // Direct smooth scroll jump to specific project
  const scrollToProject = (targetIdx: number) => {
    if (targetIdx < 0 || targetIdx >= total) return;
    setActiveIdxState(targetIdx);

    if (window.innerWidth < 1024) {
      const track = trackRef.current;
      if (track) {
        const cards = track.querySelectorAll('.mobile-project-card');
        if (cards[targetIdx]) {
          cards[targetIdx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
          updateActiveProjectUI(targetIdx, targetIdx / (total - 1));
        }
      }
      return;
    }

    const trigger = triggerRef.current;
    if (!trigger) return;

    const st = ScrollTrigger.getById('projects-scroll-pin') || ScrollTrigger.getAll().find(s => s.trigger === trigger);
    if (st && st.start != null && st.end != null) {
      const totalDistance = st.end - st.start;
      const targetScroll = st.start + (targetIdx / (total - 1)) * totalDistance;
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    } else {
      const targetTop = trigger.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: targetTop + (targetIdx * 500),
        behavior: 'smooth'
      });
    }
  };

  const handleNext = () => {
    const nextIdx = Math.min(total - 1, activeProjectRef.current + 1);
    scrollToProject(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = Math.max(0, activeProjectRef.current - 1);
    scrollToProject(prevIdx);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-10 w-full bg-[#FFFFFF] text-[#111216] border-t border-[#EEF0F2] transition-colors duration-500 overflow-hidden"
    >
      {/* Subtle clean neutral surface gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-[#FAFBFC] to-white z-0" />

      {/* Subtle ambient grid pattern for architectural texture */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03] z-0" 
        style={{
          backgroundImage: 'radial-gradient(#111216 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* MAIN VIEWPORT CONTAINER — Pinned viewport on desktop, fluid swipe showcase on mobile */}
      <div 
        ref={triggerRef}
        className="relative z-10 w-full lg:h-screen lg:max-h-[920px] flex flex-col justify-between py-6 sm:py-8 lg:py-6 overflow-visible lg:overflow-hidden"
      >
        
        {/* ================= TOP HEADER BAR ================= */}
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 z-20 shrink-0 mb-3 sm:mb-4 lg:mb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 sm:pb-4 border-b border-[#EEF0F2]">
            
            {/* Left: Eyebrow + Section Heading */}
            <div>
              <div className="inline-flex items-center gap-2 mb-1.5">
                <span 
                  ref={accentDotRef}
                  className="w-2 h-2 rounded-full transition-colors duration-300 shadow-xs"
                  style={{ backgroundColor: FEATURED_PROJECTS[0].accentColor }}
                />
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-[#0096C7]">
                  SELECTED WORK / FEATURED PROJECTS
                </span>
                <span className="hidden md:inline-block text-[#C2C7CE]">•</span>
                <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F0F1F3] text-[10px] font-mono font-semibold tracking-wider text-[#626974]">
                  <Sparkles className="w-2.5 h-2.5 text-[#0096C7]" />
                  SCROLL TO EXPLORE
                </span>
              </div>

              <h2 className="font-heading font-black text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] text-[#111216] tracking-tight leading-tight">
                Real Problems.{' '}
                <span className="text-[#626974] font-bold">
                  Meaningful Solutions.
                </span>
              </h2>
            </div>

            {/* Right: Streamlined, Accessible Controls */}
            <div className="flex items-center gap-2.5 sm:gap-3 self-end sm:self-center">
              
              {/* Primary: Mechanical Rolling Counter */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F7F8FA] border border-[#E5E7EB] text-[#111216]">
                <span 
                  ref={counterTextRef}
                  className="text-xs font-mono font-bold tracking-wider text-[#111216]"
                >
                  01
                </span>
                <span className="text-xs font-mono text-[#8C939D]">/</span>
                <span className="text-xs font-mono text-[#8C939D]">
                  0{total}
                </span>
              </div>

              {/* Number Jump Pills (01 to 05) */}
              <div 
                ref={pillsContainerRef}
                className="hidden md:flex items-center gap-1 p-1 rounded-full bg-[#F7F8FA] border border-[#E5E7EB]"
                role="tablist"
                aria-label="Jump to project"
              >
                {FEATURED_PROJECTS.map((proj, idx) => (
                  <button
                    key={proj.id}
                    data-project-pill={idx}
                    onClick={() => scrollToProject(idx)}
                    aria-label={`Jump to ${proj.title}`}
                    role="tab"
                    aria-selected={activeIdxState === idx}
                    className={`w-7 h-7 rounded-full text-[11px] font-mono transition-all duration-200 flex items-center justify-center ${
                      idx === 0
                        ? 'bg-[#111216] text-white font-bold shadow-xs scale-105'
                        : 'text-[#626974] font-medium hover:text-[#111216] hover:bg-[#E5E7EB]'
                    }`}
                  >
                    {proj.number}
                  </button>
                ))}
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  disabled={activeIdxState === 0}
                  aria-label="Previous Project"
                  className={`w-8 h-8 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center text-[#111216] transition-all shadow-xs ${
                    activeIdxState === 0 
                      ? 'opacity-40 cursor-not-allowed' 
                      : 'hover:bg-[#111216] hover:text-white hover:border-[#111216]'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={activeIdxState === total - 1}
                  aria-label="Next Project"
                  className={`w-8 h-8 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center text-[#111216] transition-all shadow-xs ${
                    activeIdxState === total - 1 
                      ? 'opacity-40 cursor-not-allowed' 
                      : 'hover:bg-[#111216] hover:text-white hover:border-[#111216]'
                  }`}
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* ================= SHOWCASE HORIZONTAL TRACK ================= */}
        <div className="relative w-full overflow-hidden z-10 flex items-center my-auto">
          
          <div
            ref={trackRef}
            className="flex flex-row items-stretch gap-6 lg:gap-8 px-6 sm:px-10 lg:px-16 w-full lg:w-max will-change-transform overflow-x-auto lg:overflow-visible no-scrollbar snap-x snap-mandatory lg:snap-none pb-4 lg:pb-0"
          >
            {FEATURED_PROJECTS.map((project, index) => {
              const isFirst = index === 0;

              return (
                <div
                  key={project.id}
                  className="premium-project-card mobile-project-card w-[88vw] sm:w-[80vw] lg:w-[84vw] lg:max-w-[1220px] shrink-0 snap-center select-none"
                >
                  {/* Card Container: Crisp White with Subtle Border & Soft Shadow */}
                  <div 
                    className={`project-card-inner relative rounded-2xl sm:rounded-[24px] overflow-hidden border transition-all duration-500 bg-white ${
                      isFirst 
                        ? 'border-[#C2C7CE] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12)] scale-100 opacity-100' 
                        : 'border-[#E5E7EB] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] lg:scale-[0.97] lg:opacity-85'
                    }`}
                  >
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] lg:h-[calc(100vh-250px)] lg:max-h-[500px] lg:min-h-[440px]">
                      
                      {/* Left: 16:9 Artwork Stage (Col 7 - approx 58%) */}
                      <div 
                        className="lg:col-span-7 relative group overflow-hidden bg-[#F0F1F3] min-h-[260px] sm:min-h-[300px] lg:min-h-full border-b lg:border-b-0 lg:border-r border-[#EEF0F2]"
                        data-cursor-text="VIEW"
                      >
                        
                        <div className="w-full h-full overflow-hidden">
                          <img
                            src={project.previewImage}
                            alt={`${project.title} - ${project.category}`}
                            className="project-preview-image w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                            loading={index <= 1 ? "eager" : "lazy"}
                          />
                        </div>

                        {/* Top Overlay Badge */}
                        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#111216]/85 text-white backdrop-blur-md shadow-xs">
                            PROJECT {project.number} / 0{total}
                          </span>
                          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-white/90 text-[#111216] backdrop-blur-md shadow-xs border border-black/5">
                            <span 
                              className="w-1.5 h-1.5 rounded-full" 
                              style={{ backgroundColor: project.accentColor }} 
                            />
                            {project.category}
                          </span>
                        </div>

                        {/* Live App Quick Pill */}
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 text-[#111216] font-semibold text-xs shadow-md border border-black/5 hover:bg-white hover:scale-105 transition-all"
                          data-cursor-text="LIVE"
                        >
                          <span>Live App</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#0096C7]" />
                        </a>

                      </div>

                      {/* Right: Balanced Editorial Content Block (Col 5 - approx 42%) */}
                      <div className="lg:col-span-5 p-6 sm:p-7 lg:p-7 flex flex-col justify-between relative z-10 bg-white">
                        
                        <div>
                          {/* Eyebrow Category */}
                          <div className="flex items-center gap-2 mb-2">
                            <span 
                              className="w-1.5 h-1.5 rounded-full" 
                              style={{ backgroundColor: project.accentColor }} 
                            />
                            <span 
                              className="text-[11px] font-mono font-bold uppercase tracking-[0.2em]"
                              style={{ color: project.accentColor }}
                            >
                              {project.eyebrow}
                            </span>
                          </div>

                          {/* Large Project Name */}
                          <h3 className="font-heading font-black text-2xl sm:text-3xl lg:text-[32px] text-[#111216] tracking-tight leading-tight mb-2 sm:mb-2.5">
                            {project.title}
                          </h3>

                          {/* Technology Badges */}
                          <div className="flex flex-wrap gap-1.5 mb-3 sm:mb-3.5">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2.5 py-0.5 rounded-md bg-[#F0F1F3] text-[11px] font-medium text-[#17191E] border border-[#E5E7EB]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Concise Summary Description */}
                          <p className="text-[13px] sm:text-[14px] text-[#17191E] leading-relaxed font-normal mb-3">
                            {project.description}
                          </p>

                          {/* Verified Engineering Highlights — Eliminates large empty dead space */}
                          <div className="space-y-1.5 mb-4 p-3 rounded-xl bg-[#F7F8FA] border border-[#EEF0F2]">
                            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8C939D] mb-1">
                              Key Capabilities
                            </div>
                            {project.highlights.map((highlight, hIdx) => (
                              <div key={hIdx} className="flex items-start gap-2 text-[12px] text-[#626974] leading-snug">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#0096C7] shrink-0 mt-0.5" />
                                <span>{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Interactive Action CTAs with High-Contrast Cyan & GitHub Links */}
                        <div className="pt-3 border-t border-[#EEF0F2] flex flex-wrap items-center gap-3">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs sm:text-sm font-bold shadow-sm hover:gap-3 transition-all"
                            style={{
                              backgroundColor: project.accentColor,
                              boxShadow: `0 4px 14px ${project.accentGlow}`
                            }}
                            data-cursor-text="VISIT"
                          >
                            <span>Explore Platform</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>

                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#E5E7EB] text-[#111216] text-xs sm:text-sm font-semibold hover:bg-[#F7F8FA] hover:border-[#C2C7CE] transition-all shadow-xs"
                            data-cursor-text="CODE"
                          >
                            <GithubIcon className="w-3.5 h-3.5 text-[#626974]" />
                            <span>Source Code</span>
                          </a>
                        </div>

                      </div>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* ================= BOTTOM PROGRESS & STATUS BAR ================= */}
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 z-20 shrink-0 mt-3 sm:mt-4 lg:mt-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#EEF0F2]">
            
            {/* Interaction helper */}
            <div className="flex items-center gap-2 text-[#747B85] text-[11px] font-mono">
              <span className="inline-block w-2 h-2 rounded-full border border-[#0096C7] bg-[#0096C7]/20" />
              <span className="hidden sm:inline">VERTICAL SCROLL CONTROLS HORIZONTAL SHOWCASE</span>
              <span className="sm:hidden">SWIPE OR SCROLL TO NAVIGATE PROJECTS</span>
            </div>

            {/* Segmented Timeline Tracker */}
            <div className="flex items-center gap-2 flex-1 max-w-md sm:mx-6">
              <div className="relative w-full h-1 bg-[#EEF0F2] rounded-full overflow-hidden">
                <div 
                  ref={progressBarRef}
                  className="h-full rounded-full transition-all duration-200"
                  style={{
                    width: '20%',
                    backgroundColor: FEATURED_PROJECTS[0].accentColor,
                  }}
                />
              </div>
            </div>

            {/* Active Project Title Indicator */}
            <div className="text-right">
              <span className="text-[11px] font-mono text-[#8C939D] uppercase mr-2">CURRENT:</span>
              <span 
                ref={activeTitleTextRef}
                className="text-xs font-heading font-bold text-[#111216] transition-colors duration-300"
                style={{ color: FEATURED_PROJECTS[0].accentColor }}
              >
                {FEATURED_PROJECTS[0].title}
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
