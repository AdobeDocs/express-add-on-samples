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

import CopyWebpackPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";

export default () => {
    return [
        {
            entry: {
                main: "./src/index.js",
            },
            devtool: "eval-cheap-source-map",
            mode: "development",
            output: {
                path: path.resolve("dist"),
                filename: "[name].bundle.js",
            },
            module: {
                rules: [
                    {
                        test: /\.css$/,
                        use: [
                            MiniCssExtractPlugin.loader,
                            {
                                loader: "css-loader",
                                options: { importLoaders: 1 },
                            },
                        ],
                    },
                ],
            },
            resolve: {
                extensions: [".js", ".json"],
            },
            plugins: [
                new CopyWebpackPlugin({
                    patterns: [{ from: "src/*.json", to: "[name][ext]" }],
                }),
                new MiniCssExtractPlugin(),
                new HtmlWebpackPlugin({
                    template: "src/index.html",
                    scriptLoading: "defer",
                }),
            ],
        },
    ];
};
