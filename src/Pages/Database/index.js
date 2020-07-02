import React, { Component } from 'react';
import Table from '../../Components/Elements/Table';
import { getBook, getAuthor, getGenre, useToken } from '../../Utils/Api/index';

// assets
import bg from '../../Assets/images/database';
import data from '../../dummy.json';
import './database.scss';

class Database extends Component {
    constructor() {
        super();
        this.state = {
            data: data,
            dataUser: '',
            dataBook: '',
            dataAuthor: '',
            dataGenre: '',
            contentType: "book"
        }
    }

    fetchBook = () => {
        getBook()
            .then(res => {
                this.setState({ dataBook: res.data })
            })
            .catch(err => {
                console.log(err);
            })
    }

    fetchAuthor = () => {
        getAuthor()
            .then(res => {
                this.setState({dataAuthor: res.data })
            })
            .catch(err => {
                console.log(err);
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

    changeContent = (type) => {
        this.setState({contentType: type});
    }

    componentDidMount() {
        // setUser Data
        const data = useToken();
        if (data) {
            this.setState({dataUser: {
                fullname: data.fullname
            }});
        }
        this.fetchBook();
        this.fetchAuthor();
        this.fetchGenre();
    }

    render() {
        const type = this.state.contentType;
        let data = '';
        type === "book" ? data = this.state.dataBook : type === "author" ? data = this.state.dataAuthor : data = this.state.dataGenre;
        return (
            <div className="database">
                <div className="database__header">
                    <h4 className="leelawade">Welcome back, {this.state.dataUser.fullname}!</h4>
                    <div>
                        {/* <a href="#database__content" className="bg__setup" style={{ backgroundImage: `url(${bg.bg_purple})`}} onClick={(() => this.changeContent("user"))}>
                            <h5 className="fw__medium">Users</h5>
                            <h6 className="fw__thin">Control user's datas</h6>
                        </a> */}
                        <a href="#database__content" className="bg__setup" style={{ backgroundImage: `url(${bg.bg_blue})`}} onClick={(() => this.changeContent("book"))}>
                            <h5 className="fw__medium">Book</h5>
                            <h6 className="fw__thin">Control book's datas</h6>
                        </a>
                        <a href="#database__content" className="bg__setup" style={{ backgroundImage: `url(${bg.bg_cyan})`}} onClick={(() => this.changeContent("author"))}>
                            <h5 className="fw__medium">Author</h5>
                            <h6 className="fw__thin">Control author's datas</h6>
                        </a>
                        <a href="#database__content" className="bg__setup" style={{ backgroundImage: `url(${bg.bg_orange})`}} onClick={(() => this.changeContent("genre"))}>
                            <h5 className="fw__medium">Genre</h5>
                            <h6 className="fw__thin">Control genre's datas</h6>
                        </a>
                    </div>
                </div>
                {data ? <Table data={data} type={this.state.contentType} /> : <div>Kosong</div>}
            </div>
        )
    }
}

export default Database;