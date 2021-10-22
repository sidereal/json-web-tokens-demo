require('dotenv').config()
const mongoose = require('mongoose');
const startMongoose = require('./database/start-mongoose');
const startExpress = require('./start-express');

const debug = require('debug')('jwt-api:server');

debug('SERVER INITIAL')

startMongoose()
var db = mongoose.connection;
db.on('error', e => console.error.bind(console, e))
db.once('open', () => {
    debug(`Mongoose open at ${process.env.JWT_API_MONGO}`)
    startExpress()
})