const { refreshTokenParameters } = require('../helpers/authorisation-helper');
const userHelper = require('../helpers/user-helper')




module.exports.login = async (req, res, next) => {
    userHelper.authenticate(req.body)
        .then(authenticationResponse => {
            
            
            const { authToken, refreshToken } = authenticationResponse
            

            res.cookie('myRefreshToken', refreshToken, refreshTokenParameters())
            res.send({ ok: true, authToken })
        })
        .catch(next);
}

module.exports.logout = (req, res) => {
    res.clearCookie('myRefreshToken',
        { httpOnly: true, path: '/api/refreshtoken', sameSite: 'Lax' });
    res.send({ ok: true, message: 'logged out' })
}
