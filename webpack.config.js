const path = require('path');
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
require('dotenv').config()

// TODO : External plugin to use here.
const PLUGINS = [
    new FriendlyErrorsWebpackPlugin(),
    new MiniCssExtractPlugin({
        filename: "styles.css",
    }),
    new webpack.DefinePlugin({
        'process.env': {
            // TODO : Set Environment variable for react app.
        }
    })
];

// TODO : Webpack Configuration  
module.exports = {
    mode: process.env.NODE_ENV || 'development',
    context: path.join(__dirname, "src"),
    devtool: "source-map",
    entry: {
        app: "./client/index",
    },
    resolve: {
        modules: [
            path.resolve("./src"),
            "node_modules",
        ],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader"
            }, {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader",
                ],
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].bundle.js",
    },
    plugins: PLUGINS
}