const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
const chalk = require('chalk');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const config = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    app: ['./resources/js/main.js']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: ['babel-loader', 'source-map-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer({
                    Browserslist: ['ie >= 8', 'last 4 version']
                  })
                ],
                sourceMap: true
              }
            }
          },
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },

  optimization: {
    minimizer: [
      // minify works only in production mode or use minimize: true,
      new CssMinimizerPlugin(),
    ],
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../public/dist/'),
    publicPath: '/dist/'
  },

  resolve: {
    extensions: ['.js', '.ts', '.sass'],
    modules: [path.join(__dirname, './src'), 'node_modules'],
    alias: {
      '@css': path.resolve(__dirname, 'css'),
      '@js': path.resolve(__dirname, 'js'),
    },
  },

  plugins: [
    new webpack.ProvidePlugin({$: 'cash-dom'}),
    {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
          const filename = path.join(config.output.path, "/hash");

          fs.writeFile(filename, compilation.hash, function (err) {
            if (err) {
              return console.log(chalk.red(`File write error (${filename})`));
            }
          });
        });
      }
    },
    new MiniCssExtractPlugin(),
  ],
}

module.exports = config
