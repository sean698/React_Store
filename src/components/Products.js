import React from 'react';
import ToolBox from 'components/ToolBox';
import Product from 'components/Product';
import axios from 'commons/axios';
import Panel from 'components/Panel'; 
import { withRouter } from 'react-router-dom';
// 通过快速切换组件的className从而达到给组件添加动画效果（别忘了要在css文件中写各种阶段class的样式）
import { CSSTransition, TransitionGroup } from 'react-transition-group';  
import AddInventory from './AddInventory';

class Products extends React.Component {
    // products = [
    //     {
    //         id: 1,
    //         name: 'Air Jordan 4',
    //         image: '/images/1.jpg',
    //         tags: '92 ',
    //         price: 59400,
    //         status: 'available'
    //     },
    //     {
    //         id: 2,
    //         name: 'Nike Paul George PG 3',
    //         image: '/images/2.jpg',
    //         tags: '25 Colors',
    //         price: 53800,
    //         status: 'available'
    // ]

    state = {
        products: [],
        sourceProducts: [],      // 定义一个永远完整的数组，每次search复制完整的数组搜索
        cartNum: 0,
    };

    // 生命周期函数，在render()后调用
    // 通过get方法从数据库请求商品列表
    componentDidMount() {
        axios.get("/products").then(response => {
            this.setState({
                products: response.data,
                sourceProducts: response.data
            });
        });
        // 页面一渲染就更新购物车的值，不然点击加购按钮后才进行渲染
        this.updateCartNum();


    }

    // 搜索逻辑。根据输入信息进行过滤，从而改变state，state改变会使UI重新渲染
    // 将search函数作为<ToolBox>的参数传给他从而进行调用
    search = text => {
        // 1. 复制一个当前state数组（不能直接改变state）
        var _products = [...this.state.sourceProducts]  // 不能直接等于，那样不是复制
        
        // 2. 过滤新数组
        // 过滤方法，返回一个新数组。回调函数为规则，遍历数组判断，每个返回true/false，从而判断该元素是否符合规则
        _products = _products.filter(p => {
            const match = p.name.match(new RegExp(text, 'gi'));  // 正则表达式
            return match !== null;
        });

        // 3. set state
        this.setState({
            products: _products
        });
    }

    // add按钮
    toAdd = () => {
        Panel.open({
          component: AddInventory,
          callback: data => {
            if (data) {
              this.add(data);
            }
          }
        });
      };

    add = product => {
        const _products = [...this.state.products];
        _products.push(product);
        const _sProducts = [...this.state.sourceProducts];
        _sProducts.push(product);

        this.setState({
            products: _products,
            sourceProducts: _sProducts
        });
    };
    
      update = product => {
        const _products = [...this.state.products];
        const _index = _products.findIndex(p => p.id === product.id);
        _products.splice(_index, 1, product);
        const _sProducts = [...this.state.sourceProducts];
        const _sIndex = _products.findIndex(p => p.id === product.id);
        _sProducts.splice(_sIndex, 1, product);
        this.setState({
          products: _products,
          sourceProducts: _sProducts
        });
      };
    
      delete = id => {
        const _products = this.state.products.filter(p => p.id !== id);
        const _sProducts = this.state.sourceProducts.filter(p => p.id !== id);
        this.setState({
          products: _products,
          sourceProducts: _sProducts
        });
      };

    // 添加购物车时调用该函数重新渲染购物车的里的值
    // 按常理该函数和state都应该定义在toolbox组件里，但是toolbox和product是同级关系，没法直接调用函数，因此定义在他们共同的父组件中。
    // 然后将父组件该state的值作为参数传入toolbox里，将调用函数传入product中
    // 切记：当兄弟组件需要沟通时，将state和函数放到他们共同的父组件中进行调用（状态提升）
    updateCartNum = async () => {
        const cartNum = await this.initCartNum();
        this.setState({
            cartNum: cartNum
        });
    }

    // 获取当前购物车中物品数量
    initCartNum = async () => {
        try {
            // 获取购物车中所有商品对象，一个数组
            const res = await axios.get('/carts');
            const carts = res.data;
            // 总数量
            var all = 0
            // 购物车不为空时，每个对象的mount属性与总数量相加
            if (carts !== []) {
                carts.forEach(cart => {
                    all += cart.mount;
                });
            }
            return all;
        } catch (error) {
            console.log(error);
        }
    }


    render() {
        return(
            <div>
                <ToolBox search={this.search} cartNum={this.state.cartNum} />
                <div className="products">
                    <div className="columns is-multiline is-mobile">
                        {/* 用map方法动态循环渲染，将一个列表中的每个值在函数中处理后，返回一个with新元素的新列表 */}
                        <TransitionGroup component={null}>    {/* group包裹整个组件，CSSTransition包裹单个组件 */}
                            {
                                this.state.products.map(p => {
                                    return (
                                        <CSSTransition 
                                            classNames="product-fade" 
                                            timeout={250} 
                                            key={p.id}
                                        >
                                            <div className="column is-3" key={ p.id }>
                                                <Product product={ p } updateCartNum={ this.updateCartNum } />
                                            </div>
                                        </CSSTransition>
                                    );
                                })
                            }
                        </TransitionGroup>
                    </div>
                    {(global.auth.getUser() || {}).type === 1 && (
                        <button className="button is-primary add-btn" onClick={this.toAdd}>
                            add
                        </button>
                    )}
                </div>
            </div>
            
        )
    }
}

export default withRouter(Products);