import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Table } from '../../Components';
import { setLoading, fetchBook, fetchAuthor } from '../../Redux/Actions/book';
import { loading } from '../../Assets/images';

// assets
import bg from '../../Assets/images/database';
import './database.scss';

const Database = props => {
    let data;
    const book = props.book.book;
    const author = props.book.author;
    const genre = props.book.genre;
    const user = props.auth.isLogin;

    const [type, setType] = useState('book');

    type === 'book' ? data = book['all'] : type === 'author' ? data = author : data = genre;

    useEffect(() => {
        if (!book) {
            props.setLoading(true);
            props.fetchBook()
        }
        if (!author) {
            props.setLoading(true);
            props.fetchAuthor();
        }
    }, [book, author])

    return (
        <div className="database">
            <div className="database__header">
                <h4 className="leelawade">Welcome back, {user.fullname}!</h4>
                <div>
                    <a href="#database__content" className="bg__setup" style={{ backgroundImage: `url(${bg.bg_blue})` }} onClick={(() => setType('book'))}>
                        <h5 className="fw__medium">Book</h5>
                        <h6 className="fw__thin">Control book's datas</h6>
                    </a>
                    <a href="#database__content" className="bg__setup" style={{ backgroundImage: `url(${bg.bg_cyan})` }} onClick={(() => setType('author'))}>
                        <h5 className="fw__medium">Author</h5>
                        <h6 className="fw__thin">Control author's datas</h6>
                    </a>
                    <a href="#database__content" className="bg__setup" style={{ backgroundImage: `url(${bg.bg_orange})` }} onClick={(() => setType('genre'))}>
                        <h5 className="fw__medium">Genre</h5>
                        <h6 className="fw__thin">Control genre's datas</h6>
                    </a>
                </div>
            </div>
            {data ?
                <Table data={data} type={type} author={author} genre={genre} />
                :
                <div className='loading'>
                    <img src={loading} alt='loading' />
                    <h4>Loading . . .</h4>
                </div>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    book: state.book
});

const mapDispathToProps = { setLoading, fetchBook, fetchAuthor };

export default connect(mapStateToProps, mapDispathToProps)(Database);