import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'sky-blue': '#87ceeb',        // Light Sky Blue
        'pale-blue': '#b6d7ff',       // Pale Blue
        'soft-blue': '#a4c8e1',       // Soft Blue
        'light-blue': '#cfe4ff',      // Very Light Blue
        'cream': '#f8f9fa',           // Cream White
        'soft-gray': '#f1f3f4',       // Soft Gray
        'light-gray': '#e8eaed',      // Light Gray
        'medium-gray': '#9aa0a6',     // Medium Gray
        // Lighter dark theme colors
        'dark-slate': '#475569',      // Lighter slate-600
        'dark-gray': '#6b7280',       // Lighter gray-500
        'light-slate': '#64748b',     // Lighter slate-500
        'very-light-slate': '#94a3b8', // slate-400
      },
      animation: {
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'shine': 'shine 8s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'shine': {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [
    require('daisyui')
  ],
} as Config & {
  daisyui?: {
    themes: Array<Record<string, any>>;
  };
};

// DaisyUI theme configuration
(config as any).daisyui = {
  themes: [
    {
      "custom-light": {
        "primary": "#87ceeb",        // Light Sky Blue
        "primary-content": "#1a1a1a", // Dark text for contrast
        "secondary": "#b6d7ff",      // Pale Blue
        "secondary-content": "#1a1a1a", // Dark text
        "accent": "#a4c8e1",         // Soft Blue
        "accent-content": "#1a1a1a",  // Dark text
        "neutral": "#f1f3f4",        // Soft Gray
        "neutral-content": "#2d3748", // Dark Gray text
        "base-100": "#ffffff",       // Pure White
        "base-200": "#f8f9fa",       // Cream
        "base-300": "#e8eaed",       // Light Gray
        "base-content": "#2d3748",   // Dark Gray text
        "info": "#87ceeb",           // Light Sky Blue
        "info-content": "#1a1a1a",   // Dark text
        "success": "#48bb78",        // Green
        "success-content": "#ffffff", // White text
        "warning": "#ed8936",        // Orange
        "warning-content": "#ffffff", // White text
        "error": "#f56565",          // Red
        "error-content": "#ffffff",  // White text
      },
      "coding-dark": {
        "primary": "#38bdf8",        // Cyan/React Blue
        "primary-content": "#000000",
        "secondary": "#818cf8",      // Indigo
        "secondary-content": "#ffffff",
        "accent": "#22d3ee",         // Cyan Accent
        "accent-content": "#000000",
        "neutral": "#1f2937",        // Dark Grey
        "neutral-content": "#e5e7eb", // Light Grey text
        "base-100": "#0f172a",       // Very Dark Blue/Slate
        "base-200": "#1e293b",       // Dark Slate
        "base-300": "#334155",       // Slate
        "base-content": "#f8fafc",   // Almost White text
        "info": "#3abff8",
        "success": "#36d399",
        "warning": "#fbbd23",
        "error": "#f87272",
      },
    },
  ],
};

export default config
