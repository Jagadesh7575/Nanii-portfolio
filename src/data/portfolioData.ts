export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  liveUrl: string;
  tags: string[];
  description: string;
  fullDescription: string;
  previewImage: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: { name: string; level?: string; icon?: string }[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  duration?: string;
  status: 'Completed' | 'In Progress';
  certificateId?: string;
  certificatePdf?: string;
  certificateImage?: string;
  certificates?: {
    title: string;
    id: string;
    image: string;
    pdfUrl: string;
  }[];
  description: string[];
  skills: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  status: string;
  grade?: string;
  focus?: string;
  highlights: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  category: 'Hackathon' | 'Internship' | 'Technical' | 'Simulation';
  image: string;
  pdfUrl?: string;
  verifyUrl?: string;
  certificateId?: string;
  featured?: boolean;
}

export const PERSONAL_INFO = {
  fullName: "S. Jagadeshwar Reddy",
  formalName: "Saanikommu Jagadeshwar Reddy",
  title: "Full Stack Developer & AI Enthusiast",
  headlineEyebrow: "BUILDING IDEAS FOR A SMARTER TOMORROW",
  heroBio: "I build modern web applications and AI-driven solutions that solve real-world problems. Passionate about technology, meaningful impact, and continuous learning.",
  aboutIntro: "Driven by curiosity, engineered with precision.",
  aboutStory: "I am a dedicated B.Tech Information Technology student at NRI Institute of Technology with an unwavering focus on building production-grade software applications and exploring cutting-edge AI architectures. I transform intricate product concepts into intuitive, high-performance web experiences.",
  ambition: "My long-term ambition is to build a technology company that creates meaningful products and solves real-world problems.",
  email: "jktech7575@gmail.com",
  phone: "+91 90147 59768",
  location: "Vijayawada, Andhra Pradesh, India",
  github: "https://github.com/Jagadesh7575",
  linkedin: "https://www.linkedin.com/in/jagadeshwarreddy-saanikommu-886622333/",
  resumePdf: "/assets/resume/S_Jagadeshwar_Reddy_Resume.pdf",
  resumeDocx: "/assets/resume/S_Jagadeshwar_Reddy_Resume.docx",
  heroPortrait: "/assets/portraits/hero/portrait_hero_cutout.png",
  aboutPortrait: "/assets/portraits/supporting/portrait_standing_cutout.png"
};

