import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Noah's Portfolio",
  description: "A portfolio of my work.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="custom-light">
      <body className={inter.className}>
        <Navbar />
        {children}
        {/* Modern Footer */}
        <footer className="footer footer-center p-10 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 text-white border-t border-gray-600/30 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#6b72802a_1px,transparent_1px),linear-gradient(to_bottom,#6b72802a_1px,transparent_1px)] bg-[size:14px_24px]" />
          
          {/* Floating Elements */}
          <div className="absolute -top-8 -left-8 w-24 h-24 bg-gray-400/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gray-500/15 rounded-full blur-3xl animate-bounce" />
          
          <div className="max-w-4xl mx-auto relative z-10">
            {/* Social Links with Icons */}
            <div className="flex justify-center items-center gap-8 mb-6">
              <a 
                href="https://github.com/noahnghg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-sky-blue/30 hover:bg-sky-blue/20 hover:border-sky-blue/50 transition-all duration-300 hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-blue group-hover:text-white transition-colors">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
                <span className="text-white group-hover:text-white transition-colors">GitHub</span>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/noahnghg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-sky-blue/30 hover:bg-sky-blue/20 hover:border-sky-blue/50 transition-all duration-300 hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-blue group-hover:text-white transition-colors">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
                <span className="text-white group-hover:text-white transition-colors">LinkedIn</span>
              </a>
              
              <a 
                href="mailto:noahnghgwork@gmail.com" 
                className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-sky-blue/30 hover:bg-sky-blue/20 hover:border-sky-blue/50 transition-all duration-300 hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-sky-blue group-hover:text-white transition-colors">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span className="text-white group-hover:text-white transition-colors">Gmail</span>
              </a>
            </div>
            
            {/* Copyright */}
            <div className="text-center">
              <p className="text-sm text-white/80 mb-2">Built with Next.js, TypeScript, and Tailwind CSS</p>
              <p className="text-sm text-white/60">Copyright © 2025 - All rights reserved by Noah Hong Anh Khoa</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
