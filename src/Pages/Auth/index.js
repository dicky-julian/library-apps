import React, { Component } from 'react';
import { connect } from 'react-redux';
import { popModalToogle } from '../../Components/Elements/Modal';
import { fetchLogin, fetchRegister, grantToken } from '../../Utils/Api/index';
import { setToken } from '../../Redux/Actions/auth';

class Auth extends Component {
    constructor() {
        super();
        this.state = {
            role: true,
        }
    }

    showModal = (msg) => {
        let el = <>
            <h4 className="txt__center">{msg}</h4>
            <button className="bt fw__medium ft__cp" style={{margin: '0 auto', display: 'flex'}} onClick={() => window.location.reload()}>OK</button>
        </>
        popModalToogle(el);
    }

    signIn = async(e) => {
        e.preventDefault();
        const uname = document.querySelectorAll('#form__login>input')[0].value;
        const pass = document.querySelectorAll('#form__login>input')[1].value;
        if (!uname || !pass) return("error");
        
        await fetchLogin(uname, pass)
            .then(res => {
                if (res) {
                    console.log(res.token);
                    this.props.setToken(res.token);
                    grantToken(res.token);
                    this.showModal("Success Login");
                } else {
                    this.showModal("Invalid Username or Password");
                }
            })
    }

    register = async(e) => {
        e.preventDefault();
        const fullname = document.querySelectorAll('#form__signup>input')[0].value;
        const uname = document.querySelectorAll('#form__signup>input')[1].value;
        const pass = document.querySelectorAll('#form__signup>input')[2].value;

        if (!fullname || !uname || !pass) return("error")

        await fetchRegister(fullname, uname, pass)
            .then(() => {
                this.showModal("Successfull regsiter account, lets Login now.");
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div className="auth">
                <div className="arrow__helper"></div>
                {this.state.role ?
                    <form id="form__login" onSubmit={this.signIn}>
                        <label>Username</label>
                        <input type="text" required/>
                        <label>Password</label>
                        <input type="password" required autoComplete="true"/>
                        <button type="submit" className="c__pointer">Login</button>
                        <p>Don't have an account? <b className="c__pointer" onClick={() => this.setState({ role: false })}>Register</b></p>
                    </form>
                    :
                    <form id="form__signup" onSubmit={this.register}>
                        <label>Fullname</label>
                        <input type="text" required />
                        <label>Username</label>
                        <input type="text" required />
                        <label>Password</label>
                        <input type="password" required autoComplete="true" />
                        <button type="submit" className="c__pointer">Register</button>
                        <p>Already have an account? <b className="c__pointer" onClick={() => this.setState({ role: true })}>Login</b></p>
                    </form>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

const mapDispathToProps = { setToken };

export default connect(mapStateToProps, mapDispathToProps)(Auth);