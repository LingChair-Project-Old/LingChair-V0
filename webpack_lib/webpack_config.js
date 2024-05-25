const path = require('path')
const { BannerPlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: '../build_cache/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../ling_chair_http'),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
