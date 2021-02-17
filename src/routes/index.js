const routes = require('express').Router();

routes.use('/users', require('./users'));
routes.use('/pipedrive', require('./pipedrive'));
routes.use('/integration', require('./integration'));
routes.use('/login', require('./auth'));

module.exports = routes;
