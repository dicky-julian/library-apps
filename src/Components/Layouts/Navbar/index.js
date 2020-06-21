import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        return (
            <div id="nav">
                <div className="nav__title">filmography</div>
                <div className="nav__link">
                    <a href="/" className="active">Home</a>
                    <a href="/">Upload</a>
                    <a href="/">Database</a>
                </div>
                <div className="nav__tool">
                    {/* <div></div> */}
                    <a href="/">Masuk</a>
                    {/* <a href="/">Register</a> */}
                </div>
            </div>
        )
    }
}

export default Navbar;