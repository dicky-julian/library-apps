import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
// Pages
import Auth from '../../../Pages/Auth';
// Components
import Modal, { PopModal, modalToogle } from '../../Elements/Modal';
import { ExitToAppIcon, MenuIcon } from '../../Elements/Icons';
// Utility
import { toogleNav, toogleClickNav, setActiveNav } from './action';
import { setToken, revokeToken } from '../../../Redux/Actions/auth';

class Navbar extends Component {
    componentDidMount() {
        if (this.props.auth.isLogout) this.props.revokeToken(false);
        const location = this.props.location.pathname;
        toogleClickNav(location);
        setActiveNav(location);

        document.querySelector("#loading").remove();
    }

    componentDidUpdate() {
        if (this.props.auth.isLogout) window.location.href = '/';
    }

    render() {
        const isLogin = this.props.auth.isLogin;
        const isAdmin = this.props.auth.isAdmin;
        const location = this.props.location.pathname;

        return (
            <div id="nav">
                <div className="nav__title"><b>Librarian</b></div>
                <div className="nav__link hide">
                    <div className="arrow__helper"></div>
                    <Link to="/" className="/" onClick={ setActiveNav(location) }>Home</Link>
                    {isLogin ? isAdmin ?
                        <Link to="/database" className="/database">Database</Link>
                        :
                        <Link to="/mybook" className="/mybook">My Book</Link>
                        :
                        <>
                            <div className="auth__toogle" onClick={() => modalToogle("auth__modal")}>Login</div>
                            <Modal id="auth__modal">
                                <Auth />
                            </Modal>
                        </>}
                </div>

                {isLogin ?
                    <div>
                        <div className="profile__toogle bg__setup c__pointer" onClick={() => modalToogle("user__modal")} style={{ backgroundImage: "url('https://lastfm-img2.akamaized.net/i/u/avatar170s/644df4fa78ad0090e7ce60fa11665cfa')" }}></div>
                        <Modal id="user__modal">
                            <div className="arrow__helper"></div>
                            <div>
                                <img src="https://lastfm-img2.akamaized.net/i/u/avatar170s/644df4fa78ad0090e7ce60fa11665cfa" alt="" />
                                <h6>{isLogin.fullname}</h6>
                                <p>{isLogin.role}</p>
                            </div>
                            <div onClick={() => { this.props.revokeToken(true) }}><ExitToAppIcon /> Logout</div>
                        </Modal>
                        <div id="toogle_nav" onClick={() => toogleNav()} ><MenuIcon /></div>
                    </div>
                    :
                    <div style={{ display: "none" }}>
                        <div id="toogle_nav" onClick={() => toogleNav()} ><MenuIcon /></div>
                    </div>
                }
                <PopModal />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispathToProps = { setToken, revokeToken };

export default withRouter(connect(mapStateToProps, mapDispathToProps)(Navbar))