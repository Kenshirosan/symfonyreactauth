class FetchReq {
    /**
     *
     * @param url
     * @param token
     * @param headers
     * @returns {FetchReq}
     */
    constructor(url, token = null, headers = null) {
        this.url = url;
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
            this.req.headers.set('Authorization', `Bearer token`);
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

            return this.response(res);
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

            return this.response(res);
        } catch (e) {
            console.error(e.message);
        }
    }

    errors(status) {
        throw Error(`${status} Something went wrong with this request`);
    }

    async response(res) {
        if (res.ok) {
            if (res.headers.get('Content-Type') === 'application/json') {
                return await res.json();
            }

            return await res.text();
        }
        this.errors(res.status);
    }
}

export default FetchReq;
