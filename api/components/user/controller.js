const store = require('../../../store/dummy');

const TABLA = 'product';

function list() {
    return store.list(TABLA);
}

module.exports = {
    list
};