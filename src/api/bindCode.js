import http from "@/request"

const baseApi = process.env.VUE_APP_API_HOST

//1.查询用户信息 queryUserSimpleInfo
export function queryUserSimpleInfo (data) {
  return http.get(baseApi + '/queryUserSimpleInfo', {
    params: data
  })
}

// 查询邀请码信息
export function queryInviteCode (data) {
  return http.get(baseApi + '/queryInviteCode', {
    params: data
  })
}

// 绑定邀请码信息
export function inviteNewByCode (data) {
  return http.get(baseApi + '/inviteNewByCode', {
    params: data
  })
}
