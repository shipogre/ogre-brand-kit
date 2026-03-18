/**
 * OGRE Design System - Design Tokens
 *
 * These tokens are the foundation of the design system.
 * They define colors, shadows, border radii, and other design primitives.
 */

export const colors = {
  primary: {
    DEFAULT: '#7F1D1D', // OGRE Dark Red (red-900)
    hover: '#991B1B',   // Slightly lighter on hover (red-800)
    active: '#450a0a',  // Deeper on active
    light: '#fef2f2',   // Red-50 for backgrounds/accents
  },
  secondary: {
    DEFAULT: '#111827', // Gray-900
    hover: '#000000',
    active: '#374151',
  },
  accent: {
    DEFAULT: '#1E3A8A', // Blue-800 - secondary accent
  },
  text: {
    primary: '#111827', // Gray-900
    secondary: '#374151', // Gray-700
    muted: '#6B7280', // Gray-500
    inverted: '#ffffff',
  },
  bg: {
    primary: '#ffffff',
    secondary: '#f9fafb', // Gray-50
    tertiary: '#f3f4f6', // Gray-100
    hover: '#f3f4f6',
  },
  border: {
    DEFAULT: '#e5e7eb', // Gray-200
    light: '#f3f4f6',
    dark: '#d1d5db',
  },
  sidebar: {
    bg: '#1E293B', // Slate-800 - dark sidebar
    border: '#334155', // Slate-700
    hover: '#334155', // Slate-700
  },
  status: {
    success: '#059669', // Emerald-600
    successBg: '#ecfdf5',
    warning: '#d97706', // Amber-600
    warningBg: '#fffbeb',
    error: '#dc2626', // Red-600
    errorBg: '#fef2f2',
    info: '#2563eb', // Blue-600
    infoBg: '#eff6ff',
  },
  action: {
    approve: '#06b6d4', // Cyan-500
    approveBg: '#ecfeff',
    file: '#f97316', // Orange-500
    fileBg: '#fff7ed',
    reject: '#ea580c', // Orange-600
    rejectBg: '#fff7ed',
    contact: '#14b8a6', // Teal-500
    contactBg: '#f0fdfa',
  },
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
} as const;

export const radius = {
  sm: '0.375rem', // 6px
  md: '0.5rem',   // 8px
  lg: '0.75rem',  // 12px
  xl: '1rem',     // 16px
  full: '9999px',
} as const;

export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
} as const;

export const transition = {
  DEFAULT: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  fast: 'all 0.1s cubic-bezier(0.4, 0, 0.2, 1)',
  slow: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

export const fontFamily = {
  sans: [
    'Inter',
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Noto Color Emoji"'
  ],
} as const;

export const fontSize = {
  xs: ['0.75rem', { lineHeight: '1rem' }],
  sm: ['0.875rem', { lineHeight: '1.25rem' }],
  base: ['1rem', { lineHeight: '1.5rem' }],
  lg: ['1.125rem', { lineHeight: '1.75rem' }],
  xl: ['1.25rem', { lineHeight: '1.75rem' }],
  '2xl': ['1.5rem', { lineHeight: '2rem' }],
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
} as const;

// Dark mode colors
export const darkColors = {
  primary: {
    DEFAULT: '#991B1B', // Red-800
    hover: '#B91C1C',   // Red-700
    active: '#7F1D1D',  // Red-900
    light: '#450a0a',   // Red-950 for dark mode backgrounds
  },
  secondary: {
    DEFAULT: '#ffffff',
    hover: '#e5e5e5',
    active: '#d4d4d4',
  },
  text: {
    primary: '#f9fafb', // Gray-50
    secondary: '#d1d5db', // Gray-300
    muted: '#9ca3af', // Gray-400
    inverted: '#111827',
  },
  bg: {
    primary: '#0f172a', // Slate-900
    secondary: '#1e293b', // Slate-800
    tertiary: '#334155', // Slate-700
    hover: '#1e293b',
  },
  border: {
    DEFAULT: '#334155', // Slate-700
    light: '#1e293b',
    dark: '#475569',   // Slate-600
  },
  sidebar: {
    bg: '#0f172a', // Slate-900
    border: '#1e293b',
    hover: '#334155',
  },
  status: {
    success: '#34d399',
    successBg: 'rgba(52, 211, 153, 0.1)',
    warning: '#fbbf24',
    warningBg: 'rgba(251, 191, 36, 0.1)',
    error: '#f87171',
    errorBg: 'rgba(248, 113, 113, 0.1)',
    info: '#60a5fa',
    infoBg: 'rgba(96, 165, 250, 0.1)',
  },
} as const;

// Export all tokens as a single object
export const tokens = {
  colors,
  darkColors,
  shadows,
  radius,
  spacing,
  transition,
  fontFamily,
  fontSize,
} as const;

export default tokens;
