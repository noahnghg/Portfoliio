'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeToggle } from '../app/ThemeProviderWrapper';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();
  const { mode, toggleTheme } = useThemeToggle();

  // Scroll Spy to highlight the active section
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
        rootMargin: '-50% 0px -50% 0px', // Trigger when section is in middle of viewport
        threshold: 0,
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

  // Handle Auto-hide Navbar (Show on scroll, hide on idle)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      
      // Show navbar when scrolling up or at the very top
      if (currentScroll < lastScroll || currentScroll < 100) {
        setIsVisible(true);
      } else if (currentScroll > 100 && currentScroll > lastScroll) {
        // Hide navbar when scrolling down past threshold
        setIsVisible(false);
      }

      lastScroll = currentScroll;

      // Clear existing timeout and set a new one to hide if idle at scroll position
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (window.scrollY > 150) {
          setIsVisible(false);
        }
      }, 3000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
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
      {/* Desktop Floating Pill Navbar */}
      <Box
        component="nav"
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'fixed',
          top: 20,
          left: '50%',
          transform: isVisible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-100px)',
          opacity: isVisible ? 1 : 0,
          zIndex: 1100,
          transition: 'all 0.4s cubic-bezier(0.2, 0, 0, 1)',
        }}
      >
        <Box
          className="glass-panel"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 2.5,
            py: 1,
            borderRadius: 100,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          }}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                onClick={() => setActiveSection(item.id)}
                sx={{
                  borderRadius: 100,
                  px: 3,
                  py: 1,
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  textTransform: 'none',
                  fontFamily: 'var(--font-outfit)',
                  letterSpacing: '0.02em',
                  backgroundColor: isActive ? '#2aa198' : 'transparent',
                  color: isActive ? '#002b36' : '#93a1a1',
                  transition: 'all 0.3s cubic-bezier(0.2, 0, 0, 1)',
                  '&:hover': {
                    backgroundColor: isActive ? '#2aa198' : 'rgba(42, 161, 152, 0.12)',
                    color: isActive ? '#002b36' : '#2aa198',
                  },
                }}
              >
                {item.label}
              </Button>
            );
          })}
          
          <IconButton onClick={toggleTheme} sx={{ color: '#2aa198', ml: 0.5, p: 1 }}>
            {mode === 'dark' ? <LightModeIcon sx={{ fontSize: 20 }} /> : <DarkModeIcon sx={{ fontSize: 20 }} />}
          </IconButton>
        </Box>
      </Box>

      {/* Mobile Hamburger Button (Top Left Floating) */}
      <IconButton
        onClick={() => setIsMobileMenuOpen(true)}
        aria-label="open drawer"
        sx={{
          display: { xs: 'flex', md: 'none' },
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: 1050,
          backgroundColor: 'rgba(7, 54, 66, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(88, 110, 117, 0.3)',
          color: '#2aa198',
          p: 1.5,
          borderRadius: '50%',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
          '&:hover': {
            backgroundColor: 'rgba(7, 54, 66, 1)',
            color: '#eee8d5',
          },
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Mobile Drawer (Google M3 Side Panel Navigation) */}
      <Drawer
        anchor="left"
        open={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        slotProps={{
          paper: {
            sx: {
              width: 280,
              backgroundColor: '#073642', // Base02
              backgroundImage: 'none',
              borderRight: '1px solid rgba(88, 110, 117, 0.25)',
              boxSizing: 'border-box',
              px: 3,
              py: 4,
            },
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: mode === 'dark' ? '#eee8d5' : '#073642',
              fontFamily: 'var(--font-outfit)',
            }}
          >
            Noah.dev
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={toggleTheme} sx={{ color: '#2aa198', p: 1 }}>
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <IconButton onClick={() => setIsMobileMenuOpen(false)} sx={{ color: '#93a1a1', p: 1 }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        <List component="nav" sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <ListItem key={item.href} disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setActiveSection(item.id);
                  }}
                  sx={{
                    borderRadius: 100, // Pill list item M3 style
                    py: 1.5,
                    px: 2.5,
                    backgroundColor: isActive ? 'rgba(42, 161, 152, 0.15)' : 'transparent',
                    color: isActive ? '#2aa198' : '#93a1a1',
                    '&:hover': {
                      backgroundColor: 'rgba(42, 161, 152, 0.08)',
                      color: '#2aa198',
                    },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: {
                        sx: {
                          fontFamily: 'var(--font-outfit)',
                          fontWeight: isActive ? 600 : 500,
                          fontSize: '1rem',
                        },
                      },
                    }}
                  />
                  {isActive && <ArrowForwardIcon sx={{ fontSize: 18, color: '#2aa198' }} />}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Box sx={{ mt: 'auto', textAlign: 'center' }}>
          <Button
            component="a"
            href="mailto:noahnghgwork@gmail.com"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              borderRadius: 100,
              py: 1.5,
              fontWeight: 600,
              fontFamily: 'var(--font-outfit)',
            }}
          >
            Get in Touch
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

// Add styled typography locally or import if required
import Typography from '@mui/material/Typography';
