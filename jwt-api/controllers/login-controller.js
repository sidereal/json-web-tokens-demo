const { refreshTokenCookieParameters, refreshTokenClearCookieParameters } = require('../helpers/token-helper');
const userHelper = require('../helpers/user-helper')
const debug = require('debug')('jwt-api:login');



module.exports.login = async (req, res, next) => {
    debug(`login request from username: ${req?.body?.username}`)
    userHelper.authenticate(req.body)
        .then(authenticationResponse => {
            const { authToken, refreshToken } = authenticationResponse
            
            debug(`login success from username: ${req?.body?.username}`)

            res.cookie('myRefreshToken', refreshToken, refreshTokenCookieParameters())
            res.send({ ok: true, authToken })
        })
        .catch(next);
}

module.exports.logout = (req, res) => {
    res.clearCookie('myRefreshToken', refreshTokenClearCookieParameters());
    res.send({ ok: true, message: 'logged out' })
}
