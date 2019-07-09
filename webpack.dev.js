const path = require('path');

const webpack = require('webpack');
// webpack-mergeモジュールを読み込む
const merge = require('webpack-merge');
// 共通のwebpack設定を読み込む
const common = require('./webpack.common');

const dist = path.join(__dirname, 'dist');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'index.bundle.js',
    path: dist,
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      enforce: 'pre',
      loader: 'eslint-loader',
    }, {
      test: /\.(js|jsx)$/,
      use: 'react-hot-loader/webpack',
      include: /node_modules/,
    }],
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: dist,
    hot: true,
    port: 3000,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
