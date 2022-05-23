import React, { Component, useEffect, useState } from 'react';
import FetchReq from '../../lib/FetchReq';

const Home = () => {
    const [HTML, setHTML] = useState('');

    const testApi = async () => {
        const params = {
            tasks: 'all',
            done: 'true',
        };

        let token = document.head.querySelector(
            'meta[name="csrf-token"]'
        ).content;

        console.log(token);

        const res = await new FetchReq('/article/new', token, 'text/html')
            .make()
            .get();

        setHTML(res);
    };

    useEffect(() => {
        testApi().then(() => console.log(HTML));
    }, []);

    return (
        <section className={`list`}>
            <ul>
                <li>list</li>
            </ul>
        </section>
    );
};

export default Home;
