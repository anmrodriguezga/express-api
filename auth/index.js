const jwt = require('jsonwebtoken');
const config = require('../config');

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
            throw new Error('No tienes permiso para realizar esta accion');
        }
    },
}

function getToken(authorization) {
    if (!authorization) {
        throw new Error('No viene token');
    }
    
    if (authorization.indexOf('Bearer ') === -1) {
        throw new Error('Formato invalido');
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