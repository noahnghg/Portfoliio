'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TypingAnimation from '../components/TypingAnimation';
import CodeEditor from '../components/CodeEditor';
import Section from '../components/Section';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
  type?: string;
  status?: string;
  demo?: string;
  featured?: boolean;
  inProgress?: boolean;
}

const Home = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [showCodeEditor, setShowCodeEditor] = useState(false);

  // Lock scroll until intro animation (buttons) is complete
  React.useEffect(() => {
    if (!showButtons) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden'; // Ensure both body and html are locked
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [showButtons]);

  // --- Data from About Page ---
  const skills = {
    "Frontend": ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    "Backend": ["Python", "Go", "Flask", "FastAPI", "Express.js"],
    "Database": ["PostgreSQL", "MySQL", "MongoDB", "Prisma"],
    "Machine Learning": ["Scikit-learn", "PyTorch"],
    "Data Science": ["Numpy", "Pandas", "Scikit-learn", "Power BI", "Tableau"],
    "Tools/Cloud": ["Git", "Docker", "AWS", "Vercel", "Figma", "VS Code", "IntelliJ"]
  };

  const shieldBadges: Record<string, string> = {
    "React": "https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB",
    "Next.js": "https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white",
    "TypeScript": "https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white",
    "Tailwind CSS": "https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white",
    "Python": "https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white",
    "Go": "https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white",
    "Flask": "https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white",
    "FastAPI": "https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white",
    "Express.js": "https://img.shields.io/badge/Express.js-404D59?style=for-the-badge",
    "PostgreSQL": "https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white",
    "MySQL": "https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white",
    "MongoDB": "https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white",
    "Prisma": "https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white",
    "Scikit-learn": "https://img.shields.io/badge/scikit_learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white",
    "PyTorch": "https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white",
    "Numpy": "https://img.shields.io/badge/Numpy-779072?style=for-the-badge&logo=numpy&logoColor=white",
    "Pandas": "https://img.shields.io/badge/Pandas-2C2D72?style=for-the-badge&logo=pandas&logoColor=white",
    "Power BI": "https://img.shields.io/badge/Power_BI-F2C811?style=for-the-badge&logo=power-bi&logoColor=black",
    "Tableau": "https://img.shields.io/badge/Tableau-E97627?style=for-the-badge&logo=tableau&logoColor=white",
    "Git": "https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white",
    "Docker": "https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white",
    "AWS": "https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white",
    "Vercel": "https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white",
    "Figma": "https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white",
    "VS Code": "https://img.shields.io/badge/VS_Code-0078D4?style=for-the-badge&logo=visual-studio-code&logoColor=white",
    "IntelliJ": "https://img.shields.io/badge/IntelliJ_IDEA-000000?style=for-the-badge&logo=intellij-idea&logoColor=white",
    "Databricks": "https://img.shields.io/badge/Databricks-FF3621?style=for-the-badge&logo=databricks&logoColor=white",
    "PySpark": "https://img.shields.io/badge/PySpark-E25A1C?style=for-the-badge&logo=apache-spark&logoColor=white",
    "XGBoost": "https://img.shields.io/badge/XGBoost-151?style=for-the-badge&logo=xgboost&logoColor=white",
    "MLflow": "https://img.shields.io/badge/MLflow-0194E2?style=for-the-badge&logo=mlflow&logoColor=white",
    "LangGraph": "https://img.shields.io/badge/LangGraph-000000?style=for-the-badge&logo=langchain&logoColor=white",
    "LlamaIndex": "https://img.shields.io/badge/LlamaIndex-121212?style=for-the-badge&logo=llamaindex&logoColor=white",
    "ChromaDB": "https://img.shields.io/badge/ChromaDB-FEA62E?style=for-the-badge&logo=chroma&logoColor=white",
    "Gemini": "https://img.shields.io/badge/Gemini-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white",
    "OAuth": "https://img.shields.io/badge/OAuth-EB5424?style=for-the-badge&logo=auth0&logoColor=white",
    "Airflow": "https://img.shields.io/badge/Apache%20Airflow-017CEE?style=for-the-badge&logo=apache-airflow&logoColor=white",
    "Streamlit": "https://img.shields.io/badge/Streamlit-FF4B4B?style=for-the-badge&logo=streamlit&logoColor=white",
    "Supabase": "https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white",
    "Java": "https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white",
    "Spring Boot": "https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white",
    "spaCy": "https://img.shields.io/badge/spaCy-09A3D5?style=for-the-badge&logo=spacy&logoColor=white",
    "Hugging Face": "https://img.shields.io/badge/Hugging%20Face-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black",
    "SQLite": "https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white",
    "Plaid API": "https://img.shields.io/badge/Plaid-000000?style=for-the-badge&logo=plaid&logoColor=white",
    "LangChain.js": "https://img.shields.io/badge/LangChain.js-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white",
    "Golang": "https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white"
  };

  const education = [
    {
      institution: "University of Calgary",
      degree: "Bachelor of Science in Computer Science",
      period: "2023 - 2027 (Expected)",
      gpa: "3.6/4.0",
      activities: ["Computer Science Club", "Hackathon"],
      coursework: ["Data Structures & Algorithms", "Java OOP Design", "Operating Systems", "Database Systems", "Machine Learning", "Web Based Systems"],
      achievements: ["Dean's List 2023-2024"],
      description: "Focused on Software Engineering, Machine Learning, and Data Science",
      logo: "/about/uofc.png"
    },
    {
      institution: "Garibaldi Secondary School",
      degree: "High School Diploma / IB Diploma",
      period: "2021-2023",
      gpa: "3.8/4.0",
      activities: ["Math Club", "Mathematics Contests"],
      achievements: ["Top IB Math 12 Student 100% final grade", "1st Place in BC Secondary School Math Contest 2022 UofV", "Several medals in UWaterloo Math Contests for grade 11, 12"],
      description: "I went study abroad in Canada since grade 11, finishing with IB Diploma and a Dogwood Diploma.",
      logo: "/about/gss.png",
      logo2: "/about/ib.png"
    },
    {
      institution: "Le Hong Phong High School for the Gifted",
      degree: "Grade 10 Specialized in Mathematics",
      period: "2020-2021",
      gpa: "8.9/10",
      logo: "/about/lhp.png"
    }
  ];

  const experience = [
    {
      title: "Software Engineer Intern",
      company: "FPT Software",
      period: "July 2025 - September 2025",
      description: "built deep learning based car inspection system",
      logo: "/about/FPT_Software_logo.webp"
    },
    {
      title: "Odoo Software Developer Internship",
      company: "Leonix Vietnam",
      period: "June 2022 - August 2022",
      description: "customized core ERP modules such as CRM, Sales, etc., and integrates AI into those",
      logo: "/about/Leonix_Vietnam.png"
    },
  ];

  // --- Data from Data/ML Page ---
  const dataProjects: Project[] = [
    {
      id: 1,
      title: "Financial Fraud Detection Pipeline",
      description: "Architected a robust financing fraud detection system using Databricks Medallion Architecture and PySpark Structured Streaming. Engineered an XGBoost model handling extreme class imbalance (<0.1% fraud) with 0.92 AUPRC, utilizing MLflow and Unity Catalog for governance.",
      image: "/projects/fraud-detection.png",
      tech: ["Databricks", "PySpark", "XGBoost", "MLflow", "Scikit-Learn"],
      github: "https://github.com/noahnghg/financial-fraud-detection",
      type: "Classification",
      status: "Completed"
    },
    {
      id: 2,
      title: "Aegis: Multi-agent Assistant",
      description: "Multi-agent orchestration system using LangGraph and Gemini for HITL workflows. Features a RAG pipeline with LlamaIndex/ChromaDB for semantic search over unstructured PDFs, and a full-stack App with FastAPI/Next.js.",
      image: "/projects/aegis.png",
      tech: ["LangGraph", "LlamaIndex", "ChromaDB", "Gemini", "FastAPI", "Next.js", "OAuth"],
      github: "https://github.com/noahnghg/aegis",
      type: "NLP",
      status: "Completed"
    },
    {
      id: 3,
      title: "Financial Price & Sentiment Data Pipeline",
      description: "End-to-end MLOps pipeline automating stock price model lifecycle with Airflow and Docker. Features a custom LSTM network (PyTorch) fusing OHLCV data with sentiment analysis, and an inference API (FastAPI) with Streamlit dashboard.",
      image: "/projects/financial-pipe.png",
      tech: ["PyTorch", "Airflow", "Docker", "PostgreSQL", "FastAPI", "MLflow", "Streamlit"],
      github: "https://github.com/noahnghg/financial-price-sentiment-pipeline",
      type: "Time Series",
      status: "Completed"
    },

  ];

  // --- Data from Software Page ---
  const softwareProjects: Project[] = [
    {
      id: 201, // New ID for Deep Notes
      title: "Deep Notes",
      description: "An Obsidian plugin that helps deepening the understanding of the notes. Built with RAG, vector embeddings, and semantic search.",
      image: "/projects/deep-notes.png",
      tech: ["TypeScript", "Obsidian API", "RAG", "Vector Embeddings", "Semantic Search"],
      github: "https://github.com/noahnghg/DeepNotes",
      type: "Obsidian Plugin",
      status: "February 2026",
      featured: true
    },
    {
      id: 105,
      title: "BMATS",
      description: "A web app that integrates an NLP pipeline to anonymyze applicant's information, addressing the biased hiring problem. Hackathon project for Hack the Bias 2026.",
      image: "/projects/bmats-ai.png",
      tech: ["Python", "FastAPI", "spaCy", "Hugging Face", "SQLite", "React"],
      github: "https://github.com/noahnghg/bmats",
      type: "Hackathon",
      status: "Completed",
      featured: true
    },
    {
      id: 106,
      title: "WiseXpense",
      description: "A smart fintech platform allowing users to track their budget, credit, and expenses with the help of machine learning and AI.",
      image: "/projects/wisexpense.png",
      tech: ["Java", "Spring Boot", "PostgreSQL", "Python", "FastAPI", "Golang", "Plaid API", "Docker", "React"],
      github: "https://github.com/noahnghg/wisexpense",
      status: "Ongoing",
      featured: true
    },
    {
      id: 107,
      title: "CampusPlug",
      description: "A marketplace platform for students with authentication and a recommendation engine. Class project for CPSC 471.",
      image: "/projects/campusplug.png",
      tech: ["Express.js", "MySQL", "React", "Python", "Flask", "Scikit-learn"],
      github: "https://github.com/noahnghg/campusplug",
      type: "Class Project",
      status: "Completed",
      featured: true
    },
    {
      id: 108,
      title: "CoFocus",
      description: "A collaborative productivity platform. Ongoing SENG 513 project.",
      image: "/projects/cofocus.png",
      tech: ["Express.js", "TypeScript", "React", "Supabase", "PostgreSQL", "LangChain.js", "Docker"],
      github: "https://github.com/noahnghg/cofocus",
      type: "SENG 513",
      status: "Ongoing",
      featured: true
    }
  ];

  const allProjects: Project[] = [...dataProjects, ...softwareProjects];

  return (
    <main className="min-h-screen">
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-force {
          display: flex;
          width: max-content;
          animation: marquee 20s linear infinite;
        }
      `}</style>
      {/* Background Pattern - Global */}
      {/* Background Pattern - Global */}
      <div className="fixed inset-0 bg-shiny-dark animate-gradient-xy -z-20" style={{ background: 'linear-gradient(-45deg, #0f172a, #1e293b, #0f172a, #334155)', backgroundSize: '400% 400%' }}></div>
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#87ceeb1a_1px,transparent_1px),linear-gradient(to_bottom,#87ceeb1a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10 pointer-events-none"></div>

      {/* Hero Section */}
      <section id="home" className="hero min-h-screen relative overflow-hidden overflow-x-hidden flex items-center justify-center">
        {/* Ambient glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-blue/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pale-blue/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="hero-content text-center relative z-10 w-full max-w-full px-2 sm:px-4 md:px-6">
          <div className="max-w-4xl w-full mx-auto">
            {/* Animated greeting */}
            <div className="mb-4 sm:mb-6 px-4 sm:px-0">
              <TypingAnimation
                text="noahnghg.dev.portfolio"
                speed={50}
                className="text-xs sm:text-sm font-medium text-sky-blue bg-sky-blue/20 px-2 sm:px-3 py-1 rounded-full inline-block border border-sky-blue/40"
                showCursor={false}
                onComplete={() => { }}
              />
            </div>

            {/* Main heading */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-soft-blue bg-clip-text px-4 sm:px-0 text-transparent">
              <TypingAnimation
                text="Nguyen Hong Anh Khoa"
                speed={80}
                delay={1000}
                showCursor={false}
                onComplete={() => setShowCodeEditor(true)}
              />
            </h1>

            {/* Code Editor */}
            {showCodeEditor && (
              <div className="animate-fade-in-up mb-6 sm:mb-8 px-0 sm:px-4 md:px-0 w-full max-w-full overflow-hidden">
                <CodeEditor
                  delay={500}
                  onComplete={() => setShowButtons(true)}
                />
              </div>
            )}


          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <Section id="about" className="py-20 px-8 relative z-10">
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Thinking / About Content */}
            <div className="order-2 lg:order-1 flex-1 min-w-0">
              <div className="mb-6">
                <span className="text-sm font-medium text-sky-blue bg-sky-blue/20 px-3 py-1 rounded-full inline-block border border-sky-blue/40 mb-4">
                  noahnghg.about
                </span>
                <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-soft-blue bg-clip-text text-transparent">
                  I'm Noah
                </h2>
                <div className="space-y-4 text-base sm:text-lg text-white/80 leading-relaxed">
                  <p>
                    A current university student wants to develop solutions that solve my own pain points and share those solutions.
                  </p>
                  <p>
                    I enjoy applying technology that I learn to solve my own problems. I believe the solution to my own problems could some day be an innovative solutions. And the fact that I can apply what I have learned and built into my own life is amazing as a Computer Science student, it makes me feel more in love with this major.
                  </p>
                </div>

                {/* Skills with Shield Badges - Marquee Carousel */}
                <div className="mt-8 overflow-hidden relative group max-w-full">
                  <h3 className="text-xl font-bold text-white mb-4">Skills & Technologies</h3>

                  {/* Gradient masks for smooth fade edges */}
                  <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-slate-900 to-transparent z-10"></div>
                  <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-slate-900 to-transparent z-10"></div>

                  <div className="flex animate-marquee-force whitespace-nowrap">
                    {/* First copy of logos */}
                    <div className="flex gap-4 pr-4">
                      {Array.from(new Set(Object.values(skills).flat())).map((tech) => (
                        shieldBadges[tech] ? (
                          <img key={`tech-1-${tech}`} src={shieldBadges[tech]} alt={tech} className="h-8 hover:scale-110 transition-transform cursor-pointer" />
                        ) : (
                          <span key={`tech-1-${tech}`} className="badge bg-sky-blue/20 border-sky-blue/40 text-sky-blue whitespace-nowrap">{tech}</span>
                        )
                      ))}
                    </div>
                    {/* Second copy for seamless loop */}
                    <div className="flex gap-4 pr-4">
                      {Array.from(new Set(Object.values(skills).flat())).map((tech) => (
                        shieldBadges[tech] ? (
                          <img key={`tech-2-${tech}`} src={shieldBadges[tech]} alt={tech} className="h-8 hover:scale-110 transition-transform cursor-pointer" />
                        ) : (
                          <span key={`tech-2-${tech}`} className="badge bg-sky-blue/20 border-sky-blue/40 text-sky-blue whitespace-nowrap">{tech}</span>
                        )
                      ))}
                    </div>
                  </div>
                </div>


              </div>
            </div>

            {/* Profile Image */}
            <div className="order-1 lg:order-2">
              <div className="relative max-w-sm mx-auto lg:max-w-none w-72 h-72 lg:w-96 lg:h-96">
                <div className="aspect-square rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 p-1 transform rotate-3 hover:rotate-0 transition-all duration-500">
                  <Image
                    src="/lofi_pic.png"
                    alt="Noah N."
                    width={400}
                    height={400}
                    className="w-full h-full object-cover rounded-2xl sm:rounded-3xl bg-slate-700"
                  />
                </div>
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-sky-blue/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pale-blue/20 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Experience & Education Section */}
      <Section id="experience" className="py-20 px-4 sm:px-8 relative z-10 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-white to-soft-blue bg-clip-text text-transparent">
            Experience & Education
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Education Column */}
            <div>
              <h3 className="text-2xl font-bold text-sky-blue mb-6 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>
                Education
              </h3>
              <div className="space-y-8">
                {education.map((edu, index) => (
                  <div key={index} className="pl-4 border-l-2 border-sky-blue/30 relative">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-sky-blue"></div>
                    <h4 className="text-xl font-bold text-white">{edu.institution}</h4>
                    <p className="text-soft-blue font-medium">{edu.degree}</p>
                    <p className="text-sm text-gray-400 mb-2">{edu.period}</p>
                    {edu.gpa && <p className="text-sm text-green-400 mb-2">GPA: {edu.gpa}</p>}
                    {edu.description && <p className="text-white/70 text-sm">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Column */}
            <div>
              <h3 className="text-2xl font-bold text-soft-blue mb-6 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Experience
              </h3>
              <div className="space-y-8">
                {experience.map((exp, index) => (
                  <div key={index} className="pl-4 border-l-2 border-soft-blue/30 relative">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-soft-blue"></div>
                    <h4 className="text-xl font-bold text-white">{exp.title}</h4>
                    <p className="text-sky-blue font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-400 mb-2">{exp.period}</p>
                    <p className="text-white/70 text-sm">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" className="py-20 px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-soft-blue bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              A selection of my work in Software Engineering, Data Science, and Machine Learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProjects.map((project, index) => (
              <div key={`${project.title}-${index}`} className="card bg-slate-800/50 border border-sky-blue/20 hover:border-sky-blue/50 transition-all duration-300 hover:-translate-y-2 group overflow-hidden">
                <figure className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {project.type && (
                    <span className="absolute top-2 right-2 badge badge-sm bg-black/50 text-white border-none backdrop-blur-md">
                      {project.type}
                    </span>
                  )}
                </figure>
                <div className="card-body p-6">
                  <h3 className="card-title text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-white/60 text-sm mb-4 line-clamp-3">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      shieldBadges[tech] ? (
                        <img key={tech} src={shieldBadges[tech]} alt={tech} className="h-6" />
                      ) : (
                        <span key={tech} className="text-xs px-2 py-1 rounded bg-sky-blue/10 text-sky-blue border border-sky-blue/20">
                          {tech}
                        </span>
                      )
                    ))}
                  </div>

                  <div className="card-actions mt-auto flex gap-3">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                        <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" className="h-8" />
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                        <img src="https://img.shields.io/badge/Live_Demo-FF5722?style=for-the-badge&logo=vercel&logoColor=white" alt="Demo" className="h-8" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-8 text-center text-white/40 text-sm relative z-10 bg-slate-900 border-t border-white/5">
        <p>&copy; {new Date().getFullYear()} Nguyen Hong Anh Khoa. Built with Next.js & Tailwind CSS.</p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="https://github.com/noahnghg" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/noahnghg" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="mailto:noahnghgwork@gmail.com" className="hover:text-white transition-colors">Email</a>
        </div>
      </footer>
    </main>
  );
};

export default Home;