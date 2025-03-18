const { theme } = require('./src/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: theme.container,
    extend: {
      colors: theme.colors,
      borderRadius: theme.borderRadius,
      spacing: theme.spacing,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.fontSize,
      fontWeight: theme.typography.fontWeight,
      screens: theme.breakpoints,
      keyframes: theme.keyframes,
      animation: theme.animation,
    },
  },
  plugins: [require('tailwindcss-animate')],
};
