const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

process.env.NODE_ENV = "development";

module.exports = {
    mode: "development",
    entry: "./src/index.ts",
    devtool: "source-map",
    experiments: {
        outputModule: true
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        module: true,
        filename: "index.js"
    },
    externalsType: "module",
    externalsPresets: { web: true },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
            scriptLoading: "module"
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: "src/*.json", to: "[name][ext]" }]
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js", ".css"]
    }
};
