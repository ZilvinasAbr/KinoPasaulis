var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.js'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      { test: /\.css$/, loader: "style-loader!css-loader" }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, '../KinoPasaulis.Server/wwwroot'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',

  devServer: {
    inline: true,
    contentBase: path.resolve(__dirname, '../KinoPasaulis.Server/wwwroot')
  }
};