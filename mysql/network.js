const express = require('express');

const response = require('../network/response');
const store = require('../store/mysql');

const router = express.Router();

router.get('/:tabla', list);
router.get('/:tabla/:id', get);
router.post('/:tabla', insert);
router.put('/:tabla', upsert);

async function list(req, res, next) {
    try {
        const data = await store.list(req.params.tabla);
        response.success(req, res, data, 200);
    } catch (error) {
        next(error);
    }
}

async function get(req, res, next) {
    try {
        const data = await store.get(req.params.tabla, req.params.id);
        if (!data) {
            return response.error(req, res, 'Not found', 404);
        }
        response.success(req, res, data, 200);
    } catch (error) {
        next(error);
    }
}

async function insert(req, res, next) {
    try {
        const data = await store.insert(req.params.tabla, req.body);
        response.success(req, res, data, 201);
    } catch (error) {
        next(error);
    }
}

async function upsert(req, res, next) {
    try {
        const data = await store.upsert(req.params.tabla, req.body);
        response.success(req, res, data, 200);
    } catch (error) {
        next(error);
    }
}

module.exports = router;