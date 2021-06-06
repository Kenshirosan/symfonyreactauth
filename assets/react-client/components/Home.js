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
            '/article/new',
            params,
            null,
            'text/html'
        )
            .make()
            .get();

        setHTML(res);
    };

    return (
        <section className={`list`}>
            <ul>
                <li>list</li>
            </ul>
        </section>
    );
};

export default Home;
