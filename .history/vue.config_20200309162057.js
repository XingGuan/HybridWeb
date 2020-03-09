// 拿到相对路径
const path=require(path)
module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
      //__dirname相对于整个项目的根目录
      return{
        resolve:{
          alias:{
            '@js':
          }
        }
      }
    }
  }
};
