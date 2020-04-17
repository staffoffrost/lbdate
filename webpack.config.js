const path = require('path')
const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

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
}

const DEV_CONFIG = {
  devtool: 'inline-source-map',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'playground/www'),
  },
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
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      {
        from: 'playground/www/',
        to: './',
        ignore: ['main.js']
      },
    ]),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
}

module.exports = (env, argv) => merge(COMMON_CONFIG, argv.mode === 'production' ? PROD_CONFIG : DEV_CONFIG)
