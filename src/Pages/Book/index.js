import React, { Component } from 'react';
import { connect } from 'react-redux';
import Empty from '../Empty';
import Product from '../../Components/Elements/Product';
import { popModalToogle } from '../../Components/Elements/Modal';
import { borrow } from '../../Utils/Api/index';
import { fetchBookFilter, fetchSingleBook } from '../../Redux/Actions/book';
import { baseUrl } from '../../Utils/service';

// assets
import './book.scss';

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        const id = this.state.id;
        this.props.fetchSingleBook(id);
        this.props.fetchBookFilter([null, 'rating', 'DESC', 4]);
    }

    componentDidUpdate(prevProps) {
        const newId = this.props.match.params.id;
        if (newId !== prevProps.match.params.id) {
            this.props.fetchSingleBook(newId);
            window.scrollTo(0, 0);
        }
    }

    showModal = (msg) => {
        let el = <>
            <h4 className="txt__center">{msg}</h4>
            <button className="bt fw__medium ft__cp" style={{ margin: '0 auto', display: 'flex' }} onClick={() => window.location.reload()}>OK</button>
        </>
        popModalToogle(el);
    }

    fetchBorrow = () => {
        const userData = this.props.auth.isLogin;
        const id_user = userData.id;
        const id_book = this.state.id;

        borrow(id_user, id_book)
            .then(res => {
                if (res.data) this.showModal("Successfully borrowed");
            })
    }

    render() {
        const isLogin = this.props.auth.isLogin;
        const favoriteBook = this.props.book.bookFilter;
        const data = this.props.book.bookSingle;
        const book = data.book;
        const author = data.author;
        const genre = data.genre;

        return (
            data ?
                <div className="book">
                    <div className="book__header">
                        <div className="bg__setup" style={{ backgroundImage: `url(${baseUrl}/images/${book.image})` }}></div>
                    </div>
                    <div className="book__detail">
                        <div>
                            <div className="book__img bg__setup" style={{ backgroundImage: `url(${baseUrl}/images/${book.image})` }}></div>
                            <div className="detail__list">
                                <div>
                                    <h6 className="fw__bold">Author</h6>
                                    <h6>{author.name}</h6>
                                </div>
                                <div>
                                    <h6 className="fw__bold">Genre</h6>
                                    <h6>{genre.name}</h6>
                                </div>
                                <div>
                                    <h6 className="fw__bold">Release</h6>
                                    <h6>{book.release_date}</h6>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className="detail__info">
                                    <div>
                                        <h3>{book.rating}</h3>
                                        <h6>Ratings</h6>
                                    </div>
                                    <div>
                                        <h3>120</h3>
                                        <h6>Borrowed</h6>
                                    </div>
                                </div>
                                {!isLogin ? <></> :
                                    book.status === 1 ?
                                        <button className="bt fw__medium" onClick={() => this.fetchBorrow()}>borrow</button>
                                        :
                                        <button className="bt fw__medium c__disable" disabled>Out of Stock</button>
                                }
                            </div>
                            <div>
                                <h3>{book.title}</h3>
                                <h6>{book.description}</h6>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="product__highlight">
                        <h5>Popular Books</h5>
                        <div className="product__list">
                            {
                                favoriteBook ?
                                    favoriteBook.map((data, index) => {
                                        return <Product data={data} key={index} />
                                    }) : <Empty message={`Cant find book's data with id ${this.props.match.params.id}`} />
                            }
                        </div>
                    </div>
                </div>
                :
                <div className="empty__book">
                    <Empty message={`Cant find book's data with id ${this.props.match.params.id}`} />
                </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    book: state.book
});

const mapDispathToProps = { fetchBookFilter, fetchSingleBook };

export default connect(mapStateToProps, mapDispathToProps)(Book);