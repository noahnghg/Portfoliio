'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mouseY, setMouseY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [activeSection, setActiveSection] = useState('home'); // Default to home
  const pathname = usePathname();

  // Handle Scroll Spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is in the middle of viewport
        threshold: 0
      }
    );

    const sections = ['home', 'about', 'experience', 'projects'];
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  // Show navbar on page navigation & initial setup
  useEffect(() => {
    setIsVisible(true);
    setIsInitialLoad(true);

    const initialTimeout = setTimeout(() => {
      setIsInitialLoad(false);
    }, 2000);

    return () => clearTimeout(initialTimeout);
  }, [pathname]);

  // Handle Auto-hide Navbar (Show on scroll, hide on idle)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      setIsVisible(true);

      // Clear existing timeout
      clearTimeout(timeoutId);

      // Hide after 2 seconds of inactivity
      timeoutId = setTimeout(() => {
        // Only hide if we are not at the very top of the page
        if (window.scrollY > 50) {
          setIsVisible(false);
        }
      }, 2000);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Show navbar if mouse is near top (optional UX improvement)
      if (e.clientY <= 100) {
        setIsVisible(true);
        clearTimeout(timeoutId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  const navItems = [
    { href: '#home', id: 'home', label: 'Home' },
    { href: '#about', id: 'about', label: 'About' },
    { href: '#experience', id: 'experience', label: 'Experience' },
    { href: '#projects', id: 'projects', label: 'Projects' },
  ];

  return (
    <>
      {/* Desktop Navigation - Floating Top Bar */}
      <nav className={`hidden md:block fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-out ${isVisible
        ? 'translate-y-0 opacity-100'
        : '-translate-y-full opacity-0'
        } bg-slate-900/80 backdrop-blur-md shadow-2xl rounded-full border border-sky-blue/20`}>
        <div className="flex justify-between items-center px-6 py-3 max-w-2xl mx-auto">
          <div className="flex items-center space-x-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-all duration-200 px-3 py-1.5 rounded-full text-sm font-medium ${isActive
                    ? 'bg-sky-blue text-white shadow-md'
                    : 'text-sky-blue/90 hover:bg-sky-blue/25 hover:text-sky-blue'
                    }`}
                  onClick={() => {
                    setActiveSection(item.id);
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile - Hamburger Button (Fixed Top Left) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-3 rounded-full bg-slate-600/95 backdrop-blur-md border border-sky-blue/40 hover:bg-sky-blue/25 transition-all shadow-lg text-sky-blue"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Menu - Side Drawer */}
      <div className={`md:hidden fixed inset-y-0 left-0 z-40 w-64 bg-slate-600/98 backdrop-blur-md border-r border-sky-blue/40 shadow-2xl transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="flex flex-col h-full pt-20 px-6 pb-6">
          {/* Logo/Brand */}
          <div className="mb-8">
            <h2 className="text-xl font-bold bg-gradient-to-r from-white to-sky-blue bg-clip-text text-transparent">
              Noah&apos;s Portfolio
            </h2>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-3 flex-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-all duration-200 px-4 py-3 rounded-xl text-base font-medium ${isActive
                    ? 'bg-sky-blue text-white shadow-md'
                    : 'text-sky-blue/90 hover:bg-sky-blue/20 hover:text-sky-blue'
                    }`}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setActiveSection(item.id);
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Contact Button */}
          <Link
            href="#about"
            className="mt-auto px-4 py-3 bg-gradient-to-r from-sky-blue to-soft-blue text-white rounded-xl text-base font-medium hover:from-soft-blue hover:to-sky-blue transition-all shadow-lg text-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Get in Touch
          </Link>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
