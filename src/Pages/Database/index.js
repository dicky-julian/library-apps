import React, { Component } from 'react';
import Table from '../../Components/Elements/Table';

// assets
import bg from '../../Assets/images/database';
import data from '../../dummy.json';
import './database.scss';

class Database extends Component {
    constructor() {
        super();
        this.state = {
            data: data,
            contentType: "book"
        }
    }

    changeContent = (type) => {
        this.setState({contentType: type});
    }

    render() {
        return (
            <div className="database">
                <div className="database__header">
                    <h4 className="leelawade">Welcome back, Dicky Julian!</h4>
                    <div>
                        <a href="#database__content" className="bg__setup" style={{ backgroundImage: `url(${bg.bg_purple})`}} onClick={(() => this.changeContent("user"))}>
                            <h5 className="fw__medium">Users</h5>
                            <h6 className="fw__thin">Control user's datas</h6>
                        </a>
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
                <Table data={this.state.data} type={this.state.contentType} />
            </div>
        )
    }
}

export default Database;