/*
Copyright 2024 Adobe. All rights reserved.
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
