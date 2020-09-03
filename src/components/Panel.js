/**
 * 弹出组件：
 * 1. 一次渲染，随需调用
 * 2. 装载组件（该组件只是承载其中内容的一个壳）
        a. 子组件作为参数传递并渲染
        b. 子组件可以关闭弹出层(调用父组件也就是弹出层的close函数)
        c. 子组件可以与调用者通讯（当关闭子组件时，子组件中的数据能通过弹出层传送到调用者，从而改变调用者页面数据）
            open函数是调用者与弹出层的接口，close是子组件与弹出层的接口。函数从open传进来，设置为Panel的callback属性；数据从close传进来，调用callback属性
 */

import React from 'react';
import { render } from 'react-dom'

class Panel extends React.Component {
    state = {
        component: null,
        active: false,
        callback: () => {}
    }

    // 想开启调用该方法，options为调用者传递来的整个对象（壳里的内容），其中component属性为子组件
    // 将传递来的子组件放入panel的state里，然后在return里用this.state.component进行调用，从而进行动态渲染
    open = (options) => {
        const { component, callback, user } = options;
        // 从options里结构出来的component是构造函数，不能直接渲染，用createElement转换为可渲染组件实例
        // 第二个参数作为第一个参数的属性传递，通过这种方法，将父组件的close函数传递给子组件作为close属性
        // 每个组件都有一个key属性，key属性变化后该组件重新渲染。因此给弹出组件的key定为时间戳，从而保证每次打开弹出层都是一个崭新的（上次输入的内容关闭后再打开不会存在）
        const _key = new Date().getTime();
        const _component = React.createElement(component, { close: this.close, key: _key, user: user });  
        this.setState({
            component: _component,
            active: true,
            callback: callback
        })
    }

    // 点击遮罩层和x时关闭
    // data为子组件中传递来的数据，要将他传给调用者
    close = (data) => {
        this.setState({
            active: false
        });
        this.state.callback(data);
    }

    // 通过控制panel状态来确定className从而控制他是隐藏还是弹出
    render() {
        const _class = {
            true: 'panel-wrapper active',
            false: 'panel-wrapper'
        }

        return (
            <div className={ _class[this.state.active] }>     {/* 整体 */}
                <div className="over-layer" onClick={ this.close }></div>      {/* 遮罩层（变暗的部分） */}
                <div className="panel">         {/* 面板 */}
                    <div className="panel-head">      {/* 面板头部 */}
                        <i className="far fa-times-circle close" onClick={ this.close }></i>  {/* 关闭按钮 */}
                    </div>
                    <div className="panel-body">
                        { this.state.component }    {/* 将传递来的组件渲染 */}
                    </div>
                </div>
            </div>       
        )
    }
}

const _div = document.createElement('div');
document.body.appendChild(_div);

// 将panel渲染到容器_div中，返回一个panel实例
const _panel = render(<Panel />, _div);

// 此时导出的不是模板，而是一个加载后的的实例对象,可以调用该对象的方法
// 会在每个页面上都出现panel的<div>,与root的<div>同级，或者也可以说在每个页面上出现Panel组件，这就是全局的意思
// 在哪个页面想调用弹出组件，就import这个组件以后调用他的方法
export default _panel;