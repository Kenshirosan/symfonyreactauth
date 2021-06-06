import React, { createContext, useReducer } from 'react';

const initialState = {
    user: {},
    token: '',
    isLoggedIn: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_USER': {
            const user = action.payload;
            localStorage.setItem('token', user.apiToken);
            return {
                ...state,
                user,
                token: user.apiToken,
                isLoggedIn: true,
            };
        }

        case 'CHECK_AUTH': {
            const user = action.payload;
            return {
                ...state,
                user,
                isLoggedIn: true,
            };
        }

        case 'LOGOUT': {
            localStorage.removeItem('token');
            return {
                ...state,
                user: {},
                token: '',
                isLoggedIn: false,
            };
        }
        default:
            return state;
    }
};

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const value = useReducer(reducer, initialState);

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
