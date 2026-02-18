/**
 * OGRE Design System - Design Tokens
 *
 * These tokens are the foundation of the design system.
 * They define colors, shadows, border radii, and other design primitives.
 */

export const colors = {
  primary: {
    DEFAULT: '#800020', // Deep Burgundy - more premium than previous #6C3333
    hover: '#5e0017',
    active: '#4a0012',
    light: '#a64d63', // For backgrounds/accents
  },
  secondary: {
    DEFAULT: '#1a1a1a',
    hover: '#000000',
    active: '#333333',
  },
  text: {
    primary: '#111827', // Gray-900 instead of black
    secondary: '#4b5563', // Gray-600
    muted: '#9ca3af', // Gray-400
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
    bg: '#f8fafc', // Slate-50 - subtle contrast
    border: '#e2e8f0', // Slate-200
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
    DEFAULT: '#9f1239', // Rose-800/900 mix
    hover: '#881337',
    active: '#be123c',
    light: '#4c0519',
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
    primary: '#0f0808', // Very dark maroon-tinted black
    secondary: '#1a0f0f', // Dark maroon-tinted gray
    tertiary: '#2d1a1a', // Darker maroon-tinted gray
    hover: '#1a0f0f',
  },
  border: {
    DEFAULT: '#3d2020', // Maroon-tinted border
    light: '#2d1a1a',
    dark: '#4d2828',
  },
  sidebar: {
    bg: '#0a0505', // Deepest maroon-tinted black
    border: '#2d1a1a',
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
