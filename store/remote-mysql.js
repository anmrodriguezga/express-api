const remote = require('./remote');
const config = require('../config');

module.exports = new remote(config.mySqlService.host, config.mySqlService.port);
