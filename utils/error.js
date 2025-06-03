function err(message, code = 500) {
    let error = new Error(message);
    if (code) {
        error.statusCode = code;
    }

    return error;
}

module.exports = err;