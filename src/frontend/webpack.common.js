const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: path.join(__dirname, 'src', 'main.tsx'),
    },
    resolve: {
        modules: [path.join(__dirname, 'src'), "node_modules"],
        extensions: ['.js', '.ts', '.tsx'],
    },
    output: {
        filename: "[name].min.js",
        path: path.resolve(__dirname, "public"),
    },
    plugins: [new HtmlWebpackPlugin({
        hash: true,
        template: './src/template.index.html',
        filename: 'index.html', //relative to root of the application
        inject: 'body',
        title: 'Opticon Headless'
    })],
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.mp4$/,
                use: 'file-loader?name=videos/[name].[ext]',
            },
        ],
    },
};