var webpack = require('webpack');
var WebpackDevServer = require("webpack-dev-server");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/main',
    output: {
        path: "dist",
        publicPath: '/dist/',
        filename: 'build.js',
        chunkFilename: "[id].[name].[chunkHash].js"
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.css$/,
            loader: 'style!css!autoprefixer'
        }, {
            test: /\.js$/,
            exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
            loader: 'babel'
        }, {
            test: /\.scss$/,
            loader: 'style!css!sass?sourceMap'
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.html$/,
            loader: 'vue-html'
        }, {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: '[name].[ext]?[hash]'
            }
        }]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    plugins:[
         new HtmlWebpackPlugin({           //根据模板插入css/js等生成最终HTML
             filename:'../index.html',    //生成的html存放路径，相对于 path
             template:'./src/components/index.html',    //html模板路径
             inject:true,    //允许插件修改哪些内容，包括head与body
             hash:true,    //为静态资源生成hash值
        })
    ],
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
        // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin()
    ])
}
