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
  distDir: 'dist/.next',
  transpilePackages: [
    'react-native',
    'react-native-web',
    '@tamagui/core',
    '@tamagui/themes',
    '@tamagui/shorthands',
    '@tamagui/font-inter',
    '@tamagui/animations-react-native',
    '@health-care-frontend/design-system',
    '@health-care-frontend/shared-services',
  ],
  experimental: {
    forceSwcTransforms: true,
  },
  webpack: (config, { isServer }) => {
    // Configure CSS handling
    const rules = config.module.rules;
    const cssRuleIndex = rules.findIndex(
      (rule) => rule.test && rule.test.toString().includes('css')
    );

    if (cssRuleIndex !== -1) {
      // Remove the existing CSS rule
      rules.splice(cssRuleIndex, 1);
    }

    // Add a new rule for CSS files
    rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    });

    // Resolve local packages
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
      'react-dom': 'react-dom',
      'react-dom/hydrate': 'react-dom/client',
      'react-dom/unmountComponentAtNode': path.resolve(
        __dirname,
        './utils/react-dom-shim.js'
      ),
      '@health-care-frontend/design-system': path.resolve(
        __dirname,
        '../../libs/design-system/src'
      ),
      '@health-care-frontend/shared-services': path.resolve(
        __dirname,
        '../../libs/shared-services/src'
      ),
      '@healthcare/design-system': path.resolve(
        __dirname,
        '../../libs/design-system/src'
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
