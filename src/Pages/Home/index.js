import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Empty from '../Empty';
import Product from '../../Components/Elements/Product';
import Modal, { modalToogle } from '../../Components/Elements/Modal';
import { compareValues } from '../../Utils/Api/index';
import { fetchBook, fetchBookFilter } from '../../Redux/Actions/book';

// icons
import SearchIcon from '@material-ui/icons/Search';

// assets
import './home.scss';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            dataStatus: 'all',
            dataBookSort: ''
        }
    }

    handleSearch = (e) => {
        e.preventDefault();
        const search = document.querySelector("#form__search>input").value;

        if (search) this.props.history.push(`/book?search=${search}`);
    }

    handleGenreBook = (e, status) => {
        this.setState({ dataStatus: status});
        document.querySelector('#genre__list .active').classList.remove('active');
        e.target.classList.add('active');
    }

    sortTools = (e, key) => {
        let data = this.props.book.book[this.state.dataStatus];
        let newData = '';
        let activeEl = document.querySelector("#sort__tools>.active");
        if (activeEl) activeEl.classList.remove("active");
        e.target.classList.add("active");
        if (data) {
            newData = data.sort(compareValues(key, 'desc'));
        }
        this.setState({dataBookSort: newData});
        modalToogle("sort__tools");
    }

    componentDidMount() {
        if (!this.props.book.book) this.props.fetchBook();
        this.props.fetchBookFilter([null, 'rating', 'DESC', 3]);
    }

    render() {
        const dataBook = this.props.book.book;
        const dataBookSort = this.state.dataBookSort;
        const dataGenre = this.props.book.genre;
        const favoriteBook = this.props.book.bookFilter;
        return (
            <>
                {/* HEADER */}
                <div className="home__header bg__setup">
                    <h1 className="fw__thin">Find <b className="fw__medium">perfect</b> book for <b className="fw__medium">today</b></h1>
                    <form id="form__search" onSubmit={this.handleSearch}>
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
                        favoriteBook.map((data, index) => {
                            return (
                                <div className="product" key={index}>
                                    <img src={`http://localhost:3000/images/${data.image}`} alt="" />
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
                            <div className="active" onClick={(e) => this.handleGenreBook(e, 'all')}>All</div>
                            {dataGenre ?
                                dataGenre.map((data, index) => {
                                    return (<div key={index} onClick={(e) => this.handleGenreBook(e, data.id)}>{data.name}</div>)
                                }) : <></>
                            }
                        </div>
                        <div className="bt bt__default c__pointer" onClick={() => modalToogle("filter__tools")}>Filters</div>
                    </div>

                    {/* SORT & FILTER COLLAPSE */}
                    <Modal id="sort__tools">
                        <h6 onClick={(e) => this.sortTools(e, 'title')}>Title</h6>
                        <h6 onClick={(e) => this.sortTools(e, 'rating')}>Rating</h6>
                    </Modal>

                    <Modal id="filter__tools">
                        <h6 className="active">All</h6>
                        <h6>New</h6>
                        <h6>Popular</h6>
                    </Modal>

                    {/* LIST of ALL BOOK */}
                    <div className="product__list">
                        {
                            dataBookSort ?
                            dataBookSort.map((data, index) => {
                                return <Product data={data} key={index} />
                            })
                            :
                            dataBook ?
                                dataBook[this.state.dataStatus].length ?
                                dataBook[this.state.dataStatus].map((data, index) => {
                                    return <Product data={data} key={index} />
                                }) : <Empty message="Cant find data" /> : <Empty message="Cant find data" />
                        }
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    book: state.book
});

const mapDispathToProps = { fetchBook, fetchBookFilter };

export default connect(mapStateToProps, mapDispathToProps)(Home);