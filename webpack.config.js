const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function(environment) {

    var extras = {
        copyConfig : [{ from: 'src/images', flatten: false }],
        scssRule: {
            test: /\.(s*)css$/,
            use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
        }
    };

    switch (environment) {
        case 'prod':
            extras.copyConfig = [];
            extras.scssRule = {
                test:/\.(s*)css$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            };
            break;
    }


    var CONFIG = {
        entry: [
            'react-hot-loader/patch',
            './src/js/index.tsx'
        ],
        module: {
            rules: [
                { test: /\.tsx?$/, loader: "ts-loader" },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                },{
                    test: /_redirects$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {}
                        }
                    ]
                },
                extras.scssRule
            ]
        },
        resolve: {
            extensions: ['*', '.ts', '.tsx', '.js', '.jsx']
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
            filename: '[name].[hash].js'
        },
        plugins: [
            new CleanWebpackPlugin('dist', {} ),
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                inject: false,
                hash: true,
                template: path.resolve('src/index.html'),
                filename: 'index.html'
            }),

            new CopyWebpackPlugin(extras.copyConfig),
            new MiniCssExtractPlugin({
                filename: "style.[hash].css"
            })
        ],
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            port: 5000,

            // hot: true,
            proxy: {
                "/api/**": {
                    target: "http://localhost:8080",
                        pathRewrite: {"^/api" : ""}
                }
            }
        }
    };

    return CONFIG;
};