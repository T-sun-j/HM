import axios from 'axios'
import { Toast } from 'vant'
import { login } from '@/api/auth'
import { getUrlString } from '@/utils/tools'

/**
 * @typedef FulfilledResponse {*}
 */

/**
 * @typedef RejectedResponse {(NetworkError|Error)}
 */

/**
 * 业务请求错误类
 */
export class NetworkError extends Error {
    constructor (message, response) {
        super(message)
        this.response = response
        this.name = NetworkError.name
        this.isBusinessError = true
    }

    get data () {
        return this.response && this.response.data
    }

    get result () {
        return this.data && this.data.result
    }

    get info () {
        return (this.result && this.result.info) || this.message
    }

    get code () {
        return this.data.result && this.data.result.code
    }
}

/**
 * @enum ResultCode API 状态码
 * https://cf.jd.com/pages/viewpage.action?pageId=240760642#id-9．返回码
 */
const ResultCode = {
    success: '0000',
    unAuth: '0006',
    error: '0005'
}

// eslint-disable-next-line
const ResultCodeDesc = {
    '0000': '成功', // 业务请求处理成功
    '0001': '未知错误', // '业务请求失败'
    '0002': '唯一索引冲突', // '数据库防重'
    '0003': '参数不合法', // '请求参数不合法'
    '0004':	'不存在的',
    '0005':	'业务流程异常',
    '0006':	'用户未登录',
    '0101':	'没有任何改变'
}

function handleResultCode (code) {
    switch (code) {
    case ResultCode.unAuth:
        login()
        break
    default:
        // TODO:
        break
    }
}
export const requestImage = axios.create({
    baseURL: 'https://pic.jd.com',
    timeout: 25000,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})

const requestInstance = axios.create({
    withCredentials: true,
    baseURL: process.env.VUE_APP_API_HOST + process.env.VUE_APP_API_BASE_URL,
    timeout: 25000,
    headers: {
        'Content-Type': 'application/json'
    }
})

requestInstance.interceptors.request.use(req => {
    // TODO: 开发联调暂时使用该方案
    const merchantId = getUrlString('merchantId') || '1206980033504108545'
    const cid = getUrlString('cid') || 'C1000263212'
    if (req.method === 'post') {
        req.data = {
            ...req.data
            // merchantId,
            // cid
        }
    } else if (req.method === 'get') {
        const params = {
            reqData: {
                ...req.params
                // merchantId,
                // cid
            }
        }

        req.params = params
    }

    return req
}, err => Promise.reject(err))

requestInstance.interceptors.response.use(response => {
    // 业务错误
    const res = response.data

    if (!res || !res.result) {
        // TODO: 细化系统无响应的兜底处理
        Toast('系统繁忙，请稍后再试~')
        return
    }

    if (res.result.code !== ResultCode.success) {
        handleResultCode(res.result.code)
        Toast(res.result.info)
        if (res.result.code === ResultCode.error) {
            throw res
        } else {
            throw new NetworkError(res.result.info || '网络异常...', response)
        }
    }

    return res
}, err => Promise.reject(new NetworkError(err.message, err),err))

export default requestInstance
