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
        <footer className="footer footer-center p-10 bg-gradient-to-r from-base-200 to-base-300 text-base-content border-t border-base-300/20">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-flow-col gap-4 mb-4">
              <a href="https://github.com" className="link link-hover hover:text-primary transition-colors">GitHub</a>
              <a href="https://linkedin.com" className="link link-hover hover:text-primary transition-colors">LinkedIn</a>
              <a href="mailto:noah@example.com" className="link link-hover hover:text-primary transition-colors">Email</a>
            </div>
            <p className="text-sm opacity-70">Copyright © 2025 - All rights reserved by Noah N.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
