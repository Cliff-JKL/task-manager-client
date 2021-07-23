const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssPlugin = require('mini-css-extract-plugin');
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// console.log(process);
const PROD_MODE = process.env.WEBPACK_DEV_SERVER === 'true' ? false : true ;

module.exports = (env, argv) => ({
    entry: './src/index.tsx',
    output: {
        filename: 'main.js',
        path: path.join(__dirname, 'dist'),
        publicPath: '/'
    },
    devtool: PROD_MODE ? 'hidden-source-map' : 'source-map',
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    plugins: [
        new MiniCssPlugin(),
        new HtmlPlugin({
            template: './src/index.html',
            // favicon: './src/pics/favicon.ico'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|ts)x?/i,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g)/i,
                use: 'file-loader'
            },
            {
                test: /\.svg$/,
                use: {
                    loader: 'svg-url-loader',
                    options: {
                        encoding: 'base64'
                    }
                }
            },
            {
                test: /\.(s*)css$/i,
                use: [
                    MiniCssPlugin.loader,        
                    {
                        // Translates CSS into CommonJS
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName :
                                    PROD_MODE ?
                                    // '[path][name]__[local]' :
                                    '[hash:base64]' :
                                    '[local]'
                            }
                        }
                    },
                    // Compiles Sass to CSS
                    'sass-loader'
                ]
            },
        ]
    },
    devServer: {
        port: 9000,
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: { index: '/' },
        hot: true,
    }
});