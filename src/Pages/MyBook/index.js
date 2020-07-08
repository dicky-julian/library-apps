import React, { Component } from 'react';
import { connect } from 'react-redux';
import Empty from '../Empty';
import Product from '../../Components/Elements/Product';
import { fetchUserBook } from '../../Redux/Actions/transaction';

// assets
import './mybook.scss';

class MyBook extends Component {
    constructor() {
        super();
        this.state = {
            toogleStatus: 1
        }
    }

    componentDidMount() {
        const id = this.props.auth.isLogin.id;
        this.props.fetchUserBook(id);
    }

    handleToogleStatus = (e, status) => {
        document.querySelector('.genre__list .active').classList.remove('active');
        e.target.classList.add('active');
        this.setState({ toogleStatus: status });
    }

    render() {
        const status = this.state.toogleStatus;
        const dataBorrow = this.props.transaction.bookBorrow;
        const dataHistory = this.props.transaction.bookHistory;
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
                    {status ?
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

const mapStateToProps = state => ({
    auth: state.auth,
    transaction: state.transaction
});

const mapDispathToProps = { fetchUserBook };

export default connect(mapStateToProps, mapDispathToProps)(MyBook);