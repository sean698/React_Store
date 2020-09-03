import React from 'react';
import axios from 'commons/axios';
import { formatPrice } from 'commons/helper';

class CartItem extends React.Component {
    // 可控组件
    state = {
        mount: 0,
        sumPrice: 0
    }
    
    componentDidMount() {
        const { price, mount } = this.props.pdct;
        const sumPrice = price * mount;
        this.setState({
            mount: mount,
            sumPrice: sumPrice
        })
    }

    handleChange = e => {
        const { price, id } = this.props.pdct;
        // 拿到的是字符串，转换成int
        const mount = parseInt(e.target.value);
        const sumPrice = mount * price;
        this.setState({
            mount: mount,
            sumPrice : sumPrice
        })
        // 更改对象数量，提交到服务器端修改
        const newPdct = {
            ...this.props.pdct,
            mount: mount
        }
        axios.put(`/carts/${id}`, newPdct)
        .then(res => {
            // 调用Cart组件的方法来更新购物车状态，从而改变total price
            this.props.updateCart(newPdct)
        }).catch(err => {
            console.log(err);
        })
    }
    
    // 删除商品
    deleteProduct = () => {
        const { id } = this.props.pdct;
        axios.delete(`/carts/${id}`)
        .then(res => {
            this.props.deleteCart(id);
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const { name, price, image, mount } = this.props.pdct;

        return (
            <div className="columns is-vcentered">
                <div className="column is-narrow">
                    <span className="close" onClick={this.deleteProduct}>X</span>
                </div>
    
                <div className="column is-narrow">
                    <img src={image} alt="" width="100" />
                </div>
    
                <div className="column cart-name is-narrow">
                    {name}
                </div>
    
                <div className="column">
                    <span className="cart-price">{formatPrice(price)}</span>
                </div>

                <div className="column">
                    <input 
                        type="number" 
                        className="input num-input" 
                        min={1}
                        defaultValue={mount} 
                        onChange={this.handleChange} 
                    />
                </div> 

                <div className="column sum-price">
                    <p className="">{formatPrice(this.state.sumPrice)}</p>
                </div>
            </div>
        )
    }
}

export default CartItem;