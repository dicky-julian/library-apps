import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import Modal, { modalToogle } from '../../Elements/Modal';
import Auth from '../../../Pages/Auth';
import { ExitToAppIcon, MenuIcon } from '../../Elements/Icons';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdmin: false,
            isLogin: true
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
        const elHide = document.querySelector("#nav .hide");

        if (elHide) {
            el.classList.remove("hide");
        } else {
            el.classList.add("hide");
        }
    }

    componentDidMount() {
        document.querySelectorAll(".nav__link > a").forEach(item => {
            item.addEventListener("click", (() => {
                this.setActiveNav();
            }))
        })
        this.setActiveNav();

        document.querySelector("#loading").remove();
    }

    render() {
        const isAdmin = this.state.isAdmin;
        const isLogin = this.state.isLogin;
        return (
            <div id="nav">
                <div className="nav__title"><b>Librarian</b></div>
                <div className="nav__link hide">
                    <div className="arrow__helper"></div>
                    <Link to="/" className="/" onClick={this.setActiveNav()}>Home</Link>
                    {isAdmin ?
                        <Link to="/database" className="/database">Database</Link>
                        :
                        <Link to="/mybook" className="/mybook">My Book</Link>
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
                            <div>
                                <img src="https://lastfm-img2.akamaized.net/i/u/avatar170s/644df4fa78ad0090e7ce60fa11665cfa" alt=""/>
                                <h6>Lee Ji Eun</h6>
                                <p>Member</p>
                            </div>
                            <div>
                                <ExitToAppIcon /> Logout
                            </div>
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