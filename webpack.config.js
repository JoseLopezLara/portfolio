const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = (env, argv) => {
  const {mode} = argv
  const isProduction = mode === 'production' 
  
  return {
    entry: path.resolve(__dirname, 'src/js/index.js'),
    output: {
      filename: isProduction
        ? '[name].[contenthash].js'
        : 'main.js',
      path: path.resolve(__dirname, 'build'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
        filename: 'index.html',
        inject: 'body', 
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/curso-git.html'),
        filename: 'curso-git.html',
        inject: 'body',
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/blog.html'),
        filename: 'blog.html',
        inject: 'body',
      }),
      new CopyPlugin({
        patterns: [
          { from: 'src/assets', to: 'assets' },
        ],
      }),
    ],
    devServer: {
      open: true,
      port: 3069,
      compress: true,
      hot: true, // Enable HMR
      watchFiles: ['src/**/*'], // Watch all files in src directory
      liveReload: true // Enable live reload
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource',
        },
      ],
    },
  }
}