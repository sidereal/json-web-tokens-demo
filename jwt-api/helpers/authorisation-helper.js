const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

module.exports.globalFilter = () => {
    const secret = process.env.BLOG_API_JWT_SECRET_AUTH
    return expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/users/authenticate',
            '/api/blogs/new/latest',
            '/api/blogs/new/recent'
        ]
    });
}

module.exports.authoriseAll = () => {
    const secret = process.env.BLOG_API_JWT_SECRET_AUTH
    return expressJwt({ secret, algorithms: ['HS256'] })
}



module.exports.authoriseRoles = (roles = []) => {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    const secret = process.env.BLOG_API_JWT_SECRET_AUTH
    // console.log(secret);

    return [
        // authenticate JWT token and attach user to request object (req.user)
        expressJwt({ secret, algorithms: ['HS256'] }),

        // authorize based on user role
        (req, res, next) => {
            // console.log(req.user)
            // if (roles.length && !roles.includes(req.user.role)) {
            if (roles.length && !roles.some(r => req.user.roles.includes(r))) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // authentication and authorization successful
            next();
        }
    ];
}


createAuthToken = (user) => {
    return jwt.sign({ id: user._id, roles: user.roles, username: user.username, version: user.tokenVersion }, process.env.BLOG_API_JWT_SECRET_AUTH, { expiresIn: '1m' });
}

createRefreshToken = (user) => {
    return jwt.sign({ id: user._id, version: user.tokenVersion }, process.env.BLOG_API_JWT_SECRET_REFRESH, { expiresIn: '14d' });
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