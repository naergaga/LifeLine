const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const bundleOutputDir = './wwwroot/dist';

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    return [{
        entry: {
            music: './wwwroot/src/MusicIndex.js',
            article: './wwwroot/src/ArticleIndex.js',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env', 'react']
                        }
                    }
                },
                { test: /\.css$/, use: ExtractTextPlugin.extract({ use: 'css-loader?minimize' }) }
            ]
        },
        plugins: [
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./wwwroot/dist/vendor-manifest.json')
            }),
            new ExtractTextPlugin('bundle.css')
        ].concat(isDevBuild ? [
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map',
                moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
                new webpack.optimize.UglifyJsPlugin()
            ]),
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'wwwroot/dist')
        }
    }]
};