import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductList extends Component {
    render() {
        const data = this.props.data;
        return (
            <div className="product">
                <img src={`http://localhost:3000/images/${data.image}`} alt="" />
                <Link to={`/book/${data.id}`} className="fw__medium">{data.title}</Link>
                <p>{data.description.substring(0, 90)} ...</p>
            </div>
        )
    }
}

export default ProductList;