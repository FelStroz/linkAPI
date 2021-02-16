module.exports = {
    created: (status, res) => {
        res.status(201).json({
            status: status,
        });
    },
    showList: (list, total, res) => {
        res.status(200).json({
            data: list.map((deal) =>
                deal
            ),
            total
        });
    },
    showOne: (user, res) => {
        res.status(200).json(user);
    },
    showUpdated: (status, res) => {
        res.status(200).json({
            status: status,
        });
    },
    showDeleted: ( status, res) => {
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
