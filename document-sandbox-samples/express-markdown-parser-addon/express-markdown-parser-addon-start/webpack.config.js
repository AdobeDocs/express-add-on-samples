const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isEnvProduction = process.env.NODE_ENV === "production";

module.exports = {
  mode: isEnvProduction ? "production" : "development",
  devtool: "source-map",
  entry: {
    index: "./src/ui/index.js",
    code: "./src/sandbox/code.js",
  },
  experiments: {
    topLevelAwait: true,
    outputModule: true,
  },
  output: {
    pathinfo: !isEnvProduction,
    path: path.resolve(__dirname, "dist"),
    module: true,
    filename: "[name].js",
  },
  externalsType: "module",
  externalsPresets: { web: true },
  externals: {
    "add-on-sdk-document-sandbox": "add-on-sdk-document-sandbox",
    "express-document-sdk": "express-document-sdk",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      scriptLoading: "module",
      excludeChunks: ["code"],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/*.json", to: "[name][ext]" },
        { from: "src/*.css", to: "[name][ext]" },
        { from: "src/*.png", to: "[name][ext]", noErrorOnMissing: true },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
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
