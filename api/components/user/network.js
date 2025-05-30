const express = require('express');

const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

router.get('/', function (req, res) {
    controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
})

router.get('/:id', function (req, res) {
    controller.get(req.params.id)
        .then((user) => {
            if (!user) {
                return response.error(req, res, 'User not found', 404);
            }
            response.success(req, res, user, 200);
        })
        .catch((err) => {
            response.error(req, res, err.message, 500);
        });
})

module.exports = router;