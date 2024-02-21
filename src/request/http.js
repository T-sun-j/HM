/**
 * 通用网络请求库
 *
 * Post请求会携带sign用于网关权限验证
 */

import qs from 'qs'
import axios from 'axios'


const requestInstance = axios.create({
    // withCredentials: true,
    // baseURL: process.env.WEB_APP_BASIC_API,
    baseURL:env.baseUrl,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json'
    }
})

requestInstance.interceptors.request.use(req => {
  return req

    
}, err => Promise.reject(err))

requestInstance.interceptors.response.use(response => {
  const res = response.data

    
    return res
}, err => Promise.reject(err))



export default requestInstance
