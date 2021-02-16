let express = require('express');
let routes = express.Router();
let users = require('../controller/users');
const userMiddleware = require('../middleware/auth');

routes.post('/', users.create);

routes.use(userMiddleware);

routes.get('/:id', users.getOne);
routes.get('/', users.getList);
routes.put('/:id', users.update);
routes.delete('/:id', users.delete);

module.exports = routes;
