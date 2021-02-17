let express = require('express');
let routes = express.Router();
let integration = require('../controller/integration');
const userMiddleware = require('../middleware/auth');

routes.use(userMiddleware);
routes.get('/create', integration.create);
routes.get('/', integration.getList);

module.exports = routes;
