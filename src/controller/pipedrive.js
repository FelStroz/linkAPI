const views = require('../view/pipedrive');
const fetch = require('node-fetch');
const {URLSearchParams} = require('url');

module.exports = {
    create: async (req, res) => {
        let {title, value, currency, userId, stageId = 1, status} = req.body, {apiToken} = req.query;
        let today = new Date,
            year = today.getFullYear(),
            month = ((today.getUTCMonth() + 1) < 10) ? '0' + (today.getUTCMonth() + 1) : today.getUTCMonth() + 1,
            day = today.getUTCDate();

        const params = new URLSearchParams();
        params.append("title", title);
        params.append("value", value);
        params.append("currency", currency);
        params.append("user_id", userId);
        params.append("person_id", 1);
        params.append("org_id", 1);
        params.append("stage_id", stageId);
        params.append("status", status);
        params.append("expected_close_date", `${year}-${month}-${day}`);

        fetch(`${process.env.PIPEDRIVE_URL}/deals?api_token=${apiToken}`, {
            method: 'POST',
            body: params
        })
            .then(res => res.json())
            .then(() => views.created("Created", res))
            .catch(e => views.error(e, e.code ? e.code : 500, "Error", res));
    },

    getOne: async (req, res) => {
        if (!req.users) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);
        let {id = 1} = req.params, {apiToken} = req.query;
        fetch(`${process.env.PIPEDRIVE_URL}/deals/${id}?api_token=${apiToken}`)
            .then(res => res.json())
            .then(deal => views.showOne(deal.data, res))
            .catch(e => views.error(e, e.code ? e.code : 500, "Error", res));
    },

    getList: async (req, res) => {
        if (!req.users) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);
        let {status = 'all_not_deleted', apiToken} = req.query;
        fetch(`${process.env.PIPEDRIVE_URL}/deals?status=${status}&start=0&api_token=${apiToken}`)
            .then(res => res.json())
            .then(deals => views.showList(deals.data, deals.data.length, res))
            .catch(e => views.error(e, e.code ? e.code : 500, "Error", res));
    },

    update: async (req, res) => {
        if (!req.users) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);
        let {id} = req.params, {apiToken} = req.query, {status} = req.body;

        const params = new URLSearchParams();
        params.append("status", status);

        fetch(`${process.env.PIPEDRIVE_URL}/deals/${id}?api_token=${apiToken}`, {
            method: 'PUT',
            body: params
        })
            .then(() => views.showUpdated("Updated", res))
            .catch(e => views.error(e, e.code ? e.code : 500, "Error", res));
    },

    delete: async (req, res) => {
        if (!req.users) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);
        let {id} = req.params, {apiToken} = req.query;
        fetch(`${process.env.PIPEDRIVE_URL}/deals/${id}?api_token=${apiToken}`, {
            method: 'DELETE'
        })
            .then(() => views.showDeleted("Deleted", res))
            .catch(e => views.error(e, e.code ? e.code : 500, "Error", res));
    },
}
