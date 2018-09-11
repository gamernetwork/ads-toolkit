const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const CURRENT_VERSION = '1.0';
const VERSION_PATH = `dist/${CURRENT_VERSION}`;

module.exports = env => {
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, VERSION_PATH),
      filename: 'overtake.min.js',
      library: 'overtake',
      libraryTarget: 'var'
    },
    devtool: env.NODE_ENV === 'development' ? 'inline-source-map' : 'source-map',
    devServer: {
      contentBase: './dist'
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader'
        },
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin([VERSION_PATH]),
      new UnminifiedWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './src/test.html'
      })
    ]
  }
}