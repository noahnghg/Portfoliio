'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import TypingAnimation from '../../components/TypingAnimation';

const About = () => {
  const [showContent, setShowContent] = useState(false);
  const [showParagraph2, setShowParagraph2] = useState(false);
  const [showParagraph3, setShowParagraph3] = useState(false);
  const skills = {
    "Frontend": ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"],
    "Backend": ["Node.js", "Python", "Express", "FastAPI", "PostgreSQL"],
    "Data Science": ["Pandas", "Scikit-learn", "TensorFlow", "PyTorch", "Jupyter"],
    "Tools": ["Git", "Docker", "AWS", "Vercel", "Figma"]
  };

  const experience = [
    {
      title: "Deep Learning Software Developer",
      company: "FPT Software",
      period: "July 2025 - September 2025",
      description: "Led development of scalable web applications using React and Node.js"
    },
    {
      title: "Odoo Software Developer Intern",
      company: "Leonix Vietnam",
      period: "June 2022 - August 2022",
      description: "Built machine learning models for customer segmentation and churn prediction"
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 p-1">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=face"
                    alt="Noah N."
                    className="w-full h-full object-cover rounded-3xl"
                  />
                </div>
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary/20 rounded-full blur-xl"></div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <div className="mb-6">
                <TypingAnimation
                  text="👨‍💻 About Me"
                  speed={50}
                  className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full inline-block"
                  showCursor={false}
                  onComplete={() => setShowContent(true)}
                />
              </div>
              
              {showContent && (
                <div className="animate-fade-in-up">
                  <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    <TypingAnimation
                      text="I'm Noah"
                      speed={100}
                      delay={300}
                      className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                      showCursor={false}
                      onComplete={() => setShowParagraph2(true)}
                    />
                  </h1>
                  
                  <div className="space-y-4 text-lg text-base-content/80 leading-relaxed">
                    <p>
                      <TypingAnimation
                        text="A passionate full-stack developer and data scientist with a love for creating innovative digital solutions that make a real impact."
                        speed={25}
                        delay={800}
                        showCursor={false}
                        onComplete={() => setShowParagraph2(true)}
                      />
                    </p>
                    
                    {showParagraph2 && (
                      <p className="animate-fade-in-up">
                        <TypingAnimation
                          text="I enjoy building things that live on the internet, whether that be websites, applications, machine learning models, or anything in between. My goal is to always build products that provide meaningful experiences for users."
                          speed={20}
                          delay={500}
                          showCursor={false}
                          onComplete={() => setShowParagraph3(true)}
                        />
                      </p>
                    )}
                    
                    {showParagraph3 && (
                      <p className="animate-fade-in-up">
                        <TypingAnimation
                          text="When I'm not coding, you'll find me exploring new technologies, contributing to open source, or experimenting with the latest ML frameworks."
                          speed={20}
                          delay={500}
                          showCursor={false}
                        />
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <a href="mailto:noah@example.com" className="btn btn-primary btn-lg">
                  Get In Touch
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                <a href="/resume.pdf" target="_blank" className="btn btn-outline btn-lg">
                  Download Resume
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Skills & Technologies</h2>
            <p className="text-xl text-base-content/70">
              Technologies I work with to bring ideas to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skills).map(([category, techs]) => (
              <div key={category} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body">
                  <h3 className="card-title text-lg mb-4 text-primary">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {techs.map((tech, index) => (
                      <span
                        key={index}
                        className="badge badge-outline hover:badge-primary transition-colors cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 px-8 bg-base-200/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Experience</h2>
            <p className="text-xl text-base-content/70">
              My professional journey and key milestones
            </p>
          </div>

          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div key={index} className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="card-body">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="card-title text-xl">{exp.title}</h3>
                    <span className="badge badge-primary badge-lg">{exp.period}</span>
                  </div>
                  <p className="text-secondary font-semibold mb-2">{exp.company}</p>
                  <p className="text-base-content/70">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
            <div className="card-body">
              <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
              <p className="text-xl text-base-content/70 mb-8">
                I'm always interested in new opportunities and exciting projects. 
                Let's discuss how we can bring your ideas to life!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:noah@example.com" className="link link-primary">noah@example.com</a>
                </div>
                
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="link link-secondary">GitHub</a>
                </div>
                
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="link link-accent">LinkedIn</a>
                </div>
              </div>
              
              <div className="mt-8">
                <Link href="/software" className="btn btn-primary btn-lg mr-4">
                  View My Work
                </Link>
                <a href="mailto:noah@example.com" className="btn btn-outline btn-lg">
                  Start a Conversation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;