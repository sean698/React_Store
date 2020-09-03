import React, { Component } from 'react';
import axios from 'commons/axios';
import {toast} from 'react-toastify';
import { formatPrice } from 'commons/helper';

class Product extends Component {
    addCart = async() => {
        try {
            // 解构该商品所有信息
            const { id, name, image, tags, status, price } = this.props.product;
            // 查询/carts里是否有该id的商品
            const res = await axios.get(`/carts?productId=${id}`);
            // 返回一个数组
            const carts = res.data;
            // 如果数组长度大于0，说明购物车里有该商品，将他数量+1
            if (carts && carts.length > 0) {
                console.log('res=>', carts);
                const cart = carts[0];
                cart.mount += 1;
                // 服务端修改
                axios.put(`/carts/${cart.id}`, cart)
            } else {
                // 没有的话，新建一个
                const cart = {
                    productId: id, 
                    name,
                    image,
                    price,
                    mount: 1
                }
                console.log('addcart=>', cart);
                // 发送到服务端
                await axios.post('/carts', cart);
            }
            this.props.updateCartNum();
            toast.success('Add cart successful');
        } catch (error) {
            toast.error('Add cart failed');
        }
    } 

    render() {
        // 用来一次性赋值，比较方便
        const { name, image, tags, status, price,id } = this.props.product;
        return (

            // 检查status，赋予不同的className
            <div className={ status === 'available' ? ('product') : ('product out-of-stock') }> 
                
                <div className="p-content" >
                    <div className="img-wrapper">
                        {/* 检查status，无库存情况下显示Out of Stock */}
                        { status === 'available' ? (null) : (<div className="out-stock-text">Out of Stock</div>)}
                        <figure className="image is-4by3">
                            <img src={ image } alt="" />   
                        </figure>
                    </div>
                    <p className="p-tags">{ tags }</p>
                    <p className="p-name">{ name }</p>
                </div>
                
                <div className="p-footer">
                    <p className="price">{formatPrice(price)}</p>
                    {/* 无库存情况下禁用按钮 */}
                    <button className="add-cart" disabled={ status === 'unavailable' } onClick={this.addCart}>   
                        <i className="fas fa-shopping-cart"></i>    
                        <i className="fas fa-exclamation"></i>
                    </button>
                </div>
            </div>
        );
    }
}

export default Product;