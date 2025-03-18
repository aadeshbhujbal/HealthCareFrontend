const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const sharedConfig = require('../../shared/design-system/tailwind.config.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [sharedConfig],
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
    // Include design system components
    '../../shared/design-system/src/**/*.{js,jsx,ts,tsx}',
  ],
  // No need to redefine theme as it's inherited from the design system
};
