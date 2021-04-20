// 为服务器端渲染做的配置
const path = require('path')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueServerPlugin = require('vue-server-renderer/server-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
// const { WebpackOptionsApply } = require('webpack')
const baseConfig = require('./webpack.config.base')
let config = ''

config = merge(baseConfig, {
  target: 'node', // 指定执行环境
  entry: path.join(__dirname, '../client/server-entry.js'),
  mode: 'development',
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2', // 指定js export形式
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build') // 指定服务器端渲染的输出目录
  },
  externals: Object.keys(require('../package.json').dependencies), // 意义在于不需要将依赖的包整合打包起来，免得浪费内存
  module: {
    rules: [
      {
        test: /\.styl(us)?/,
        use: [
          // MiniCssExtractPlugin.loader,
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
          // MiniCssExtractPlugin.loader,
          'vue-style-loader',
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
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: 'style.[contenthash:8].css'
    // }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueServerPlugin(),
    new VueLoaderPlugin()
  ]
})

// 直接指定db.js作为model,方便服务器端渲染时获取数据后再渲染
config.resolve = {
  alias: {
    // eslint-disable-next-line quote-props
    'model': path.join(__dirname, '../client/model/server-model.js')
  }
}

module.exports = config
