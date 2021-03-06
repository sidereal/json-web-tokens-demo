const jwt = require('jsonwebtoken');


createAuthToken = (user) => {
    //the expiry for the auth token should be set to a short period
    return jwt.sign({ id: user._id, roles: user.roles, username: user.username, version: user.tokenVersion }, process.env.JWT_API_JWT_SECRET_AUTH, { expiresIn: '15m' });
}

createRefreshToken = (user) => {
    //the expiry for the refresh token should be set to a longer period
    //this is stored as an http only cookie
    return jwt.sign({ id: user._id, version: user.tokenVersion }, process.env.JWT_API_JWT_SECRET_REFRESH, { expiresIn: '14d' });
}

module.exports.createTokens = (user) => {
    const authToken = createAuthToken(user)
    const refreshToken = createRefreshToken(user)
    return { authToken, refreshToken }

}

module.exports.refreshTokenCookieParameters = () => {
    const cookieExpiry = (14 * 24 * 60 * 60 * 1000) //2 weeks
    return { httpOnly: true, path: '/api/refreshtokens', sameSite: 'Lax', maxAge: cookieExpiry }
}

module.exports.refreshTokenClearCookieParameters = () => {
    
    return { httpOnly: true, path: '/api/refreshtokens', sameSite: 'Lax' }
}