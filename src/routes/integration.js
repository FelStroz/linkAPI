let express = require('express');
let routes = express.Router();
let integration = require('../controller/integration');
const userMiddleware = require('../middleware/auth');

routes.use(userMiddleware);
routes.post('/', integration.create);

module.exports = routes;
