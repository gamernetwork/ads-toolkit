const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ZipPlugin = require('zip-webpack-plugin')

module.exports = env => {
  const PRODUCTION = env.NODE_ENV === 'production'

  return {
    mode: PRODUCTION ? 'production' : 'development',
    entry: './src/js/index.js',
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new CleanWebpackPlugin(['dist_zip']),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inlineSource: '.(js|css)$',
        minify: {
          collapseWhitespace: true,
          removeComments: true
        }
      }),
      new HtmlWebpackInlineSourcePlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
      new CopyWebpackPlugin([
        {from: 'src/assets', to: 'assets'}
      ]),
      new ZipPlugin({
        filename: 'html5_ad.zip',
        path: '../dist_zip',
        exclude: ['main.css', 'main.bundle.js']
      })
    ],
    devtool: PRODUCTION ? '' : 'inline-source-map',
    output: {
      filename: '[name].bundle.js',
      path: path.join(__dirname, 'dist')
    },
    devServer: {
      contentBase: '/dist'
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'eslint-loader'
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        },
        {
          test: /\.scss$/,
          use: [
            PRODUCTION ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(png|jpg|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'assets/'
              }
            }
          ]
        }
      ]
    }
  }
}
