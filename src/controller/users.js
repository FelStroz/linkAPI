const Users = require('../model/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const List = require('../model/getList');
const views = require('../view/users');

module.exports = {
    create: async (req, res) => {
        let {name, password} = req.body;
        let user = new Users({name, password});
        user.save().then(user => {
            return views.created(user, "Created", res);
        }).catch((e) => views.error(e, 400, "error", res));
    },
    getOne: async (req, res) => {
        if (!req.users) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);
        Users.findById(req.params.id).then(user => {
            if (!user) return views.error({"message": "Usuário não encontrado!"}, 404, "Not Found", res);
            return views.showOne(user, res);
        }).catch((e) => views.error(e, 500, "error", res));
    },
    getList: async (req, res) => {
        if (!req.users) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);
        List(Users, req.query).then(({data, total}) =>
            views.showList(data, total, res)
        ).catch((e) => views.error(e, 500, "error", res));
    },
    update: async (req, res) => {
        let {id} = req.params;
        if (!req.users) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);

        Users.findByIdAndUpdate(
            id,
            req.body,
            {new: true}
        ).then(async user => {
            if (!user) return views.error({"message": "Usuário não encontrado!"}, 404, "Not Found", res);
            for (let position in req.body) {
                user[position] = req.body[position];
            }
            return views.showUpdated(user,"Updated", res);
        }).catch(e => views.error(e, 500, "error", res));
    },
    delete: async (req, res) => {
        if (!req.users) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);
        Users.findByIdAndDelete(req.params.id).then(user => {
            if (!user) return views.error({"message": "Usuário não encontrado!"}, 404, "Not Found", res);
            return views.showDeleted(user, "Deleted", res);
        }).catch(e => views.error(e, 500, "error", res));
    },
    login: async (req, res) => {
        let {name, password} = req.body;
        if (!name || !password) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);

        Users.findOne({'$or': [{'name': name}]}).then(async user => {

            if (!user) return views.error({"message": "Usuário não encontrado!"}, 404, "Not Found", res);
            if (!await bcrypt.compare(password, user.password)) return views.error({"message": "Senha incorreta!"}, 403, "Forbidden", res);

            user.authToken = jwt.sign({id: user._id}, process.env.TOKEN_SECRET);
            delete user.password;
            return views.logged(user, res);
        }).catch(e => views.error(e, 500, "error", res));
    }
}
