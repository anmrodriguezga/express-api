const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const controller = require('./index');

const router = express.Router();

// Routes
router.get('/', list);
router.get('/:id', get);
router.get('/:id/following', following)
router.post('/', upsert);
router.post('/follow/:id', secure('follow'), follow);
router.put('/', secure('update'), upsert);
router.delete('/:id', remove);

function list(req, res, next) {
    controller.list()
        .then((lista) => {
            response.success(req, res, lista, 200);
        })
        .catch(next);
}

function get(req, res, next) {
    controller.get(req.params.id)
        .then((user) => {
            if (!user) {
                return response.error(req, res, 'User not found', 404);
            }
            response.success(req, res, user, 200);
        })
        .catch(next);
}

function upsert(req, res, next) {
    controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 201);
        })
        .catch(next);
}

function remove(req, res, next) {
    controller.remove(req.params.id)
        .then(() => {
            response.success(req, res, `User ${req.params.id} deleted`, 200);
        })
        .catch(next);
}

function follow(req, res, next) {
    controller.follow(req.user.id, req.params.id)
        .then((data) => {
            response.success(req, res, data, 201);
        })
        .catch(next);
}

function following(req, res, next) {
    controller.following(req.params.id)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(next);
}

module.exports = router;