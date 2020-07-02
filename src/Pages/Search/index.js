import React, { Component } from 'react';
import queryString from 'query-string';
import Empty from '../Empty';
import Product from '../../Components/Elements/Product';
import { getBook } from '../../Utils/Api/index';

// assets
import './search.scss';

class MyBook extends Component {
    constructor() {
        super();
        this.state = {
            dataBook: ''
        }
    }
    fetchBook = (title) => {
        getBook(title)
            .then(res => {
                this.setState({ dataBook: {key: title, data: res.data} })
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidMount() {
        const query = queryString.parse(this.props.location.search);
        this.fetchBook(query.search);
    }

    render() {
        const data = this.state.dataBook.data;
        return (
            <div className="search">
                <h4>Show result for '<b>{this.state.dataBook.key}</b>'</h4>
                {/* LIST of ALL BOOK */}
                <div className="product__list">
                    {
                        data ?
                            data.map((data, index) => {
                                return <Product data={data} key={index} />
                            })
                            :
                            <Empty message={`Cant find data with key '${this.state.dataBook.key}'`} />
                    }
                </div>
            </div>
        )
    }
}

export default MyBook;