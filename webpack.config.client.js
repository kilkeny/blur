const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { Loaders, Plugins, Optimization } = require('./webpack');
const { filename, isDev, BUILD_DIR } = require('./webpack/utils');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: [
    // isDev && 'webpack-hot-middleware/client?noInfo=true',
    // isDev && 'react-hot-loader/patch',
    // isDev && 'css-hot-loader/hotModuleReplacement',
    './client/index.tsx',
  ].filter(Boolean),
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, BUILD_DIR),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin()],

  },
  devtool: isDev ? 'source-map' : false,
  plugins: [...Plugins],
  optimization: Optimization,
  module: {
    rules: [...Loaders],
  },
};
