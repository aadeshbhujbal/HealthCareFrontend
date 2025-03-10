// Import the shared Tailwind configuration
const sharedConfig = require('../../libs/design-system/tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.js',
    '../../libs/design-system/**/*.{ts,tsx,js,jsx}',
  ],
  presets: [require('nativewind/preset')],
  // Extend the shared configuration
  theme: {
    ...sharedConfig.theme,
    // Add any mobile-specific theme extensions here
  },
  plugins: [...(sharedConfig.plugins || [])],
};
