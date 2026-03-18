/**
 * OGRE Design System - Tailwind Component Plugin
 *
 * This plugin provides pre-built component classes that can be used
 * directly in your markup. These are converted from the original
 * OGRE brand kit CSS styles.
 */

import { colors, shadows, radius } from '../tokens';

type PluginAPI = {
  addComponents: (components: Record<string, Record<string, string | Record<string, string>>>) => void;
  addBase: (base: Record<string, Record<string, string>>) => void;
  theme: (path: string) => string;
};

export const ogreComponentsPlugin = {
  handler: ({ addComponents, addBase }: PluginAPI) => {
    // Base styles
    addBase({
      '*': {
        margin: '0',
        padding: '0',
        boxSizing: 'border-box',
      },
      'body': {
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif",
        color: colors.text.primary,
        backgroundColor: colors.bg.primary,
        lineHeight: '1.5',
        fontSize: '14px',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      },
    });

    addComponents({
      // Button base
      '.btn': {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 16px',
        fontSize: '14px',
        fontWeight: '500',
        borderRadius: radius.md,
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        fontFamily: 'inherit',
        lineHeight: '1.5',
        whiteSpace: 'nowrap',
      },
      '.btn:focus': {
        outline: 'none',
        boxShadow: `0 0 0 2px ${colors.bg.primary}, 0 0 0 4px rgba(127, 29, 29, 0.2)`,
      },
      '.btn:disabled': {
        opacity: '0.5',
        cursor: 'not-allowed',
      },

      // Button variants
      '.btn-primary': {
        backgroundColor: colors.primary.DEFAULT,
        color: 'white',
      },
      '.btn-primary:hover:not(:disabled)': {
        backgroundColor: colors.primary.hover,
      },
      '.btn-secondary': {
        backgroundColor: colors.secondary.DEFAULT,
        color: 'white',
      },
      '.btn-secondary:hover:not(:disabled)': {
        backgroundColor: colors.secondary.hover,
      },
      '.btn-ghost': {
        backgroundColor: 'transparent',
        color: colors.text.secondary,
        border: `1px solid ${colors.border.DEFAULT}`,
      },
      '.btn-ghost:hover:not(:disabled)': {
        backgroundColor: colors.bg.hover,
        color: colors.text.primary,
      },

      // Button sizes
      '.btn-small': {
        padding: '6px 12px',
        fontSize: '13px',
      },
      '.btn-large': {
        padding: '10px 20px',
        fontSize: '15px',
      },

      // Icon button
      '.btn-icon': {
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: radius.md,
        cursor: 'pointer',
        color: colors.text.secondary,
        transition: 'all 0.2s ease',
        fontSize: '18px',
      },
      '.btn-icon:hover': {
        backgroundColor: colors.bg.hover,
        color: colors.text.primary,
      },

      // Form elements
      '.form-group': {
        marginBottom: '16px',
      },
      '.form-label': {
        display: 'block',
        fontSize: '14px',
        fontWeight: '500',
        color: colors.text.primary,
        marginBottom: '6px',
      },
      '.form-input, .form-select': {
        width: '100%',
        padding: '8px 12px',
        fontSize: '14px',
        fontFamily: 'inherit',
        border: `1px solid ${colors.border.DEFAULT}`,
        borderRadius: radius.md,
        backgroundColor: colors.bg.primary,
        color: colors.text.primary,
        transition: 'all 0.2s ease',
      },
      '.form-input:focus, .form-select:focus': {
        outline: 'none',
        borderColor: colors.primary.DEFAULT,
        boxShadow: '0 0 0 3px rgba(127, 29, 29, 0.1)',
      },
      '.form-input::placeholder': {
        color: colors.text.muted,
      },
      '.form-input:disabled, .form-select:disabled': {
        backgroundColor: colors.bg.secondary,
        color: colors.text.muted,
        cursor: 'not-allowed',
        opacity: '0.6',
      },
      '.form-select': {
        cursor: 'pointer',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23666666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 12px center',
        paddingRight: '36px',
      },
      '.form-textarea': {
        resize: 'vertical',
        minHeight: '80px',
      },

      // Tiles
      '.tile': {
        backgroundColor: colors.bg.primary,
        border: `1px solid ${colors.border.DEFAULT}`,
        borderRadius: radius.lg,
        padding: '24px',
        transition: 'all 0.2s ease',
      },
      '.tile:hover': {
        boxShadow: shadows.md,
      },
      '.tile-icon': {
        width: '40px',
        height: '40px',
        backgroundColor: colors.bg.secondary,
        borderRadius: radius.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.primary.DEFAULT,
        marginBottom: '16px',
      },
      '.tile-title': {
        fontSize: '16px',
        fontWeight: '600',
        color: colors.text.primary,
        marginBottom: '8px',
      },
      '.tile-description': {
        fontSize: '14px',
        color: colors.text.secondary,
        lineHeight: '1.6',
        marginBottom: '16px',
      },
      '.tile-footer': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '16px',
        borderTop: `1px solid ${colors.border.light}`,
      },
      '.tile-stat': {
        fontSize: '13px',
        color: colors.text.muted,
        fontWeight: '500',
      },

      // Stat tiles
      '.stat-tile': {
        backgroundColor: colors.bg.primary,
        border: `1px solid ${colors.border.DEFAULT}`,
        borderRadius: radius.lg,
        padding: '20px',
      },
      '.stat-value': {
        fontSize: '28px',
        fontWeight: '600',
        color: colors.text.primary,
        marginBottom: '4px',
      },
      '.stat-label': {
        fontSize: '13px',
        color: colors.text.secondary,
        marginBottom: '8px',
      },
      '.stat-change': {
        fontSize: '13px',
        fontWeight: '500',
      },
      '.stat-change.positive': {
        color: colors.status.success,
      },
      '.stat-change.negative': {
        color: colors.status.error,
      },

      // Status badges
      '.status-badge': {
        display: 'inline-block',
        padding: '4px 10px',
        fontSize: '12px',
        fontWeight: '500',
        borderRadius: '12px',
        textTransform: 'capitalize',
      },
      '.status-active': {
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        color: colors.status.success,
      },
      '.status-progress': {
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        color: colors.status.warning,
      },
      '.status-review': {
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        color: colors.status.info,
      },
      '.status-completed': {
        backgroundColor: 'rgba(156, 163, 175, 0.1)',
        color: colors.text.secondary,
      },
      '.status-pending': {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        color: colors.status.error,
      },

      // Data table
      '.table-container': {
        backgroundColor: colors.bg.primary,
        border: `1px solid ${colors.border.DEFAULT}`,
        borderRadius: radius.lg,
        overflow: 'hidden',
      },
      '.table-header': {
        padding: '20px 24px',
        borderBottom: `1px solid ${colors.border.DEFAULT}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      '.table-title': {
        fontSize: '16px',
        fontWeight: '600',
        color: colors.text.primary,
      },
      '.data-table': {
        width: '100%',
        borderCollapse: 'collapse',
      },
      '.data-table thead': {
        backgroundColor: colors.bg.secondary,
      },
      '.data-table th': {
        textAlign: 'left',
        padding: '12px 24px',
        fontSize: '12px',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        color: colors.text.muted,
        borderBottom: `1px solid ${colors.border.DEFAULT}`,
      },
      '.data-table td': {
        padding: '16px 24px',
        fontSize: '14px',
        color: colors.text.primary,
        borderBottom: `1px solid ${colors.border.light}`,
      },
      '.data-table tbody tr:hover': {
        backgroundColor: colors.bg.hover,
      },
      '.data-table tbody tr:last-child td': {
        borderBottom: 'none',
      },

      // Progress bar
      '.progress-bar': {
        display: 'inline-block',
        width: '100px',
        height: '6px',
        backgroundColor: colors.bg.secondary,
        borderRadius: '3px',
        overflow: 'hidden',
        marginRight: '8px',
      },
      '.progress-fill': {
        height: '100%',
        backgroundColor: colors.primary.DEFAULT,
        borderRadius: '3px',
        transition: 'width 0.3s ease',
      },
      '.progress-text': {
        fontSize: '12px',
        color: colors.text.muted,
        fontWeight: '500',
      },

      // Cards
      '.card': {
        backgroundColor: colors.bg.primary,
        border: `1px solid ${colors.border.DEFAULT}`,
        borderRadius: radius.lg,
        padding: '24px',
      },
      '.card-header': {
        marginBottom: '16px',
        paddingBottom: '16px',
        borderBottom: `1px solid ${colors.border.light}`,
      },
      '.card-title': {
        fontSize: '18px',
        fontWeight: '600',
        color: colors.text.primary,
      },
      '.card-footer': {
        marginTop: '16px',
        paddingTop: '16px',
        borderTop: `1px solid ${colors.border.light}`,
      },

      // Spinner
      '.spinner': {
        width: '20px',
        height: '20px',
        border: '2px solid transparent',
        borderTopColor: colors.primary.DEFAULT,
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      },
      '.spinner-sm': {
        width: '16px',
        height: '16px',
      },
      '.spinner-lg': {
        width: '32px',
        height: '32px',
        borderWidth: '3px',
      },
    });
  },
};

export default ogreComponentsPlugin;
