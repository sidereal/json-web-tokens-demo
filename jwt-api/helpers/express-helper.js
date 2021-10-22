module.exports.logUser = (req, res, next) => {
    console.log('USER', req.user);
    next()
}

module.exports.logCookies = (req, res, next) => {
    req.cookies ? console.log('COOKIES', req.cookies) : console.log('NO COOKIES')
    next()
}

module.exports.logHeaders = (req, res, next) => {
    req.headers ? console.log('HEADERS', req.headers) : console.log('NO HEADERS')
    next()
}