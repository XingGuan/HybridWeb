// 拿到相对路径
const path = require("path");
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/my-app/' : '/', 
  outputDir:'dist\\my-app',
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
      //__dirname相对于整个项目的根目录
      // 只会在开发环境中生效，当我们使用build打包一个项目的时候，那么这里的配置不会生效
      // return {
      //   resolve: {
      //     alias: {
      //       "@js": path.resolve(__dirname, "./src/assets/js"),
      //       "@css": path.resolve(__dirname, "./src/assets/css"),
      //       "@img": path.resolve(__dirname, "./src/assets/imgs"),
      //       "@c": path.resolve(__dirname, "./src/components")
      //     }
      //   }
      // };
    }
    return {
      resolve: {
        alias: {
          "@js": path.resolve(__dirname, "./src/assets/js"),
          "@css": path.resolve(__dirname, "./src/assets/css"),
          "@img": path.resolve(__dirname, "./src/assets/imgs"),
          "@c": path.resolve(__dirname, "./src/components")
        }
      }
    };
  }
};
