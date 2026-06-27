import type { Metadata } from "next";
import { JetBrains_Mono, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProviderWrapper } from './ThemeProviderWrapper';

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: 'swap',
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Nguyen Hong Anh Khoa (Noah) | Portfolio",
  description: "Applied AI Engineer Intern & BSc Computer Science student. Software Engineer & Machine Learning Enthusiast.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body className={`${outfit.variable} ${jetbrainsMono.variable}`}>
        <AppRouterCacheProvider>
          <ThemeProviderWrapper>
            {children}
          </ThemeProviderWrapper>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
