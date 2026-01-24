// Font configuration for the topographic portfolio
// Fonts are loaded via CSS @import in globals.css for simplicity

export const fonts = {
  display: '"Big Shoulders Display", sans-serif',
  body: '"Outfit", sans-serif',
  mono: '"JetBrains Mono", monospace',
} as const;

export type FontKey = keyof typeof fonts;



