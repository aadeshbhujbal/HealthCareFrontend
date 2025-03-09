const { withNxMetro } = require('@nx/expo');
const { getDefaultConfig } = require('@expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const { mergeConfig } = require('metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

const projectRoot = path.resolve(__dirname);
const workspaceRoot = path.resolve(projectRoot, '../..');

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
      '@healthcare/design-system': path.resolve(
        workspaceRoot,
        'libs/design-system/src'
      ),
    },
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(workspaceRoot, 'node_modules'),
    ],
  },
  watchFolders: [
    projectRoot,
    path.resolve(workspaceRoot, 'libs/design-system'),
  ],
};

// Combine Nx and NativeWind
module.exports = withNxMetro(mergeConfig(defaultConfig, customConfig), {
  debug: true,
  extensions: [],
  watchFolders: [],
}).then((config) => withNativeWind(config, { input: './global.css' }));
