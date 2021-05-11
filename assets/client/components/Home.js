import React, { Component } from 'react';
import FetchReq from '../../lib/FetchReq';

const Home = () => {
    const testApi = () => {
        const params = {
            tasks: 'all',
            else: 'tri',
        };

        // url, data = null, params = null, token = null, headers = null
        const res = new FetchReq(
            'http://localhost:8000/article',
            null,
            null,
            'token',
            'text/html'
        )
            .make()
            .get();

        console.log(res);
    };

    return (
        <div>
            <p>Testing React in Symfony</p>

            <button onClick={testApi}>Test API</button>
        </div>
    );
};

export default Home;
