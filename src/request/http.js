/**
 * 通用网络请求库
 *
 * Post请求会携带sign用于网关权限验证
 */

import qs from "qs";
import axios from "axios";

const requestInstance = axios.create({
  // withCredentials: true,
  // baseURL: process.env.WEB_APP_BASIC_API,
  baseURL: env.baseUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

requestInstance.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => Promise.reject(err)
);

requestInstance.interceptors.response.use(
  (response) => {
    // 请求成功
    return response.data;
  },
  (error) => {
  console.log('error :', error);
    
    if (!error.response) {
      console.log(error,'error')
      // 非HTTP错误
      return Promise.reject(error);
    }
    const status = error.response.status;
    alert(status)
    if (status === 301 || status === 302) {
      // 重定向
      const redirectUrl = error.response.headers.location;
      console.log("重定向到: " + redirectUrl);
      // 在这里可以根据重定向URL进行相应处理，例如页面跳转
      window.location.href = redirectUrl; // 或使用Vue Router进行路由跳转
    }

    return Promise.reject(error);
  }
);

export default requestInstance;
