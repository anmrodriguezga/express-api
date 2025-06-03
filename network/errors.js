const response = require('./response');

function errors(err, req, res, next) {
    console.error('[ERROR]', err);

    const message = err.message || 'An unexpected error occurred';
    const status = err.statusCode || 500;

    return response.error(req, res, message, status);
}

module.exports = errors;