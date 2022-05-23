import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../providers/user';
import FetchReq from '../../../lib/FetchReq';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userState, dispatch] = useContext(UserContext);
    const history = useHistory();

    const changeEmail = e => {
        setEmail(e.target.value);
    };

    const changePassword = e => {
        setPassword(e.target.value);
    };

    useEffect(() => {
        if (userState.isLoggedIn) {
            history.push('/');
        }
    }, [userState.isLoggedIn]);

    const submitForm = async e => {
        e.preventDefault();

        let token = document.head.querySelector(
            'meta[name="csrf-token"]'
        ).content;

        const data = {
            email,
            password,
            _csrf_token: token,
        };

        try {
            const user = await new FetchReq('/login').make().post(data);

            if (user instanceof Object) {
                await dispatch({ type: 'LOAD_USER', payload: user });

                return history.push('/');
            }
        } catch (e) {
            console.log(e.message);
            console.log(e);
            alert('No users found');
        }
    };

    return (
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
                placeholder={`email`}
            />
            <label htmlFor="inputPassword">Password</label>
            <input
                type="password"
                name="password"
                value={password}
                id="inputPassword"
                onChange={changePassword}
                className="form-control"
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
    );
};

export default LoginForm;
