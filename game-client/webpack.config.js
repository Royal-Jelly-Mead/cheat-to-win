import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'

import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default (env) => {
  const mode = env.development ? 'development' : 'production'
  const color = mode === 'production' ? '\u001b[32m' : '\u001b[33m'
  console.log(`${color}WEBPACK: Building Project in ${mode} mode.\u001b[0m\n`)

  return {
    entry: './gameplay/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.txt$/,
          use: ['raw-loader'],
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(gif|png|jpe?g|svg|xml)$/i,
          use: 'file-loader',
        },
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: mode === 'production' ? true : false,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js', '.json', '.css'],
    },
    mode: env.development ? 'development' : 'production',
    plugins: [new HtmlWebpackPlugin({ template: './index.html' })],
    watchOptions: {
      aggregateTimeout: 5000,
      poll: 1000,
    },
  }
}
