const path = require('path');

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
          config: './tamagui.config.ts',
          components: ['tamagui'],
          logTimings: true,
        },
      ], // Tamagui plugin with configuration
      'react-native-reanimated/plugin', // If you're using animations
      [
        'module-resolver',
        {
          root: [path.resolve(__dirname, '../..')],
          alias: {
            '@healthcare/design-system': path.resolve(
              __dirname,
              '../../libs/design-system/src'
            ),
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
    ],
  };
};
