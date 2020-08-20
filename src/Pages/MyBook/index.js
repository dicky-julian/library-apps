import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Empty, Product } from '../../Components';
import { setLoading, fetchUserBook } from '../../Redux/Actions/transaction';
import { loading } from '../../Assets/images';

// assets
import './mybook.scss';

const MyBook = props => {
    const userData = props.auth.isLogin;
    const dataBorrow = props.transaction.bookBorrow;
    const dataHistory = props.transaction.bookHistory;

    const [status, setStatus] = useState(1);

    const handleToogleStatus = (e, activeStatus) => {
        document.querySelector('.genre__list .active').classList.remove('active');
        e.target.classList.add('active');
        setStatus(activeStatus);
    }

    useEffect(() => {
        if (!dataBorrow && !dataHistory) {
            props.setLoading(true);
            props.fetchUserBook(userData.id);
        }
    }, [dataBorrow, dataHistory])

    return (
        <div className="my_book">
            <div className="product__tools">
                <div className="genre__list">
                    <div className="active" onClick={e => handleToogleStatus(e, 1)}>Borrowed</div>
                    <div onClick={e => handleToogleStatus(e, 0)}>History</div>
                </div>
            </div>
            {/* LIST of ALL BOOK */}
            <div className="product__list">
                {status ?
                    dataBorrow ?
                        dataBorrow.length ?
                            dataBorrow.map((data, key) => {
                                return <Product data={data} key={key} />
                            })
                            :
                            <Empty message="Cant find data" />
                        :
                        <div className='loading'>
                            <img src={loading} alt='loading' />
                        </div>
                    :
                    dataHistory ?
                        dataHistory.length ?
                            dataHistory.map((data, key) => {
                                return <Product data={data} key={key} />
                            })
                            :
                            <Empty message="Cant find data" />
                        :
                        <div className='loading'>
                            <img src={loading} alt='loading' />
                        </div>
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    transaction: state.transaction
});

const mapDispathToProps = { setLoading, fetchUserBook };

export default connect(mapStateToProps, mapDispathToProps)(MyBook);