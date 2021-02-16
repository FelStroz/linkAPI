const views = require('../view/integration');
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

        fetch(`${process.env.API_URL}/deals?api_token=${apiToken}`, {
            method: 'POST',
            body: params
        })
            .then(res => res.json())
            .then(() => views.created("Created", res))
            .catch(e => views.error(e, e.code ? e.code : 500, "Error", res));
    }
}
