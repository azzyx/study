const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 将编译之后的脚本放到html中
const miniCssExtractPlugin = require("mini-css-extract-plugin"); // 将css 从style标签中抽离出来

module.exports = {
  mode: 'development',
  entry: {
    intruductIndex: './app/containers/page/introduct/index.jsx',
    vendor: ["react", "react-router-dom"]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[contenthash].[name].bundle.js'
  },
  /**
   * 1. 可以将node_modules中的代码单独打包一个chunk最终输出
   * 2. 自动分入到多入口chunk中，有没有公共的文件，如果有回单独打包成一个
   */
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 将css 文件从style标签中抽离，生成一个link文件插入到头部
          miniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
      {
        test: /\.js|jsx$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  // .js  .jsx  .json文件在导入的时候可以不加扩展名
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  },
  // 方便代码调试，定位到具体的文件的行和列中
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/index.html'
    }),
    // 将css 文件从style标签中抽离，生成一个link文件插入到头部
    new miniCssExtractPlugin()
  ],
  // 配置开发服务器, 并配置自动刷新
  devServer: {
    // 根目录下dist为基本目录
    contentBase: path.join(__dirname, 'dist'),
    // 自动压缩代码
    compress: true,
    // 服务端口为1086
    port: 1086,
    // 自动打开浏览器
    open: true
  },
}