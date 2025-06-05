const mysql = require('mysql2');

const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    port: config.mysql.port,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
};

let connection;

function handleConnect() {
    connection = mysql.createConnection(dbconfig);

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            setTimeout(handleConnect, 2000); // Retry after 2 seconds
        } else {
            console.log('Connected to MySQL');
        }
    });

    connection.on('error', (err) => {
        console.error('MySQL error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleConnect(); // Reconnect on connection lost
        } else {
            throw err; // Throw other errors
        }
    });
}

handleConnect();

function list(table) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table};`, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}

function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id = '${id}';`, (error, results) => {
            if (error) {
                return reject(error);
            }
            if (results.length === 0) {
                return resolve(null);
            }
            resolve(results[0]);
        });
    });
}

async function upsert(table, data) {
    let retrievedUser = data.id ? await get(table, data.id) : null;
    console.log('Retrieved user:', retrievedUser);
    return new Promise((resolve, reject) => {
        if (retrievedUser !== null) {
            console.log('Updating');
            connection.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, data.id], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        } else {
            console.log('Inserting');
            connection.query(`INSERT INTO ${table} SET ?`, data, (error, results) => {
                if (error) {
                    return reject(error);
                }
                console.log('Insert results:', results);
                resolve(results);
        });
    }});
}

function remove(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ${table} WHERE id = ?`, [id], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}

function query(table, query) {
    return new Promise((resolve, reject) => {
        const keys = Object.keys(query);
        if (keys.length === 0) {
            return resolve([]);
        }
        const key = keys[0];
        connection.query(`SELECT * FROM ${table} WHERE ${key} = ?`, [query[key]], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results[0]);
        });
    });
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query,
}