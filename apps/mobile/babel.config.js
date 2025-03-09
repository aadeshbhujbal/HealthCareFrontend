module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }], // NativeWind for Tailwind support
      'nativewind/babel',
    ],
    plugins: [
      [
        '@tamagui/babel-plugin',
        {
          components: ['tamagui'],
          config: '../../libs/design-system/src/tamagui.config.ts',
        },
      ], // Tamagui plugin with configuration
      'react-native-reanimated/plugin', // If you're using animations
    ],
  };
};
