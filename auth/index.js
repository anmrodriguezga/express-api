const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

const secret = config.jwt.secret;

function sign(data) {
    return jwt.sign(data, secret);
}

function verifyToken(token) {
    return jwt.verify(token, secret);
}

const check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req);
        console.log("Decodificado: ", decoded);

        if (decoded.id !== owner) {
            throw error('No tienes permiso para hacer esto', 401);
        }
    },
}

function getToken(authorization) {
    if (!authorization) {
        throw error('No viene token', 401);
    }
    
    if (authorization.indexOf('Bearer ') === -1) {
        throw error('Formato invalido', 401);
    }
    
    let token = authorization.replace('Bearer ', '');

    return token;
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verifyToken(token);
    req.user = decoded;
    return decoded;
}

module.exports = {
    sign,
    check
};