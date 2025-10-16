'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import TypingAnimation from '../../components/TypingAnimation';

const DataML = () => {
  const [showDescription, setShowDescription] = useState(false);
  const [showStats, setShowStats] = useState(false);
  
  const projects = [
    {
      id: 1,
      title: "Personal Course T.A",
      description: "A chatbot web-based application that assists students with course-related queries, act as a personal teaching assistant for every course.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      tech: ["Python", "LangChain", "ChromaDB", "RAG", "Gemini API"],
      github: "https://github.com/noahnghg/course-ta",
      type: "Classification",
      status: "Completed"
    },
    {
      id: 2,
      title: "Multi-modal Stock Forecasting System",
      description: "Time series analysis and LSTM neural network implementation to predict stock prices with technical indicators and sentiment analysis.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop",
      tech: ["TensorFlow", "Keras", "NumPy", "yfinance"],
      github: "https://github.com",
      notebook: "https://colab.research.google.com",
      type: "Time Series",
      status: "In Progress"
    },
  ];

  const typeColors: Record<string, string> = {
    "Classification": "bg-sky-blue/20 border-sky-blue/40 text-sky-blue",
    "Time Series": "bg-soft-blue/20 border-soft-blue/40 text-soft-blue",
    "Computer Vision": "bg-pale-blue/20 border-pale-blue/40 text-pale-blue",
    "NLP": "bg-sky-blue/20 border-sky-blue/40 text-sky-blue",
    "Recommendation": "bg-soft-blue/20 border-soft-blue/40 text-soft-blue",
    "Analytics": "bg-pale-blue/20 border-pale-blue/40 text-pale-blue"
  };

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
              noahnghg.work.dsml
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-soft-blue bg-clip-text text-transparent">
            <TypingAnimation
              text="Data/ML Projects"
              speed={100}
              showCursor={false}
              onComplete={() => setShowDescription(true)}
            />
          </h1>
          {showDescription && (
            <div className="animate-fade-in-up">
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                <TypingAnimation
                  text="Machine learning models, data analysis projects, and AI applications solving real-world problems"
                  speed={30}
                  delay={500}
                  showCursor={false}
                  onComplete={() => setShowStats(true)}
                />
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      {showStats && (
        <section className="px-8 pb-16 animate-fade-in-up relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="stat bg-slate-600/50 backdrop-blur-sm rounded-2xl border border-sky-blue/30 text-center animate-stagger-1">
                <div className="stat-value text-sky-blue text-2xl">15+</div>
                <div className="stat-title text-white/70 text-sm">Models Built</div>
              </div>
              <div className="stat bg-slate-600/50 backdrop-blur-sm rounded-2xl border border-sky-blue/30 text-center animate-stagger-2">
                <div className="stat-value text-soft-blue text-2xl">94%</div>
                <div className="stat-title text-white/70 text-sm">Best Accuracy</div>
              </div>
              <div className="stat bg-slate-600/50 backdrop-blur-sm rounded-2xl border border-sky-blue/30 text-center animate-stagger-3">
                <div className="stat-value text-pale-blue text-2xl">6</div>
                <div className="stat-title text-white/70 text-sm">Domains</div>
              </div>
              <div className="stat bg-slate-600/50 backdrop-blur-sm rounded-2xl border border-sky-blue/30 text-center animate-stagger-4">
                <div className="stat-value text-sky-blue text-2xl">2+</div>
                <div className="stat-title text-white/70 text-sm">Years Experience</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Projects Grid */}
      <section className="px-8 pb-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="card bg-slate-600/50 border border-sky-blue/30 shadow-lg hover:shadow-xl hover:border-sky-blue/50 transition-all duration-300 transform hover:-translate-y-2 group backdrop-blur-sm"
              >
                <figure className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`${typeColors[project.type]} px-3 py-1 rounded-full text-sm font-medium border`}>
                      {project.type}
                    </span>
                    {project.status && (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${
                        project.status === 'Completed' 
                          ? 'bg-green-500/20 border-green-500/40 text-green-400' 
                          : project.status === 'In Progress'
                          ? 'bg-yellow-500/20 border-yellow-500/40 text-yellow-400'
                          : 'bg-gray-500/20 border-gray-500/40 text-gray-400'
                      }`}>
                        {project.status}
                      </span>
                    )}
                  </div>
                </figure>

                <div className="card-body">
                  <h2 className="card-title text-xl font-bold mb-2 text-white">
                    {project.title}
                  </h2>
                  
                  <p className="text-white/70 mb-4 leading-relaxed text-sm">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="badge bg-sky-blue/20 border-sky-blue/40 text-sky-blue hover:bg-sky-blue/30 hover:border-sky-blue transition-colors cursor-default text-xs"
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
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        Code
                      </a>
                      <a
                        href={project.notebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm bg-gradient-to-r from-sky-blue to-soft-blue hover:from-soft-blue hover:to-sky-blue text-white border-none transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Notebook
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
};

export default DataML;
