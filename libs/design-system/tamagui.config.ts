import { createTamagui } from 'tamagui'
import { shorthands } from '@tamagui/shorthands'
import { themes as tamaguiThemes, tokens as tamaguiTokens } from '@tamagui/themes'
import { createFont } from '@tamagui/core'
import { createMedia } from '@tamagui/react-native-media-driver'
import { createAnimations } from '@tamagui/animations-react-native'
import { createInterFont } from '@tamagui/font-inter'

// Import the colors from the shared tokens file
import { colors, semanticColors } from './src/tokens/colors'

// Create a custom font with named sizes
const headingFont = createInterFont()
const bodyFont = createInterFont()

// Create custom tokens
export const tokens = {
  ...tamaguiTokens,
  size: {
    ...tamaguiTokens.size,
    // Named sizes
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 40,
    '3xl': 48,
    '4xl': 56,
    '5xl': 64,
    '6xl': 72,
    
    // For compatibility
    small: 8,
    medium: 16,
    large: 24,
  },
  space: {
    ...tamaguiTokens.space,
    // Named spaces
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 40,
    '3xl': 48,
    '4xl': 56,
    '5xl': 64,
    '6xl': 72,
    
    // For compatibility
    small: 8,
    medium: 16,
    large: 24,
  },
  radius: {
    // Named radii
    none: 0,
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    full: 9999,
    
    // For compatibility
    small: 4,
    medium: 8,
    large: 12,
  },
  zIndex: {
    0: 0,
    1: 100,
    2: 200,
    3: 300,
    4: 400,
    5: 500,
    max: 999,
  },
  color: {
    ...tamaguiTokens.color,
    ...colors,
    
    // Semantic colors
    primary: colors.primary600,
    primaryLight: colors.primary400,
    primaryDark: colors.primary800,
    
    secondary: colors.secondary600,
    secondaryLight: colors.secondary400,
    secondaryDark: colors.secondary800,
    
    success: colors.success600,
    successLight: colors.success400,
    successDark: colors.success800,
    
    warning: colors.warning600,
    warningLight: colors.warning400,
    warningDark: colors.warning800,
    
    danger: colors.danger600,
    dangerLight: colors.danger400,
    dangerDark: colors.danger800,
    
    background: colors.white,
    backgroundDark: colors.gray900,
    
    text: colors.gray900,
    textLight: colors.gray700,
    textDark: colors.white,
    textMuted: colors.gray500,
    
    border: colors.gray300,
    borderDark: colors.gray700,
  },
}

// Create custom light theme
const lightTheme = {
  background: colors.white,
  backgroundHover: colors.gray100,
  backgroundPress: colors.gray200,
  backgroundFocus: colors.primary100,
  backgroundTransparent: 'rgba(255,255,255,0.85)',
  
  color: colors.gray900,
  colorHover: colors.gray800,
  colorPress: colors.gray900,
  colorFocus: colors.gray900,
  colorTransparent: 'rgba(10,10,10,0.85)',
  
  borderColor: colors.gray300,
  borderColorHover: colors.gray400,
  borderColorFocus: colors.primary600,
  borderColorPress: colors.gray500,
  
  shadowColor: 'rgba(0,0,0,0.1)',
  shadowColorHover: 'rgba(0,0,0,0.2)',
  shadowColorPress: 'rgba(0,0,0,0.3)',
  shadowColorFocus: 'rgba(0,0,0,0.2)',
  
  // Component-specific colors
  primary: colors.primary600,
  secondary: colors.secondary600,
  success: colors.success600,
  warning: colors.warning600,
  danger: colors.danger600,
}

// Create themes object
const themes = {
  ...tamaguiThemes,
  light: lightTheme,
}

// Create media queries for responsive design
const media = createMedia({
  // Breakpoints
  xs: { maxWidth: 480 },
  sm: { maxWidth: 640 },
  md: { maxWidth: 768 },
  lg: { maxWidth: 1024 },
  xl: { maxWidth: 1280 },
  xxl: { maxWidth: 1536 },
  
  // Min-width queries
  gtXs: { minWidth: 481 },
  gtSm: { minWidth: 641 },
  gtMd: { minWidth: 769 },
  gtLg: { minWidth: 1025 },
  gtXl: { minWidth: 1281 },
  
  // Height-based
  short: { maxHeight: 820 },
  tall: { minHeight: 821 },
  
  // Special cases
  hoverNone: { hover: 'none' },
  pointerCoarse: { pointer: 'coarse' },
  
  // Platform-specific
  web: { platform: 'web' },
  native: { platform: 'native' },
  ios: { platform: 'ios' },
  android: { platform: 'android' },
})

// Create animations
const animations = createAnimations({
  fast: {
    type: 'timing',
    duration: 150,
  },
  medium: {
    type: 'timing',
    duration: 300,
  },
  slow: {
    type: 'timing',
    duration: 500,
  },
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

// Create the Tamagui configuration
const config = createTamagui({
  defaultTheme: 'light',
  shouldAddPrefersColorThemes: false,
  themeClassNameOnRoot: false,
  shorthands,
  fonts: {
    heading: headingFont,
    body: bodyFont
  },
  themes,
  tokens
})

export type AppConfig = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config
