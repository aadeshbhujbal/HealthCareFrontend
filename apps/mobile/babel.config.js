const path = require('path');

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }], // NativeWind for Tailwind support
      'nativewind/babel',
    ],
    plugins: [
      'expo-router/babel',
      [
        'transform-inline-environment-variables',
        {
          include: ['TAMAGUI_TARGET', 'EXPO_ROUTER_APP_ROOT'],
        },
      ],
      [
        '@tamagui/babel-plugin',
        {
          config: '../../libs/design-system/tamagui.config.ts',
          components: ['tamagui'],
          logTimings: true,
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
