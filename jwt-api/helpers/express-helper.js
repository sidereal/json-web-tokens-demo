const debug = require('debug')('jwt-api:middleware');

module.exports.logUser = (req, res, next) => {
    req.user ? debug('USER', req.user) : debug('NO USER')
    // debug('USER', req.user);
    next()
}

module.exports.logCookies = (req, res, next) => {
    
    Object.keys(req.cookies).length === 0 ? debug('NO COOKIES') : debug('COOKIES', req.cookies)
    next()
}

module.exports.logHeaders = (req, res, next) => {
    req.headers ? debug('HEADERS', req.headers) : debug('NO HEADERS')
    next()
}