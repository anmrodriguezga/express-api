const express = require('express');

const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

router.post('/login', (req, res) => {
    controller.login(req.body.username, req.body.password)
        .then((token) => {
            response.success(req, res, token, 200);
        })
        .catch((e) => {
            response.error(req, res, 'Información inválida: ' + e, 401);
        })
});

module.exports = router;