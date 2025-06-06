module.exports = {
    api: {
        port: process.env.API_PORT || 8080
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret!'
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        port: process.env.MYSQL_PORT || 3306,
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'root',
        database: process.env.MYSQL_DB || 'appdb'
    },
    mySqlService: {
        port: process.env.MYSQL_SERVICE_PORT || 3001
    },
}