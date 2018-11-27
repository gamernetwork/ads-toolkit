const path  = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = env => {
  return {
    entry: {
      index: './src/phishbowl.js',
    },
    output: {
      filename: 'phishbowl.min.js',
      path: path.resolve(__dirname, 'dist')
    },
    devServer: {
      contentBase: 'dist',
      overlay: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'phishbowl.html',
        template: './src/phishbowl.html'
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
        excludeAssets: [/.js/]
      }),
      new HtmlWebpackExcludeAssetsPlugin(),
      new CleanWebpackPlugin('dist')
    ]
  }
}