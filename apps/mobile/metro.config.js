const { withNxMetro } = require('@nx/expo');
const { getDefaultConfig } = require('@expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const { mergeConfig } = require('metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const customConfig = {
  cacheVersion: 'mobile',
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...sourceExts, 'cjs', 'mjs', 'svg'],
    extraNodeModules: {
      'apps/mobile': __dirname,
    },
  },
  watchFolders: [__dirname],
};

// Combine Nx and NativeWind
module.exports = withNxMetro(mergeConfig(defaultConfig, customConfig), {
  debug: false,
  extensions: [],
  watchFolders: [],
}).then((config) => withNativeWind(config, { input: './global.css' }));
