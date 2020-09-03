import decode from 'jwt-decode';

// 将JWTOKEN储存到本地
// 经常需要调用，把函数写成全局，全局函数需要在index.js中导入
const setToken = token => {
    localStorage.setItem('store_token_id', token);
}

// 获取到jwt
const getToken = () => (
    localStorage.getItem('store_token_id')
);

// 判断jwt是否超时。获取到的jwt解码后得到一个很多数据的对象，exp为超时时间戳，比对超时时间戳与现在时间，从而得知是否超时
const isTokenExpired = token => {
    try {
        const _info = decode(token);
        if (_info.exp < Date.now() / 1000) {
            return true;
        } else return false;
    } catch (error) {
        return false;
    }
}

// 判断浏览器本地是否存有jwt，从而确定是否登陆
const isLogin = () => {
    var status = false;
    const jwt = getToken();
    if (jwt != null) {
        if (!isTokenExpired(jwt)) status = true;
    };
    return status;
}

// 解码jwt，如果登陆返回user对象，否则返回一个空对象
const getUser = () => {
    if(isLogin()) {
        const jwt = getToken();
        const user = decode(jwt);
        return user;
    } else {
        return {};
    }
}

const logOut = () => {
    localStorage.removeItem('store_token_id');
}

// 全局化   
global.auth = {
    setToken,
    getUser,
    logOut
}