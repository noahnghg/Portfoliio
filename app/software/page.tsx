'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TypingAnimation from '../../components/TypingAnimation';

const Software = () => {
  const [showDescription, setShowDescription] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const projects = [
    {
      id: 1,
      title: "LifeSync",
      description: "This is my first, beginner project that I built to solve my own needs. It's a simple CRUD web app that integrates Gemini API for managing every aspects in life from tasks, schedules, goals, finance and more.",
      image: "/software/lifesync.png",
      tech: ["React", "TypeScript", "Python", "Flask", "MongoDB"],
      github: "https://github.com/noahnghg/LifeSync",
      demo: "https://demo.com",
      featured: false
    },
    {
      id: 2,
      title: "FinAInce",
      description: "A smart finance tracker web app that integrates deep learning models into managing your financial situation.",
      image: "/software/springboot.png",
      tech: ["Next.js", "Java", "Spring Boot",  "PostgreSQL", "Plaid API", "AWS", "Docker"],
      github: "https://github.com/noahnghg/FinAInce",
      demo: "https://demo.com",
      featured: true,
      inProgress: true
    },
    {
      id: 3,
      title: "Badminton Matches Tracker/Predictor",
      description: "A web application that tracks and predicts badminton match outcomes using historical data and machine learning.",
      image: "/software/badminton.png",
      tech: ["Python", "Flask", "React", "Java", "Spring Boot", "PostgreSQL", "AWS"],
      github: "https://github.com/noahnghg",
      demo: "https://demo.com",
      featured: true,
      inProgress: true
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "It is the website you are currently visiting! A modern, responsive portfolio website built with Next.js and Tailwind CSS, featuring dark mode and smooth animations.",
      image: "/software/lifesync.png", // Using existing local image as placeholder
      tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
      github: "https://github.com",
      demo: "https://demo.com"
    },
    {
      id: 5,
      title: "AI Resume Editor",
      description: "A web application that uses deep learning to fix and improve your resume based on jobs application. It is fully deployed on AWS",
      image: "/software/aws.png",
      tech: ["Node.js", "Socket.io", "MongoDB", "Express"],
      github: "https://github.com",
      demo: "https://demo.com",
      inProgress: true
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-600 via-slate-500 to-gray-500 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#87ceeb2a_1px,transparent_1px),linear-gradient(to_bottom,#87ceeb2a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-blue/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pale-blue/20 rounded-full blur-3xl"></div>
      
      {/* Header Section */}
      <section className="pt-20 pb-16 px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <span className="text-sm text-white font-medium text-sky-blue bg-sky-blue/20 px-3 py-1 rounded-full inline-block border border-sky-blue/40">
               noahnghg.work.seng
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-soft-blue bg-clip-text text-transparent">
            <TypingAnimation
              text="Software Projects"
              speed={100}
              showCursor={false}
              onComplete={() => setShowDescription(true)}
            />
          </h1>
          {showDescription && (
            <div className="animate-fade-in-up">
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                <TypingAnimation
                  text="A collection of web applications, mobile apps, and tools I've built using modern technologies"
                  speed={30}
                  delay={500}
                  showCursor={false}
                  onComplete={() => setShowProjects(true)}
                />
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Projects Grid */}
      {showProjects && (
        <section className="px-8 pb-20 animate-fade-in-up relative z-10">
          <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`card bg-slate-600/50 border border-sky-blue/30 shadow-lg hover:shadow-xl hover:border-sky-blue/50 transition-all duration-300 transform hover:-translate-y-2 group backdrop-blur-sm ${
                  project.featured ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Project Image */}
                <figure className="relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {project.featured && (
                      <span className="bg-sky-blue/20 border border-sky-blue/40 text-sky-blue px-3 py-1 rounded-full text-sm font-medium">Featured</span>
                    )}
                    {project.inProgress && (
                      <span className="bg-amber-500/20 border border-amber-500/40 text-amber-400 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                        🚧 In Progress
                      </span>
                    )}
                  </div>
                </figure>

                <div className="card-body">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="card-title text-xl font-bold text-white">
                      {project.title}
                    </h2>
                    {project.inProgress && (
                      <div className="flex items-center gap-1 text-amber-400 text-sm">
                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium">Active Development</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-white/70 mb-4 leading-relaxed">
                    {project.description}
                    {project.inProgress && (
                      <span className="block mt-2 text-amber-400/80 text-sm italic">
                        🔨 Currently being developed with new features and improvements
                      </span>
                    )}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="badge bg-sky-blue/20 border-sky-blue/40 text-sky-blue hover:bg-sky-blue/30 hover:border-sky-blue transition-colors cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="card-actions justify-between items-center">
                    <div className="flex gap-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm bg-transparent border border-sky-blue/70 text-sky-blue hover:bg-sky-blue/20 hover:border-sky-blue transition-all"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        Code
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm bg-gradient-to-r from-sky-blue to-soft-blue hover:from-soft-blue hover:to-sky-blue text-black border-none transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Demo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="card bg-slate-600/50 border border-sky-blue/30 backdrop-blur-sm">
              <div className="card-body text-center">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-soft-blue bg-clip-text text-transparent">Interested in working together?</h3>
                <p className="text-white/70 mb-6">
                  I&apos;m always open to discussing new opportunities and exciting projects.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/about" className="btn rounded-full bg-gradient-to-r from-white to-soft-blue hover:from-soft-blue hover:to-sky-blue text-white border-none btn-lg px-8 shadow-lg hover:shadow-xl transition-all">
                    <span className="text-black">Get in touch</span>
                  </Link>
                  <a href="mailto:noahnghg@gmail.com" className="btn rounded-full bg-transparent border-2 border-sky-blue/70 text-sky-blue hover:bg-sky-blue/20 hover:border-sky-blue btn-lg px-8 transition-all">
                    Send Email
                  </a>
                </div>
              </div>
            </div>
          </div>          </div>
        </section>
      )}
    </main>
  );
};

export default Software;
