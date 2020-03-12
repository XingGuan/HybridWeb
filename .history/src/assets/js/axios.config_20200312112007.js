import Vue from "vue";
import axios from "vue";

//设置axios请求baseUrl
axios.defaults.baseURL =
  "https://easy-mock.com/mock/b8a87600-640a-11ea-81d5-cf0928d08975/imooc/api";

/**
 * 设置拦截器interceptors 响应处理
 * 作用组件中所有使用axios的请求响应,都会优先回调到拦截器中
 */
axios.interceptors.reponse.use(
  response => {
    //统一处理数据
    return response.data;
  },
  error => {
    //处理错误的响应
    return Promise.reject(error);
  }
);
//把axios绑定到vue的原型链上,在组件中通过this.http
Vue.prototype.$http = axios;
