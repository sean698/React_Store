import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from 'pages/App';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import Cart from 'pages/Cart';

// 定义路由规则
// 箭头函数圆括号内默认为return，如果使用花括号需要加return
const Router = () => (
    <BrowserRouter>
        <Switch>
            {/* exact代表精确匹配 */}
            <Route path='/' exact component={App} />
            <Route path='/signup' component={SignUp} />
            <Route path='/login' component={Login} />
            <Route path='/cart' component={Cart} />
        </Switch>
    </BrowserRouter>
)

export default Router;