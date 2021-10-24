const debug = require('debug')('jwt-api:refresh-tokens');

const { verify } = require('jsonwebtoken');
const { createTokens, refreshTokenParameters } = require('./token-helper');
const { getUserById } = require('../database/user-repo')

const returnFailure = (res) => {
    //clear the refresh token cookie if our request fails
    res.clearCookie('myRefreshToken', { httpOnly: true, path: '/api/refreshtokens', sameSite: 'Lax' });
    return res.send({ ok: false, authToken: '' })

}

//Return a new authorisation token & refresh token if we have a valid refresh token cookie attached to the request
const refreshTokens = async (req, res) => {

    const requestRefreshToken = req.cookies.myRefreshToken

    if (!requestRefreshToken) return res.send({ ok: false, authToken: '' })

    let payload = null

    try {
        payload = verify(requestRefreshToken, process.env.JWT_API_JWT_SECRET_REFRESH)

    } catch (e) {
        if (e.name == 'JsonWebTokenError') debug('invalid token detected')
        else debug(e);
        return returnFailure(res)
    }
    try {
        const user = await getUserById(payload.id)

        // if the userid is bad fail validation
        if (!user) {
            debug(`user ${payload.id} not found`)
            return returnFailure(res)
        }

        //Incrementing the tokenVersion field of a user in the database
        //allows us to invalidate the tokens of a user
        if (user.tokenVersion != payload.version) {
            debug('token version mismatch')
            return returnFailure(res)
        }


        const { authToken, refreshToken } = createTokens(user)
        debug(`refeshing tokens for ${user.username} ${user._id}`)
        res.cookie('myRefreshToken', refreshToken, refreshTokenParameters())
        res.send({ ok: true, authToken })
    }
    catch (e) {
        debug(e);
        throw e.message
    }
}

module.exports = refreshTokens