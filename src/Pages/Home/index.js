import React, { Component } from 'react';
import { Link }  from 'react-router-dom';
import Empty from '../Empty';
import Product from '../../Components/Elements/Product';
import Modal, { modalToogle } from '../../Components/Elements/Modal';
import { getBook, getGenre, compareValues } from '../../Utils/Api/index';

// icons
import SearchIcon from '@material-ui/icons/Search';

// assets
import './home.scss';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            dataBook: '',
            dataBookGenre: '',
            dataBookFavorite: '',
            dataGenre: '',
        }
    }

    fetchBook = () => {
        getBook()
            .then(res => {
                this.setState({ dataBook: res.data });
            })
            .catch(err => {
                console.log(err.response);
            })
    }

    fetchFavoriteBook = (order, orderType, limit) => {
        getBook(null, order, orderType, limit)
            .then(res => {
                this.setState({ dataBookFavorite: res.data })
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    fetchGenre = () => {
        getGenre()
            .then(res => {
                this.setState({ dataGenre: res.data })
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    handleSearch = (e) => {
        e.preventDefault();
        const search = document.querySelector("#form__search>input").value;

        if (search) this.props.history.push(`/book?search=${search}`);
    }

    handleGenreList = () => {
        const els = document.querySelectorAll(".genre__list > div");
        const activeEls = document.querySelector(".genre__list > .active");
        const data = this.state.dataBook;
        if (els.length > 1) {
            els.forEach((el) => {
                el.addEventListener("click", ((e) => {
                    const id = e.target.dataset.id;
                    if (activeEls) {
                        activeEls.classList.remove("active");
                        e.target.classList.add("active");
                    }
                    if (id && data) {
                        const newData = data.filter(el => el.id_genre === parseInt(id));
                        this.setState({dataBookGenre: newData});
                    }
                     else {
                        this.setState({dataBookGenre: ''});
                    }
                }))
            })
        }
    }

    sortTools = (e, key) => {
        const activeEl = document.querySelector("#sort__tools>.active");
        if (activeEl) activeEl.classList.remove("active");
        e.target.classList.add("active");
        modalToogle("sort__tools");
        let data = this.state.dataBook;
        let newData = '';
        if (data) {
            newData = this.state.dataBook.sort(compareValues(key, 'desc'));
        }
        this.setState({dataBookGenre: newData});
    }

    componentDidMount() {
        this.fetchGenre();
        this.fetchBook();
        this.fetchFavoriteBook('rating', 'DESC', 3);
    }

    componentDidUpdate() {
        this.handleGenreList();
    }

    render() {
        const ListBook = this.state.dataBookGenre || this.state.dataBook;
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
                    {this.state.dataBookFavorite ?
                        this.state.dataBookFavorite.map((data, index) => {
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
                        })
                        :
                        <></>
                    }
                </div>

                <div className="home__body">
                    {/* GENRE of BOOK */}
                    <div className="product__tools">
                        <div className="bt bt__default c__pointer" onClick={() => modalToogle("sort__tools")}>
                            Sorts
                        </div>
                        <div id="genre__list" className="genre__list">
                            <div className="active">All</div>
                            {this.state.dataGenre ?
                                this.state.dataGenre.map((data, index) => {
                                    return (<div key={index} data-id={data.id}>{data.name}</div>)
                                })
                                :
                                <></>
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
                        ListBook ?
                        ListBook.length ?
                        ListBook.map((data, index) => {
                            return <Product data={data} key={index} />
                        })
                        :
                        <Empty message="Cant find data" />
                        :
                        <Empty message="Cant find data" />
                    }
                    </div>
                </div>
            </>
        )
    }
}

export default Home;