const path = require('path')
const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')

const COMMON_CONFIG = {
  entry: './playground/ts/main.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            configFile: 'playground/ts/tsconfig.json',
          }
        }],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      lbdate: path.resolve(__dirname, 'src'),
    }
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'playground/www'),
  },
}

const DEV_CONFIG = {
  devtool: 'inline-source-map',
}

const PROD_CONFIG = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        sourceMap: false,
        terserOptions: {
          mangle: true
        },
      })
    ],
  },
}

module.exports = (env, argv) => merge(COMMON_CONFIG, argv.mode === 'production' ? PROD_CONFIG : DEV_CONFIG)
