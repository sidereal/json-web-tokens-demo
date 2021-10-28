
const path = require("path")
// require('dotenv').config({ path: `${path.resolve(__dirname, "../")}\\.env` })

require('dotenv').config({ path:'../.env'})
const mongoose = require('mongoose');

console.log(process.env.JWT_API_MONGO ?? 'not found');

const User = require('./models/user-model')

const passwordHelper = require('../helpers/password-helper')
const roles = require('./roles')


mongoose.connect(process.env.JWT_API_MONGO, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const createOneUser = async (name, password, roles) => {
    let hashedPassword = await passwordHelper.hashPassword(password, 10)
    let user = new User({ username: name, password: hashedPassword, roles: roles })

    await user.save()

}

const createSomeUsers = async (n) => {
    const password = '1234'
    for (let i = 0; i < n; i++) {
        let userRoles = [roles.User]
        if (i < 2) userRoles = Object.values(roles)
        if (i == 2) userRoles = [roles.User, roles.Contributor]

        await createOneUser(`user-${i}`, password, userRoles)

    }
}



const buildUsers = async () => {
    try {
        console.log('begin');
        await createSomeUsers(5)
        console.log('users built');
    } catch (error) {
        console.log(error);
    }
    finally {
        mongoose.connection.close();
        console.log('closed');
    }
}

buildUsers()