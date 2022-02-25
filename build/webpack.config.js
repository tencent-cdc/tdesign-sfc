const path = require('path');

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'none';
const devtool = mode === 'production' ? 'source-map' : undefined;
const optimization = {
  usedExports: true,
  sideEffects: true,
};

module.exports = {
  mode,
  devtool,
  optimization,
  target: 'web',
  externals: {
    sfcjs: {
      root: 'SFCJS',
      amd: 'sfcjs',
      commonjs: 'sfcjs',
      commonjs2: 'sfcjs',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.htm$/,
        use: [
          'babel-loader',
          path.resolve(__dirname, 'sfc-loader.js'),
        ],
      },
      {
        test: /\.svg$/,
        loader: 'html-loader',
        options: {
          minimize: true,
        },
      },
    ],
  },
};
