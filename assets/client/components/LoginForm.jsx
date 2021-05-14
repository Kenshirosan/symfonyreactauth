import React, { useState } from 'react';
import FetchReq from '../../lib/FetchReq';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const changeEmail = e => {
        setEmail(e.target.value);
    };

    const changePassword = e => {
        setPassword(e.target.value);
    };

    const submitForm = async e => {
        e.preventDefault();

        let token = document.head.querySelector('meta[name="csrf-token"]')
            .content;

        const data = {
            email,
            password,
            _csrf_token: token,
        };

        const res = await new FetchReq('http://localhost:8000/login')
            .make()
            .post(data);

        console.log(res);
    };

    return (
        <div className="container mt-5">
            <form method="post" onSubmit={submitForm}>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputEmail">Email</label>
                <input
                    type="email"
                    value={email}
                    name="email"
                    id="inputEmail"
                    className="form-control"
                    autoComplete="email"
                    onChange={changeEmail}
                    required
                    autoFocus
                />
                <label htmlFor="inputPassword">Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    id="inputPassword"
                    onChange={changePassword}
                    className="form-control"
                    autoComplete="current-password"
                    required
                />

                {/*<div className="checkbox mb-3">*/}
                {/*    <label>*/}
                {/*        <input type="checkbox" name="_remember_me" /> Remember*/}
                {/*        me*/}
                {/*    </label>*/}
                {/*</div>*/}

                <button className="btn btn-lg btn-primary" type="submit">
                    Sign in
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
