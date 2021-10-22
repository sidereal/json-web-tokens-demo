const debug = require('debug')('jwt-api:user-repo');

const User = require('./models/user-model')

const passwordHelper = require('../helpers/password-helper')


//check me
module.exports.getUserByUsername = async (username) => {
    try {
        return await User.findOne({ username })
    } catch (error) {
        debug('GetUserById', error);
        return null
    }
}

module.exports.getUserById = async (id) => {
    try {
        return await User.findById(id)
    } catch (error) {
        debug('GetUserById', error);
        return null
    }
}

module.exports.getAllUsernames = async () => {
    return await User.find({}, 'username')
}

module.exports.createUser = async (username, password) => {
    let hashed = await passwordHelper.hashPassword(password, 10)
    let user = new User({ username: username.toLowerCase(), password: hashed })

    await user.save()
    return user;
}

module.exports.updateUser = async (user, data) => {
    return await User.findByIdAndUpdate(user._id, data, { new: true })
}