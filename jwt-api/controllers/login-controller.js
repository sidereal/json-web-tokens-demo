const { refreshTokenParameters } = require('../helpers/authorisation-helper');
const userHelper = require('../helpers/user-helper')




module.exports.login = async (req, res, next) => {
    userHelper.authenticate(req.body)
        .then(authenticationResponse => {
            console.log(authenticationResponse);
            const { user, authToken, refreshToken } = authenticationResponse
            const cookieExpiry = (14 * 24 * 60 * 60 * 1000) //2 weeks

            res.cookie('myRefreshToken', refreshToken, refreshTokenParameters())
            // res.cookie('myRefreshToken', refreshToken, { httpOnly: true})
            // res.json({ user, token: authToken })
            res.send({ ok: true, authToken })
        })
        .catch(next);
}

module.exports.logout = (req, res) => {
    res.clearCookie('myRefreshToken',
        { httpOnly: true, path: '/api/refreshtoken', sameSite: 'Lax' });
    res.send({ ok: true, message: 'logged out' })
}
