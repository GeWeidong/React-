var webpack = require('webpack');
var path = require('path');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    //devtool: 'eval-source-map',
    devtool: false,
    entry: {
        //'webpack/hot/only-dev-server',
        index: __dirname + "/app/main.js",
    },
    output: {
        path: BUILD_PATH,
        filename: "[name].js",
        chunkFilename: '[name].js'
    },

    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader?modules'
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'url-loader?limit=40000&name=img/[hash:8].[name].[ext]',
            },
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE.ENV': "development"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true
    },
    plugins: [
        new ExtractTextPlugin("styles_[hash].css"),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlwebpackPlugin({
            title: '活动专区',
            inject: true,
            //hash: true,
            chunks: ['index'],
            filename: 'index.html'
        })
    ]
}
