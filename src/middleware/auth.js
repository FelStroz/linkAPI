const jwt = require('jsonwebtoken');
const { promisify } = require('util');

/* User model */
const Users = require('../model/users');

/* Secret */
const { TOKEN_SECRET } = process.env;

module.exports = async (req, res, next) => {
    let { authorization } = req.headers;

    if(!authorization) return res.status(401).json({ message: 'Token not provided!' });

    let [, token] = authorization.split(' ');

    try {
        let { id } = await promisify(jwt.verify)(token, TOKEN_SECRET);

        if(!id) return res.status(403).json({ error: 'unauthorized' });

        Users.findById(id).then(users => {
            if(!users) return res.status(404).json({ error: 'Not Found' });
            req.users = { id };
            next();
        }).catch((e) => res.json({ error: e }));
    } catch (err) {return res.status(403).json({ error: 'unauthorized' })}
};
