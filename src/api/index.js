import http from "@/request/http"
//url: "http://h5.diatal.com/home/wxfx",
//首页
export function getHome(params) {
  return http.get("/api.php?action=getindex", {
    params
  });
}
//俱乐部会员发送验证码接口
export function getcode(params) {
  return http.get("/getcode.php", {
    params
  });
}

//俱乐部会员发送验证码接口
export function getData(params) {
  return http.get("/api.php", {
    params
  });
}
//俱乐部会员验证码提交认证接口
export function userclublogin(params) {
  return http.get("", {
    params
  });
}
//经销商发送验证码接口
export function getdealercode(params) {
  return http.get("", {
    params
  });
}
//搜索接口
export function getUserSearch(params) {
  return http.get("/api.php", {
    params
  });
}
