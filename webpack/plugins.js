const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');
const { BUILD_DIR } = require('./consts');
const { isProd } = require('./env');
const { filename } = require('./filename');

const dfPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
  },
});

const htmlPlugin = new HTMLWebpackPlugin({
  template: path.join('public', 'index.html'),
  minify: {
    collapseWhitespace: isProd,
  },
});

const cleanPlugin = new CleanWebpackPlugin();

const copyPlugin = new CopyWebpackPlugin({
  patterns: [
    {
      from: path.join('public', 'favicon.ico'),
      to: path.resolve(BUILD_DIR),
    },
  ],
});

const minicssPlugin = new MiniCssExtractPlugin({
  filename: filename('css'),
});

const eslintPlugin = new ESLintPlugin({
  extensions: ['js', 'jsx', 'ts', 'tsx'],
});

const checkerTsPlugin = new ForkTsCheckerWebpackPlugin({
  async: false,
});

const plugins = () => {
  const base = [
    dfPlugin,
    htmlPlugin,
    copyPlugin,
    minicssPlugin,
    checkerTsPlugin,
    eslintPlugin,
    cleanPlugin,
  ];

  return base;
};

module.exports = { Plugins: plugins() };
