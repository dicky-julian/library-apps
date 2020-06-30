import React, { Component } from 'react';
import ProductList from '../../Components/Elements/ProductList';
import Modal, { modalToogle } from '../../Components/Elements/Modal';
import dummy from '../../dummy.json';
import api from '../../Utils/fetch';
import axios from 'axios';

// icons
import SearchIcon from '@material-ui/icons/Search';

// style
import './home.scss';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            data: ''
        }
    }

    fetchBook = () => {
        api.getBook()
            .then(res => {
                console.log(res);
                this.setState({data: res.data});
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    componentDidMount() {
        // this.fetchBook();
        axios({
            method: 'GET',
            url: 'http://localhost:3000/author',
            headers: {
                Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1OTM1MTYxMDQsImV4cCI6MTU5MzU0NzEwNH0.l9a7xSaUToB-PHd-jkDZbuVW-SPfK_wfU1GBWJw7J1M'
            }
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err)
            console.log(err.response)
        })
    }

    render() {
        console.log(this.state.data);
        return (
            <>
                {/* HEADER */}
                <div className="home__header bg__setup">
                    <h1 className="fw__thin">Find <b className="fw__medium">perfect</b> book for <b className="fw__medium">today</b></h1>
                    <form>
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
                    <div className="product">
                        <img src="https://www.dramamilk.com/wp-content/uploads/2019/11/Hotel-del-luna-poster-best-drama-1.jpg" alt="" />
                        <div>
                            <h5><a href="cepu.com">Hotel del Luna</a></h5>
                            Hotel del Luna adalah serial televisi Korea Selatan yang dibintangi ...
                            <a href="/" className="fw__medium">Read more</a>
                        </div>
                    </div>
                    <div className="product">
                        <img src="http://www.jaehakim.com/wp-content/uploads/2555/04/DescendantsoftheSun-top.jpg" alt="" />
                        <div>
                            <h5><a href="/">Descendants of the Sun</a></h5>
                            Drama ini disiarkan di KBS2 mulai 24 Februari hingga 14 April 2016 ...
                            <a href="/" className="fw__medium">Read more</a>
                        </div>
                    </div>
                    <div className="product">
                        <img src="https://i.ytimg.com/vi/bF73VM91NPU/maxresdefault.jpg" alt="" />
                        <div>
                            <h5><a href="/">Pangako sa'yo</a></h5>
                            Pangako sa 'yo is a TV series starring Kristine Hermosa, Jericho ...
                            <a href="/" className="fw__medium">Read more</a>
                        </div>
                    </div>
                </div>

                <div className="home__body">
                    {/* GENRE of BOOK */}
                    <div className="product__tools">
                        <div className="bt bt__default c__pointer" onClick={() => modalToogle("sort__tools")}>
                            Sorts
                        </div>
                        <div className="genre__list">
                            <div className="active">All</div>
                            <div>Manga</div>
                            <div>Novel</div>
                            <div>Critism</div>
                            <div>History</div>
                            <div>Design</div>
                            <div>Sains</div>
                        </div>
                        <div className="bt bt__default c__pointer" onClick={() => modalToogle("filter__tools")}>Filters</div>
                    </div>

                    {/* SORT & FILTER COLLAPSE */}
                    <Modal id="sort__tools">
                        <h6>Title</h6>
                        <h6 className="active">Date Time</h6>
                    </Modal>

                    <Modal id="filter__tools">
                        <h6 className="active">All</h6>
                        <h6>New</h6>
                        <h6>Popular</h6>
                    </Modal>

                    {/* LIST of ALL BOOK */}
                    <ProductList data={dummy.book}/>
                </div>
            </>
        )
    }
}

export default Home;