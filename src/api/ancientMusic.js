import http from "@/request/http"
const baseApi = process.env.VUE_APP_LIWO_API + '/v2/ancient';



// 接口文档地址:
// http://10.222.9.134:8080/project/11/interface/api/cat_733  无权限 联系王洪礼

// 热门作品
export function hotDynamicRank(data) {
  return http.post(baseApi + "/hotDynamicRank", data)
}
// 新鲜发布
export function newDynamicRank(data) {
  return http.post(baseApi + "/newDynamicRank", data)
}
//大赛榜单
export function playerRank(data) {
  return http.post(baseApi + "/playerRank", data)
}

// 投票接口
export function assist (data) {
  return http.post(baseApi + "/assist", data)
}

//  首页信息  视频相关  用户相关
export function homePage(data) {
  return http.post(baseApi + "/homePage",data)
}
// 分享页获取昵称
export function queryInviterInfo(data) {
  return http.post(baseApi + "/queryInviterInfo", data)
}

