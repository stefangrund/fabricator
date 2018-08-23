const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

/**
 * Define optimizations based on environment
 * @param {boolean} isDev If in development mode
 * @return {object}
 */
const getOptimizations = (isDev) => {
  let optimizations;

  if (isDev) {
    optimizations = {
      noEmitOnErrors: true,
    };
  } else {
    optimizations = {
      minimizer: [
        new UglifyJsPlugin(),
      ],
    };
  }

  return optimizations;
};

module.exports = (config) => {
  return {
    entry: {
      'fabricator/scripts/f': config.scripts.fabricator.src,
      'toolkit/scripts/toolkit': config.scripts.toolkit.src,
    },
    output: {
      path: path.resolve(__dirname, config.dest, 'assets'),
      filename: '[name].js',
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.js'],
    },
    optimization: getOptimizations(),
    module: {
      rules: [
        { test: /(\.js)/, use: 'babel-loader' },
        { test: /(\.jpg|\.png)$/, use: 'url-loader?limit=10000' },
        { test: /\.json/, use: 'json-loader' },
      ],
    },
  };
};
