const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

// Setting the environment to 'development'.
process.env.NODE_ENV = "development";

// Webpack wire up.
module.exports = {
    mode: "development",
    entry: "./src/index.jsx",
    devtool: "source-map",
    experiments: {
        topLevelAwait: true,
        outputModule: true,
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        module: true,
        filename: "index.js",
    },
    externalsType: "module",
    externalsPresets: { web: true },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
            scriptLoading: "module",
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "src/*.json", to: "[name][ext]" },
                { from: "src/*.png", to: "[name][ext]" },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /(\.css)$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".jsx", ".js", ".css"],
    },
};
