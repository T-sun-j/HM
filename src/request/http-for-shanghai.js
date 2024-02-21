/**
 * 上海测梨涡团队通用网络请求库
 *
 * Post请求会携带sign用于网关权限验证
 */

import qs from 'qs'
import axios from 'axios'

export class NetworkError extends Error {
    constructor(message, response) {
        super(message)
        this.response = response
        this.name = NetworkError.name
    }

    get data () {
        return this.response && this.response.data
    }
}

/**
 * @param {NetworkError | Error} response
 */
export class PageErrorData {
    constructor(message, response) {
        this.response = response
        this.__name__ = 'PageErrorData' // avoid class name property
        this.message = message
    }

    get data () {
        return this.response && this.response.data
    }
}

PageErrorData.__name__ = 'PageErrorData'

const requestInstance = axios.create({
    withCredentials: true,
    baseURL: process.env.VUE_APP_SHANGHAI_API,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

requestInstance.interceptors.request.use(req => {
    const functionId = /\/\w+/.test(req.url)
        ? req.url.replace(/(^\/|\/$)|(\/)/g, (...p) => (p[1] ? '' : '_'))
        : req.url

    if (req.method === 'post') {
        const requestParam = {
            appid: 'yocial-h5',
            functionId,
            t: new Date().getTime() || '',
            loginType: '2',
            body: JSON.stringify(req.data)
        }
        const formData = qs.stringify(requestParam)

        req.data = formData
    }
    return req
}, err => Promise.reject(err))

requestInstance.interceptors.response.use(response => {
    const res = response.data

    if (res.status === false) {
        throw new NetworkError(res.error.message, response)
    }
    return res
}, err => Promise.reject(err))

/**
 * 接口异常状态码
 * @type {{invalidCredentials: string}}
 */
export const errorCodes = {
    invalidCredentials: '1007' // 当前登录已失效，请退出当前账号并重新登录
}

export default requestInstance
