import { createTamagui } from 'tamagui'
import { createInterFont } from '@tamagui/font-inter'
import { shorthands } from '@tamagui/shorthands'
import { themes, tokens } from '@tamagui/themes'
import { createAnimations } from '@tamagui/animations-react-native'

// Create proper font configurations
const headingFont = createInterFont({
  size: {
    // Define your font sizes with named keys
    small: 14,
    medium: 18,
    large: 24,
    // Keep the numeric keys for compatibility
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
    // Define your font sizes with named keys
    small: 14,
    medium: 16,
    large: 20,
    // Keep the numeric keys for compatibility
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

// Customize tokens to include named sizes
const customTokens = {
  ...tokens,
  size: {
    ...tokens.size,
    small: 14,
    medium: 18,
    large: 24,
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
  themes,
  tokens: customTokens,
})

export type AppConfig = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config
