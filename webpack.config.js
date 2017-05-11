var { CheckerPlugin } = require('awesome-typescript-loader');
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './index.js',
    output: {
        filename: 'monad_ts.umd.js',
        path: path.resolve(__dirname, 'lib'),
        library: 'Monad_ts',
        libraryTarget: 'umd'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                exclude: [/node_modules/,/\.(spec|e2e)\.ts$/]
            }
        ]
    },
    plugins: [
        new CheckerPlugin(),
    ],
    resolve: {
        extensions: [".ts", ".js", '.json'],
        modules: [path.join(__dirname, 'src'), 'node_modules']
    }
};

//Copyright (c) 2017 Alex Tranchenko. All rights reserved.

