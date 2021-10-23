

const errorHandler = (err, req, res, next) => {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ ok: false, message: err });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ ok: false, message: 'Invalid Token' });
    }

    // default to 500 server error
    return res.status(500).json({ ok: false, message: err.message });
}

module.exports = errorHandler