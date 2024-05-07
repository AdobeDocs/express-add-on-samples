const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isEnvProduction = process.env.NODE_ENV === "production";

module.exports = {
    mode: isEnvProduction ? "production" : "development",
    devtool: isEnvProduction ? "source-map" : "eval-source-map",
    entry: "./src/index.tsx",
    experiments: {
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
            patterns: [{ from: "src/*.json", to: "[name][ext]" }],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
};
