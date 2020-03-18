import Vue from 'vue';
import axios from "axios";
import router from "./router";
// import UserInfoTool from './user-info-tool';
import {
    message as Message
} from 'ant-design-vue';

// 实际开发中需要根据不同的环境选择不同的api_baseUrl
// const _domain = process.env.VUE_APP_API_URL;
const _domain = 'https://douban.uieee.com';


let config = {
    baseURL: _domain,
    timeout: 60 * 1000, // Timeout
    withCredentials: true, // Check cross-site Access-Control
    validateStatus: function (status) {
        return status >= 200 && status < 500; // default
    },
};

const _axios = axios.create(config);

// 添加请求拦截器
_axios.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么

        // 如果登录存了token的话，在这里把token放入请求头
        // let _token = UserInfoTool.getToken();
        // if (_token) {
        //     config.headers.authorization = _token;
        // }

        return config;
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
_axios.interceptors.response.use(
    function (response) {
        // 对响应数据做点什么        
        if (/blob/i.test(response.config.responseType)) {
            // 如果是blob数据的话，返回全部response
            return response;
        } else if (response.status === 200) {
            // 如果响应头中携带authorization等信息，重置token
            // if (response.headers.authorization) {
            //     UserInfoTool.setToken(response.headers.authorization);
            // }
            return response.data;
        } else if (response.status === 401) {
            Message.error('登录失效，请重新登录');
            // 清除账号token信息，返回登录页面
            // UserInfoTool.clear();
            router.push({
                path: '/login'
            })
            return Promise.reject(new Error(response.msg));
        } else {
            Message.error(response.msg);
            return Promise.reject(new Error(response.msg));
        }
    },
    function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

Vue.prototype.$domain = _domain;
Vue.prototype.$axios = _axios;
Vue.prototype.$baseUrl = config.baseURL;
export default _axios;
export const domain = _domain;