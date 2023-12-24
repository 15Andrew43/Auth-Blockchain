const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    // mode: 'development',
    entry: {
        popup: './src/popup.jsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                // exclude: /\.module\.css$/,
            },
            // {
            //     test: /\.module\.css$/,
            //     use: ['style-loader', {
            //         loader: 'css-loader',
            //         options: {
            //             modules: true,
            //         },
            //     }],
            // },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/popup.html',
            filename: 'popup.html',
        }),
        new CopyPlugin({
            patterns: [
                { from: "public" },
            ],
        }),
    ],
};
