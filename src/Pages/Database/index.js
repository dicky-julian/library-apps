import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../../Components/Elements/Table';
import { fetchBook, fetchAuthor } from '../../Redux/Actions/book';

// assets
import bg from '../../Assets/images/database';
import './database.scss';

class Database extends Component {
    constructor() {
        super();
        this.state = {
            contentType: "book"
        }
    }

    changeContent = (type) => {
        this.setState({ contentType: type });
    }

    componentDidMount() {
        if (!this.props.book.book) this.props.fetchBook();
        if (!this.props.book.author) this.props.fetchAuthor();
    }

    render() {
        let data = '';

        const book = this.props.book.book['all'];
        const author = this.props.book.author;
        const genre = this.props.book.genre;
        const type = this.state.contentType;
        type === "book" ? data = book : type === "author" ? data = author : data = genre;

        return (
            <div className="database">
                <div className="database__header">
                    <h4 className="leelawade">Welcome back, {this.props.auth.isLogin.fullname}!</h4>
                    <div>
                        <a href="#database__content" className="bg__setup" style={{ backgroundImage: `url(${bg.bg_blue})` }} onClick={(() => this.changeContent("book"))}>
                            <h5 className="fw__medium">Book</h5>
                            <h6 className="fw__thin">Control book's datas</h6>
                        </a>
                        <a href="#database__content" className="bg__setup" style={{ backgroundImage: `url(${bg.bg_cyan})` }} onClick={(() => this.changeContent("author"))}>
                            <h5 className="fw__medium">Author</h5>
                            <h6 className="fw__thin">Control author's datas</h6>
                        </a>
                        <a href="#database__content" className="bg__setup" style={{ backgroundImage: `url(${bg.bg_orange})` }} onClick={(() => this.changeContent("genre"))}>
                            <h5 className="fw__medium">Genre</h5>
                            <h6 className="fw__thin">Control genre's datas</h6>
                        </a>
                    </div>
                </div>
                {data ? <Table data={data} type={type} author={author} genre={genre} /> : <div>Kosong</div>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    book: state.book
});

const mapDispathToProps = { fetchBook, fetchAuthor };

export default connect(mapStateToProps, mapDispathToProps)(Database);