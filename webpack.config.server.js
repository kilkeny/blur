const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { isDev, SERVER_DIR, BUILD_DIR } = require('./env');
const babelLoader = require('./webpack.babel.loader');

module.exports = {
  mode: isDev ? 'development' : 'production',
  target: 'node',
  externals: [nodeExternals()],
  entry: `./${SERVER_DIR}/start.ts`,
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, BUILD_DIR),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      babelLoader,
      {
        test: /\.css$/,
        use: [
          'css-loader',
          {
            loader: 'null-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'null-loader',
          },
        ],
      },
    ],
  },
  plugins: [],
};
