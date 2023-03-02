const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
    const webpack_server = {
        mode: "development",
        devtool: "cheap-module-source-map",
        plugins: [
            new HtmlWebpackPlugin({
                hash: true,
                template: "./src/template.index.html",
                filename: "index.html", //relative to root of the application
                inject: "body",
                title: "Opticon Headless",
            }),
        ],
        devServer: {
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
    const webpack_config = env.server ? webpack_server : env.development ? webpack_dev : webpack_prod;

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
            path: path.resolve(__dirname, "public"),
        },
        plugins: [...webpack_config.plugins],
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
                    type: "asset/resource",
                },
                {
                    test: /\.mp4$/,
                    use: "file-loader?name=videos/[name].[ext]",
                },
            ],
        },
    };
};
