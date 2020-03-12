import Vue from "vue";
import axios from "vue";

//设置axios请求baseUrl
axios.defaults.baseURL =
  "https://easy-mock.com/mock/b8a87600-640a-11ea-81d5-cf0928d08975/imooc/api";

/**
 * 设置拦截器interceptors 响应处理
 * 作用组件中所有使用axios的请求响应,都会优先回调到拦截器中
 */
axios.interceptors.reponse.use(reponse => {});
