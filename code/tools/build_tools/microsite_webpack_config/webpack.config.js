const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = env => {
  return {
    // Entry 
    entry: './src/index.js',
    // Output
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].bundle.js'
    },
    // Source maps
    devtool: env.NODE_ENV !== 'production' ? 'inline-source-map' : 'source-map',
    // Dev Server
    devServer: {
      contentBase: './dist'
    },
    module: {
      rules: [
        // JS 
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        // SCSS
        {
          test: /\.scss$/,
          use: [
            env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        },
        // Images
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              // publicPath: 'assets/img'
            }   
          }
        }
      ]
    },
    // Plugins
    plugins: [
      // Clean dist/ directory
      new CleanWebpackPlugin(['dist']),
      // Extract css to seperate file
      new MiniCssExtractPlugin({
        filename: '[name].bundle.css'
      }),
      // HTML plugin, specify template any minify options
      new HtmlWebpackPlugin({
        template: './src/index.html',
        minify: {
          collapseWhitespace: true,
          removeComments: true
        }
      }),
      // Copy static assets
      new CopyWebpackPlugin([
        {
          from: './src/assets', 
          to: 'src/assets',
          toType: 'dir'
        }
      ])
    ]
  }
}