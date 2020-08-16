import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../../Utils/service';

class ProductList extends Component {
    render() {
        const data = this.props.data;
        return (
            <div className="product">
                <img src={`${baseUrl}/images/${data.image}`} alt="" />
                <Link to={data.id_book ? `/book/${data.id_book}` : `/book/${data.id}`} className="fw__medium">{data.title}</Link>
                {data.description ?
                    <p>{data.description.substring(0, 90)} ...</p>
                    :
                    <></>
                }
            </div>
        )
    }
}

export default ProductList;