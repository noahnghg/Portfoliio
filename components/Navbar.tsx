'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  // const [isScrolled, setIsScrolled] = useState(false); // Currently unused
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // Start visible on page load
  const [mouseY, setMouseY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const pathname = usePathname();

  // Show navbar on page navigation
  useEffect(() => {
    setIsVisible(true);
    setIsInitialLoad(true);
    
    // After initial load, start auto-hide behavior
    const initialTimeout = setTimeout(() => {
      setIsInitialLoad(false);
    }, 2000);

    return () => clearTimeout(initialTimeout);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;
      const scrollingUp = currentScrollY < lastScrollY;
      
      setLastScrollY(currentScrollY);
      // setIsScrolled(currentScrollY > 10); // Currently unused
      
      // Clear any existing hide timeout
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        setHideTimeout(null);
      }
      
      // Don't auto-hide during initial load period
      if (isInitialLoad) {
        return;
      }
      
      // Show navbar when scrolling up
      if (scrollingUp && currentScrollY > 50) {
        setIsVisible(true);
      } 
      // Hide navbar when scrolling down (unless mouse is at top)
      else if (scrollingDown && mouseY > 80) {
        const timeout = setTimeout(() => {
          setIsVisible(false);
        }, 200);
        setHideTimeout(timeout);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
      
      // Clear hide timeout when mouse moves to top
      if (e.clientY <= 80 && hideTimeout) {
        clearTimeout(hideTimeout);
        setHideTimeout(null);
      }
      
      // Show navbar when mouse is in top 80px of screen
      if (e.clientY <= 80) {
        setIsVisible(true);
      } 
      // Hide when mouse moves away from top and we're scrolled down
      else if (!isInitialLoad && window.scrollY > 50) {
        const timeout = setTimeout(() => {
          setIsVisible(false);
        }, 300);
        setHideTimeout(timeout);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [lastScrollY, mouseY, hideTimeout, isInitialLoad]);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/software', label: 'Software' },
    { href: '/data-ml', label: 'Data & ML' },
  ];

  return (
    <nav className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-out ${
      isVisible 
        ? 'translate-y-0 opacity-100' 
        : '-translate-y-full opacity-0'
    } bg-slate-600/95 backdrop-blur-md shadow-2xl rounded-full border border-sky-blue/40`}>
      <div className="flex justify-between items-center px-6 py-3 max-w-2xl mx-auto">
        

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-all duration-200 px-3 py-1.5 rounded-full text-sm font-medium ${
                pathname === item.href 
                  ? 'bg-sky-blue text-white shadow-md' 
                  : 'text-sky-blue/90 hover:bg-sky-blue/25 hover:text-sky-blue'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-full bg-sky-blue/25 hover:bg-sky-blue/35 transition-colors text-sky-blue"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && isVisible && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 bg-gray-600/95 backdrop-blur-md border border-sky-blue/40 rounded-2xl shadow-2xl transition-all duration-300">
          <div className="flex flex-col space-y-2 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-all duration-200 px-4 py-2 rounded-xl text-sm font-medium ${
                  pathname === item.href 
                    ? 'bg-sky-blue text-white shadow-md' 
                    : 'text-sky-blue/80 hover:bg-sky-blue/20 hover:text-sky-blue'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link 
              href="/about" 
              className="px-4 py-2 bg-sky-blue text-white rounded-xl text-sm font-medium hover:bg-soft-blue transition-colors mt-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
