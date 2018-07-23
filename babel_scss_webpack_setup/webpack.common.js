const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Title Here',
      template: './src/index.html',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)|bower_components/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              targets: {
                browsers: ['> 1%', 'Last 2 versions', 'ie >= 10'],
              },
            }],
          ],
        },
      },
    },
    {
      enforce: 'pre',
      test: /\.js$/,
      exclude: /(node_modules)|bower_components/,
      loader: 'eslint-loader',
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
    }],
  },
};
