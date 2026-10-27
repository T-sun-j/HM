import axios from "axios";
import qs from "qs";

const requestInstance = axios.create({
  // 开发环境走代理，生产环境需配置跨域或同域转发
  baseURL: "", 
  timeout: 10000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

requestInstance.interceptors.request.use(
  (config) => {
    if (config.method === "post" && config.headers["Content-Type"] === "application/x-www-form-urlencoded") {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  (err) => Promise.reject(err)
);

requestInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default requestInstance;
