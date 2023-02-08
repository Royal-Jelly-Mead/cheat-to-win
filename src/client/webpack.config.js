import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path'

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    entry: './gameplay/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    module: {
        rules: [
            { 
                test: /\.txt$/, 
                use: ['raw-loader'] 
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            }
        ],
    },
    plugins: [new HtmlWebpackPlugin({ template: './index.html' })],
    watchOptions: {
        aggregateTimeout: 5000,
        poll: 1000
    }
};
