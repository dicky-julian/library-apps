import React, { Component } from 'react';
import Empty from '../Empty';
import Product from '../../Components/Elements/Product';
import { useToken, getTransaction } from '../../Utils/Api/index';

// assets
import './mybook.scss';

class MyBook extends Component {
    constructor() {
        super();
        this.state = {
            bookBorrow: '',
            bookHistory: '',
            toogleStatus: 1
        }
    }

    componentDidMount() {
        const userData = useToken();
        this.getBookBorrow(userData.id);
        this.getBookHistory(userData.id);
    }

    getBookBorrow = (id) => {
        getTransaction(id, 1)
            .then(res => {
                if (res.data) this.setState({ bookBorrow: res.data });
            })
            .catch(err => console.log(err))
    }

    getBookHistory = (id) => {
        getTransaction(id, 2)
        .then(res => {
            if (res.data) this.setState({ bookHistory: res.data });
        })
        .catch(err => console.log(err))
    }

    handleToogleStatus = (e, status) => {
        document.querySelector('.genre__list .active').classList.remove('active');
        e.target.classList.add('active');
        this.setState({toogleStatus: status});
    }

    render() {
        const status = this.state.toogleStatus;
        const dataBorrow = this.state.bookBorrow;
        const dataHistory = this.state.bookHistory;
        return (
            <div className="my_book">
                <div className="product__tools">
                    <div className="genre__list">
                        <div className="active" onClick={(e) => this.handleToogleStatus(e, 1)}>Borrowed</div>
                        <div onClick={(e) => this.handleToogleStatus(e, 0)}>History</div>
                    </div>
                </div>
                {/* LIST of ALL BOOK */}
                <div className="product__list">
                    { status ? 
                    dataBorrow.length ?
                        dataBorrow.map((data, index) => {
                            return <Product data={data} key={index} />
                        })
                        :
                        <Empty message="Cant find data" />
                    :
                    dataHistory.length ?
                        dataHistory.map((data, index) => {
                            return <Product data={data} key={index} />
                        })
                        :
                        <Empty message="Cant find data" />
                    }
                    </div>
            </div>
        )
    }
}

export default MyBook;