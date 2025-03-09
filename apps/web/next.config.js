// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const { withTamagui } = require('@tamagui/next-plugin');
const path = require('path');

const tamaguiConfig = {
  config: './tamagui.config.ts',
  components: ['tamagui'],
  disableExtraction: process.env.NODE_ENV === 'development',
};

module.exports = composePlugins(
  withNx,
  withTamagui(tamaguiConfig)
)({
  nx: {
    svgr: false,
  },
  reactStrictMode: true,
  transpilePackages: [
    'react-native',
    'react-native-web',
    '@tamagui/core',
    '@tamagui/themes',
    '@tamagui/shorthands',
    '@tamagui/font-inter',
    '@tamagui/animations-react-native',
    'libs/design-system',
  ],
  experimental: {
    forceSwcTransforms: true,
    scrollRestoration: true,
  },
  serverExternalPackages: ['tamagui'],
  webpack: (config) => {
    // Add path alias for @healthcare/design-system
    config.resolve.alias = {
      ...config.resolve.alias,
      '@healthcare/design-system': path.resolve(
        __dirname,
        '../../libs/design-system'
      ),
      '@healthcare/design-system/tamagui.config': path.resolve(
        __dirname,
        '../../libs/design-system/tamagui.config'
      ),
    };
    return config;
  },
});
