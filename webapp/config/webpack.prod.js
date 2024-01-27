//Production webpack configuration

const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

const ENV = (process.env.ENV = process.env.NODE_ENV = "production");

module.exports = function (options) {
    return webpackMerge(
        commonConfig({
            plugins: [
                new webpack.LoaderOptionsPlugin({
                    minimize: true,
                    debug: false
                }),
                new webpack.DefinePlugin({
                    'process.env': {
                        'NODE_ENV': ENV
                    }
                }),
                new webpack.optimize.UglifyJsPlugin({
                    test: /\.js(\?.*)?$/i,
                    beautify: false,
                    //minimize: true,
                    mangle: {
                        screw_ie8: true,
                        keep_fnames: true
                    },
                    compress: {
                        screw_ie8: true
                    },
                    comments: false
                })
            ]
        })
    );
};
