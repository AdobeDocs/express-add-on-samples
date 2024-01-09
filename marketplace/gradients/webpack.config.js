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

const uiPath = path.resolve(__dirname, "./src/ui");
const sandboxPath = path.resolve(__dirname, "./src/sandbox");

module.exports = {
    mode: isEnvProduction ? "production" : "development",
    devtool: "source-map",
    entry: {
        index: "./src/ui/index.ts",
        code: "./src/sandbox/code.ts"
    },
    experiments: {
        outputModule: true
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        module: true,
        filename: "[name].js"
    },
    externalsType: "module",
    externalsPresets: { web: true },
    externals: {
        "add-on-sdk-document-sandbox": "add-on-sdk-document-sandbox",
        "express-document-sdk": "express-document-sdk"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
            scriptLoading: "module",
            excludeChunks: ["code"]
        }),
        new CopyWebpackPlugin({
            patterns: [{ from: "src/*.json", to: "[name][ext]" }]
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: path.resolve(uiPath, "tsconfig.json")
                        }
                    }
                ],
                include: uiPath,
                exclude: /node_modules/
            },
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: path.resolve(sandboxPath, "tsconfig.json")
                        }
                    }
                ],
                include: sandboxPath,
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    }
};
