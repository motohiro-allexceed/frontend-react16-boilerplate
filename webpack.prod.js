const path = require('path');

const webpack = require('webpack');
// webpack-mergeモジュールを読み込む
const merge = require('webpack-merge');
// 共通のwebpack設定を読み込む
const common = require('./webpack.common');

const assets = path.join(__dirname, 'assets');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'app.min.js',
    path: assets,
  },
});
