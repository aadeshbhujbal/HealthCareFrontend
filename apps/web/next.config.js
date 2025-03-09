// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');
const { withTamagui } = require('@tamagui/next-plugin');
const path = require('path');

// Tamagui configuration
const tamaguiPlugin = withTamagui({
  config: './tamagui.config.ts',
  components: ['tamagui'],
  outputCSS:
    process.env.NODE_ENV === 'production' ? './public/tamagui.css' : null,
  disableExtraction: process.env.NODE_ENV === 'development',
});

module.exports = composePlugins(
  withNx,
  tamaguiPlugin
)({
  transpilePackages: [
    'react-native',
    'react-native-web',
    '@tamagui/core',
    '@tamagui/themes',
    '@tamagui/shorthands',
    '@tamagui/font-inter',
    '@tamagui/animations-react-native',
    '@healthcare/design-system',
  ],
  experimental: {
    forceSwcTransforms: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
      'react-dom': 'react-dom', // Keep this to avoid double-loading
      'react-dom/hydrate': 'react-dom/client', // Fix hydration error
      'react-dom/unmountComponentAtNode': path.resolve(
        __dirname,
        './utils/react-dom-shim.js'
      ), // Custom unmount shim
      '@healthcare/design-system': path.resolve(
        __dirname,
        '../../libs/design-system'
      ),
      '@healthcare/design-system/tamagui.config': path.resolve(
        __dirname,
        '../../libs/design-system/tamagui.config'
      ),
    };

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };

    return config;
  },
});
