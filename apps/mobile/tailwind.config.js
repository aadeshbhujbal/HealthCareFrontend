const { hairlineWidth } = require('nativewind/theme');
const sharedConfig = require('../../shared/design-system/tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  presets: [sharedConfig, require('nativewind/preset')],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    '../../shared/design-system/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      borderWidth: {
        hairline: hairlineWidth(),
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
