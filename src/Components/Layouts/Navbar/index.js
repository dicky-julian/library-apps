import React, { useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
// Pages
import Auth from '../../../Pages/Auth';
// Components
import Modal, { PopModal, modalToogle } from '../../Elements/Modal';
import { ExitToAppIcon, MenuIcon } from '../../Elements/Icons';
// Utility
import { toogleNav, toogleClickNav, setActiveNav } from './action';
import { revokeToken } from '../../../Redux/Actions/auth';

const Navbar = props => {
    const isLogin = props.auth.isLogin;
    const isAdmin = props.auth.isAdmin;
    const isLogout = props.auth.isLogout;
    const isLoading = props.config.isLoading;
    const location = props.location.pathname;

    useEffect(() => {
        if (isLogout) props.revokeToken(false);
        toogleClickNav(location);
        setActiveNav(location);
    })

    useEffect(() => {
        if (!isLogin) props.history.push('/');
    }, [isLogin])

    useEffect(() => {
        const el = document.querySelector("#loading");
        if (el) {
            if (isLoading) {
                el.classList.remove('none');
            } else {
                el.classList.add('none');
            }
        }
    }, [isLoading]);

    return (
        <div id="nav">
            <div className="nav__title"><b>Librarian</b></div>
            <div className="nav__link hide">
                <div className="arrow__helper"></div>
                <Link to="/" className="/" onClick={() => setActiveNav(location)}>Home</Link>
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
                    <div className="profile__toogle bg__setup c__pointer" onClick={() => modalToogle("user__modal")} style={{ backgroundImage: "url('https://pbs.twimg.com/profile_images/3133297750/c816dc4d902eb167de5f83e8e6c300f7.png')" }}></div>
                    <Modal id="user__modal">
                        <div className="arrow__helper"></div>
                        <div>
                            <img src="https://pbs.twimg.com/profile_images/3133297750/c816dc4d902eb167de5f83e8e6c300f7.png" alt="" />
                            <h6>{isLogin.fullname}</h6>
                            <p>{isLogin.role}</p>
                        </div>
                        <div onClick={() => props.revokeToken(true)}><ExitToAppIcon /> Logout</div>
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

const mapStateToProps = state => ({
    auth: state.auth,
    config: state.config
});

const mapDispathToProps = { revokeToken };

export default withRouter(connect(mapStateToProps, mapDispathToProps)(Navbar))