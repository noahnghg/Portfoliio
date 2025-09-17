'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import TypingAnimation from '../components/TypingAnimation';
import TypewriterText from '../components/TypewriterText';
import CodeEditor from '../components/CodeEditor';

const Home = () => {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showCodeEditor, setShowCodeEditor] = useState(false);

  return (
    <main className="min-h-screen">
      {/* Hero Section with Modern Design */}
      <section className="hero min-h-screen bg-gradient-to-br from-slate-600 via-slate-500 to-gray-500 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#87ceeb2a_1px,transparent_1px),linear-gradient(to_bottom,#87ceeb2a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        {/* Ambient glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-blue/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pale-blue/20 rounded-full blur-3xl"></div>
        
        <div className="hero-content text-center relative z-10">
          <div className="max-w-4xl">
            {/* Animated greeting */}
            <div className="mb-6">
              <TypingAnimation
                text="noahnghg.dev.portfolio"
                speed={50}
                className="text-sm font-medium text-sky-blue bg-sky-blue/20 px-3 py-1 rounded-full inline-block border border-sky-blue/40"
                showCursor={false}
                onComplete={() => setShowSubtitle(true)}
              />
            </div>
            
            {/* Main heading with gradient */}
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-sky-blue to-pale-blue bg-clip-text text-transparent leading-tight drop-shadow-lg">
              <TypingAnimation
                text="Hello, I'm Noah"
                speed={80}
                delay={1000}
                showCursor={false}
                onComplete={() => setShowCodeEditor(true)}
              />
            </h1>
            
            {/* Code Editor */}
            {showCodeEditor && (
              <div className="animate-fade-in-up mb-8">
                <CodeEditor 
                  delay={500}
                  onComplete={() => setShowButtons(true)}
                />
              </div>
            )}
            
            {/* CTA Buttons */}
            {showButtons && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up">
                <Link href="/software" className="btn rounded-full bg-gradient-to-r from-sky-blue to-soft-blue hover:from-soft-blue hover:to-sky-blue text-white border-none btn-lg px-8 group shadow-lg hover:shadow-xl transition-all">
                  View My Work
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/about" className="btn rounded-full bg-transparent border-2 border-sky-blue/70 text-sky-blue hover:bg-sky-blue/20 hover:border-sky-blue btn-lg px-8 transition-all">
                  About Me
                </Link>
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
    </main>
  );
};

export default Home;