import React from 'react'

export default function UserProfile(props) {
    // 登出：清除jwt --- 关闭弹出层 --- 刷新页面
    const logout = () => {
        global.auth.logOut();
        // 刷新页面不能直接props.history，因为该组件不在路由系统下，可以打开浏览器component看层级格式
        // 因此传递一个记号给它的父组件Header, 由它的父组件来控制路由刷新
        props.close("logout");
    }

    return (
        <div className="user-profile">
            <p className="title has-text-centered">User Profile</p>
            <fieldset disabled>
                <div className="field">
                    <label className="label">Nickname</label>
                    <div className="control">
                        <input className="input" type="text" defaultValue={props.user.nickname} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className="input" type="text" defaultValue={props.user.email} />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Type</label>
                    <div className="control">
                        <input className="input" type="text" defaultValue={props.user.type === 1 ? "Admin" : "General User"} />
                    </div>
                </div>
            </fieldset>

            <br />
            <br />
            <div className="field is-grouped is-grouped-centered">
                <div className="control">
                    <button className="button is-dangered" onClick={logout}>Logout</button>
                </div>
                <div className="control">
                    {/* onClick中带圆括号这种格式，貌似是接受传进来的函数时才这样写？
                        貌似是组件上有从属关系才可以这样传送函数？不确定 */}
                    <button className="button" onClick={() => {props.close();}}>Cancel</button>
                </div>
            </div>
        </div>
    )
}