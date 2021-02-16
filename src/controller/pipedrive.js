const views = require('../view/pipedrive');
const fetch = require('node-fetch');
module.exports = {
    create: async (req, res) => {
        let {name, password} = req.body;

    },
    getOne: async (req, res) => {
        if (!req.users) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);

    },
    getList: async (req, res) => {
        if (!req.users) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);

    },
    update: async (req, res) => {
        let {id} = req.params;
        if (!req.users) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);


    },
    delete: async (req, res) => {
        if (!req.users) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);

    },
}
