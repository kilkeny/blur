module.exports = {
  test: /\.tsx?$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      babelrc: false,
      presets: [
        '@babel/preset-env',
        '@babel/preset-typescript',
        '@babel/preset-react',
      ],
      plugins: [
        'react-hot-loader/babel',
      ],
    },
  },
};
