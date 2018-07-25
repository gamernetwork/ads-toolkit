const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');

const INTERNAL_FLAG = process.argv[process.argv.indexOf('--internal') + 1];

console.log(INTERNAL_FLAG);

module.exports = merge(common, {
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.bundle.css',
    }),
  ],
  optimization: {
    minimize: true,
  },
  entry: ['./src/index.js'],
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
});
