const views = require('../view/integration');
const fetch = require('node-fetch');
const request = require('../model/xmlRequest');
const Deals = require('../model/deals');
const Financial = require('../model/financial');
const axios = require("axios").default;
const List = require('../model/getList');

module.exports = {
    create: async (req, res) => {
        if (!req.users) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);
        let {pipedriveKey, blingKey} = req.query, dates = [];
        let dealsWonList = await fetch(`${process.env.PIPEDRIVE_URL}/deals?status=won&start=0&api_token=${pipedriveKey}`)
            .then(res => res.json())
            .catch(e => views.error(e, e.code ? e.code : 500, "Error", res));

        await dealsWonList.data.map(async (deals) => {
            let newDeal = new Deals({
                dealId: deals.id, userId: deals.user_id.id, userName: deals.user_id.name,
                userEmail: deals.user_id.email, orgId: deals.org_id.value, orgName: deals.org_id.name,
                title: deals.title, value: deals.value, currency: deals.currency,
                status: deals.status, dealPersonName: deals.person_name,
                date: `${deals.expected_close_date.substring(8, 10)}/${deals.expected_close_date.substring(5, 7)}/${deals.expected_close_date.substring(0, 4)}`
            });

            if (!dates.includes(newDeal.date))
                dates.push(newDeal.date);

            await Deals.findOne({dealId: deals.id})
                .then(async (deal) => {
                    if (!deal) {
                        await newDeal.save();
                        await requestToBling(newDeal, blingKey);
                        if (dealsWonList.data.indexOf(deals) === (dealsWonList.data.length - 1)) {
                            await dates.map(async date => {
                                let total = 0, ids = [];
                                await Deals.aggregate([{$match: {date}}])
                                    .then((deals) => {
                                        deals.map(deal => {
                                            total += deal.value;
                                            ids.push(deal._id);
                                        })
                                    })
                                    .catch(e => views.error(e, e.code ? e.code : 500, "Error", res));
                                await Financial.findOneAndUpdate({date}, {deals: ids, total})
                                    .then(async (financial) => {
                                        if (!financial) {
                                            let newFinancial = new Financial({
                                                date, deals: ids, total
                                            });
                                            await newFinancial.save();
                                        }
                                    })
                                    .catch(e => views.error(e, e.code ? e.code : 500, "Error", res));
                            })
                            return views.created("Created", res);
                        }
                        requestToBling(newDeal, blingKey).catch(e => views.error(e, e.code ? e.code : 500, "Error", res));
                    } else if (dealsWonList.data.indexOf(deals) === (dealsWonList.data.length - 1)) {
                        return views.error({
                            _message: "Não encontrado", message: "Não há novos negócios cadastrados no momento!"
                        }, 404, "Not Found", res);
                    }
                })
                .catch(e => views.error(e, e.code ? e.code : 500, "Error", res));
        });
    },
    getList: async (req, res) => {
        if (!req.users) return views.error({"message": "Usuário não autorizado!"}, 401, "Unauthorized", res);
        List(Financial, req.query).then(({data, total}) =>
            views.showList(data, total, res)
        ).catch((e) => views.error(e, 500, "error", res));
    }
}

async function requestToBling(deal, blingKey) {
    let options = {
        method: 'POST',
        url: process.env.BLING_URL,
        params: {
            apikey: blingKey,
            xml: request.toXML(deal._id, deal.dealPersonName, "", deal.value, deal.title).trim()
        }
    };

    return axios.request(options).then(function (response) {
        if (response.data.retorno.erros)
            console.log(response.data.retorno.erros.erro);
        else {
            console.log(response.data.retorno.pedidos);
            return response.data.retorno.pedidos;
        }
    }).catch(function (error) {
        console.error(error);
    });
}
