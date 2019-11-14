//      Hostname token  lodaing 响应处理
import axios from 'axios'
import {HOSTNAME} from "../config/base";
import store from '../store'

let instance = axios.create({
    baseURL: HOSTNAME,
    timeout: 5000,
});
// 请求拦截（config）
instance.interceptors.request.use(function (config) {
    store.commit('toggleIsShow', true);
    if (store.state.token) {
        config.headers = {
            token: store.state.token,
            "Content-type": 'application/json'
        }
    }
    return config;
}, function (error) {
    // Do something with request error
    store.commit('toggleIsShow', false);
    return Promise.reject(error);
});
//响应拦截（response）
instance.interceptors.response.use(function (response) {
    // Do something with response data
    store.commit('toggleIsShow', false);
    return response.data;
}, function (error) {
    // Do something with response error
    store.commit('toggleIsShow', false);
    return Promise.reject(error);
});


export default instance;