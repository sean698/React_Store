import React from 'react';
import Layout from 'Layout';
import axios from 'commons/axios';
import CartItem from 'components/CartItem';
import { formatPrice } from 'commons/helper';

class Cart extends React.Component{
    state = {
        cart: []
    };

    componentDidMount() {
        axios.get('/carts')
        .then(res => {
            const productsInCart = res.data;
            this.setState({
                cart: productsInCart
            })
        })
        .catch(err => console.log('get cart error =>', err));
    };

    // 计算总价
    // 给计算函数可以用useMemo的hook包装一下，添加依赖，这样在渲染的时候只要依赖不变就不会重新渲染，不会造成资源浪费
    // hook只能在函数式组件中使用
    totalPrice = () => {
        const totalPrice = this.state.cart.map(pdct => pdct.mount * pdct.price)
        .reduce((a, value) => a + value, 0)
        return totalPrice
    }

    // 更新购物车
    updateCart = pdct => {
        // 复制一个购物车数组
        const newCart = [...this.state.cart];
        // 遍历数组寻找与传入对象id相同的对象，返回索引
        const _index = newCart.findIndex(p => p.id === pdct.id);
        // 剪切方法。该索引开始，剪切掉一个，插入新传入的对象
        newCart.splice(_index, 1, pdct);
        // 设置新购物车状态
        this.setState({
            cart: newCart
        });
    }

    // 删除购物车中指定商品
    deleteCart = id => {
        const newCart = [...this.state.cart];
        const _index = newCart.findIndex(p => p.id === id);
        // 剪切
        newCart.splice(_index, 1);
        // // 过滤方法：符合条件的保留，不符合的删去
        // newCart.filter(p => p.id !== id)
        this.setState({
            cart: newCart
        });
    }

    render() {
        return (
            <Layout>
                <div className="cart-page">
                    <span className="cart-title">Shopping Cart</span>
                    <div className="cart-list">
                        {
                            this.state.cart.map(pdct => {
                                return (
                                    <CartItem 
                                        pdct={pdct} 
                                        key={pdct.productId}    
                                        updateCart={this.updateCart}
                                        deleteCart={this.deleteCart} />
                                )
                            })
                        }
                    </div>
                    {
                        this.state.cart.length === 0 ? <div className="no-carts">NO GOODS</div> : ''
                    }
                    <div className="cart-total">
                        Total: <span className="totalPrice">{formatPrice(this.totalPrice())}</span>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Cart;