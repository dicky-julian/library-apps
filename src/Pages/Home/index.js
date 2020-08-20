import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Empty, Modal, Product } from '../../Components';
import { modalToogle } from '../../Components/Elements/Modal';
import { SearchIcon } from '../../Components/Elements/Icons';
import { compareValues } from '../../Utils/Api';
import { fetchBook, fetchBookFilter } from '../../Redux/Actions/book';
import { baseUrl } from '../../Utils/service';
import { loading } from '../../Assets/images';
import './home.scss';

const Home = props => {
    const [dataStatus, setDataStatus] = useState('all');
    const [dataBookSort, setDataBookSort] = useState();
    const [favoriteBook, setFavoriteBook] = useState();

    const dataBook = props.book.book;
    const dataGenre = props.book.genre;
    const bookFilter = props.book.bookFilter;

    const handleSearch = e => {
        e.preventDefault();
        const search = document.querySelector("#form__search>input").value;
        if (search) props.history.push(`/book?search=${search}`);
    }

    const handleGenreBook = (e, status) => {
        setDataStatus(status);
        setDataBookSort();
        document.querySelector('#genre__list .active').classList.remove('active');
        e.target.classList.add('active');
    }

    const sortTools = (e, key, order = 'asc') => {
        let newData = '';
        let data = [...dataBook[dataStatus]];
        let activeEl = document.querySelector('#sort__tools>.active');

        e.target.classList.add('active');

        if (activeEl) {
            activeEl.classList.remove('active');
        }
        if (data) {
            newData = data.sort(compareValues(key, order));
        }
        setDataBookSort(newData);
        modalToogle('sort__tools')
    }

    useEffect(() => {
        if (!dataBook) props.fetchBook();
        if (!bookFilter) props.fetchBookFilter([null, 'rating', 'DESC', 4]);
        if (bookFilter && !favoriteBook) {
            const book = [...bookFilter];
            delete book[3];
            setFavoriteBook(book);
        }
    }, [dataBook, bookFilter, favoriteBook])

    return (
        <>
            {/* HEADER */}
            <div className="home__header bg__setup">
                <h1 className="fw__thin">Find <b className="fw__medium">perfect</b> book for <b className="fw__medium">today</b></h1>
                <form id="form__search" onSubmit={handleSearch}>
                    <input type="text" placeholder="What book are you looking for ?" required />
                    <SearchIcon className="icon c__pointer" />
                </form>
            </div>

            {/* LIST of TOP BOOK */}
            <div className="product__toplist">
                <div className="product__desc">
                    <h4>Top of the last week</h4>
                    <p>The most desired books of the last week</p>
                </div>
                {favoriteBook ?
                    
                    favoriteBook.map((data, key) => {
                        return (
                            <div className="product" key={key}>
                                    <img src={`${baseUrl}/images/${data.image}`} alt="" />
                                    <div>
                                        <h5><Link to={`/book/${data.id}`}>{data.title}</Link></h5>
                                        {data.description.substring(0, 90)}
                                        <Link to={`/book/${data.id}`} className="fw__medium">Read more</Link>
                                    </div>
                                </div>
                        )
                    }) : <></>
                }
            </div>

            <div className="home__body">
                <div className="product__tools">
                    <div className="bt bt__default c__pointer" onClick={() => modalToogle("sort__tools")}>Sorts</div>

                    {/* GENRE LIST */}
                    <div id="genre__list" className="genre__list">
                        <div className="active" onClick={(e) => handleGenreBook(e, 'all')}>All</div>
                        {dataGenre ?
                            dataGenre.map((data, key) => {
                                return (<div key={key} onClick={(e) => handleGenreBook(e, data.id)}>{data.name}</div>)
                            }) : <></>
                        }
                    </div>
                </div>

                {/* SORT & FILTER COLLAPSE */}
                <Modal id="sort__tools">
                    <h6 onClick={(e) => sortTools(e, 'title', 'asc')}>Title</h6>
                    <h6 onClick={(e) => sortTools(e, 'rating', 'desc')}>Rating</h6>
                </Modal>

                {/* LIST of ALL BOOK */}
                <div className="product__list">
                    {
                        dataBookSort ?
                            dataBookSort.map((data, key) => (
                                <Product data={data} key={key} />
                            ))
                            :
                            dataBook ?
                                dataBook[dataStatus].length ?
                                    dataBook[dataStatus].map((data, key) => (
                                        <Product data={data} key={key} />
                                    ))
                                    :
                                    <Empty message="Cant find data" />
                                :
                                <div className='loading'>
                                    <img src={loading} alt='loading' />
                                    <h4>Loading . . .</h4>
                                </div>
                    }
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    book: state.book
});

const mapDispathToProps = { fetchBook, fetchBookFilter };

export default connect(mapStateToProps, mapDispathToProps)(Home);