const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
/* eslint-disable global-require */
if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test' })
} else if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: '.env.development' })
}
/* eslint-enable global-require */
module.exports = (env) => {
    const isProduction = env === 'production'
    const CSSExtract = new ExtractTextPlugin('styles.css')

    return {
        entry: ['babel-polyfill', './src/app.js'],
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js',
        },
        module: {
            rules: [
                {
                    loader: 'babel-loader',
                    test: /\.js$/,
                    exclude: /node_modules/,
                },
                {
                    test: /\.s?css$/,
                    use: CSSExtract.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true,
                                },
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true,
                                },
                            },
                        ],
                    }),
                },
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/,
                    loader: 'url-loader?limit=100000',
                },
            ],
        },
        plugins: [
            CSSExtract,
            new webpack.DefinePlugin({
                'process.env.REACT_APP_SERVER_URL': JSON.stringify(process.env.REACT_APP_SERVER_URL),
            }),
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/',
        },
    }
}
