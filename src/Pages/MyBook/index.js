import React, { Component } from 'react';
import ProductList from '../../Components/Elements/ProductList';
import dummy from '../../dummy.json';
import './mybook.scss';

class MyBook extends Component {
    render() {
        return (
            <div className="my_book">
                <div className="product__tools">
                    <div className="genre__list">
                        <div className="active">Borrowed</div>
                        <div>History</div>
                    </div>
                </div>
                {/* LIST of ALL BOOK */}
                <ProductList data={dummy.book} />
            </div>
        )
    }
}

export default MyBook;