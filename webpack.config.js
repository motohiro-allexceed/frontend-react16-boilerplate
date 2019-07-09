const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// mini-css-extract-pluginの追加
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

const src = path.join(__dirname, 'src');
const dist = path.join(__dirname, 'dist');

module.exports = {
  mode: 'development',
  entry: path.resolve(src, 'js/render.jsx'),
  output: {
    filename: 'index.bundle.js',
    path: dist,
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      enforce: 'pre',
      loader: 'eslint-loader',
    }, {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      // CSSの設定を追加
      test: /\.css$/,
      exclude: /node_modules/,
      // loaderを複数使用する場合はuseを使う
      // postcss-loaderを追加(必ず最後)
      use: [
        MiniCSSExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]__[local]--[hash:base64:5]',
          },
        },
        'postcss-loader',
      ],
    }],
  },
  devServer: {
    contentBase: dist,
    hot: true,
    port: 3000,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      // templateの設定を追加
      template: path.resolve(src, 'html/index.html'),
    }),
    new MiniCSSExtractPlugin({
      filename: 'app.css',
    }), // MiniCSSExtractPluginを追加
  ],
  devtool: 'cheap-module-eval-source-map',
};
