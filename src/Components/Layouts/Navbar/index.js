import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        return (
            <div id="nav">
                <div className="nav__title">Librarian</div>
                <div className="nav__link">
                    <a href="/" className="active">Home</a>
                    <a href="/database">Upload</a>
                    <a href="/database">Database</a>
                </div>
                <div className="nav__tool">
                    {/* <div></div> */}
                    <a href="/">Login</a>
                </div>
            </div>
        )
    }
}

export default Navbar;