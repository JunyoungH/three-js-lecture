const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    entry: '/src/index.ts',
    output: {
        path: path.join(__dirname, './dist/src'),
        filename: '[name].js'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, './dist/src'),
        },
        hot: true,
    },
    resolve: {
        modules:['node_modules'],
        extensions:['.ts','json','.scss','.css','.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html',
            showErrors: true
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         { from: "./src/textures", to: "./textures" }
        //     ]
        // })
    ]
    
}