const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
// const ExtractPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
// const { WebpackOptionsApply } = require('webpack')
const baseConfig = require('./webpack.config.base')
const isDEV = process.env.NODE_ENV === 'development'
let config
const devServer = {
  port: 8000,
  host: '0.0.0.0',
  hot: true,
  // open: true,
  // historyFallback: {},
  overlay: {
    errors: true
  },
  historyApiFallback: {
    // disableDotRule: true
    index: '/public/index.html'
  }
}
const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDEV ? '"development"' : '"production"'
    }
  }),
  new VueLoaderPlugin(),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  })
]
if (isDEV) {
  config = merge(baseConfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.styl/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        },
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            {
              loader: 'css-loader'
              //   options: {
              //     // 开启 CSS Modules
              //     modules: {
              //         localIdentName:'[path]-[name]-[hash:base64:5]'
              //     }
              //   }
            }
          ]
        }
      ]
    },
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    mode: 'production',
    entry: {
      app: path.join(__dirname, '../client/index.js')
      // vendor:['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.styl/,
          use: [
            MiniCssExtractPlugin.loader,
            // 'vue-style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader'
              // options: {
              //   // 开启 CSS Modules
              //   modules: {
              //       localIdentName:'[path]-[name]-[hash:base64:5]'
              //   }
              // }
            }
          ]
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true
    },
    plugins: defaultPlugins.concat([
      new MiniCssExtractPlugin({
        filename: 'style.[contenthash:8].css'
      })
    ])
  })
}

module.exports = config
