var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: './app/main.jsx'
  },
  output: {
    path: './build/extension',
    filename: '[name].js'
  },
  externals: {
    react: 'React'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.less$/,
        loader: 'style/useable!css!less?compress'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new CopyWebpackPlugin([
      {from: './static'},
      {from: './node_modules/react/dist/react.min.js'}
    ])
  ]
};
