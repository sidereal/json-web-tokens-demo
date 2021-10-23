const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

module.exports.globalFilter = () => {
    const secret = process.env.JWT_API_JWT_SECRET_AUTH
    return expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/login',
            '/api/logout'
        ]
    });
}

module.exports.authoriseAll = () => {
    const secret = process.env.JWT_API_JWT_SECRET_AUTH
    return expressJwt({ secret, algorithms: ['HS256'] })
}

module.exports.authoriseRoles = (allowedRoles = []) => {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof allowedRoles === 'string') {
        allowedRoles = [allowedRoles];
    }

    const secret = process.env.JWT_API_JWT_SECRET_AUTH

    return [
        // authenticate JWT token and attach user to request object (req.user)
        expressJwt({ secret, algorithms: ['HS256'] }),

        // authorize based on user role
        (req, res, next) => {
            //check if the array of allowed roles contains any of the user roles
            if (allowedRoles.length && !allowedRoles.some(r => req.user.roles.includes(r))) {
                // user's role is not authorized
                return res.status(401).json({ 'ok': false, message: 'Unauthorised' });
            }
            // authentication and authorization successful
            next();
        }
    ];
}


createAuthToken = (user) => {
    //the expiry for the auth token should be set to a short period
    return jwt.sign({ id: user._id, roles: user.roles, username: user.username, version: user.tokenVersion }, process.env.JWT_API_JWT_SECRET_AUTH, { expiresIn: '14days' });
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

module.exports.refreshTokenParameters = () => {
    const cookieExpiry = (14 * 24 * 60 * 60 * 1000) //2 weeks
    return { httpOnly: true, path: '/api/refreshtoken', sameSite: 'Lax', maxAge: cookieExpiry }
}