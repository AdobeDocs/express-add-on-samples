/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

// Webpack wire up.
module.exports = {
    mode: process.env.NODE_ENV || "development",
    entry: "./src/index.js",
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
                test: /\.(js)$/,
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
        extensions: [".js", ".css"],
    },
};
