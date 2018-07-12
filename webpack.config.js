const path = require('path');
// const miniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/client/index.js',

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  devServer: {
    compress: true,
    disableHostCheck: true,
  },

  watchOptions: {
    poll: 1000,
    aggregateTimeout:300,
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query:{
        presets: ["es2015", "react", "stage-0"]
      }
    // }, {
    //   test: /\.scss$/,
    //   use: [
    //     'css-hot-loader',
    //     miniCssExtractPlugin.loader,
    //     'css-loader',
    //     'resolve-url-loader',
    //     'sass-loader?sourceMap'
    //   ]
    // }, {
    //   test: /\.css$/,
    //   use : [
    //     'css-hot-loader',
    //     miniCssExtractPlugin.loader,
    //     'css-loader',
    //     'resolve-url-loader'
    //   ]
    }],
  },
};
