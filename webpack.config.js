const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

var getHtmlConfig = function(name,title){
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        inject:true,
        hash:true,
        chunks:['common',name],
        title:title
    }
}

var config = {
    mode:'dev' === WEBPACK_ENV ? 'development' : 'production',
    entry:{
        'common':'./src/page/common/index.js',
        'index':'./src/page/index/index.js',
        'result':'./src/page/result/index.js',
        'user-login':'./src/page/user-login/index.js',
        'user-register':'./src/page/user-register/index.js',
        'user-pass-reset':'./src/page/user-pass-reset/index.js',
        'user-pass-update':'./src/page/user-pass-update/index.js',
        'user-center':'./src/page/user-center/index.js',
        'user-center-update':'./src/page/user-center-update/index.js',
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
        new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('result','结果')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update','修改个人信息')),
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
        }
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