const path = require('path');
const { Loaders, Plugins, Optimization } = require('./webpack');
const { filename, isDev, BUILD_DIR, SRC_DIR } = require('./webpack/utils');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.resolve(__dirname, SRC_DIR, 'index.tsx'),
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, BUILD_DIR),
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
    alias: {
      '@pages': path.resolve(__dirname, SRC_DIR, 'pages'),
      '@components': path.resolve(__dirname, SRC_DIR, 'components'),
      '@core': path.resolve(__dirname, SRC_DIR, 'core'),
    },
  },
  devServer: {
    contentBase: path.join(__dirname, BUILD_DIR),
    open: true,
    port: 3000,
    historyApiFallback: true,
    hot: isDev,
  },
  devtool: isDev ? 'source-map' : false,
  plugins: [...Plugins],
  optimization: Optimization,
  module: {
    rules: [...Loaders],
  },
};
