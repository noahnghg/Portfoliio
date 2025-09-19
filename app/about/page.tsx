'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import TypingAnimation from '../../components/TypingAnimation';
import Image from 'next/image';

const About = () => {
  const [showContent, setShowContent] = useState(false);
  const [showParagraph2, setShowParagraph2] = useState(false);
  const [showParagraph3, setShowParagraph3] = useState(false);
  const [skillsOpacity, setSkillsOpacity] = useState(0);
  const [educationOpacity, setEducationOpacity] = useState(0);
  const [experienceOpacity, setExperienceOpacity] = useState(0);
  const [contactOpacity, setContactOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Calculate opacity based on scroll position for each section
      // Skills section - starts appearing at 300px scroll
      const skillsStart = 300;
      const skillsCenter = 600;
      const skillsProgress = Math.max(0, Math.min(1, (scrollY - skillsStart) / (skillsCenter - skillsStart)));
      setSkillsOpacity(skillsProgress);

      // Education section - starts appearing at 600px scroll
      const educationStart = 600;
      const educationCenter = 900;
      const educationProgress = Math.max(0, Math.min(1, (scrollY - educationStart) / (educationCenter - educationStart)));
      setEducationOpacity(educationProgress);

      // Experience section - starts appearing at 1000px scroll
      const experienceStart = 1000;
      const experienceCenter = 1400;
      const experienceProgress = Math.max(0, Math.min(1, (scrollY - experienceStart) / (experienceCenter - experienceStart)));
      setExperienceOpacity(experienceProgress);

      // Contact section - starts appearing at 1600px scroll
      const contactStart = 1600;
      const contactCenter = 2000;
      const contactProgress = Math.max(0, Math.min(1, (scrollY - contactStart) / (contactCenter - contactStart)));
      setContactOpacity(contactProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const skills = {
    "Frontend": ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    "Backend": ["Python", "Java", "Flask", "FastAPI", "Spring Boot"],
    "Database": ["PostgreSQL", "MySQL", "MongoDB", "Prisma"],
    "Machine Learning": ["Scikit-learn", "TensorFlow", "PyTorch"],
    "Data Science": ["Numpy", "Pandas", "Scikit-learn", "Power BI", "Tableau"],
    "Tools/Cloud": ["Git", "Docker", "AWS", "Vercel", "Figma", "VS Code", "IntelliJ"]
  };

  const education = [
    {
      institution: "University of Calgary",
      degree: "Bachelor of Science in Computer Science",
      period: "2023 - 2027 (Expected)",
      gpa: "3.6/4.0",
      activities: ["Computer Science Club", "Hackathon Organizer", "Peer Tutor"],
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
      title: "Deep Learning Software Developer Internship",
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-600 via-slate-500 to-gray-500 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#87ceeb2a_1px,transparent_1px),linear-gradient(to_bottom,#87ceeb2a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-blue/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pale-blue/20 rounded-full blur-3xl"></div>
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 p-1">
                  <Image
                    src="/about/my_image.png"
                    alt="Noah N."
                    width={400}
                    height={400}
                    className="w-full h-full object-cover rounded-3xl"
                  />
                </div>
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-sky-blue/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pale-blue/20 rounded-full blur-xl"></div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2">
              <div className="mb-6">
                <TypingAnimation
                  text="noahnghg.about"
                  speed={50}
                  className="text-sm font-medium text-sky-blue bg-sky-blue/20 px-3 py-1 rounded-full inline-block border border-sky-blue/40"
                  showCursor={false}
                  onComplete={() => setShowContent(true)}
                />
              </div>
              
              {showContent && (
                <div className="animate-fade-in-up">
                  <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-soft-blue bg-clip-text text-transparent">
                    <TypingAnimation
                      text="I'm Noah"
                      speed={100}
                      delay={300}
                      className="bg-gradient-to-r from-white to-soft-blue bg-clip-text text-transparent"
                      showCursor={false}
                      onComplete={() => setShowParagraph2(true)}
                    />
                  </h1>
                  
                  <div className="space-y-4 text-lg text-white/80 leading-relaxed">
                    <p>
                      <TypingAnimation
                        text="A current university student wants to develop solutions that solve my own pain points and share those solutions."
                        speed={25}
                        delay={800}
                        showCursor={false}
                        onComplete={() => setShowParagraph2(true)}
                      />
                    </p>
                    
                    {showParagraph2 && (
                      <p className="animate-fade-in-up">
                        <TypingAnimation
                          text="I enjoy applying technology that I learn to solve my own problems. I believe the solution to my own problems could some day be an innovative solutions. And the fact that I can apply what I have learned and built into my own life is amazing as a Computer Science student, it makes me feel more in love with this major."
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
                          text="Feel free to get in touch, download my resume or continue exploring this portfolio to know more about myself."
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
                <a href="mailto:noahnghgwork@gmail.com" className="btn rounded-full bg-gradient-to-r from-sky-blue to-soft-blue hover:from-soft-blue hover:to-sky-blue text-white border-none btn-lg px-8 group shadow-lg hover:shadow-xl transition-all">
                  <span className="text-black">Get in touch</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                <a href="/resume.pdf" target="_blank" className="btn rounded-full bg-transparent border-2 border-sky-blue/70 text-sky-blue hover:bg-sky-blue/20 hover:border-sky-blue btn-lg px-8 transition-all">
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

      {/* Scroll Indicator */}
      <div className="flex justify-center py-8">
        <div className="flex flex-col items-center animate-bounce">
          <button 
            onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
            className="p-3 rounded-full bg-sky-blue/20 border border-sky-blue/40 hover:bg-sky-blue/30 hover:border-sky-blue/60 transition-all duration-300 hover:scale-110 group"
          >
            <svg 
              className="w-6 h-6 text-sky-blue group-hover:text-white transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Skills Section */}
      <section 
        id="skills-section" 
        className="py-16 px-8 relative z-10 transition-all duration-1000"
        style={{ 
          opacity: skillsOpacity,
          transform: `translateY(${(1 - skillsOpacity) * 50}px)`,
          pointerEvents: skillsOpacity > 0.1 ? 'auto' : 'none'
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-soft-blue bg-clip-text text-transparent">
              {skillsOpacity > 0.3 && (
                <TypingAnimation
                  text="Skills & Technologies"
                  speed={50}
                  showCursor={false}
                />
              )}
            </h2>
            <p className="text-xl text-white/70">
              Technologies I work with to bring ideas to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skills).map(([category, techs]) => (
              <div key={category} className="card bg-slate-600/50 border border-sky-blue/30 shadow-lg hover:shadow-xl hover:border-sky-blue/50 transition-all backdrop-blur-sm">
                <div className="card-body">
                  <h3 className="card-title text-lg mb-4 text-sky-blue">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {techs.map((tech, index) => (
                      <span
                        key={index}
                        className="badge bg-sky-blue/20 border-sky-blue/40 text-sky-blue hover:bg-sky-blue/30 hover:border-sky-blue transition-colors cursor-default"
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

      {/* Education Section */}
      <section 
        id="education-section" 
        className="py-16 px-8 relative z-10 transition-all duration-1000"
        style={{ 
          opacity: educationOpacity,
          transform: `translateY(${(1 - educationOpacity) * 50}px)`,
          pointerEvents: educationOpacity > 0.1 ? 'auto' : 'none'
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-soft-blue bg-clip-text text-transparent">
              {educationOpacity > 0.3 && (
                <TypingAnimation
                  text="Education"
                  speed={50}
                  showCursor={false}
                />
              )}
            </h2>
            <p className="text-xl text-white/70">
              My academic journey and achievements
            </p>
          </div>

          <div className="space-y-8">
            {education.map((edu, index) => (
              <div key={index} className="card bg-slate-600/50 border border-sky-blue/30 shadow-lg hover:shadow-xl hover:border-sky-blue/50 transition-all duration-300 backdrop-blur-sm">
                <div className="card-body">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="card-title text-xl text-white mb-2">{edu.degree}</h3>
                      <p className="text-soft-blue font-semibold text-lg mb-2">{edu.institution}</p>
                      {edu.description && <p className="text-white/70 mb-3">{edu.description}</p>}
                    </div>
                    <div className="flex flex-col items-start lg:items-end gap-2">
                      <span className="bg-sky-blue/20 border border-sky-blue/40 text-sky-blue px-3 py-1 rounded-full text-sm font-medium">{edu.period}</span>
                      {edu.gpa && <span className="bg-green-500/20 border border-green-500/40 text-green-400 px-3 py-1 rounded-full text-sm font-medium">GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                  
                  {/* Institution Logos */}
                  {(edu.logo || edu.logo2) && (
                    <div className="mb-4 flex gap-4 items-center">
                      {edu.logo && (
                        <Image
                          src={edu.logo}
                          alt={`${edu.institution} logo`}
                          width={100}
                          height={50}
                          className="object-contain bg-white/10 rounded-lg p-2 backdrop-blur-sm"
                        />
                      )}
                      {edu.logo2 && (
                        <Image
                          src={edu.logo2}
                          alt="Additional logo"
                          width={100}
                          height={50}
                          className="object-contain bg-white/10 rounded-lg p-2 backdrop-blur-sm"
                        />
                      )}
                    </div>
                  )}
                  
                  {/* Coursework */}
                  {edu.coursework && edu.coursework.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sky-blue font-semibold mb-2">Relevant Coursework</h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.coursework.map((course, courseIndex) => (
                          <span
                            key={courseIndex}
                            className="badge bg-soft-blue/20 border-soft-blue/40 text-soft-blue hover:bg-soft-blue/30 hover:border-soft-blue transition-colors cursor-default"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Activities */}
                  {edu.activities && edu.activities.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sky-blue font-semibold mb-2">Activities & Leadership</h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.activities.map((activity, actIndex) => (
                          <span
                            key={actIndex}
                            className="badge bg-pale-blue/20 border-pale-blue/40 text-pale-blue hover:bg-pale-blue/30 hover:border-pale-blue transition-colors cursor-default"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Achievements */}
                  {edu.achievements && edu.achievements.length > 0 && (
                    <div>
                      <h4 className="text-sky-blue font-semibold mb-2">Achievements</h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.achievements.map((achievement, achIndex) => (
                          <span
                            key={achIndex}
                            className="badge bg-yellow-500/20 border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/30 hover:border-yellow-500 transition-colors cursor-default"
                          >
                            {achievement}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section 
        id="experience-section" 
        className="py-16 px-8 relative z-10 transition-all duration-1000"
        style={{ 
          opacity: experienceOpacity,
          transform: `translateY(${(1 - experienceOpacity) * 50}px)`,
          pointerEvents: experienceOpacity > 0.1 ? 'auto' : 'none'
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-soft-blue bg-clip-text text-transparent">
              {experienceOpacity > 0.3 && (
                <TypingAnimation
                  text="Experience"
                  speed={50}
                  showCursor={false}
                />
              )}
            </h2>
            <p className="text-xl text-white/70">
              My professional journey and key milestones
            </p>
          </div>

          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div key={index} className="card bg-slate-600/50 border border-sky-blue/30 shadow-lg hover:shadow-xl hover:border-sky-blue/50 transition-all duration-300 backdrop-blur-sm">
                <div className="card-body">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="card-title text-xl text-white">{exp.title}</h3>
                    <span className="bg-sky-blue/20 border border-sky-blue/40 text-sky-blue px-3 py-1 rounded-full text-sm font-medium">{exp.period}</span>
                  </div>
                  <p className="text-soft-blue font-semibold mb-3">{exp.company}</p>
                  <div className="mb-4">
                    <Image
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      width={120}
                      height={60}
                      className="object-contain bg-white/10 rounded-lg p-2 backdrop-blur-sm"
                    />
                  </div>
                  <p className="text-white/70">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section 
        id="contact-section" 
        className="py-16 px-8 relative z-10 transition-all duration-1000"
        style={{ 
          opacity: contactOpacity,
          transform: `translateY(${(1 - contactOpacity) * 50}px)`,
          pointerEvents: contactOpacity > 0.1 ? 'auto' : 'none'
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="card bg-slate-600/50 border border-sky-blue/30 backdrop-blur-sm">
            <div className="card-body">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-soft-blue bg-clip-text text-transparent">
                {contactOpacity > 0.3 && (
                  <TypingAnimation
                    text="Let's Work Together"
                    speed={50}
                    showCursor={false}
                  />
                )}
              </h2>
              <p className="text-xl text-white/70 mb-8">
                I&apos;m always interested in new opportunities and exciting projects. 
                Let&apos;s discuss how we can bring your ideas to life!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-sky-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:noahnghgwork@gmail.com" className="text-sky-blue hover:text-soft-blue transition-colors">noahnghgwork@gmail.com</a>
                </div>
                
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-pale-blue" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <a href="https://github.com/noahnghg" target="_blank" rel="noopener noreferrer" className="text-pale-blue hover:text-soft-blue transition-colors">GitHub</a>
                </div>
                
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-soft-blue" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <a href="https://www.linkedin.com/in/noahnghg" target="_blank" rel="noopener noreferrer" className="text-soft-blue hover:text-sky-blue transition-colors">LinkedIn</a>
                </div>
              </div>
              
              <div className="mt-8">
                <Link href="/software" className="btn rounded-full bg-gradient-to-r from-sky-blue to-soft-blue hover:from-soft-blue hover:to-sky-blue text-black border-none btn-lg px-8 mr-4 shadow-lg hover:shadow-xl transition-all">
                  View My Work
                </Link>
                <a href="mailto:noah@example.com" className="btn rounded-full bg-transparent border-2 border-sky-blue/70 text-sky-blue hover:bg-sky-blue/20 hover:border-sky-blue btn-lg px-8 transition-all">
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