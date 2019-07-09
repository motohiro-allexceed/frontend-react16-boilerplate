const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

const src = path.join(__dirname, 'src');
const prodMode = process.env.NODE_ENV === 'production';

module.exports = {
  entry: path.resolve(src, 'js/render.jsx'),
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [{
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
            modules: {
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
            importLoaders: 1,
            /*
            modules: true,
            importLoaders: 1,
            localIdentName: '[path][name]__[local]--[hash:base64:5]',
            */
          },
        },
        'postcss-loader',
      ],
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // templateの設定を追加
      template: path.resolve(src, 'html/index.html'),
      title: 'frontend',
    }),
    new MiniCSSExtractPlugin({
      filename: prodMode ? 'app.min.css' : 'app.css',
    }), // MiniCSSExtractPluginを追加
  ],
};
