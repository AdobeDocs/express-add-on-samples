import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        mode: argv.mode || 'development',        
        entry: "./src/index.js",
        output: {
            filename: "index.js",
            path: path.resolve(__dirname, "dist"),
            clean: true,
            module: true,
            library: {
                type: 'module'
            },
            environment: {
                module: true
            }
        },        
        externalsType: "module",
        experiments: {
            outputModule: true,
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    modules: false
                                }]
                            ]
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: ['vue-style-loader', 'css-loader']
                }
            ]
        },
        plugins: [
            new VueLoaderPlugin(),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                inject: 'head',
                scriptLoading: 'module'
            }),
            new CopyWebpackPlugin({
                patterns: [
                    { 
                        from: 'src/manifest.json',
                        to: 'manifest.json'
                    }
                ]
            })
        ],
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                'vue': 'vue/dist/vue.esm-browser.js'
            }
        },
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            hot: true,
            port: 5173,
            open: true
        },
        performance: {
            hints: false
        },
        devtool: isProduction ? 'source-map' : 'eval-source-map'
    };
}; 