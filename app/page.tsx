'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import Tooltip from '@mui/material/Tooltip';
import FolderIcon from '@mui/icons-material/Folder';
import CloseIcon from '@mui/icons-material/Close';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import WifiIcon from '@mui/icons-material/Wifi';
import AppleIcon from '@mui/icons-material/Apple';
import TerminalIcon from '@mui/icons-material/Terminal';
import SchoolIcon from '@mui/icons-material/School';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import HeadsetIcon from '@mui/icons-material/Headset';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { useThemeToggle } from './ThemeProviderWrapper';

interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
  type?: string;
  demo?: string;
}

export default function Home() {
  const { mode, toggleTheme } = useThemeToggle();

  // Intro welcome states
  const [showIntro, setShowIntro] = useState(true);
  const [introFading, setIntroFading] = useState(false);
  const [revealActive, setRevealActive] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [typedCommand, setTypedCommand] = useState('');

  // Handle auto-reveal timeout simulating terminal booting
  useEffect(() => {
    let timers: NodeJS.Timeout[] = [];

    // 0. Print initial prompt
    setTerminalLogs(["noah-dev login: guest", "Last login: Sat Jun 27 12:48:46 on ttys001"]);

    // 1. Simulate typing of "$ noah-os --boot"
    const commandText = "noah-os --boot";
    for (let i = 0; i <= commandText.length; i++) {
      timers.push(
        setTimeout(() => {
          setTypedCommand(commandText.substring(0, i));
        }, 150 + i * 50) // types command over 750ms
      );
    }

    // 2. Add system boot logs sequentially
    const logs = [
      "Initializing system kernel... [ OK ]",
      "Mounting system volume /dev/sda1... [ OK ]",
      "Establishing network connection to Toronto, CA... [ OK ]",
      "Loading profile of Applied AI Engineer Intern (Noah)... [ OK ]",
      "Mounting projects database (4 active paths)... [ OK ]",
      "Starting desktop GUI server... [ OK ]",
      "Booting Noah OS User Session... [ SUCCESS ]",
    ];

    logs.forEach((log, index) => {
      timers.push(
        setTimeout(() => {
          setTerminalLogs(prev => [...prev, log]);
        }, 1100 + index * 200) // prints every 200ms after command is typed
      );
    });

    // 3. Trigger desktop circular reveal
    timers.push(
      setTimeout(() => {
        setRevealActive(true);
        setIntroFading(true);
      }, 2900)
    );

    // 4. Unmount overlay completely after 4.1s
    timers.push(
      setTimeout(() => {
        setShowIntro(false);
      }, 4100)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  const handleSkipIntro = () => {
    setRevealActive(true);
    setIntroFading(true);
    setTimeout(() => {
      setShowIntro(false);
    }, 1200);
  };

  // Toronto dynamic time clock
  const [torontoTime, setTorontoTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Toronto',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      setTorontoTime(formatter.format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Multi-window state manager
  const [windows, setWindows] = useState({
    about: { isOpen: true, isMinimized: false, isMaximized: false, zIndex: 10 },
    experience: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    education: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    projects: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
    lofi: { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10 },
  });

  const [maxZIndex, setMaxZIndex] = useState(12);

  const openWindow = (name: keyof typeof windows) => {
    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);
    setWindows((prev) => ({
      ...prev,
      [name]: { isOpen: true, isMinimized: false, isMaximized: false, zIndex: nextZ },
    }));
  };

  const focusWindow = (name: keyof typeof windows) => {
    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);
    setWindows((prev) => ({
      ...prev,
      [name]: { ...prev[name], zIndex: nextZ },
    }));
  };

  const minimizeWindow = (name: keyof typeof windows) => {
    setWindows((prev) => ({
      ...prev,
      [name]: { ...prev[name], isMinimized: true },
    }));
  };

  const toggleMaximizeWindow = (name: keyof typeof windows) => {
    setWindows((prev) => ({
      ...prev,
      [name]: { ...prev[name], isMaximized: !prev[name].isMaximized },
    }));
  };

  const closeWindow = (name: keyof typeof windows) => {
    setWindows((prev) => ({
      ...prev,
      [name]: { ...prev[name], isOpen: false, isMinimized: false, isMaximized: false },
    }));
  };

  const handleDockClick = (name: keyof typeof windows) => {
    const win = windows[name];
    if (!win.isOpen) {
      openWindow(name);
    } else if (win.isMinimized) {
      const nextZ = maxZIndex + 1;
      setMaxZIndex(nextZ);
      setWindows((prev) => ({
        ...prev,
        [name]: { ...prev[name], isMinimized: false, zIndex: nextZ },
      }));
    } else {
      minimizeWindow(name);
    }
  };

  // Lofi Audio player hook
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.4);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => {
          console.log('Audio playback block or error:', err);
          setIsPlaying(true);
        });
    }
  };

  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    const val = newValue as number;
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    if (val > 0 && isMuted) {
      setIsMuted(false);
      if (audioRef.current) audioRef.current.muted = false;
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioRef.current.muted = nextMuted;
  };

  // --- Education data ---
  const education = [
    {
      institution: "University of Calgary",
      degree: "Bachelor of Science in Computer Science",
      period: "2023 - 2027 (Expected)",
      gpa: "3.6/4.0",
      activities: ["Computer Science Club", "Hackathons"],
      coursework: ["Data Structures & Algorithms", "Java OOP Design", "Operating Systems", "Database Systems", "Machine Learning", "Web Based Systems"],
      achievements: ["Dean's List 2023-2024"],
      description: "Focused on Software Engineering, Machine Learning, and Data Science.",
      logo: "/about/uofc.png"
    },
    {
      institution: "Garibaldi Secondary School",
      degree: "High School Diploma / IB Diploma",
      period: "2021 - 2023",
      gpa: "3.8/4.0",
      achievements: [
        "Top IB Math 12 Student (100% final grade)",
        "1st Place in BC Secondary School Math Contest 2022 (UofV)",
        "Several medals in UWaterloo Math Contests (Grades 11, 12)"
      ],
      description: "Studied abroad in Canada, completed IB Diploma and a Dogwood Diploma with strong mathematical results.",
      logo: "/about/gss.png"
    },
    {
      institution: "Le Hong Phong High School for the Gifted",
      degree: "Grade 10 Specialized in Mathematics",
      period: "2020 - 2021",
      gpa: "8.9/10",
      description: "Specialized mathematics student in Vietnam's top high school.",
      logo: "/about/lhp.png"
    }
  ];

  // --- Experience data ---
  const experience = [
    {
      title: "Applied AI Engineer Intern",
      company: "OLG (Ontario Lottery and Gaming Corporation)",
      period: "May 2026 - Present",
      location: "Toronto, Canada",
      description: "Designing and developing production LLM solutions and cognitive search applications for lottery and gaming channels. Engineering scalable AI systems using Azure AI Search, Azure Databricks, Azure OpenAI, FastAPI, React/Next.js, TypeScript, and SQL databases.",
      logo: "/about/olg.jpg",
      tech: ["FastAPI", "React", "Next.js", "Azure", "Azure AI Search", "Azure Databricks", "SQL"]
    },
    {
      title: "Software Engineer Intern",
      company: "FPT Software",
      period: "July 2025 - September 2025",
      location: "Ho Chi Minh City, Vietnam",
      description: "Architected and built a deep learning-based automated car inspection system using object detection frameworks, optimizing pipeline performance.",
      logo: "/about/FPT_Software_logo.webp",
      tech: ["FastAPI", "React.js", "OpenCV"]
    },
  ];

  // --- Projects Data (Plain catalog, in exact order, no ML tabs/filters) ---
  const projectsList: Project[] = [
    {
      title: "Deep Notes",
      description: "An Obsidian plugin that helps deepening the understanding of notes. Built with RAG, vector embeddings, and semantic search to offer real-time note connections.",
      image: "/projects/deep-notes.png",
      tech: ["TypeScript", "Obsidian API", "RAG", "Vector Search", "Semantic Search"],
      github: "https://github.com/noahnghg/DeepNotes",
      type: "Obsidian Plugin"
    },
    {
      title: "WiseXpense",
      description: "A smart fintech platform allowing users to track their budget, credit, and expenses with the help of machine learning and AI integrations.",
      image: "/projects/wisexpense.png",
      tech: ["Java", "PostgreSQL", "Python", "FastAPI", "Golang", "Plaid API", "Docker", "React"],
      github: "https://github.com/noahnghg/wisexpense"
    },
    {
      title: "CoFocus",
      description: "A collaborative productivity platform. SENG 513 project featuring real-time collaborative rooms and embedded AI assistants.",
      image: "/projects/cofocus.png",
      tech: ["Express.js", "TypeScript", "React", "Supabase", "PostgreSQL", "Docker"],
      github: "https://github.com/noahnghg/cofocus",
      type: "SENG 513 Project"
    },
    {
      title: "CampusPlug",
      description: "A marketplace platform for students with authentication and a recommendation engine. Class project for CPSC 457.",
      image: "/projects/campusplug.png",
      tech: ["Express.js", "MySQL", "React", "Python", "Flask", "Scikit-learn"],
      github: "https://github.com/noahnghg/campusplug",
      type: "CPSC 457 Project"
    }
  ];

  const shieldBadges: Record<string, string> = {
    "React": "https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB",
    "Next.js": "https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white",
    "TypeScript": "https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white",
    "Tailwind CSS": "https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white",
    "Python": "https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white",
    "Go": "https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white",
    "FastAPI": "https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white",
    "Flask": "https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white",
    "Express.js": "https://img.shields.io/badge/Express.js-404D59?style=for-the-badge",
    "PostgreSQL": "https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white",
    "MySQL": "https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white",
    "Prisma": "https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white",
    "Scikit-learn": "https://img.shields.io/badge/scikit_learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white",
    "PyTorch": "https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white",
    "Git": "https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white",
    "Docker": "https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white",
    "Vercel": "https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white",
    "Figma": "https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white",
    "VS Code": "https://img.shields.io/badge/VS_Code-0078D4?style=for-the-badge&logo=visual-studio-code&logoColor=white",
    "IntelliJ": "https://img.shields.io/badge/IntelliJ_IDEA-000000?style=for-the-badge&logo=intellij-idea&logoColor=white",
    "Azure Databricks": "https://img.shields.io/badge/Databricks-FF3621?style=for-the-badge&logo=databricks&logoColor=white",
    "Supabase": "https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white",
    "Java": "https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white",
    "Plaid API": "https://img.shields.io/badge/Plaid-000000?style=for-the-badge&logo=plaid&logoColor=white",
    "LangChain.js": "https://img.shields.io/badge/LangChain.js-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white",
    "Azure": "https://img.shields.io/badge/Azure-0078D4?style=for-the-badge&logo=microsoft&logoColor=white",
    "SQL": "https://img.shields.io/badge/sql-003B57?style=for-the-badge&logo=sqlite&logoColor=white",
    "React.js": "https://img.shields.io/badge/React.js-20232A?style=for-the-badge&logo=react&logoColor=61DAFB",
    "OpenCV": "https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white",
    "Azure AI Search": "https://img.shields.io/badge/Azure_AI_Search-0078D4?style=for-the-badge&logo=microsoft&logoColor=white",
    "Golang": "https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white",
    "Obsidian API": "https://img.shields.io/badge/Obsidian-483699?style=for-the-badge&logo=obsidian&logoColor=white",
    "RAG": "https://img.shields.io/badge/RAG-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white",
    "Vector Search": "https://img.shields.io/badge/Vector_Search-FF6F00?style=for-the-badge&logo=elasticsearch&logoColor=white",
    "Semantic Search": "https://img.shields.io/badge/Semantic_Search-4285F4?style=for-the-badge&logo=google&logoColor=white"
  };

  // Window frame renderer helper
  const renderWindow = (
    name: keyof typeof windows,
    title: string,
    width: string | number,
    height: string | number,
    children: React.ReactNode
  ) => {
    const win = windows[name];
    if (!win.isOpen || win.isMinimized) return null;

    return (
      <Card
        onClick={() => focusWindow(name)}
        className="window-open"
        sx={{
          position: 'absolute',
          width: win.isMaximized ? '100%' : { xs: '100%', md: width },
          height: win.isMaximized ? 'calc(100% - 28px - 72px)' : { xs: 'calc(100% - 28px - 72px)', md: height },
          maxHeight: win.isMaximized ? 'calc(100% - 28px - 72px)' : { xs: 'calc(100% - 28px - 72px)', md: 'calc(100vh - 140px)' },
          top: win.isMaximized ? 28 : { xs: 28, md: '50%' },
          left: win.isMaximized ? 0 : { xs: 0, md: '50%' },
          transform: win.isMaximized ? 'none' : { xs: 'none', md: 'translate(-50%, -50%)' },
          zIndex: win.zIndex,
          backgroundColor: mode === 'dark' ? '#073642' : '#eee8d5',
          borderColor: mode === 'dark' ? 'rgba(88, 110, 117, 0.3)' : 'rgba(7, 54, 66, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)',
          overflow: 'hidden',
          borderRadius: { xs: 2, md: win.isMaximized ? 0 : 3 },
          transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        {/* OS Window header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            px: 2.5,
            py: 1.5,
            backgroundColor: mode === 'dark' ? '#002b36' : '#eee8d5',
            borderBottom: mode === 'dark' ? '1px solid rgba(88, 110, 117, 0.15)' : '1px solid rgba(7, 54, 66, 0.1)',
            cursor: 'default',
            flexShrink: 0,
          }}
        >
          {/* OS Window Controls dots */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Box
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(name);
              }}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#dc322f',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover::after': {
                  content: '"×"',
                  color: 'rgba(0,0,0,0.5)',
                  fontSize: '9px',
                  fontWeight: 'bold',
                },
              }}
            />
            <Box
              onClick={(e) => {
                e.stopPropagation();
                minimizeWindow(name);
              }}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#b58900',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover::after': {
                  content: '"-"',
                  color: 'rgba(0,0,0,0.6)',
                  fontSize: '9px',
                  fontWeight: 'bold',
                },
              }}
            />
            <Box
              onClick={(e) => {
                e.stopPropagation();
                toggleMaximizeWindow(name);
              }}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#859900',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover::after': {
                  content: '"+"',
                  color: 'rgba(0,0,0,0.6)',
                  fontSize: '9px',
                  fontWeight: 'bold',
                },
              }}
            />
          </Box>
          <Typography
            sx={{
              flex: 1,
              textAlign: 'center',
              fontWeight: 700,
              fontSize: '0.85rem',
              color: mode === 'dark' ? '#eee8d5' : '#073642',
              fontFamily: 'var(--font-mono)',
              mr: 6, // Offset window dots spacer
            }}
          >
            {title}
          </Typography>
        </Box>

        {/* Window Content */}
        <Box className="window-scrollable" sx={{ flex: 1, p: { xs: 2, sm: 3.5 }, overflowY: 'auto' }}>
          {children}
        </Box>
      </Card>
    );
  };

  return (
    <>
      <Box
        className={`${mode === 'dark' ? 'desktop-bg-dark' : 'desktop-bg-light'} os-desktop-reveal ${showIntro ? 'intro-active' : ''} ${revealActive ? 'reveal-active' : ''}`}
        sx={{
          width: '100vw',
          height: '100dvh',
          position: 'relative',
          overflow: 'hidden',
        }}
      >

        {/* Hidden audio element for lofi Beats */}
        <audio
          ref={audioRef}
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
          loop
          preload="auto"
        />

        {/* 1. TOP MENU BAR */}
        <Box
          className="os-menu-bar"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 28,
            backgroundColor: mode === 'dark' ? 'rgba(0, 43, 54, 0.75)' : 'rgba(253, 246, 227, 0.75)',
            borderBottom: mode === 'dark' ? '1px solid rgba(88, 110, 117, 0.2)' : '1px solid rgba(7, 54, 66, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 2,
            zIndex: 10000,
            color: mode === 'dark' ? '#93a1a1' : '#586e75',
            fontFamily: 'var(--font-outfit)',
            fontSize: '0.85rem',
            fontWeight: 600,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'default' }}>
              <AppleIcon sx={{ fontSize: 16, mt: -0.2 }} />
              <Typography variant="body2" sx={{ fontWeight: 800, fontSize: '0.85rem', fontFamily: 'var(--font-outfit)' }}>
                Noah OS
              </Typography>
            </Box>

            {/* Quick Menu Links */}
            <Typography
              onClick={() => openWindow('about')}
              sx={{ cursor: 'pointer', '&:hover': { color: '#2aa198' }, display: { xs: 'none', md: 'block' } }}
            >
              About
            </Typography>
            <Typography
              onClick={() => openWindow('experience')}
              sx={{ cursor: 'pointer', '&:hover': { color: '#2aa198' }, display: { xs: 'none', md: 'block' } }}
            >
              Experience
            </Typography>
            <Typography
              onClick={() => openWindow('education')}
              sx={{ cursor: 'pointer', '&:hover': { color: '#2aa198' }, display: { xs: 'none', md: 'block' } }}
            >
              Education
            </Typography>
            <Typography
              onClick={() => openWindow('projects')}
              sx={{ cursor: 'pointer', '&:hover': { color: '#2aa198' }, display: { xs: 'none', md: 'block' } }}
            >
              Projects
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <WifiIcon sx={{ fontSize: 16, display: { xs: 'none', sm: 'block' } }} />
            <BatteryChargingFullIcon sx={{ fontSize: 16, display: { xs: 'none', sm: 'block' } }} />

            {/* Theme switcher */}
            <IconButton
              size="small"
              onClick={toggleTheme}
              sx={{
                color: '#2aa198',
                p: 0.5,
                '&:hover': { backgroundColor: 'rgba(42, 161, 152, 0.1)' }
              }}
            >
              {mode === 'dark' ? <LightModeIcon sx={{ fontSize: 16 }} /> : <DarkModeIcon sx={{ fontSize: 16 }} />}
            </IconButton>

            <Typography sx={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              {torontoTime || '12:00 PM'}
            </Typography>
          </Box>
        </Box>

        {/* 2. DESKTOP GRID (Folders on left side) */}
        <Box
          sx={{
            position: 'absolute',
            top: 48,
            left: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            zIndex: 5,
          }}
        >
          {/* Folder: About */}
          <Box
            onClick={() => openWindow('about')}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              width: 76,
              gap: 0.5,
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          >
            <FolderIcon sx={{ fontSize: 44, color: '#2aa198', filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.35))' }} />
            <Typography
              sx={{
                fontSize: '0.75rem',
                color: mode === 'dark' ? '#eee8d5' : '#073642',
                fontWeight: 700,
                fontFamily: 'var(--font-outfit)',
                textAlign: 'center',
                textShadow: mode === 'dark' ? '0 1px 4px rgba(0,0,0,0.8)' : '0 1px 3px rgba(255,255,255,0.8)',
              }}
            >
              About Me
            </Typography>
          </Box>

          {/* Folder: Experience */}
          <Box
            onClick={() => openWindow('experience')}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              width: 76,
              gap: 0.5,
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          >
            <FolderIcon sx={{ fontSize: 44, color: '#6c71c4', filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.35))' }} />
            <Typography
              sx={{
                fontSize: '0.75rem',
                color: mode === 'dark' ? '#eee8d5' : '#073642',
                fontWeight: 700,
                fontFamily: 'var(--font-outfit)',
                textAlign: 'center',
                textShadow: mode === 'dark' ? '0 1px 4px rgba(0,0,0,0.8)' : '0 1px 3px rgba(255,255,255,0.8)',
              }}
            >
              Experience
            </Typography>
          </Box>

          {/* Folder: Education */}
          <Box
            onClick={() => openWindow('education')}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              width: 76,
              gap: 0.5,
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          >
            <FolderIcon sx={{ fontSize: 44, color: '#859900', filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.35))' }} />
            <Typography
              sx={{
                fontSize: '0.75rem',
                color: mode === 'dark' ? '#eee8d5' : '#073642',
                fontWeight: 700,
                fontFamily: 'var(--font-outfit)',
                textAlign: 'center',
                textShadow: mode === 'dark' ? '0 1px 4px rgba(0,0,0,0.8)' : '0 1px 3px rgba(255,255,255,0.8)',
              }}
            >
              Education
            </Typography>
          </Box>

          {/* Folder: Projects */}
          <Box
            onClick={() => openWindow('projects')}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              width: 76,
              gap: 0.5,
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          >
            <FolderIcon sx={{ fontSize: 44, color: '#b58900', filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.35))' }} />
            <Typography
              sx={{
                fontSize: '0.75rem',
                color: mode === 'dark' ? '#eee8d5' : '#073642',
                fontWeight: 700,
                fontFamily: 'var(--font-outfit)',
                textAlign: 'center',
                textShadow: mode === 'dark' ? '0 1px 4px rgba(0,0,0,0.8)' : '0 1px 3px rgba(255,255,255,0.8)',
              }}
            >
              Projects
            </Typography>
          </Box>

          {/* App: Lofi Beats */}
          <Box
            onClick={() => openWindow('lofi')}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              width: 76,
              gap: 0.5,
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 1.5,
                backgroundColor: '#cb4b16',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fdf6e3',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
              }}
            >
              <HeadsetIcon sx={{ fontSize: 26 }} />
            </Box>
            <Typography
              sx={{
                fontSize: '0.75rem',
                color: mode === 'dark' ? '#eee8d5' : '#073642',
                fontWeight: 700,
                fontFamily: 'var(--font-outfit)',
                textAlign: 'center',
                textShadow: mode === 'dark' ? '0 1px 4px rgba(0,0,0,0.8)' : '0 1px 3px rgba(255,255,255,0.8)',
              }}
            >
              Lofi Player
            </Typography>
          </Box>
        </Box>

        {/* 3. OS APPLICATION WINDOWS */}

        {/* ================= WINDOW: ABOUT ME ================= */}
        {renderWindow('about', 'About Me', 850, 580, (
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4, alignItems: 'start' }}>
            <Box
              sx={{
                position: 'relative',
                width: 130,
                height: 130,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid #2aa198',
                flexShrink: 0,
                mx: { xs: 'auto', sm: 0 },
              }}
            >
              <Image src="/lofi_pic.png" alt="Profile" fill className="object-cover" />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', flexWrap: 'wrap', mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: mode === 'dark' ? '#eee8d5' : '#073642', fontFamily: 'var(--font-outfit)' }}>
                  Hong Anh Khoa Nguyen
                </Typography>
                <Chip label="Noah Nguyen" size="small" sx={{ fontWeight: 700, backgroundColor: 'rgba(108,113,196,0.15)', color: '#6c71c4' }} />
              </Box>

              {/* Status Banner */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <Box className="pulse-status" sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#859900' }} />
                <Typography sx={{ color: '#859900', fontSize: '0.85rem', fontWeight: 700, fontFamily: 'var(--font-outfit)' }}>
                  OLG AI Engineer Intern &bull; Open for Winter & Summer 2027 Internships
                </Typography>
              </Box>

              <Typography sx={{ color: mode === 'dark' ? '#93a1a1' : '#586e75', mb: 2.5, lineHeight: 1.6, fontSize: '0.95rem' }}>
                I am an Applied AI Engineer Intern at <strong>OLG</strong> (Ontario Lottery and Gaming Corporation) and a Computer Science student at the <strong>University of Calgary</strong>. I am passionate about applying artificial intelligence and cloud architectures to solve complex business pain points.
              </Typography>

              <Typography sx={{ color: mode === 'dark' ? '#839496' : '#657b83', mb: 4, lineHeight: 1.6, fontSize: '0.9rem' }}>
                My main areas of focus involve designing deep learning inspection pipelines, constructing cognitive vector search databases, deploying microservice backends, and fine-tuning retrieval-augmented LLM systems.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button variant="contained" component="a" href="/resume.pdf" target="_blank" sx={{ borderRadius: 100 }}>
                  View Resume / CV
                </Button>
                <Button variant="outlined" component="a" href="mailto:noahnghgwork@gmail.com" sx={{ borderRadius: 100, color: '#2aa198', borderColor: 'rgba(42,161,152,0.4)' }}>
                  Get in Touch
                </Button>
              </Box>
            </Box>
          </Box>
        ))}

        {/* ================= WINDOW: EXPERIENCE ================= */}
        {renderWindow('experience', 'Professional Experience', 850, 600, (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
            {experience.map((exp, idx) => (
              <Box
                key={idx}
                sx={{
                  p: { xs: 2, sm: 3 },
                  borderRadius: 3.5,
                  backgroundColor: mode === 'dark' ? 'rgba(0, 43, 54, 0.25)' : 'rgba(7, 54, 66, 0.03)',
                  borderLeft: '4px solid #6c71c4',
                  border: mode === 'dark' ? '1px solid rgba(88, 110, 117, 0.15)' : '1px solid rgba(7, 54, 66, 0.08)',
                  borderLeftWidth: 4,
                }}
              >
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'start', mb: 1.5 }}>
                  {exp.logo && (
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 1.5,
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        flexShrink: 0,
                        p: 0.5,
                        border: '1px solid rgba(88, 110, 117, 0.15)',
                      }}
                    >
                      <img src={exp.logo} alt={exp.company} className="max-w-full max-h-full object-contain" />
                    </Box>
                  )}
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 850, color: mode === 'dark' ? '#eee8d5' : '#073642', fontFamily: 'var(--font-outfit)', lineHeight: 1.2 }}>
                      {exp.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#6c71c4', fontWeight: 700, display: 'block', mt: 0.2 }}>
                      {exp.company}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="caption" sx={{ display: 'block', color: '#586e75', fontFamily: 'var(--font-mono)', mb: 1.5 }}>
                  {exp.period} &bull; {exp.location}
                </Typography>
                <Typography variant="body2" sx={{ color: mode === 'dark' ? '#839496' : '#586e75', lineHeight: 1.5 }}>
                  {exp.description}
                </Typography>
                {exp.tech && (
                  <Box sx={{ mt: 1.5, display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                    {exp.tech.map((t) => (
                      shieldBadges[t] ? (
                        <Box component="img" key={t} src={shieldBadges[t]} alt={t} sx={{ height: 20, borderRadius: 0.5 }} />
                      ) : (
                        <Chip
                          key={t}
                          label={t}
                          size="small"
                          variant="outlined"
                          sx={{
                            fontSize: '0.7rem',
                            height: 20,
                            color: mode === 'dark' ? '#839496' : '#586e75',
                            borderColor: mode === 'dark' ? 'rgba(88, 110, 117, 0.2)' : 'rgba(7, 54, 66, 0.1)',
                            fontFamily: 'var(--font-mono)',
                          }}
                        />
                      )
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        ))}

        {/* ================= WINDOW: EDUCATION ================= */}
        {renderWindow('education', 'Academic Timeline', 850, 600, (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
            {education.map((edu, idx) => (
              <Box
                key={idx}
                sx={{
                  p: { xs: 2, sm: 3 },
                  borderRadius: 3.5,
                  backgroundColor: mode === 'dark' ? 'rgba(0, 43, 54, 0.25)' : 'rgba(7, 54, 66, 0.03)',
                  borderLeft: '4px solid #2aa198',
                  border: mode === 'dark' ? '1px solid rgba(88, 110, 117, 0.15)' : '1px solid rgba(7, 54, 66, 0.08)',
                  borderLeftWidth: 4,
                }}
              >
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'start', mb: 1.5 }}>
                  {edu.logo && (
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 1.5,
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        flexShrink: 0,
                        p: 0.5,
                        border: '1px solid rgba(88, 110, 117, 0.15)',
                      }}
                    >
                      <img src={edu.logo} alt={edu.institution} className="max-w-full max-h-full object-contain" />
                    </Box>
                  )}
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 850, color: mode === 'dark' ? '#eee8d5' : '#073642', fontFamily: 'var(--font-outfit)', lineHeight: 1.2 }}>
                      {edu.institution}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#2aa198', fontWeight: 700, display: 'block', mt: 0.2 }}>
                      {edu.degree}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1.5 }}>
                  <Typography variant="caption" sx={{ color: '#586e75', fontFamily: 'var(--font-mono)' }}>
                    {edu.period}
                  </Typography>
                  {edu.gpa && (
                    <span className="text-[#859900] font-semibold text-xs font-mono bg-[#859900]/10 px-2 py-0.5 rounded border border-[#859900]/25">
                      GPA: {edu.gpa}
                    </span>
                  )}
                </Box>

                <Typography variant="body2" sx={{ color: mode === 'dark' ? '#839496' : '#586e75', mb: 2, lineHeight: 1.5 }}>
                  {edu.description}
                </Typography>

                {edu.coursework && (
                  <Box sx={{ mt: 1.5 }}>
                    <Typography variant="caption" sx={{ display: 'block', color: '#586e75', fontWeight: 700, mb: 1, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Key Coursework
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                      {edu.coursework.map((course, cIdx) => (
                        <Chip
                          key={cIdx}
                          label={course}
                          size="small"
                          variant="outlined"
                          sx={{
                            fontSize: '0.75rem',
                            color: mode === 'dark' ? '#839496' : '#657b83',
                            borderColor: mode === 'dark' ? 'rgba(88, 110, 117, 0.2)' : 'rgba(7, 54, 66, 0.1)',
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        ))}

        {/* ================= WINDOW: PROJECTS ================= */}
        {renderWindow('projects', 'Projects Spotlight File', 980, 620, (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {projectsList.map((project, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  backgroundColor: mode === 'dark' ? 'rgba(0, 43, 54, 0.2)' : 'rgba(7, 54, 66, 0.02)',
                  border: mode === 'dark' ? '1px solid rgba(88, 110, 117, 0.15)' : '1px solid rgba(7, 54, 66, 0.1)',
                  borderRadius: 4,
                  overflow: 'hidden',
                }}
              >
                {/* Photo frame */}
                <Box
                  sx={{
                    width: { xs: '100%', sm: 200 },
                    height: 180,
                    position: 'relative',
                    flexShrink: 0,
                    borderRight: { xs: 'none', sm: mode === 'dark' ? '1px solid rgba(88, 110, 117, 0.15)' : '1px solid rgba(7, 54, 66, 0.1)' },
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 600px) 100vw, 200px"
                    className="object-cover"
                  />
                  {project.type && (
                    <Chip
                      label={project.type}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        backgroundColor: 'rgba(0, 43, 54, 0.85)',
                        color: '#2aa198',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)',
                        border: '1px solid rgba(42,161,152,0.3)',
                      }}
                    />
                  )}
                </Box>

                {/* Text Details */}
                <Box sx={{ p: { xs: 2, sm: 3 }, flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Typography variant="h6" sx={{ color: mode === 'dark' ? '#eee8d5' : '#073642', fontWeight: 800, fontFamily: 'var(--font-outfit)' }}>
                    {project.title}
                  </Typography>
                  <Typography sx={{ color: mode === 'dark' ? '#93a1a1' : '#586e75', fontSize: '0.85rem', lineHeight: 1.45 }}>
                    {project.description}
                  </Typography>

                  {/* Badges */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 'auto' }}>
                    {project.tech.map((tech) => (
                      shieldBadges[tech] ? (
                        <Box component="img" key={tech} src={shieldBadges[tech]} alt={tech} sx={{ height: 20, borderRadius: 0.5 }} />
                      ) : (
                        <Chip
                          key={tech}
                          label={tech}
                          size="small"
                          variant="outlined"
                          sx={{
                            fontSize: '0.65rem',
                            height: 20,
                            color: mode === 'dark' ? '#839496' : '#586e75',
                            borderColor: mode === 'dark' ? 'rgba(88, 110, 117, 0.25)' : 'rgba(7, 54, 66, 0.15)',
                            fontFamily: 'var(--font-mono)',
                          }}
                        />
                      )
                    ))}
                  </Box>

                  {/* Actions buttons */}
                  <Box sx={{ display: 'flex', gap: 1.5, mt: 1 }}>
                    {project.github && (
                      <Button
                        variant="outlined"
                        size="small"
                        component="a"
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<GitHubIcon />}
                        sx={{ fontSize: '0.75rem', py: 0.6, color: '#2aa198', borderColor: 'rgba(42, 161, 152, 0.4)' }}
                      >
                        Source Code
                      </Button>
                    )}
                    {project.demo && (
                      <Button
                        variant="contained"
                        size="small"
                        component="a"
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        startIcon={<LaunchIcon />}
                        sx={{ fontSize: '0.75rem', py: 0.6, color: '#002b36' }}
                      >
                        Live Link
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        ))}

        {/* ================= WINDOW: LOFI beats player ================= */}
        {renderWindow('lofi', 'Lofi Audio Player', 460, 260, (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, pt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              {/* Play/Pause Button */}
              <IconButton
                onClick={togglePlay}
                sx={{
                  backgroundColor: isPlaying ? '#6c71c4' : '#2aa198',
                  color: '#002b36',
                  width: 54,
                  height: 54,
                  boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                  '&:hover': {
                    backgroundColor: isPlaying ? '#585db2' : '#238a80',
                  },
                }}
              >
                {isPlaying ? <PauseIcon sx={{ fontSize: 28 }} /> : <PlayArrowIcon sx={{ fontSize: 28 }} />}
              </IconButton>

              <Box>
                <Typography variant="subtitle2" sx={{ color: mode === 'dark' ? '#eee8d5' : '#073642', fontWeight: 800, fontSize: '1rem', fontFamily: 'var(--font-outfit)' }}>
                  {isPlaying ? 'Synthesizer Calm Beats' : 'Music Stopped'}
                </Typography>
                <Typography variant="caption" sx={{ color: '#586e75', display: 'block', fontFamily: 'var(--font-mono)' }}>
                  {isPlaying ? 'Now Playing &bull; 128kbps' : 'Click Play to Begin Beat'}
                </Typography>
              </Box>
            </Box>

            {/* Equalizer animation */}
            <Box sx={{ display: 'flex', alignItems: 'flex-end', height: 20, gap: 0.5, width: 30, mt: 1 }}>
              {[1, 2, 3, 4, 5].map(bar => (
                <Box
                  key={bar}
                  className={`eq-bar eq-bar-${bar}`}
                  sx={{
                    width: 3.5,
                    height: '100%',
                    backgroundColor: '#6c71c4',
                    borderRadius: '2px 2px 0 0',
                    animationPlayState: isPlaying ? 'running' : 'paused',
                  }}
                />
              ))}
            </Box>

            {/* Volume control */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: { xs: 160, sm: 220 }, mt: 1 }}>
              <IconButton onClick={toggleMute} sx={{ color: mode === 'dark' ? '#eee8d5' : '#073642', p: 0.5 }}>
                {isMuted ? <VolumeOffIcon sx={{ fontSize: 18 }} /> : <VolumeUpIcon sx={{ fontSize: 18 }} />}
              </IconButton>
              <Slider
                size="small"
                value={volume}
                min={0}
                max={1}
                step={0.05}
                onChange={handleVolumeChange}
                sx={{
                  color: '#6c71c4',
                  height: 4,
                  '& .MuiSlider-thumb': {
                    width: 8,
                    height: 8,
                  },
                }}
              />
            </Box>
          </Box>
        ))}

        {/* 4. BOTTOM OS DOCK CONTAINER (AUTO-HIDES, HOVER TRIGGER AREA) */}
        <Box
          className="dock-trigger-zone"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            height: { xs: 'auto', md: 60 }, // On mobile, auto height (no hover buffer needed)
            display: 'flex',
            alignItems: 'flex-end',
            zIndex: 10000,
            pb: 1.5, // 12px margin from bottom edge
            // Hover logic to slide up - only on desktop
            '&:hover .os-dock-container': {
              transform: { xs: 'none', md: 'translateY(0)' },
              opacity: { xs: 1, md: 1 },
            },
          }}
        >
          <Box
            className="os-dock-container"
            sx={{
              display: 'flex',
              gap: { xs: 1.25, sm: 2.5 },
              alignItems: 'flex-end',
              px: { xs: 1.5, sm: 3 },
              py: 1.5,
              backgroundColor: mode === 'dark' ? 'rgba(7, 54, 66, 0.85)' : 'rgba(238, 232, 213, 0.85)',
              borderRadius: 4,
              border: mode === 'dark' ? '1px solid rgba(88, 110, 117, 0.2)' : '1px solid rgba(7, 54, 66, 0.12)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.4)',
              transform: { xs: 'translateY(0)', md: 'translateY(80px)' }, // Always visible on mobile, slides off-screen on desktop
              opacity: { xs: 1, md: 0.35 }, // Full opacity on mobile, dims on desktop when idle
              transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease',
            }}
          >
            {/* Dock Item: Finder (About Me) */}
            <Tooltip title="About Me" placement="top" arrow>
              <Box
                onClick={() => handleDockClick('about')}
                className="os-dock-icon"
                sx={{
                  width: { xs: 42, sm: 48 },
                  height: { xs: 42, sm: 48 },
                  borderRadius: 2,
                  backgroundColor: '#268bd2', // Blue
                  color: '#eee8d5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
                  position: 'relative',
                }}
              >
                <AccountCircleIcon sx={{ fontSize: { xs: 26, sm: 30 } }} />
                {windows.about.isOpen && (
                  <Box sx={{ position: 'absolute', bottom: -5, width: 4, height: 4, borderRadius: '50%', backgroundColor: '#eee8d5' }} />
                )}
              </Box>
            </Tooltip>

            {/* Dock Item: TextEdit (Experience) */}
            <Tooltip title="Experience" placement="top" arrow>
              <Box
                onClick={() => handleDockClick('experience')}
                className="os-dock-icon"
                sx={{
                  width: { xs: 42, sm: 48 },
                  height: { xs: 42, sm: 48 },
                  borderRadius: 2,
                  backgroundColor: '#6c71c4', // Violet
                  color: '#eee8d5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
                  position: 'relative',
                }}
              >
                <BusinessCenterIcon sx={{ fontSize: { xs: 22, sm: 26 } }} />
                {windows.experience.isOpen && (
                  <Box sx={{ position: 'absolute', bottom: -5, width: 4, height: 4, borderRadius: '50%', backgroundColor: '#eee8d5' }} />
                )}
              </Box>
            </Tooltip>

            {/* Dock Item: School Calendar (Education) */}
            <Tooltip title="Education" placement="top" arrow>
              <Box
                onClick={() => handleDockClick('education')}
                className="os-dock-icon"
                sx={{
                  width: { xs: 42, sm: 48 },
                  height: { xs: 42, sm: 48 },
                  borderRadius: 2,
                  backgroundColor: '#859900', // Green
                  color: '#eee8d5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
                  position: 'relative',
                }}
              >
                <SchoolIcon sx={{ fontSize: 24 }} />
                {windows.education.isOpen && (
                  <Box sx={{ position: 'absolute', bottom: -5, width: 4, height: 4, borderRadius: '50%', backgroundColor: '#eee8d5' }} />
                )}
              </Box>
            </Tooltip>

            {/* Dock Item: Terminal (Projects) */}
            <Tooltip title="Projects Catalog" placement="top" arrow>
              <Box
                onClick={() => handleDockClick('projects')}
                className="os-dock-icon"
                sx={{
                  width: { xs: 42, sm: 48 },
                  height: { xs: 42, sm: 48 },
                  borderRadius: 2,
                  backgroundColor: '#002b36', // Dark Slate
                  border: '1px solid rgba(88, 110, 117, 0.4)',
                  color: '#2aa198',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
                  position: 'relative',
                }}
              >
                <TerminalIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
                {windows.projects.isOpen && (
                  <Box sx={{ position: 'absolute', bottom: -5, width: 4, height: 4, borderRadius: '50%', backgroundColor: '#2aa198' }} />
                )}
              </Box>
            </Tooltip>

            {/* Dock Item: iTunes / Music (Lofi Beats) */}
            <Tooltip title="Lofi Player" placement="top" arrow>
              <Box
                onClick={() => handleDockClick('lofi')}
                className="os-dock-icon"
                sx={{
                  width: { xs: 42, sm: 48 },
                  height: { xs: 42, sm: 48 },
                  borderRadius: 2,
                  backgroundColor: '#cb4b16', // Orange
                  color: '#eee8d5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
                  position: 'relative',
                }}
              >
                <HeadsetIcon sx={{ fontSize: { xs: 22, sm: 26 } }} />
                {windows.lofi.isOpen && (
                  <Box sx={{ position: 'absolute', bottom: -5, width: 4, height: 4, borderRadius: '50%', backgroundColor: '#eee8d5' }} />
                )}
              </Box>
            </Tooltip>
          </Box>
        </Box>

      </Box>

      {/* 5. Developer Boot Terminal Intro Overlay */}
      {showIntro && (
        <Box
          className="intro-overlay"
          sx={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999, // Sit on top of everything
            backgroundColor: '#002b36', // Solarized Dark Base03
            color: '#839496', // Solarized Base0
            p: { xs: 2, sm: 6 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono), monospace',
            fontSize: { xs: '0.72rem', sm: '0.85rem' },
            lineHeight: { xs: 1.35, sm: 1.6 },
            transition: 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
            opacity: introFading ? 0 : 1,
            pointerEvents: introFading ? 'none' : 'auto',
          }}
        >
          {/* Logs panel */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 0.25, sm: 0.5 }, maxWidth: '800px', mx: 'auto', width: '100%', pt: { xs: 4, sm: 6 } }}>
            {terminalLogs.map((log, index) => (
              <Typography
                key={index}
                sx={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: { xs: '0.72rem', sm: '0.85rem' },
                  color: log.includes('[ SUCCESS ]')
                    ? '#859900' // Green
                    : log.includes('login')
                      ? '#93a1a1'
                      : '#839496',
                }}
              >
                {log}
              </Typography>
            ))}

            {/* Current command typing line */}
            <Typography sx={{ fontFamily: 'var(--font-mono), monospace', fontSize: { xs: '0.72rem', sm: '0.85rem' }, color: '#839496' }}>
              guest@noah-dev:~$ {typedCommand}
              {typedCommand.length < "noah-os --boot".length && (
                <Box
                  component="span"
                  sx={{
                    display: 'inline-block',
                    width: '8px',
                    height: '15px',
                    backgroundColor: '#839496',
                    ml: 0.5,
                    verticalAlign: 'middle',
                    animation: 'cursor-blink 1s infinite step-end',
                    '@keyframes cursor-blink': {
                      '0%, 100%': { opacity: 1 },
                      '50%': { opacity: 0 },
                    }
                  }}
                />
              )}
            </Typography>
          </Box>

          {/* Footer actions */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '800px', mx: 'auto', width: '100%', pt: 2, borderTop: '1px solid rgba(88, 110, 117, 0.2)' }}>
            <Typography sx={{ fontSize: '0.7rem', color: '#586e75', fontFamily: 'var(--font-mono)' }}>
              SYSTEM BOOT V1.0.0
            </Typography>
            <Button
              variant="text"
              onClick={handleSkipIntro}
              sx={{
                color: '#2aa198',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                opacity: 0.7,
                '&:hover': {
                  opacity: 1,
                  backgroundColor: 'rgba(42, 161, 152, 0.08)',
                },
              }}
            >
              Skip Boot &gt;
            </Button>
          </Box>
        </Box>
      )}

    </>
  );
}