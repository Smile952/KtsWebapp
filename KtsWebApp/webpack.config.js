﻿const path = require('path');

module.exports = {
    entry: './wwwroot/js/index.js', 
    output: {
        path: path.resolve(__dirname, 'wwwroot/js/dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    },
    mode: 'development'
};