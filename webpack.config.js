import autoprefixer from 'autoprefixer'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default {
  entry: './frontend/index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
  plugins: [
    //new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('bundle.css', { allChunks: true }),
    //new webpack.NoErrorsPlugin()
  ],
}