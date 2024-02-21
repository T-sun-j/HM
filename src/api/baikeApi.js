import http from "@/request/http"
//url: "http://h5.diatal.com/home/wxfx",
/*
传奇经历接口，包含了详情
1、请求链接：/api.php?action=getLegendList
2、请求参数：
3、返回json：legend传奇经历list
*/
export function getLegendList(params) {
  return http.get("/api.php", {
    params
  });
}