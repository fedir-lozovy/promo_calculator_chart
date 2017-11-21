var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {path: path.resolve(__dirname, 'builds'), filename: 'main.bundle.js'},
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            }, {
                test: /\.csv$/,
                loader: 'csv-loader',
                options: {
                    dynamicTyping: false,
                    header: true,
                    skipEmptyLines: true
                }
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            }
        ]
    }
};