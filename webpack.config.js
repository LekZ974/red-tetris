const path = require('path');

module.exports = {
  resolve: {
    alias: { soundmanager2: 'soundmanager2/script/soundmanager2-nodebug-jsmin.js' }
  },
  mode: 'development',

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
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query:{
        presets: ["es2015", "react", "stage-0"]
      }
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
      {
        test: /\.(png|jpg|gif|mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name][hash].[ext]',
            },
          },
        ],
      },
    ],
  },
};
