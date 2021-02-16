let express = require('express');
let routes = express.Router();
let pipedrive = require('../controller/pipedrive');
const userMiddleware = require('../middleware/auth');

routes.use(userMiddleware);
routes.post('/', pipedrive.create);
routes.get('/:id', pipedrive.getOne);
routes.get('/', pipedrive.getList);
routes.put('/:id', pipedrive.update);
routes.delete('/:id', pipedrive.delete);

module.exports = routes;
