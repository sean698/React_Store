import _axios from 'axios';

// 用来定义baseURL，这样不用每次请求都输入前半部分，比较方便，可选
const instance = _axios.create({
    baseURL: process.env.REACT_APP_API_DOMAIN,
    timeout: 1000
});

export default instance;