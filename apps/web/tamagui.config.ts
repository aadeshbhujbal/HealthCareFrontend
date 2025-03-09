import config from '../../libs/design-system/tamagui.config'

// Customized Tamagui
declare module 'tamagui' {
  // This extends the config type directly
  interface TamaguiCustomConfig extends Record<string, unknown> {}
}

export default config;