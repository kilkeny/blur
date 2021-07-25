const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { BUILD_DIR, SRC_DIR, SERVER_DIR } = require('./webpack/utils');

const { Loaders } = require('./webpack');

module.exports = {
  mode: process.env.NODE_ENV,
  target: 'node',
  entry: path.resolve(__dirname, SERVER_DIR, 'server.tsx'),
  output: {
    filename: 'server.js',
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
  module: {
    rules: [...Loaders],
  },
  externals: [nodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] })],
};
