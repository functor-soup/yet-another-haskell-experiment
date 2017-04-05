const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const config = {
    entry: './src/app.jsx',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'my-first-webpack.bundle.js'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react'],
                }
            }
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'The great haskell experiment',
            template: 'src/index.vm'
        })
    ]
}

module.exports = config;
