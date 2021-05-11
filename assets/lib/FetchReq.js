class FetchReq {
    /**
     *
     * @param url
     * @param data
     * @param params
     * @param token
     * @param headers
     * @returns {FetchReq}
     */
    constructor(url, data = null, params = null, token = null, headers = null) {
        this.url = url;
        this.data = data;
        this.params = params;
        this.token = token;
        this.headers = new Map([
            ['Content-Type', headers ?? 'application/json'],
        ]);

        return this;
    }

    /**
     *
     * @returns {FetchReq}
     */
    make() {
        const url = new URL(this.url);

        if (this.params) {
            for (let key in this.params) {
                url.searchParams.set(key, this.params[key]);
            }
        }

        this.req = new Request(url);

        this.req.headers.set('Content-Type', this.headers.get('Content-Type'));

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

            if (res.ok) {
                if (this.headers.get('Content-Type') === 'application/json') {
                    return await res.json();
                }

                return await res.text();
            }

            this.errors();
        } catch (e) {
            console.error(e.message);
        }
    }

    /**
     *
     * @returns {Promise<any>}
     */
    async post() {
        try {
            const res = await fetch(this.req, {
                method: 'POST',
                body: JSON.stringify(this.data),
            });
            if (res.ok) {
                return await res.json();
            }

            this.errors();
        } catch (e) {
            console.error(e.message);
        }
    }

    errors() {
        throw Error('Something went wrong with this request');
    }
}

export default FetchReq;
