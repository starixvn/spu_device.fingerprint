const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path');

module.exports = {
  mode: 'development',
  target: 'web',
  entry: './index.ts',  
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    fallback: {"crypto": false}
  },
  output: {
    filename: 'gfp.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{ 
        test: /\.tsx?$/i,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          compilerOptions: {
            sourceMap: true,
          },
        }, }],
  },
  devServer: {
    host: '0.0.0.0',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'FingerprintJS',
    }),
  ],
  
};