import React, { Component } from 'react';
import Empty from '../Empty';
import Product from '../../Components/Elements/Product';
import { popModalToogle } from '../../Components/Elements/Modal';
import { getBook, getBookById, getAuthorById, getGenreById, borrow, useToken } from '../../Utils/Api/index';

// assets
import './book.scss';

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataBook: '',
            dataBookFavorite: '',
            dataAuthor: '',
            dataGenre: ''
        }
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.fetchBook(id);
        this.fetchFavoriteBook('rating', 'DESC', 4);
        window.scrollTo(0, 0);
    }

    componentDidUpdate(prevProps) {
        if (this.state.dataGenre.setId) this.fetchGenre(this.state.dataGenre.setId);
        if (this.state.dataAuthor.setId) this.fetchAuthor(this.state.dataAuthor.setId);
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.location.reload();
        }
    }

    showModal = (msg) => {
        let el = <>
            <h4 className="txt__center">{msg}</h4>
            <button className="bt fw__medium ft__cp" style={{margin: '0 auto', display: 'flex'}} onClick={() => window.location.reload()}>OK</button>
        </>
        popModalToogle(el);
    }

    fetchBorrow = () => {
        const userData = useToken();
        const id_user = userData.id;
        const id_book = this.state.dataBook.id;

        borrow(id_user, id_book)
            .then(res => {
                if (res.data) this.showModal("Successfully borrowed");
            })
            .catch(err => console.log(err))
    }

    fetchBook = (id) => {
        getBookById(id)
            .then(res => {
                this.setState({ dataBook: res.data[0] });
                this.setState({ dataGenre: { setId: res.data[0].id_genre } });
                this.setState({ dataAuthor: { setId: res.data[0].id_author } });
            })
            .catch(err => {
                console.log(err);
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

    fetchAuthor = (id) => {
        getAuthorById(id)
            .then(res => {
                this.setState({ dataAuthor: res.data[0] });
            })
            .catch(err => {
                console.log(err);
            })
    }

    fetchGenre = (id) => {
        getGenreById(id)
            .then(res => {
                this.setState({ dataGenre: res.data[0] });
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const data = this.state.dataBook;
        return (
            data ?
                <div className="book">
                    <div className="book__header">
                        <div className="bg__setup" style={{ backgroundImage: `url(http://localhost:3000/images/${data.image})` }}></div>
                    </div>
                    <div className="book__detail">
                        <div>
                            <div className="book__img bg__setup" style={{ backgroundImage: `url(http://localhost:3000/images/${data.image})` }}></div>
                            <div className="detail__list">
                                <div>
                                    <h6 className="fw__bold">Author</h6>
                                    <h6>{this.state.dataAuthor.name}</h6>
                                </div>
                                <div>
                                    <h6 className="fw__bold">Genre</h6>
                                    <h6>{this.state.dataGenre.name}</h6>
                                </div>
                                <div>
                                    <h6 className="fw__bold">Release</h6>
                                    <h6>{data.release_date}</h6>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className="detail__info">
                                    <div>
                                        <h3>{data.rating}</h3>
                                        <h6>Ratings</h6>
                                    </div>
                                    <div>
                                        <h3>120</h3>
                                        <h6>Borrowed</h6>
                                    </div>
                                </div>
                                {data.status === 1 ?
                                    <button className="bt fw__medium" onClick={() => this.fetchBorrow()}>borrow</button>
                                    :
                                    <button className="bt fw__medium c__disable" disabled>Out of Stock</button>
                                }
                            </div>
                            <div>
                                <h3>{data.title}</h3>
                                <h6>{data.description}</h6>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="product__highlight">
                        <h5>Popular Books</h5>
                        <div className="product__list">
                            {
                                this.state.dataBookFavorite ?
                                    this.state.dataBookFavorite.map((data, index) => {
                                        return <Product data={data} key={index} />
                                    })
                                    :
                                    <Empty message={`Cant find book's data with id ${this.props.match.params.id}`} />
                            }
                        </div>
                    </div>
                </div>
                :
                <div className="empty__book">
                    <Empty message={`Cant find book's data with id ${this.props.match.params.id}`}/>
                </div>
        )
    }
}

export default Book;