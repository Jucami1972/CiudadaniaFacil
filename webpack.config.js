const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(
    {
      ...env,
      babel: {
        dangerouslyDisableHoisting: true,
      },
    },
    argv
  );

  // Optimizaciones para web
  config.optimization = {
    ...config.optimization,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        audio: {
          test: /[\\/]src[\\/]assets[\\/]audio[\\/]/,
          name: 'audio',
          chunks: 'all',
          priority: 10,
        },
      },
    },
  };

  // Configuración de assets
  config.module.rules.push({
    test: /\.mp3$/,
    type: 'asset/resource',
    generator: {
      filename: 'audio/[name][ext]',
    },
  });

  return config;
};