export const PROJECTS: ProjectItem[] = [
  {
    id: "drug-scope-ai",
    number: "01",
    title: "Drug Scope AI",
    liveUrl: "https://drugs-scope-ai.vercel.app/",
    tags: ["AI/ML", "Healthcare", "Bio-Research"],
    description: "AI-powered drug discovery and molecular research platform for precision biochemical analysis.",
    fullDescription: "An AI-oriented biomedical research platform featuring medicine search, drug-drug interaction detection, 3D molecular structure visualization, and automated scientific evidence review dossiers.",
    previewImage: "/assets/projects/drug_scope_cinematic.jpg"
  },
  {
    id: "roadrisk-ai",
    number: "02",
    title: "RoadRisk AI",
    liveUrl: "https://roadrisk-ai.vercel.app/",
    tags: ["Computer Vision", "Deep Learning", "Traffic Safety"],
    description: "Real-time AI roadway risk detection system for accident mitigation and route risk assessment.",
    fullDescription: "Intelligent road risk assessment and accident-zone analysis system with interactive geospatial basemaps, hazard identification, and live transit safety alerts.",
    previewImage: "/assets/projects/roadrisk_cinematic.jpg"
  },
  {
    id: "orvix",
    number: "03",
    title: "ORVIX",
    liveUrl: "https://nanii-orvix.vercel.app/",
    tags: ["Real-Time Chat", "Supabase", "Full Stack"],
    description: "Private real-time messaging platform with end-to-end security, instant presence, and theme personalization.",
    fullDescription: "Real-time private communication and analytical workflow platform featuring encrypted messaging channels, unread indicators, authentication, and Supabase integration.",
    previewImage: "/assets/projects/orvix_cinematic.jpg"
  },
  {
    id: "solara",
    number: "04",
    title: "SOLARA",
    liveUrl: "https://nanii-solara.vercel.app/",
    tags: ["Smartwatch", "Solar Tech", "Hardware/IoT"],
    description: "Intelligent solar-powered smartwatch platform with real-time solar harvesting efficiency and telemetry.",
    fullDescription: "High-end product showcase for solar-powered wearable technology, featuring dynamic battery optimization analytics, telemetry views, and solar charging efficiency models.",
    previewImage: "/assets/projects/solara_cinematic.jpg"
  },
  {
    id: "heliowatch",
    number: "05",
    title: "HelioWatch",
    liveUrl: "https://nanii-heliowatch.vercel.app/",
    tags: ["E-Commerce", "Smart Wearables", "Solar Tech"],
    description: "Premium solar-powered smartwatch experience engineered with sustainable design and smart telemetry.",
    fullDescription: "E-commerce and interactive showcase for advanced smartwatches, blending technical telemetry with fluid shopping workflows, specifications comparison, and responsive design.",
    previewImage: "/assets/projects/heliowatch_cinematic.jpg"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Programming Languages",
    description: "Foundational & systems programming languages",
    skills: [
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "C" },
      { name: "Python (Basics)" }
    ]
  },
  {
    category: "Frontend Development",
    description: "Modern UI architecture and reactive engineering",
    skills: [
      { name: "React.js" },
      { name: "Vite" },
      { name: "Tailwind CSS" },
      { name: "Responsive Design" },
      { name: "DOM Manipulation" },
      { name: "UI Micro-Interactions" }
    ]
  },
  {
    category: "Backend & Databases",
    description: "Scalable data storage and real-time backend services",
    skills: [
      { name: "Supabase" },
      { name: "Firebase" },
      { name: "PostgreSQL" },
      { name: "User Authentication" },
      { name: "CRUD APIs" },
      { name: "RESTful Endpoints" }
    ]
  },
  {
    category: "Tools & Platforms",
    description: "Version control and production deployment ecosystems",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "VS Code" },
      { name: "Vercel" },
      { name: "Figma" },
      { name: "Chrome DevTools" }
    ]
  },
  {
    category: "AI & Innovation Workflows",
    description: "AI-assisted engineering and rapid prototyping",
    skills: [
      { name: "Prompt Engineering" },
      { name: "AI Integration" },
      { name: "GenAI Workflow" },
      { name: "Model Integration" },
      { name: "Autonomous Agents" }
    ]
  },
  {
    category: "Core Strengths",
    description: "Professional practices and engineering discipline",
    skills: [
      { name: "Clean Code & Scalability" },
      { name: "Problem Solving" },
      { name: "UI Craftsmanship" },
      { name: "Continuous Learning" },
      { name: "Independent Execution" }
    ]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "flyrank",
    company: "FlyRank AI",
    role: "Technical Contributor",
    period: "Ongoing / Active",
    status: "In Progress",
    description: [
      "Actively engaged in technical development workflows and AI platform contributions.",
      "Collaborating on cutting-edge software solutions and engineering practices."
    ],
    skills: ["AI Engineering", "Web Technologies", "System Architecture"]
  },
  {
    id: "codsoft",
    company: "CodSoft",
    role: "Web Development Intern",
    period: "20 Jun 2026 – 20 Jul 2026",
    duration: "4 Weeks Virtual Program",
    status: "Completed",
    certificateId: "ac97b84",
    certificatePdf: "/assets/certificates/CodeSoft.pdf",
    certificateImage: "/assets/certificates/CodeSoft.pdf.png",
    description: [
      "Completed a rigorous 4-week virtual web development internship program.",
      "Developed responsive interfaces, modern UI components, and integrated client-side logic with exemplary feedback.",
      "Awarded official Certificate of Completion on 21/07/2026 (Certificate ID: ac97b84)."
    ],
    skills: ["Web Development", "HTML5", "CSS3", "JavaScript", "Responsive Design"]
  },
  {
    id: "istudio",
    company: "Internship Studio (iStudio)",
    role: "Website Design & Development Intern",
    period: "Completed 8 June 2026",
    duration: "Intensive Internship",
    status: "Completed",
    certificateId: "ISWDI3223674 & ISWDT3223674",
    certificatePdf: "/assets/certificates/internship_studio.pdf",
    certificateImage: "/assets/certificates/internship_studio_doc.png",
    certificates: [
      {
        title: "Certificate of Internship — Website Design & Development",
        id: "ISWDI3223674",
        image: "/assets/certificates/internship_studio_doc.png",
        pdfUrl: "/assets/certificates/internship_studio.pdf"
      },
      {
        title: "Certificate of Training — Website Design & Development",
        id: "ISWDT3223674",
        image: "/assets/certificates/internship_studio_training.png",
        pdfUrl: "/assets/certificates/internship_studio_training.pdf"
      }
    ],
    description: [
      "Completed comprehensive training and practical project delivery on Website Design and Development.",
      "Engineered polished user interfaces focusing on semantic structure, cross-device usability, and clean styling standards.",
      "Awarded official Certificate of Internship (ISWDI3223674) and Certificate of Training (ISWDT3223674) under mentor Atul Yadav."
    ],
    skills: ["UI/UX Design", "Web Architecture", "Frontend Usability", "HTML5", "CSS3"]
  }
];

export const EDUCATION: EducationItem[] = [
  {
    degree: "Bachelor of Technology — Information Technology",
    institution: "NRI Institute of Technology, Vijayawada, Andhra Pradesh",
    period: "2024 – 2028",
    status: "Pursuing",
    grade: "CGPA: 8.20 / 10.0",
    highlights: [
      "Core focus on Full Stack Development, Data Structures, Algorithms, Database Systems, and Artificial Intelligence.",
      "Active participant in technical hackathons, national workshops, and coding club initiatives."
    ]
  },
  {
    degree: "Intermediate Education (MPC)",
    institution: "Board of Intermediate Education, Andhra Pradesh",
    period: "2022 – 2024",
    status: "Completed",
    focus: "Mathematics, Physics & Chemistry",
    highlights: [
      "Strong analytical foundation in higher mathematics, analytical physics, and chemistry."
    ]
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Board of Secondary Education, Andhra Pradesh",
    period: "2022",
    status: "Completed",
    highlights: [
      "Graduated with foundational excellence in science and mathematical reasoning."
    ]
  }
];

