// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const { withTamagui } = require('@tamagui/next-plugin');

const tamaguiConfig = {
  config: '../../libs/design-system/src/tamagui.config.ts',
  components: ['tamagui', '../../libs/design-system/src'],
  excludeReactNativeWebExports: [
    'Switch',
    'ProgressBar',
    'Picker',
    'CheckBox',
    'Touchable',
    'Animated',
    'FlatList',
    'Modal',
  ],
  logTimings: true,
  disableExtraction: process.env.NODE_ENV === 'development',
  useReactNativeWebLite: false,
  platform: 'web',
};

const plugins = [withNx, withTamagui(tamaguiConfig)];

module.exports = composePlugins(...plugins)({
  nx: {
    svgr: false,
  },
  reactStrictMode: true,
  swcMinify: true,
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
    swcTraceProfiling: true,
    scrollRestoration: true,
  },
  // Use this instead of serverComponentsExternalPackages
  serverExternalPackages: ['tamagui'],
  webpack: (config) => {
    // Add any webpack customizations here
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Add any aliases needed
    };
    return config;
  },
});
