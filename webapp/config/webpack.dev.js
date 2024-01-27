// Development webpack configuration

const webpack = require("webpack");
const webpackMerge = require('webpack-merge');
const combineLoaders = require('webpack-combine-loaders');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

module.exports = function (options) {
    return webpackMerge(
        commonConfig({
            env: ENV,
            jsLoaders: combineLoaders([{
                loader: 'ng-annotate-loader'
            }, {
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }])
        }), {
            devtool: 'cheap-module-source-map',
            devServer: {
                port: PORT,
                host: HOST,
                historyApiFallback: true,
                watchOptions: {
                    aggregateTimeout: 300,
                    poll: 1000
                }
            },
            output: {
              path: helpers.root('dist'),
            },
            plugins: [
                new webpack.LoaderOptionsPlugin({
                    minimize: true,
                    debug: false
                })
            ]
        }
    )
}
