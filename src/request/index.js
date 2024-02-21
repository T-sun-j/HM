import axios from "axios";
import qs from "qs";

export class NetworkError extends Error {
  constructor(message, response) {
    super(message);
    this.response = response;
    this.name = NetworkError.name;
    this.isBusinessError = true;
  }

  get data() {
    return this.response && this.response.data;
  }

  get result() {
    return this.data && this.data.result;
  }

  get info() {
    return (this.result && this.result.info) || this.message;
  }

  get code() {
    return this.data.result && this.data.result.code;
  }
}

const http = axios.create({
  withCredentials: true,
  timeout: 5000,
});

http.defaults.retry = 3; //超时重试3次
http.defaults.retryDelay = 5000; //间隔5000毫秒重试

const CancelToken = axios.CancelToken;
const requestMap = new Map();
//前置拦截器
http.interceptors.request.use(
  (config) => {
    //放重提交
    const keyString = qs.stringify(
      Object.assign(
        {},
        {
          url: config.url,
          method: config.method,
        },
        config.data
      )
    );

    if (requestMap.get(keyString)) {
      // 取消当前请求
      config.cancelToken = new CancelToken((cancel) => {
        cancel("Please slow down a little");
      });
    }
    requestMap.set(keyString, true);

    Object.assign(config, {
      _keyString: keyString,
    });
    if (config.method === "post") {
      config.data = {
        ...config.data,
      };
    } else if (config.method === "get") {
      const params = {
        reqData: {
          ...config.params,
        },
      };
      config.params = params;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

http.interceptors.response.use(
  (response) => {
    const config = response.config;
    //重置放重提交
    requestMap.set(config._keyString, false);
    const res = response.data;

    // 业务错误
    if (!res || (res.resultCode != 0 && res.resultCode != 3)) {
      // TODO: 细化系统无响应的兜底处理
      // Toast("网络开小差了，请稍后再试~");
    //   router.push({ name: "error" });
      return;
    }

    if (res.resultCode == 3) {
      let currentUrl = window.location.href;
      console.debug("currentUrl is " + currentUrl);
      console.debug("login url is " + process.env.VUE_APP_LOGIN);
    //   todo test 暂时注释
      window.location.href =
        process.env.VUE_APP_LOGIN + encodeURIComponent(currentUrl);
      return;
    }
    return res.resultData;
  },
  (err) => {
    //重置放重提交
    requestMap.clear();
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = "错误请求";
          break;
        case 401:
          err.message = "未授权，请重新登录";
          break;
        case 403:
          err.message = "拒绝访问";
          break;
        case 404:
          err.message = "请求错误,未找到该资源";
          break;
        case 405:
          err.message = "请求方法未允许";
          break;
        case 408:
          err.message = "请求超时";
          break;
        case 500:
          err.message = "服务器端出错";
          break;
        case 501:
          err.message = "网络未实现";
          break;
        case 502:
          err.message = "网络错误";
          break;
        case 503:
          err.message = "服务不可用";
          break;
        case 504:
          err.message = "网络超时";
          break;
        case 505:
          err.message = "http版本不支持该请求";
          break;
        default:
          err.message = `连接错误${err.response.status}`;
      }
      let errData = {
        code: err.response.status,
        message: err.message,
      };
      window.console.log("统一错误处理: ", errData);
    }
    // router.push({ name: "error" });
    return Promise.reject(new NetworkError(err.message, err));
  }
);

export default http;
