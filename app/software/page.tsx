'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import TypingAnimation from '../../components/TypingAnimation';

const Software = () => {
  const [showDescription, setShowDescription] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution built with Next.js, featuring user authentication, payment processing, and admin dashboard.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      tech: ["Next.js", "TypeScript", "Prisma", "Stripe"],
      github: "https://github.com",
      demo: "https://demo.com",
      featured: true
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A React-based task management application with drag-and-drop functionality, real-time updates, and team collaboration features.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
      tech: ["React", "Firebase", "Material-UI", "Socket.io"],
      github: "https://github.com",
      demo: "https://demo.com"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A responsive weather application that provides real-time weather data, forecasts, and interactive maps using modern APIs.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop",
      tech: ["Vue.js", "OpenWeather API", "Leaflet", "Chart.js"],
      github: "https://github.com",
      demo: "https://demo.com"
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website built with Next.js and Tailwind CSS, featuring dark mode and smooth animations.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=300&fit=crop",
      tech: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
      github: "https://github.com",
      demo: "https://demo.com"
    },
    {
      id: 5,
      title: "Chat Application",
      description: "Real-time chat application with rooms, file sharing, and emoji reactions built using modern web technologies.",
      image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=400&h=300&fit=crop",
      tech: ["Node.js", "Socket.io", "MongoDB", "Express"],
      github: "https://github.com",
      demo: "https://demo.com"
    },
    {
      id: 6,
      title: "Expense Tracker",
      description: "A personal finance management app with budget tracking, expense categorization, and financial insights visualization.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
      tech: ["React Native", "SQLite", "Redux", "Chart.js"],
      github: "https://github.com",
      demo: "https://demo.com"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      {/* Header Section */}
      <section className="pt-20 pb-16 px-8">
        <div className="max-w-6xl mx-auto text-center">
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            <TypingAnimation
              text="Software Projects"
              speed={100}
              className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              showCursor={false}
              onComplete={() => setShowDescription(true)}
            />
          </h1>
          {showDescription && (
            <div className="animate-fade-in-up">
              <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
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
        <section className="px-8 pb-20 animate-fade-in-up">
          <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group ${
                  project.featured ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Project Image */}
                <figure className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {project.featured && (
                    <div className="absolute top-4 left-4">
                      <span className="badge badge-primary badge-lg">Featured</span>
                    </div>
                  )}
                </figure>

                <div className="card-body">
                  <h2 className="card-title text-xl font-bold mb-2">
                    {project.title}
                    <div className="badge badge-secondary">NEW</div>
                  </h2>
                  
                  <p className="text-base-content/70 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="badge badge-outline badge-sm hover:badge-primary transition-colors cursor-default"
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
                        className="btn btn-sm btn-outline hover:btn-primary transition-all"
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
                        className="btn btn-sm btn-primary hover:btn-primary-focus transition-all"
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
            <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
              <div className="card-body text-center">
                <h3 className="text-2xl font-bold mb-4">Interested in working together?</h3>
                <p className="text-base-content/70 mb-6">
                  I'm always open to discussing new opportunities and exciting projects.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/about" className="btn btn-primary">
                    Get in Touch
                  </Link>
                  <a href="mailto:noah@example.com" className="btn btn-outline">
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
