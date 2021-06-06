class FetchReq {
    /**
     *
     * @param url
     * @param token
     * @param headers
     * @returns {FetchReq}
     */
    constructor(url, token = null, headers = null) {
        this.url = `http://localhost:8000${url}`;
        this.data = new FormData();
        this.token = token;
        this.headers = new Map([
            ['Content-Type', headers ?? 'application/json'],
        ]);

        return this;
    }

    /**
     * @param params
     * @returns {FetchReq}
     */
    make(params = null) {
        const url = new URL(this.url);

        if (params) {
            for (let key in params) {
                url.searchParams.set(key, params[key]);
            }
        }

        this.req = new Request(url);

        if (this.token) {
            this.req.headers.set('X-AUTH-TOKEN', `${this.token}`);
        }

        return this;
    }

    /**
     *
     * @returns {Promise<string|any>}
     */
    async get() {
        try {
            const res = await fetch(this.req);

            return await this.response(res);
        } catch (e) {
            console.error(e.message);
        }
    }

    /**
     *
     * @returns {Promise<any>}
     */
    async post(data) {
        for (let key in data) {
            this.data.append(key, data[key]);
        }

        try {
            const res = await fetch(this.req, {
                method: 'POST',
                body: this.data,
            });

            return await this.response(res);
        } catch (e) {
            console.error(e.message);
        }
    }

    /**
     *
     * @param res
     * @returns {Promise<*>}
     */
    async response(res) {
        if (res.ok) {
            if (res.headers.get('Content-Type') === 'application/json') {
                return await res.json();
            }

            return await res.text();
        }

        throw Error(`${res.status} Something went wrong with this request`);
    }
}

export default FetchReq;
