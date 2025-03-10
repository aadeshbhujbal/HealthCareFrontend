/** @type {import('tailwindcss').Config} */

// Import the colors from the shared tokens file
const { colors } = require('./src/tokens/colors');

// Create a shared Tailwind configuration
module.exports = {
  // This is a base configuration to be extended by web and mobile
  theme: {
    extend: {
      colors: {
        // Map the colors to Tailwind format
        primary: {
          100: colors.primary100,
          200: colors.primary200,
          300: colors.primary300,
          400: colors.primary400,
          500: colors.primary500,
          600: colors.primary600,
          700: colors.primary700,
          800: colors.primary800,
          900: colors.primary900,
          DEFAULT: colors.primary600,
        },
        secondary: {
          100: colors.secondary100,
          200: colors.secondary200,
          300: colors.secondary300,
          400: colors.secondary400,
          500: colors.secondary500,
          600: colors.secondary600,
          700: colors.secondary700,
          800: colors.secondary800,
          900: colors.secondary900,
          DEFAULT: colors.secondary600,
        },
        success: {
          100: colors.success100,
          200: colors.success200,
          300: colors.success300,
          400: colors.success400,
          500: colors.success500,
          600: colors.success600,
          700: colors.success700,
          800: colors.success800,
          900: colors.success900,
          DEFAULT: colors.success600,
        },
        warning: {
          100: colors.warning100,
          200: colors.warning200,
          300: colors.warning300,
          400: colors.warning400,
          500: colors.warning500,
          600: colors.warning600,
          700: colors.warning700,
          800: colors.warning800,
          900: colors.warning900,
          DEFAULT: colors.warning600,
        },
        danger: {
          100: colors.danger100,
          200: colors.danger200,
          300: colors.danger300,
          400: colors.danger400,
          500: colors.danger500,
          600: colors.danger600,
          700: colors.danger700,
          800: colors.danger800,
          900: colors.danger900,
          DEFAULT: colors.danger600,
        },
        gray: {
          100: colors.gray100,
          200: colors.gray200,
          300: colors.gray300,
          400: colors.gray400,
          500: colors.gray500,
          600: colors.gray600,
          700: colors.gray700,
          800: colors.gray800,
          900: colors.gray900,
          DEFAULT: colors.gray500,
        },
      },
      // Add spacing that matches Tamagui
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '40px',
        '3xl': '48px',
        '4xl': '56px',
        '5xl': '64px',
        '6xl': '72px',
      },
      // Add border radius that matches Tamagui
      borderRadius: {
        none: '0',
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        full: '9999px',
      },
      // Add font sizes that match Tamagui
      fontSize: {
        xs: '12px',
        sm: '14px',
        md: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px',
        '5xl': '48px',
        '6xl': '64px',
      },
    },
  },
  // Export the colors for use in other files
  plugins: [
    function ({ addBase }) {
      addBase({
        ':root': {
          // Add CSS variables for colors
          '--color-primary': colors.primary600,
          '--color-secondary': colors.secondary600,
          '--color-success': colors.success600,
          '--color-warning': colors.warning600,
          '--color-danger': colors.danger600,
          '--color-background': colors.white,
          '--color-text': colors.gray900,
        },
        '.dark': {
          '--color-primary': colors.primary400,
          '--color-secondary': colors.secondary400,
          '--color-success': colors.success400,
          '--color-warning': colors.warning400,
          '--color-danger': colors.danger400,
          '--color-background': colors.gray900,
          '--color-text': colors.white,
        },
      });
    },
  ],
};
