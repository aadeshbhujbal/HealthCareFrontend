const { TamaguiPlugin } = require('tamagui-loader');

module.exports = function (config, context) {
  // Add Tamagui webpack plugin
  config.plugins.push(
    new TamaguiPlugin({
      components: ['tamagui', '@libs/design-system'],
      config: './libs/design-system/src/tamagui.config.ts',
      disableExtraction: process.env.NODE_ENV === 'development',
    })
  );

  // Add loader for Tamagui
  config.module.rules.push({
    test: /\.[jt]sx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'tamagui-loader',
        options: {
          config: './libs/design-system/src/tamagui.config.ts',
          components: ['tamagui', '@libs/design-system'],
        },
      },
    ],
  });

  return config;
};
