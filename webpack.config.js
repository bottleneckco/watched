/*var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + './index.html',
  filename: 'index.html',
  inject: 'body'
});
*/
module.exports = {
  entry: {
    index: [
      'webpack-dev-server/client?https://0.0.0.0:8080/',
      './index.js'
    ]
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.scss$/, loader: 'style-loader!css-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  },
  output: {
    filename: 'dist/bundle.js',
  },
  devServer: {
    host: 'localhost',
    port: 8080
  },
  node: {
    fs: "empty"
  }
  /*,
  plugins: [HTMLWebpackPluginConfig]*/
};
