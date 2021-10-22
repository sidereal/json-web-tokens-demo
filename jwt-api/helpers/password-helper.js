const bcrypt = require('bcryptjs')
const jwt = require('express-jwt');

module.exports.hashPassword = async (password) => {
    const result = await bcrypt.hash(password, 10)
    return result
}


module.exports.checkPassword = async (password, hash) => {
    let result = await bcrypt.compare(password, hash)
    return(result)
}