/**
 * OGRE Design System
 *
 * A comprehensive design system for OGRE applications.
 * Includes design tokens, Tailwind CSS preset, component plugin, and React components.
 *
 * @example
 * ```ts
 * // Import tokens
 * import { colors, shadows, radius } from 'ogre-brand-kit/tokens';
 *
 * // Import Tailwind preset
 * import ogrePreset from 'ogre-brand-kit/preset';
 *
 * // Import React components
 * import { Button, Card, Input } from 'ogre-brand-kit/components';
 * ```
 */

// Design tokens
export * from './tokens';
export { default as tokens } from './tokens';

// Tailwind preset
export { ogrePreset } from './tailwind.preset';
export { default as preset } from './tailwind.preset';

// Component plugin
export { ogreComponentsPlugin } from './plugins/components';

// React components
export * from './components';
