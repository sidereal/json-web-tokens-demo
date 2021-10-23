// const jwt = require('jsonwebtoken');

const userRepo = require('../database/user-repo')
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
                //we don't actually need the user here, all this information is encoded in the auth token
                //but you could pass it back to the client from here
                //if for some reason you don't want to decode the auth token in the client
                user: filterUser(user), 
                authToken,
                refreshToken
            };
        }
    }
    throw 'Username or password is incorrect';
}