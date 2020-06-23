import React, { Component } from 'react';
import './productList.scss';

class ProductList extends Component {
    render() {
        const datas = this.props.data;
        return (
            <div className="product__list">
                {
                    datas.map((data, index) => {
                        return (
                            <div className="product" key={index}>
                                <img src={data.image} alt="" />
                                <a href="/" className="fw__medium">{data.title}</a>
                                <p>{data.description.substring(0, 90)} ...</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default ProductList;