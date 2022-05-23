import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './providers/user';
import App from './App';

let root = createRoot(document.getElementById('root'));
root.render(
    <Router>
        <UserProvider>
            <App />
        </UserProvider>
    </Router>
);