export const CERTIFICATES: CertificateItem[] = [
  {
    id: "istudio-internship",
    title: "Certificate of Internship — Website Design & Development",
    issuer: "Internship Studio (iStudio)",
    date: "June 08, 2026",
    category: "Internship",
    image: "/assets/certificates/internship_studio_doc.png",
    pdfUrl: "/assets/certificates/internship_studio.pdf",
    certificateId: "ISWDI3223674",
    featured: true
  },
  {
    id: "istudio-training",
    title: "Certificate of Training — Website Design & Development",
    issuer: "Internship Studio (iStudio)",
    date: "June 08, 2026",
    category: "Internship",
    image: "/assets/certificates/Internship studio 1.pdf.png",
    pdfUrl: "/assets/certificates/internship_studio_training.pdf",
    certificateId: "ISWDT3223674",
    featured: true
  },
  {
    id: "codsoft-cert",
    title: "Web Development Internship Certificate of Completion",
    issuer: "CodSoft",
    date: "July 21, 2026",
    category: "Internship",
    image: "/assets/certificates/CodeSoft.pdf.png",
    pdfUrl: "/assets/certificates/CodeSoft.pdf",
    certificateId: "ac97b84",
    featured: true
  },
  {
    id: "quantum-computing",
    title: "5-Day Workshop & Hackathon on Quantum Computing",
    issuer: "Brainovision, NRIIT, AICTE, T-Hub & NASSCOM",
    date: "September 06, 2025",
    category: "Hackathon",
    image: "/assets/certificates/Quantum COmputing.pdf.png",
    pdfUrl: "/assets/certificates/Quantum COmputing.pdf",
    featured: true
  },
  {
    id: "astra-hackathon",
    title: "ASTRA Hackathon 2026 — Certificate of Participation",
    issuer: "Coding Club, NRI Institute of Technology & MTX Technology Partner",
    date: "September 21, 2026",
    category: "Hackathon",
    image: "/assets/certificates/astra_hackathon.svg",
    featured: true
  },
  {
    id: "nptel-privacy-security",
    title: "Privacy and Security in Online Social Media — Examination Credential",
    issuer: "NPTEL / IIT (SWAYAM)",
    date: "October 24, 2026",
    category: "Technical",
    image: "/assets/certificates/nptel_privacy_security.svg",
    featured: true
  },
  {
    id: "blockchain-cert",
    title: "Developing with Blockchain — Certificate of Completion",
    issuer: "Skillsoft",
    date: "March 27, 2026",
    category: "Technical",
    image: "/assets/certificates/Developing with Blockchain.pdf.png",
    pdfUrl: "/assets/certificates/Developing with Blockchain.pdf",
    featured: false
  },
  {
    id: "python-cert",
    title: "Basics of Python — Course Completion Certificate",
    issuer: "Infosys Springboard / Digital Academy",
    date: "March 15, 2026",
    category: "Technical",
    image: "/assets/certificates/infosys.jpeg",
    verifyUrl: "https://validate.onwingspan.com",
    featured: false
  },
  {
    id: "tata-genai",
    title: "GenAI Powered Data Analytics Job Simulation",
    issuer: "TATA / Forage",
    date: "March 15, 2026",
    category: "Simulation",
    image: "/assets/certificates/Gen Ai.pdf.png",
    pdfUrl: "/assets/certificates/Gen Ai.pdf",
    certificateId: "69b62fe64f7523947dccea1f",
    featured: false
  },
  {
    id: "jpmorgan-swe",
    title: "Software Engineering Job Simulation",
    issuer: "JPMorgan Chase & Co. / Forage",
    date: "March 15, 2026",
    category: "Simulation",
    image: "/assets/certificates/software engineering.pdf.png",
    pdfUrl: "/assets/certificates/software engineering.pdf",
    certificateId: "69b62fe64f7523947dccea1f",
    featured: false
  },
  {
    id: "jj-robotics",
    title: "Robotics and Controls Job Simulation",
    issuer: "Johnson & Johnson MedTech / Forage",
    date: "March 15, 2026",
    category: "Simulation",
    image: "/assets/certificates/robotics and controls.pdf.png",
    pdfUrl: "/assets/certificates/robotics and controls.pdf",
    certificateId: "69b62fe64f7523947dccea1f",
    featured: false
  },
  {
    id: "forage-resume",
    title: "Resume Writing with AI Support Job Simulation",
    issuer: "Forage Foundations",
    date: "March 15, 2026",
    category: "Simulation",
    image: "/assets/certificates/resume with ai support.pdf.png",
    pdfUrl: "/assets/certificates/resume with ai support.pdf",
    certificateId: "69b62fe64f7523947dccea1f",
    featured: false
  }
];
