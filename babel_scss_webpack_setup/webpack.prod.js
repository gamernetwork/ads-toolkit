const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.bundle.css',
    }),
    // new ScriptExtHtmlWebpackPlugin({
    //   inline: 'main.bundle',
    //   defaultAttribute: 'sync',
    // }),
  ],
  optimization: {
    minimize: true,
  },
  entry: ['babel-polyfill', './src/index.js'],
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
});
