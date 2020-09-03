import React from 'react'
import Header from 'components/Header'

const Layout = (props) => {
    // 获取user对象作为Header参数传回去，如果登陆，视图改为nickname，否则就是login和sign up
    const user = global.auth.getUser();
    // 每个页面都要有的组件，直接在这个页面中加，每个页面最外层用<Layout></Layout>包装
    return (
        <div className="main">
            <Header user={user} />
            {props.children}
        </div>
    )
}

export default Layout;