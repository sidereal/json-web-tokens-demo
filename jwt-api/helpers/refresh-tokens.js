const { verify } = require('jsonwebtoken');
const { createTokens, refreshTokenParameters } = require('./token-helper');

//Return a new authorisation token & refresh token if we have a valid refresh token cookie attached to the request
const refreshTokens = async (req, res) => {

    const requestRefreshToken = req.cookies.myRefreshToken

    if (!requestRefreshToken) return res.send({ ok: false, authToken: '' })

    let payload = null

    try {
        payload = verify(requestRefreshToken, process.env.BLOG_API_JWT_SECRET_REFRESH)

    } catch (e) {
        console.log(e);
        return res.send({ ok: false, authToken: '' })
    }
    try {
        const user = await getUserById(payload.id)
        
        // if the userid is bad fail validation
        if (!user) return res.send({ ok: false, authToken: '' })
        
        //Incrementing the tokenVersion field of a user in the database
        //allows us to invalidate the tokens of a user
        if (user.tokenVersion != payload.version) return res.send({ ok: false, authToken: '' })

        const { authToken, refreshToken } = createTokens(user)

        res.cookie('myRefreshToken', refreshToken, refreshTokenParameters())
        res.send({ ok: true, authToken })
    }
    catch (e) {
        console.log(e);
        throw e.message
    }
}

module.exports = refreshTokens