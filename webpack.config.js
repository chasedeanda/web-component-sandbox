const webpack = require('webpack');
const path = require('path');
const HTML = require('html-webpack-plugin');

const config = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    port: 8000,
    hot: true
  },
  plugins: [
    new HTML({
      template: path.resolve(__dirname, './index.html')
    })
  ]
}

module.exports = config;