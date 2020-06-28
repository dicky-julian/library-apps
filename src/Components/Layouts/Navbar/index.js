import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import Modal, { modalToogle } from '../../Elements/Modal';
import Auth from '../../../Pages/Auth';
import { MenuIcon } from '../../Elements/Icons';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdmin: true,
            isLogin: false
        }
    }

    setActiveNav = () => {
        const location = this.props.location.pathname;
        const active = document.querySelector(".nav__link .active");
        const element = document.getElementsByClassName(location)[0];
        if (active) active.classList.remove("active");
        if (element) element.classList.add("active");
    }

    toogleNav = () => {
        const el = document.querySelector(".nav__link");
        const status = el.style.display;

        if (status) {
            status === "flex" ?
                el.style.display = "none"
                :
                el.style.display = "flex"
        } else {
            el.style.display = "flex";
        }
    }

    componentDidMount() {
        document.querySelectorAll(".nav__link > a").forEach(item => {
            item.addEventListener("click", (() => {
                this.setActiveNav();
            }))
        })
        this.setActiveNav();
    }

    render() {
        const isAdmin = this.state.isAdmin;
        const isLogin = this.state.isLogin;
        return (
            <div id="nav">
                <div className="nav__title"><b>Librarian</b></div>
                <div className="nav__link">
                    <div className="arrow__helper"></div>
                    <Link to="/" className="/" onClick={this.setActiveNav()}>Home</Link>
                    {isAdmin ?
                        <Link to="/database" className="/database">Database</Link>
                        :
                        <Link to="/my-book" className="/my-book">My Book</Link>
                    }
                    {isLogin ?
                        <></>
                        :
                        <>
                            <div className="auth__toogle" onClick={() => modalToogle("auth__modal")}>Login</div>
                            <Modal id="auth__modal">
                                <Auth />
                            </Modal>
                        </>
                    }
                </div>
                {isLogin ?
                    <div>
                        <div className="profile__toogle bg__setup c__pointer" onClick={() => modalToogle("user__modal")} style={{ backgroundImage: "url('https://lastfm-img2.akamaized.net/i/u/avatar170s/644df4fa78ad0090e7ce60fa11665cfa')" }}></div>
                        <Modal id="user__modal">
                            <div className="arrow__helper"></div>
                            <a href="/" className="ft__up">Profile</a>
                            <h6 className="c__pointer ft__up fw__thin">Logout</h6>
                        </Modal>
                        <div id="toogle_nav" onClick={() => this.toogleNav()} ><MenuIcon /></div>
                    </div>
                    :
                    <div style={{display: "none"}}>
                        <div id="toogle_nav" onClick={() => this.toogleNav()} ><MenuIcon /></div>
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(Navbar);