import http from "@/request/http"
//url: "http://h5.diatal.com/home/wxfx",
/*
如何购买线上列表
1、请求链接：/api.php?action=getOnlineStore
2、请求参数：
3、返回json：types为判断link的类型，1表示线上链接，2表示口令
*/
export function getOnlineStore(params) {
  return http.get("/api.php", {
    params
  });
}
/*
如何购买线下列表
1、请求链接：/api.php?action=getOfflineStore
2、请求参数：
3、返回json：addr为地址，latitude经纬度，tel电话
*/
export function getOfflineStore(params) {
  return http.get("/api.php", {
    params
  });
}