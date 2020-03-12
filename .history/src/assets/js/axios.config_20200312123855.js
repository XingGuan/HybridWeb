import Vue from "vue";
import axios from "axios";

//设置axios请求baseUrl
axios.defaults.baseURL = "http://api.imooc.hybrid.lgdsunday.club/";
/***
 * 设置拦截器interceptors响应处理
 * 所有使用axios发送的请求，在请求发送出去之前,都会进入到这个方法
 * 在这里为所有请求加上token
 */
axios.interceptors.request.use(config => {
  if (config.params) {
    config.params.token = "b8a87600-640a-11ea-81d5-cf0928d08975";
  } else {
    config.params = {
      token: "b8a87600-640a-11ea-81d5-cf0928d08975"
    };
  }
});

/**
 * 设置拦截器interceptors 响应处理
 * 作用组件中所有使用axios的请求响应,都会优先回调到拦截器中
 */
axios.interceptors.reponse.use(
  response => {
    //统一处理数据,使组件中的请求只获取到需要的业务数据
    //而不需要去关注返回的状态码等与业务无关的数据
    return response.data.data;
  },
  error => {
    //处理错误的响应
    return Promise.reject(error);
  }
);
//把axios绑定到vue的原型链上,在组件中通过this.$http->axios对象
Vue.prototype.$http = axios;
