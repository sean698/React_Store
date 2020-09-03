import React from 'react';
import { Link, withRouter } from 'react-router-dom';   // Link用来路由，不用<a>; 因为Header不是直接被路由的组件，想用props.history，得用withRouter
import Panel from 'components/Panel';  // import后就可以用来调用他的方法
import UserProfile from 'components/UserProfile';  // 弹出组件中的用户信息面板

// 函数式组件不用加render(),而且(props) => ()圆括号的箭头函数，默认括号内为return部分
const Header = (props) => {

    // 点击昵称打开用户信息面板
    const toProfile = () => {
        // 不直接传递的原因是不光要传递组件还要传送其他参数，因此作为对象传递
        // 传送一个回调函数，从而实现弹出层的子组件与调用者通讯
        // Header组件被传入了一个user对象，在App.js中，因此可以直接调用到用户对象，传到子组件，从而动态渲染
        Panel.open({
            component: UserProfile,
            user: props.user,
            callback: data => {
                if ( data === 'logout' ) {
                    props.history.go(0);    // 刷新页面
                }
            }
        })
    }

    return (
        <div className="header">
        <div className="grid">
            {/* header分为两个部分，前半部分和后半部分，start是前半部分，end是后半部分 */}
            <div className="start">     
                <Link to="/">HOME</Link>
            </div>
            <div className="end">
                {/* 如果nickname传回值，显示用户名；否则显示注册和登陆
                 <React.Fragment>可以用来return多个元素，不用<div>因为会破坏结构 */}
                { props.user.nickname ? (
                    <React.Fragment>      
                        <i className="far fa-user icon" onClick={toProfile}></i>
                        <span className="nickname" onClick={toProfile}>
                            { props.user.nickname }
                        </span>
                    </React.Fragment>
                ) : (
                    <React.Fragment>    
                        <Link to="/login">LOGIN</Link>      
                        <Link to="/signup">SIGN UP</Link>
                    </React.Fragment>
                )}
            </div>
        </div>
    </div>
    )   
}

// 因为Header不是直接被路由的组件，不能直接使用props.history，得用withRouter
export default withRouter(Header)