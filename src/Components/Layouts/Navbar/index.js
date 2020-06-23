import React, { Component } from 'react';
import Modal, { modalToogle } from '../../Elements/Modal';
import Auth from '../../../Pages/Auth';

class Navbar extends Component {
    constructor() {
        super();
        this.state = {
            isAdmin: true,
            isLogin: false
        }
    }
    render() {
        const isAdmin = this.state.isAdmin;
        const isLogin = this.state.isLogin;
        return (
            <div id="nav">
                <div className="nav__title"><b>Librarian</b></div>
                <div className="nav__link">
                    <a href="/" className="active">Home</a>
                    {isAdmin ?
                        <a href="/database">Database</a>
                        :
                        <a href="/my-book">My Book</a>
                    }
                </div>

                <div className="nav__tool">
                    {isLogin ?
                        <>
                            <div className="profile__toogle bg__setup c__pointer" onClick={() => modalToogle("user__modal")} style={{ backgroundImage: "url('https://lastfm-img2.akamaized.net/i/u/avatar170s/644df4fa78ad0090e7ce60fa11665cfa')" }}></div>
                            <Modal id="user__modal">
                                <div className="arrow__helper"></div>
                                <a href="/">Profile</a>
                                <h6 className="c__pointer ft__up fw__thin">Logout</h6>
                            </Modal>
                        </>
                        :
                        <>
                            <div className="auth__toogle" onClick={() => modalToogle("auth__modal")}>Login</div>
                            <Modal id="auth__modal">
                                <Auth />
                            </Modal>
                        </>
                    }
                </div>
            </div>
        )
    }
}

export default Navbar;