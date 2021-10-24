const { refreshTokenCookieParameters, refreshTokenClearCookieParameters } = require('../helpers/token-helper');
const userHelper = require('../helpers/user-helper')




module.exports.login = async (req, res, next) => {
    userHelper.authenticate(req.body)
        .then(authenticationResponse => {


            const { authToken, refreshToken } = authenticationResponse


            res.cookie('myRefreshToken', refreshToken, refreshTokenCookieParameters())
            res.send({ ok: true, authToken })
        })
        .catch(next);
}

module.exports.logout = (req, res) => {
    res.clearCookie('myRefreshToken', refreshTokenClearCookieParameters());
    res.send({ ok: true, message: 'logged out' })
}
