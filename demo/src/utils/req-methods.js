import axios from 'axios';

const _axios = axios.create();

_axios.defaults.baseURL = "http://localhost:2500";//设置请求的基本路径
// 添加请求拦截器
_axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log(config);
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
_axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log(response);
  return response;
}, function (err) {
  // 对响应错误做点什么
  console.log(err)
  if (err && err.response) {
    switch (err.response.status) {
      case 400: err.message = '请求错误(400)'; break;
      case 401: return history.push('/login'); break;
      case 403: err.message = '拒绝访问(403)'; break;
      case 404: err.message = '请求出错(404)'; break;
      case 408: err.message = '请求超时(408)'; break;
      case 500: err.message = '服务器错误(500)'; break;
      case 501: err.message = '服务未实现(501)'; break;
      case 502: err.message = '网络错误(502)'; break;
      case 503: err.message = '服务不可用(503)'; break;
      case 504: err.message = '网络超时(504)'; break;
      case 505: err.message = 'HTTP版本不受支持(505)'; break;
      default: err.message = `连接出错(${err.response.status})!`;
    }
  } else {
    err.message = '连接服务器失败!'
  }
  message.error(err.message);
  return Promise.reject(err);

});
// 封装 post 请求方法
export function post (url, param) {
  return _axios.post(url, param)
}
// 封装 get 请求方法
export function get (url, params) {
  return _axios.get(url, { params })
}
