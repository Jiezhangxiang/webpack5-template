/*
 * @Author: Jiezhangxiang 1778676211@qq.com
 * @Date: 2022-06-22 14:03:17
 * @LastEditors: Jiezhangxiang 1778676211@qq.com
 * @LastEditTime: 2022-06-22 19:37:45
 * @FilePath: \webpack5-template\webpack.config.js
 * @Description: webpack配置项
 */
const ESLintPlugin = require("eslint-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack") // 访问内置的插件
const path = require("path")
const getStyleLoader = (pre) => {
  return [
    MiniCssExtractPlugin.loader,
    "css-loader",
    // css兼容配置
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // css兼容预设
          ],
        },
      },
    },
    pre,
  ].filter(Boolean)
}
module.exports = (evn) => {
  const mode = evn.development ? "development" : "production"
  return {
    // 打包入口配置
    entry: "./src/main.js",
    // 打包输出项配置
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "static/js/main.js",
      // 删除上次打包内容
      clean: true,
    },
    // loader 配置项让webpack处理非js内容
    module: {
      // 执行顺序 从下到上 从右到左
      rules: [
        // css-loader   webpack能够解析css打包 style-loader 解析后的css加载到style标签上
        {
          test: /\.css$/,
          use: getStyleLoader(),
        },
        // less-loader  解析less成css
        {
          test: /\.less$/,
          use: getStyleLoader("less-loader"),
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/, // 排除 node_modules文件
          loader: "babel-loader",
          // options: {
          //   // 配置预设能处理最新的js
          //   presets: ["@babel/preset-env"],
          // },
        },
        // 图片解析
        {
          test: /\.(png|jpe?g|webp|gif|svg)$/,
          type: "asset", // asset 内置模块 根据条件配置文件会转换成base64
          parser: {
            dataUrlCondition: {
              maxSize: 20 * 1024, // 资源小于20k装换成base64
            },
          },
          // 配置打包后路径
          generator: {
            // hash:10 打包文件hash值长度 ext文件扩展名  query 传递参数
            filename: "static/images/[hash:10][ext][query]",
          },
        },
        // 处理其他资源（视频，音频，字体图标...）
        {
          test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
          type: "asset/resource", // 文件会原封不动打包出
          // 配置打包后路径
          generator: {
            // hash:10 打包文件hash值长度 ext文件扩展名  query 传递参数
            filename: "static/media/[hash:10][ext][query]",
          },
        },
      ],
    },
    // 配置插件丰富webpack功能
    plugins: [
      // 配置打包进度条
      new webpack.ProgressPlugin(),
      // 将css打包成一个文件并自动引入link
      new MiniCssExtractPlugin({
        // 配置输出路径
        filename: "static/css/main.css",
      }),
      // 压缩css
      new CssMinimizerPlugin(),
      // 基于html文件打包生成一个新的html 并将打包后自动引入
      new HtmlWebpackPlugin({ template: "./public/index.html" }),
      new ESLintPlugin({
        // 指定语法检查目录
        context: path.resolve(__dirname, "src"),
        // 自动修复启动
        // fix: true,
      }),
    ],
    // 开发服务器
    devServer: {
      host: "localhost", // 启动服务器域名
      port: "3000", // 启动服务器端口号
      open: false, // 是否自动打开浏览器
    },
    // 配置开发模式  production development
    mode,
  }
}
