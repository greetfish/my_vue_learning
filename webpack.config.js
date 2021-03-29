const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { WebpackOptionsApply } = require('webpack')
const isDEV=process.env.NODE_ENV ==='development'
const config= {
    target: 'web',
    mode: 'production',
    entry: path.join(__dirname,'src/index.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname,'dist')
    },
    module: {
        rules:[
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(gif|png|jpg|jpeg|svg)/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name]-aaa.[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDEV ? '"development"' : '"production"'
            }
        }),
        new VueLoaderPlugin(),
        new HTMLPlugin()
    ]
}
if(isDEV){
    config.module.rules.push({
        test: /\.styl/,
        use: [
            'style-loader',
            'css-loader',
            {
                loader: 'postcss-loader',
                options: {
                    sourceMap: true
                }
            },
            'stylus-loader'
        ]
    })
    config.devtool = 'eval-cheap-module-source-map'
    config.devServer = {
        port: 8000,
        host: '0.0.0.0',
        hot: true,
        // open: true,
        // historyFallback: {},
        overlay: {
            errors: true,
        }
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoEmitOnErrorsPlugin()
    )
}else{
    config.entry={
        app: path.join(__dirname,'src/index.js'),
        vendor:['vue']
    }
    config.output.filename = '[name].[chunkhash:8].js'
    config.module.rules.push(
        {
        test: /\.styl/,
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
    )
}
module.exports =config