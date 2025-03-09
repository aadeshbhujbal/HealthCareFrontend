import { createTamagui } from 'tamagui'
import { createInterFont } from '@tamagui/font-inter'
import { shorthands } from '@tamagui/shorthands'
import { themes as themesIn, tokens as tokensIn } from '@tamagui/themes'
import { createAnimations } from '@tamagui/animations-react-native'

// Create proper font configurations
const headingFont = createInterFont({
  size: {
    // Define your font sizes
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
  },
  weight: {
    // Define your font weights
    4: '400',
    6: '600',
    7: '700',
  },
  letterSpacing: {
    4: 0,
    8: -1,
  },
  face: {
    700: { normal: 'InterBold' },
    600: { normal: 'InterSemiBold' },
    400: { normal: 'Inter' },
  },
})

// Use the same configuration for body font or create a different one
const bodyFont = createInterFont({
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
  },
  weight: {
    4: '400',
    6: '600',
  },
  face: {
    600: { normal: 'InterSemiBold' },
    400: { normal: 'Inter' },
  },
})

// Create animations
const animations = createAnimations({
  bouncy: {
    type: 'spring',
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  lazy: {
    type: 'spring',
    damping: 20,
    stiffness: 60,
  },
  quick: {
    type: 'spring',
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
})

// Custom tokens
const customTokens = {
  ...tokensIn,
  color: {
    ...tokensIn.color,
    primary: '#3B82F6',
    secondary: '#6B7280',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#3B82F6',
    red: '#EF4444',
    green: '#10B981',
    blue: '#3B82F6',
    yellow: '#F59E0B',
    gray50: '#F9FAFB',
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray600: '#4B5563',
    gray700: '#374151',
    gray800: '#1F2937',
    gray900: '#111827',
  },
}

// Custom themes
const customThemes = {
  ...themesIn,
  light: {
    ...themesIn.light,
    background: '#FFFFFF',
    color: '#000000',
  },
  dark: {
    ...themesIn.dark,
    background: '#121212',
    color: '#FFFFFF',
  },
}

const config = createTamagui({
  animations,
  defaultTheme: 'light',
  shouldAddPrefersColorThemes: false,
  themeClassNameOnRoot: false,
  shorthands,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  themes: customThemes,
  tokens: customTokens,
})

export type AppConfig = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config
