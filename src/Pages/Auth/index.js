import React, { Component } from 'react';

class Auth extends Component {
    constructor() {
        super();
        this.state = {
            role: true
        }
    }

    render() {
        return (
            <div className="auth">
                <div className="arrow__helper"></div>
                {this.state.role ?
                    <form id="form__login">
                        <label>Username</label>
                        <input type="text" />
                        <label>Password</label>
                        <input type="password" />
                        <button className="c__pointer">Login</button>
                        <p>Don't have an account? <b className="c__pointer" onClick={() => this.setState({ role: false })}>Register</b></p>
                    </form>
                    :
                    <form id="form__signup">
                        <label>Fullname</label>
                        <input type="text" />
                        <label>Username</label>
                        <input type="text" />
                        <label>Password</label>
                        <input type="password" />
                        <button className="c__pointer">Register</button>
                        <p>Already have an account? <b className="c__pointer" onClick={() => this.setState({ role: true })}>Login</b></p>
                    </form>
                }
            </div>
        )
    }
}

export default Auth;