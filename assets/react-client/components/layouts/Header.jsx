import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../providers/user';
const Header = () => {
    const [, dispatch] = useContext(UserContext);
    const navigate = useNavigate();

    const logout = (e) => {
        e.preventDefault();

        dispatch({ type: 'LOGOUT', payload: null });

        navigate('login');
    };
    return (
        <header>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
                <div className='container-fluid'>
                    <div className='collapse navbar-collapse'>
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                            <li className='nav-item'>
                                <a className='nav-link' href='/register'>
                                    Register
                                </a>
                            </li>
                            <li className='nav-item'>
                                <Link className='nav-link' to='/login'>
                                    Login
                                </Link>
                            </li>

                            <li className='nav-item'>
                                <Link
                                    onClick={logout}
                                    to='/logout'
                                    className='nav-link'>
                                    Logout
                                </Link>
                            </li>

                            <li className='nav-item'>
                                <a className='nav-link' href='/'>
                                    Homepage
                                </a>
                            </li>
                            <li className='nav-item'>
                                <a className='nav-link' href='/article'>
                                    Articles
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
