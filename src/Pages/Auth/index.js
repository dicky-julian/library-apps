import React, { useState } from 'react';
import { connect } from 'react-redux';
import { fetchLogin } from '../../Utils/Api/index';
import { setToken } from '../../Redux/Actions/auth';
import { showModal, register } from './action';

const Auth = props => {
    const [role, setRole] = useState(true);

    const signIn = async (e) => {
        e.preventDefault();
        const uname = document.querySelectorAll('#form__login>input')[0].value;
        const pass = document.querySelectorAll('#form__login>input')[1].value;
        if (!uname || !pass) return ("error");

        await fetchLogin(uname, pass)
            .then(res => {
                if (res) {
                    props.setToken(res.token);
                    showModal("Success Login");
                } else {
                    showModal("Invalid Username or Password");
                }
            })
    }

    return (
        <div className="auth">
            <div className="arrow__helper"></div>
            {role ?
                <form id="form__login" onSubmit={signIn}>
                    <label>Username</label>
                    <input type="text" required />
                    <label>Password</label>
                    <input type="password" required autoComplete="true" />
                    <button type="submit" className="c__pointer">Login</button>
                    <p>Don't have an account? <b className="c__pointer" onClick={() => setRole(false)}>Register</b></p>
                </form>
                :
                <form id="form__signup" onSubmit={register}>
                    <label>Fullname</label>
                    <input type="text" required />
                    <label>Username</label>
                    <input type="text" required />
                    <label>Password</label>
                    <input type="password" required autoComplete="true" />
                    <button type="submit" className="c__pointer">Register</button>
                    <p>Already have an account? <b className="c__pointer" onClick={() => setRole(true)}>Login</b></p>
                </form>
            }
        </div>
    )
}

const mapDispathToProps = { setToken };

export default connect(null, mapDispathToProps)(Auth);