/*
 * @Date: 2020-07-27 17:17:15
 * @LastEditors: Zhaoyongzhen
 * @LastEditTime: 2020-07-29 14:49:58
 */

import http from "@/request";

// 上海接口调用不同封装
import http2 from "@/request/http"

const baseApi = process.env.VUE_APP_API_HOST;

// 上海接口baseApi
const liwoApi = process.env.VUE_APP_LIWO_API;

//1.1获奖用户列表 queryRewardUserList
export function queryRewardUserList(data) {
  return http.get(baseApi + "/queryRewardUserList", {
    params: data
  });
}

//1.2活动相关文案接口
export function queryActivityConfig(data) {
  return http.get(baseApi + "/queryActivityConfig", {
    params: data
  });
}

// 1.3奖励概况接口 queryRewardInfo
export function queryRewardInfo(data) {
  return http.get(baseApi + "/queryRewardInfo", {
    params: data
  });
}

// 1.4邀请提醒 messageRemind
export function messageRemind(data) {
  return http.get(baseApi + "/messageRemind", {
    params: data
  });
}

// 1.5赚更多 goWxShareInvite
export function goWxShareInvite(data) {
  return http.get(baseApi + "/goWxShareInvite", {
    params: data
  });
}

// 1.6生成海报
export function goPosterShareInvite(data) {
  return http.get(baseApi + "/goPosterShareInvite", {
    params: data
  });
}

// 1.8邀请记录
export function queryInviteRecordList(data) {
  return http.get(baseApi + "/queryInviteRecordList", {
    params: data
  });
}

// 1.9获取微信分享口令
export function getWechatShareCodeApi(data) {
  return http.get(baseApi + "/buildWXCommand", {
    params: data
  });
}

// 分享回调后加积分（上海接口）
// http://10.222.9.134:8080/project/11/interface/api/95（王洪礼）
export function savePointExperienceApi(data) {
  return http2.post(liwoApi + "/v2/pointExperience/create", data);
}

// 分享页面记录分享次数接口
export function shareUrlCount(data) {
  return http.get(baseApi + "/shareUrlCount", {
    params: data
  });
}

// 查询分享次数 queryShareUrlCount
export function queryShareUrlCount(data) {
  return http.get(baseApi + "/queryShareUrlCount", {
    params: data
  });
}
