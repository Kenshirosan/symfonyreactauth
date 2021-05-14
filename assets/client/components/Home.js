import React, { Component, useState } from 'react';
import FetchReq from '../../lib/FetchReq';

const Home = () => {
    const [HTML, setHTML] = useState('');

    const testApi = async () => {
        const params = {
            tasks: 'all',
            done: 'true',
        };

        const res = await new FetchReq(
            'http://localhost:8000/article/new',
            params,
            null,
            'text/html'
        )
            .make()
            .get();

        console.log(res);
        setHTML(res);
    };

    return (
        <div>
            <p>Testing React in Symfony</p>

            <button onClick={testApi}>Test API</button>
            {`${HTML}`}
        </div>
    );
};

export default Home;
