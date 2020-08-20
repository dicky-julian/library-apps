import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Empty from '../Empty';
import Product from '../../Components/Elements/Product';
import { popModalToogle, hidePopModal } from '../../Components/Elements/Modal';
import { borrow } from '../../Utils/Api/index';
import { setSingleBook, setLoading, fetchBookFilter, fetchSingleBook } from '../../Redux/Actions/book';
import { setBookBorrow } from '../../Redux/Actions/transaction';
import { baseUrl } from '../../Utils/service';
import { loading } from '../../Assets/images';

// assets
import './book.scss';

const Book = props => {
    const [id, setId] = useState(props.match.params.id);

    const isLogin = props.auth.isLogin;
    const favoriteBook = props.book.bookFilter;
    const data = props.book.bookSingle;
    const book = data.book;
    const author = data.author;
    const genre = data.genre;

    const showModal = msg => {
        let el = <>
            <h4 className="txt__center">{msg}</h4>
            <button className="bt fw__medium ft__cp" style={{ margin: '0 auto', display: 'flex' }} onClick={() => hidePopModal()}>OK</button>
        </>
        popModalToogle(el);
    }

    const fetchBorrow = (e) => {
        borrow(isLogin.id, id)
            .then(res => {
                if (res.data) {
                    showModal("Successfully borrowed");
                    book.status = 2;
                    props.setBookBorrow(book);
                    props.setSingleBook(book, author, genre);
                }
            })
    }

    useEffect(() => {
        props.setLoading(true);
        window.scrollTo(0, 0);
        props.fetchSingleBook(id);

        if (!favoriteBook) props.fetchBookFilter([null, 'rating', 'DESC', 4]);
    }, [id])

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
                                    <button className="bt fw__medium" onClick={(e) => fetchBorrow(e)}>borrow</button>
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
                                    return <Product data={data} key={index} click={() => setId(data.id)} />
                                })
                                :
                                <Empty message={`Cant find book's data with id ${props.match.params.id}`} />
                        }
                    </div>
                </div>
            </div>
            :
            <div className='loading'>
                <img src={loading} alt='loading' />
            </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    book: state.book
});

const mapDispathToProps = { setBookBorrow, setSingleBook, setLoading, fetchBookFilter, fetchSingleBook };

export default connect(mapStateToProps, mapDispathToProps)(Book);