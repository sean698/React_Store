import React from 'react';
import {useForm} from 'react-hook-form';
import axios from 'commons/axios';
import { toast } from 'react-toastify';

// 使用react-hook-form处理表单提交
export default function Login(props) {
    // useForm()返回一个对象。register设置为input的ref属性，handleSubmit设置为form的onSubmit属性，包装下自己的提交函数
    const { register, handleSubmit, errors } = useForm();
    
    // 获取表单数据 --- 处理登陆逻辑 --- 完成登陆后跳转到首页
    const submitHandler = async (data) => {   // 有await必须函数加async
        // data就是提交的表单数据
        try {
            const { email,password } = data;
            const res = await axios.post('/auth/login', { email, password });  // await异步处理，不太清楚，axios必须
            const jwToken = res.data;
            // 将jwToken储存到本地, 全局函数，auth.js中定义的，可以在控制台-application-storage查看
            global.auth.setToken(jwToken);  
            // 跳转到首页（定义route以后组件会多出history属性，其中是各种操控route的方法）
            props.history.push('/');
            toast.success("Login successful!");
        } catch (error) {
            console.log(error);
            toast.error("Invalid email or password");
        }
    };

    return(
        <div className="login_wrapper">
            <form className="box login_box" onSubmit={ handleSubmit(submitHandler) }>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input 
                        className={`input ${errors.email && 'is-danger'}`}  // bulma样式
                        type="text" 
                        placeholder="Email" 
                        name='email'     // 为了在同一个函数中获取不同input的值，给input添加name属性，提交后获得对象的该属性名称就是这个name
                        ref={ register({        // 设定输入规则，具体方法查看react-hook-form官网
                            required: true,
                            pattern: {
                                value: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/,
                                message: 'invalid email'
                            }}) }  />   
                        { errors.email && <p className="helper has-text-danger">{ errors.email.message }</p> }  {/* bulma样式,错误提示 */}
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input 
                        className={`input ${errors.password && 'is-danger'}`}
                        type="text" 
                        placeholder="Password" 
                        name='password'     // 为了在同一个函数中获取不同input的值，给input添加name属性，提交后获得对象的该属性名称就是这个name
                        ref={ register({ 
                            required: true,
                            minLength: {
                                value: 6,
                                message: 'cannot be less than 6 digits'
                            }}) } />
                        { errors.password && <p className="helper has-text-danger">{ errors.password.message }</p> }  {/* bulma样式,错误提示 */}
                    </div>
                </div>
                <div className="control">
                    <button className="button is-link">Login</button>
                </div>
            </form>
        </div>      
    );
}

// 不使用hook，手动获取，受控组件
// class Login extends React.Component {
//     state = {
//         email: '',
//         password: ''
//     };

//     submitHandler = (event) => {
//         // 1. 阻止默认行为（form元素提交后会自动刷新页面）
//         event.preventDefault();
//         // 2. 获取表单数据

//         // 3. 处理登陆逻辑

//         // 4. 跳转到首页（定义route以后组件会多出history属性，其中是各种操控route的方法）
//         this.props.history.push('/');
//     };

//     changeHandler = (e) => {
//         this.setState({
//             [e.target.name]: e.target.value
//         });
        
//     }

//     render() {
//         return(
//             <div className="login_wrapper">
//                 <form className="box login_box" onSubmit={ this.submitHandler }>
//                     <div className="field">
//                         <label className="label">Email</label>
//                         <div className="control">
//                             <input 
//                             className="input" 
//                             type="text" 
//                             placeholder="Email" 
//                             name='email'     // 为了在同一个函数中获取不同input的值，给input添加name属性，必须与state属性名称一致
//                             onChange={ this.changeHandler }/>
//                         </div>
//                     </div>
//                     <div className="field">
//                         <label className="label">Password</label>
//                         <div className="control">
//                             <input 
//                             className="input" 
//                             type="text" 
//                             placeholder="Password" 
//                             name='password'     // 为了在同一个函数中获取不同input的值，给input添加name属性，必须与state属性名称一致
//                             onChange={ this.changeHandler } />
//                         </div>
//                     </div>
//                     <div className="control">
//                         <button className="button is-link">Submit</button>
//                     </div>
//                 </form>
//             </div>      
//         );
//     }
// }

// export default Login;