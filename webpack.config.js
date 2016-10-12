var webpack = require('webpack');
var path = require('path');

module.exports = {
  
  // This code will be compiled 
  entry: [
    'script!jquery/dist/jquery.min.js',
    'script!foundation-sites/dist/foundation.min.js',
    './src/index.jsx'
    ],
  // Then output into this file
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    })
  ],
  output: {
    path: __dirname,
    filename: "./public/bundle.js"
  },

  devtool: 'source-map',
  // This will be what we do
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          // These are the specific transformations we'll be using. 
          presets: ['react', 'es2015', 'stage-0']
        }
      }
    ]
  },

  resolve: {
    root: __dirname,
    modulesDirectories: [
      'node_modules',
      './src/Components',
      './src/api'
    ],
    alias: {
      applicationStyles: 'src/styles/app.scss'
    },
    extensions: ['', '.jsx', '.js']
  },

  sassLoader: {
    includePaths: [
      path.resolve(__dirname, './node_modules/foundation-sites/scss')
    ]
  }

}