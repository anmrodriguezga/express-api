const request = require('request');

function createRemoteDB(host, port) {
    const URL = `http://${host}:${port}`;

    function list(tabla) {
        return req('GET', tabla)
    }
    function get(tabla, id) {}
    function upsert(tabla, data) {}
    function remove(tabla, id) {}
    function query(tabla, query) {}
    function query(tabla, query, join) {}

    function req(method, tabla, data) {
        let url = `${URL}/${tabla}`;
        body = '';

        return new Promise((resolve, reject) => {
            request({
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                url,
                body
            }, (error, response, body) => {
                if (error) {
                    console.error(`Error in request to ${url}: `, error);
                    return reject(error.message);
                }
                if (response.statusCode >= 400) {
                    return reject(new Error(`HTTP ${response.statusCode}: ${body}`));
                }
                const resp = JSON.parse(body);
                resolve(resp.body);
            });
        });
    }

    return {
        list,
        get,
        upsert,
        remove,
        query,
        query
    };
}

module.exports = createRemoteDB;