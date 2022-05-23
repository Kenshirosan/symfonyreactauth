import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserContext } from './providers/user';
import Home from './components/Home';
import LoginForm from './components/auth/LoginForm';
import Header from './components/layouts/Header';
import NotFound from './components/layouts/NotFound';
import RegisterForm from './components/auth/RegisterForm';
import FetchReq from '../lib/FetchReq';

const App = () => {
    const [isLoggedIn, setIsLoggeIn] = useState(false);
    const [, dispatch] = useContext(UserContext);

    useEffect(async () => {
        const idToken = localStorage.getItem('token');
        if (idToken) {
            const user = await new FetchReq('/login', idToken).make().get();

            if (user && user instanceof Object) {
                setIsLoggeIn(true);
                dispatch({ type: 'CHECK_AUTH', payload: user });
            }
        }
    }, [isLoggedIn]);

    return (
        <Fragment>
            <Header />
            <main className='app container mt-5'>
                <Routes>
                    <Route path={`/`} exact element={Home} />
                    <Route path={'/login'} exact element={LoginForm} />
                    <Route path={'/register'} exact element={RegisterForm} />
                    <Route element={NotFound} />
                </Routes>
            </main>
        </Fragment>
    );
};

export default App;
