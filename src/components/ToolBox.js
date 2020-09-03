import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import {withRouter} from 'react-router-dom';

class ToolBox extends Component {

    // 要实时获取搜索框输入的内容，使用可控组件
    state = {
        searchText: '',
    }

    // 虽然是在toolbox里搜索，但是要控制的是products组件的状态，因此函数定义在products里，然后再将函数作为参数传进来调用
    handleChange = e => {
        const value = e.target.value;
        this.setState({
            searchText: value
        });
        this.props.search(value);
    };

    clearSearch = () => {
        this.setState({
            searchText : ''
        })
        this.props.search('');
    }

    goCart = () => {
        this.props.history.push('/cart');
    }

    render() {
        return (
            // bulma样式
            <div className="tool-box">
                <div className="logo-text">STORE</div>
                <div className="search-box">
                    <div className="field has-addons">
                        <div className="control">
                            <input 
                            className="input search-input" 
                            type="text" 
                            placeholder="Search Product" 
                            value={this.state.searchText}   // 唯一数据源
                            onChange={this.handleChange} />
                        </div>
                        <div className="control">
                            <button 
                            className="button"
                            onClick={this.clearSearch}>X</button>
                        </div>    
                    </div>       
                </div>
                <div to="/cart" className="cart-box" onClick={this.goCart} >
                    <i className="fas fa-shopping-cart"></i>
                    <span className="cart-num">({this.props.cartNum})</span>
                </div>
            </div>
            
        );
    }
}

// 这个组件没有直接在路由中定义，因此必须withRouter包装后才有history属性
export default withRouter(ToolBox);