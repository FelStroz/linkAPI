module.exports = {
    created: ({_id, name, creationDate}, status, res) => {
        res.status(201).json({
            status: status,
            data: {
                id: _id,
                name,
                creationDate
            }
        });
    },
    showList: (list, total, res) => {
        res.status(200).json({
            data: list.map((user) => {
                return one(user).data
            }),
            total
        });
    },
    showOne: (user, res) => {
        res.status(200).json(one(user));
    },
    showUpdated: (user, status, res) => {
        res.status(200).json({
            status: status,
            data: one(user).data
        });
    },
    showDeleted: ({_id}, status, res) => {
        res.status(200).json({
            status: status,
            data: {
                id: _id
            }
        });
    },
    error: (error = {}, code, status, res) => {
        let {message, _message} = error;
        res.status(code).json({
            status: status,
            error: {
                message: _message,
                completeMessage: message
            }
        });
    },
    message: (status, message, res) => {
        res.status(200).json({
            feedback: {
                status: status,
                message: message
            }
        });
    },
    logged: ({name, authToken}, res) => {
        res.status(200).json(one({name, authToken}));
    }
};

function one({_id: id, name, password, authToken, creationDate}) {
    return {
        data: {
            id,
            name,
            password,
            authToken,
            creationDate
        }
    }
}
