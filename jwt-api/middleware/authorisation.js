const expressJwt = require('express-jwt');

//not used 
//global level filter
module.exports.globalFilter = () => {
    const secret = process.env.JWT_API_JWT_SECRET_AUTH
    return expressJwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/login',
            '/api/logout',
            '/api/refreshtokens'
        ]
    });
}


//checks for a valid auth token to authorise an individual route
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