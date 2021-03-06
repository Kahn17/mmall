const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

var getHtmlConfig = function(name){
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        inject:true,
        hash:true,
        chunks:['common',name]
    }
}

var config = {
    mode:'dev' === WEBPACK_ENV ? 'development' : 'production',
    entry:{
        'index':'./src/page/index/index.js',
        'common':'./src/page/common/index.js'
    },
    output:{
        publicPath:'/dist',
        filename:'js/[name].js'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:'css-loader'
                })
            },
            {
                test:/\.string$/,
                use:{
                    loader:'html-loader',
                    options:{
                        minimize:true,
                        removeAttributeQuotes:false
                    }
                }
            },
            {
                test:/\.(png|jpg|gif)$/,
                use:{
                    loader:'url-loader',
                    options:{//图片小于2K用base64打包
                        limit:2048,
                        name:'resource/[name].[ext]'
                    }
                }

            },
            {
                test:/\.(eot|svg|ttf|woff|woff2|otf)$/,
                use:{
                    loader:'url-loader',
                    options:{
                        limit:8192,
                        name:'resource/[name].[ext]'
                    }
                }
            }
        ]
    },
    externals:{
        'jquery':'window.jQuery'
    },
    resolve:{
        alias: {
            node_modules : __dirname + '/node_modules',
            util:__dirname + '/src/util',
            page:__dirname + '/src/page',
            service:__dirname + '/src/service',
            image:__dirname + '/src/image',
        }
    },
    plugins:[
        new CleanWebpackPlugin('[dist]'),
        new ExtractTextPlugin({
            filename:'css/[name].css'
        }),
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
    ],
    optimization:{
        splitChunks:{
            cacheGroups:{
                common:{
                    name:'common',
                    chunks:'all',
                    minChunks:2
                }
            }
        },
        runtimeChunk:false
    },
    devServer:{
        port:8088,
        inline:true,
        proxy : {
            '**/*.do' : {
                target: 'http://test.happymmall.com',
                changeOrigin : true
            }
        }
    }
}

module.exports = config;