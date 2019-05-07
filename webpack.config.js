const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // installed via npm


const outputDirectory = 'dist';

module.exports = {
  entry: [
    './src/client/index.js'
  ],
  output: {
    path: path.join(__dirname, outputDirectory),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpg|gif|mp4|webm)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
    publicPath: '/',
    proxy: {
      '/': 'http://localhost:8080',
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([{
      from: './public/index.html'
    }]),
    new HtmlWebpackPlugin({ template: './public/index.html', favicon: './public/favicon.ico' }),

  ]
};
