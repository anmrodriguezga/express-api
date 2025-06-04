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

module.exports = {
    list,
}