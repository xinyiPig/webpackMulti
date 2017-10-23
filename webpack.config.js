/**
 * Created by z on 2017/10/23.
 */
// 获取环境命令，并去除首尾空格
const env = process.env.NODE_ENV.replace(/(\s*$)|(^\s*)/ig,"");
// 根据环境变量引用相关的配置文件
module.exports = require(`./config/webpack.config.${env}.js`);
const path = require("path");
// 引入插件
const HTMLWebpackPlugin = require("html-webpack-plugin");
// 引入多页面文件列表
const { HTMLDirs } = require("./config/config");
// 通过 html-webpack-plugin 生成的 HTML 集合
let HTMLPlugins = [];
// 入口文件集合
let Entries = {}

// 生成多页面的集合
HTMLDirs.forEach((page) => {
    const htmlPlugin = new HTMLWebpackPlugin({
        filename: `${page}.html`,
        template: path.resolve(__dirname, `../app/html/${page}.html`),
        chunks: [page, 'commons'],
    });
    HTMLPlugins.push(htmlPlugin);
    Entries[page] = path.resolve(__dirname, `../app/js/${page}.js`);
});