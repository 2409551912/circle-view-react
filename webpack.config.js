const webpack = require('webpack')
const path = require('path')

const config = {
  entry: './main.js',

  output: {
    path: './build',
    filename: 'index.js'
  },

  devServer: {
    inline: true,
    port: 8082
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader?modules"
      },
      //配置scss
      {
        test: /\.scss/,
        loader: 'style!css!sass',
        loaders: ['style', 'css', 'sass']
      }
    ]
  },
  resolve: {
    alias: {
      apis: path.join(__dirname, "./src/apis"),
      components: path.join(__dirname, "./src/components")
    }
  }
}

module.exports = config
