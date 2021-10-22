
const { verify } = require('jsonwebtoken');
const { createTokens, refreshTokenParameters } = require('./authorisation-helper');


// const { getUserById } = require('../repo/user-repo')
// const { createTokens, refreshTokenParameters } = require('../helpers/jwt-helper')


const refreshTokens = async (req, res) => {


    const token = req.cookies.myRefreshToken

    if (!token) return res.send({ ok: false, authToken: '' })

    let payload = null

    try {
        payload = verify(token, process.env.BLOG_API_JWT_SECRET_REFRESH)
        console.log(payload);

    } catch (e) {
        console.log(e);
        return res.send({ ok: false, authToken: '' })
    }
    try {
        const user = await getUserById(payload.id)
        if (!user) return res.send({ ok: false, authToken: '' })
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