/**
 * api 统一封装方法
 * @description api集合为元数据，可直接在页面使用 this.$api[module][api]某某方法
 * @example api.login.logout(queryOrBodyData, enableFilterEmpty)
 *
 * @param {Object} queryOrBodyData? 查询参数 或者 荷载数据
 * @param {Boolean} enableFilterEmpty? 是否开启过滤空字段，默认 false
 *
 * @return {Object<{ data }>}
 */

import {
    message as Message
} from 'ant-design-vue';
import axios, {
    domain
} from '@/axios';

// 引入api模块
import movieApi from './modules/movie.api';

// 合并所有模块api并导出到外部， 可直接在页面使用 this.$api.某某方法
const APIS = {
    movie: movieApi,
};

/**
 * 请求前 中间件
 * @param apiMeta API元数据
 * @param data 请求数据
 */
function foreRequestMiddleWare(apiMeta, data) {
    const {
        url,
        method,
    } = apiMeta;

    // 处理 /a/b/c/:id 接口
    if (method.toUpperCase() === 'GET' || method.toUpperCase() === 'DELETE') {
        apiMeta.targetUrl = url.replace(/\B:(\w+)/g, (...args) => {
            apiMeta.resource = true;
            return data[args[1]];
        })
    } else {
        apiMeta.targetUrl = url;
    }
};

/**
 * 请求失败后 中间件
 * @param {ApiMeta} apiMeta API元数据
 * @param {Error} error 请求错误对象
 * @param {Function} next 下一步
 */
function fallbackMiddleWare(apiMeta, error, next) {
    const {
        name,
        method,
        url,
        errorHandler
    } = apiMeta;
    console.error(`[${method}][${domain}${url}]: ${name} 失败，${error.message}`);
    if (errorHandler) {
        Message.error(`${name} 失败，${error.message}`);
    }
    next(error);
}

// 将单个模块的 meta 转换为 请求
function Proxyable(target) {
    const target_ = {};
    for (const key in target) {
        if (target.hasOwnProperty(key)) {
            target_[key] = ProxyApi(target, key);
        }
    }
    return target_;
}

// 将 ApiMeta 映射为 http 请求
function ProxyApi(target, key) {
    if (!target[key]) throw new ReferenceError('API ' + key + ' not exist');
    const {
        method,
    } = target[key];
    if (method.toUpperCase() === 'GET') {
        return (query = {
        }, opt) => new Promise((resolve, reject) => {
            foreRequestMiddleWare(target[key], query);
            let promise = null;
            if (target[key].resource) {
                promise = axios.get(target[key].targetUrl, {}, opt)
            } else {
                promise = axios.get(target[key].targetUrl, Object.assign({}, {
                    params: query
                }, opt))
            }
            promise
                .then(data => resolve(data))
                .catch(err => {
                    fallbackMiddleWare(target[key], err, reject)
                });
        })
    } else if (method.toUpperCase() === 'PATCH') {
        return (body = {}, opt) => new Promise((resolve, reject) => {
            foreRequestMiddleWare(target[key], body);
            axios.patch(target[key].targetUrl, body, opt)
                .then(data => resolve(data))
                .catch(err => {
                    fallbackMiddleWare(target[key], err, reject)
                });
        })
    } else if (method.toUpperCase() === 'POST') {
        return (body = {}, opt) => new Promise((resolve, reject) => {
            foreRequestMiddleWare(target[key], body);
            axios.post(target[key].targetUrl, body, opt)
                .then(data => resolve(data))
                .catch(err => {
                    fallbackMiddleWare(target[key], err, reject)
                });
        })
    } else if (method.toUpperCase() === 'DELETE') {
        return (query = {}, opt) => new Promise((resolve, reject) => {
            foreRequestMiddleWare(target[key], query);
            let promise = null;
            if (target[key].resource) {
                promise = axios.delete(target[key].targetUrl, {}, opt)
            } else {
                promise = axios.delete(target[key].targetUrl, Object.assign({}, {
                    params: query
                }, opt))
            }
            promise
                .then(data => resolve(data))
                .catch(err => {
                    fallbackMiddleWare(target[key], err, reject)
                });
        })
    } else if (method.toUpperCase() === 'PUT') {
        return (body = {}, opt) => new Promise((resolve, reject) => {
            foreRequestMiddleWare(target[key], body);
            axios.put(target[key].targetUrl, body, opt)
                .then(data => resolve(data))
                .catch(err => {
                    fallbackMiddleWare(target[key], err, reject)
                });
        })
    } else {
        throw new Error('【API】API源数据信息错误，不支持的方法：' + method);
    }
}

const API_ = {};

Object.keys(APIS).forEach(apiName => {
    API_[apiName] = Proxyable(APIS[apiName]);
});

export default API_;
