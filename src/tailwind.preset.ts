/**
 * OGRE Design System - Tailwind CSS Preset
 *
 * This preset extends Tailwind with OGRE design tokens.
 * Use it in your tailwind.config.ts:
 *
 * import ogrePreset from 'ogre-brand-kit/preset';
 *
 * export default {
 *   presets: [ogrePreset],
 *   // your config
 * }
 */

import { colors, shadows, radius, fontFamily, fontSize } from './tokens';

export const ogrePreset = {
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        secondary: colors.secondary,
        ogre: {
          text: colors.text,
          bg: colors.bg,
          border: colors.border,
          sidebar: colors.sidebar,
        },
        success: colors.status.success,
        warning: colors.status.warning,
        error: colors.status.error,
        info: colors.status.info,
      },
      boxShadow: {
        sm: shadows.sm,
        md: shadows.md,
        lg: shadows.lg,
      },
      borderRadius: {
        sm: radius.sm,
        md: radius.md,
        lg: radius.lg,
      },
      fontFamily: {
        sans: fontFamily.sans,
      },
      fontSize: {
        xs: fontSize.xs,
        sm: fontSize.sm,
        base: fontSize.base,
        lg: fontSize.lg,
        xl: fontSize.xl,
        '2xl': fontSize['2xl'],
        '3xl': fontSize['3xl'],
      },
      transitionProperty: {
        DEFAULT: 'all',
      },
      transitionDuration: {
        DEFAULT: '200ms',
        fast: '100ms',
        slow: '300ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease',
      },
    },
  },
};

export default ogrePreset;
