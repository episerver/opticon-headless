const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => {
    const webpack_server = {
        mode: "development",
        devtool: "cheap-module-source-map",
        plugins: [
            new HtmlWebpackPlugin({
                hash: true,
                template: "./src/template.index.html",
                filename: "index.html",
                inject: "body",
                title: "Opticon Headless",
            }),
        ],
        devServer: {
            port: 8080,
            historyApiFallback: true,
        },
    };
    const webpack_dev = {
        mode: "development",
        devtool: "cheap-module-source-map",
        plugins: [],
    };
    const webpack_prod = {
        mode: "production",
        devtool: false,
        plugins: [],
    };
    const webpack_config =
        process.env.NODE_ENV === "server"
            ? webpack_server
            : process.env.NODE_ENV === "development"
            ? webpack_dev
            : webpack_prod;

    return {
        ...webpack_config,
        entry: {
            main: path.join(__dirname, "src", "main.tsx"),
        },
        resolve: {
            modules: [path.join(__dirname, "src"), "node_modules"],
            extensions: [".js", ".ts", ".tsx"],
        },
        output: {
            filename: "[name].min.js",
            path: path.resolve(__dirname, "dist"),
        },
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
                    test: /\.(c|s[ac])ss$/i,
                    use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: "asset/resource",
                },
                {
                    test: /\.mp4$/,
                    use: "file-loader?name=videos/[name].[ext]",
                },
            ],
        },
        plugins: [
            ...webpack_config.plugins,
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: "[name].min.css",
            }),
        ],
    };
};
