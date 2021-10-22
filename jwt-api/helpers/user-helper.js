// const jwt = require('jsonwebtoken');

const userRepo = require('../repo/user-repo')
const securityHelper = require('./password-helper')

const { createTokens } = require('./authorisation-helper')

const filterUser = (user) => {
    // const { _id, roles, username } = user
    // const filteredUser = { _id, roles, username }
    const filteredUser = (({ _id, roles, username }) => ({ id: _id, roles, username }))(user)
    return filteredUser
}


module.exports.authenticate = async ({ username, password }) => {
    const user = await userRepo.getUserByUsername(username.toLowerCase())

    if (user) {
        const isPasswordValid = await securityHelper.checkPassword(password, user.password);
        if (isPasswordValid) {

            const { authToken, refreshToken } = createTokens(user)

            return {
                user: filterUser(user), //not used
                authToken,
                refreshToken
            };
        }
    }
    throw 'Username or password is incorrect';
}