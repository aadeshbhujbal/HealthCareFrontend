const { withNxMetro } = require('@nx/expo');
const { getDefaultConfig } = require('@expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const { mergeConfig } = require('metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

config.resolver.disableHierarchicalLookup = true;

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
    assetExts: config.resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...config.resolver.sourceExts, 'cjs', 'mjs', 'svg'],
    extraNodeModules: {
      '@health-care-frontend/design-system': path.resolve(
        workspaceRoot,
        'libs/design-system/src'
      ),
      '@health-care-frontend/shared-services': path.resolve(
        workspaceRoot,
        'libs/shared-services/src'
      ),
    },
  },
};

// Combine Nx and NativeWind
module.exports = withNxMetro(mergeConfig(config, customConfig), {
  debug: true,
  extensions: [],
  watchFolders: [],
}).then((config) => withNativeWind(config, { input: './global.css' }));
