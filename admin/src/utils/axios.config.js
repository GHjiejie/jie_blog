import axios from 'axios';

// 使用axios拦截器

// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 在请求头中添加token,以便后端验证用户的身份
        const token = window.sessionStorage.getItem('token');
        // console.log('输出token',token);
        config.headers.Authorization = `Bearer ${token}`;
        return config
    }
);

// 响应拦截器
axios.interceptors.response.use(
    response => {
    //    将响应的数据存储到浏览器的sessionStorage中
    // 首先，我们需要在响应拦截器中获取到响应头中的token，然后将token存储到浏览器的sessionStorage中，以便后续的请求可以从sessionStorage中获取到token
    const {authorization}=response.headers;
    // console.log('输出响应头中的token',authorization);
        authorization&&window.sessionStorage.setItem('token',authorization);
        return response;
    },
    error => {
        // 如果响应的状态码为401，则说明用户的token已经失效，我们需要将浏览器中的token删除，并且跳转到登录页面
        if (error.response.status === 401) {
            window.sessionStorage.removeItem('token');
            // window.location.href = '/login';
            alert('登录已过期，请重新登录');
            window.location.href = '/login';
        }
        return Promise.reject(error.response.data);
    }
);

export default axios;
