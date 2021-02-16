let express = require('express');
let routes = express.Router();
let integration = require('../controller/integration');
const userMiddleware = require('../middleware/auth');

routes.use(userMiddleware);
routes.post('/', integration.create);
routes.get('/:id', integration.getOne);
routes.get('/', integration.getList);
routes.put('/:id', integration.update);
routes.delete('/:id', integration.delete);

module.exports = routes;
