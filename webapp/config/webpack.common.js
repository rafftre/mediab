// Common webpack configuration

const webpack = require('webpack');
const helpers = require('./helpers');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const METADATA = {
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer()
};

module.exports = function (options) {
    var jsLoaders = options.jsLoaders || [
        'ng-annotate-loader',
        'babel-loader'
    ];

    return {
        entry: {
            'main': helpers.root('src', 'app', 'root.module.js'),
            'vendor': helpers.root('src', 'app', 'vendor.js')
        },
        devtool: 'sourcemap',
        output: {
            path: helpers.root('dist'),
            filename: '[name].bundle.js',
            sourceMapFilename: '[name].map'
        },
        resolve: {
            extensions: ['.ts', '.js', '.json'],
            modules: [helpers.root('src'), 'node_modules'],
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: ['vendor']
            }),
            new CopyWebpackPlugin([{
                from: 'src/assets',
                to: 'assets'
            }]),
            new ImageminPlugin({ // must be after CopyWebpackPlugin
                test: 'assets/images/**'
            }),
            new HtmlWebpackPlugin({
                template: 'src/index.html',
                chunksSortMode: 'dependency',
                metadata: METADATA
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
            }),
            new ExtractTextPlugin('styles.css')
        ],
        module: {
            loaders: [{
                test: /\.js$/,
                exclude: [/node_modules/],
                loaders: jsLoaders
            }, {
                test: /\.html$/,
                loaders: [
                    'ngtemplate-loader?relativeTo=' + helpers.root('src'),
                    'raw-loader'
                ],
                exclude: [helpers.root('src/index.html')]
            }, {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use:  [
                    { loader: 'css-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                  ]
                })
            }, {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            }, {
                test: /\.(ttf|otf|eot|svg|woff|woff2?)$/,
                loader: 'url-loader'
            }, {
                test: /\.(jpg|png|gif)$/,
                loader: 'file-loader'
            }]
        }
    }
}
