module.exports = {
    created: (status, res) => {
        res.status(201).json({
            status: status,
        });
    },
    showList: (list, total, res) => {
        res.status(200).json({
            data: list.map(integrated => one(integrated)),
            total
        });
    },
    showOne: (integrated, res) => {
        res.status(200).json(one(integrated));
    },
    showUpdated: (status, res) => {
        res.status(200).json({
            status: status,
        });
    },
    showDeleted: (status, res) => {
        res.status(200).json({
            status: status,
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
};

function one({_id: id, date, deals, total, creationDate}) {
    return {
        data: {
            id,
            date,
            deals,
            total,
            creationDate
        }
    }
}

