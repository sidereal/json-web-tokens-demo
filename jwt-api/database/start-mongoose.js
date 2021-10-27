const mongoose = require('mongoose');
const debug = require('debug')('jwt-api:mongoose');

const startMongoose = async () => {
    try {
        await mongoose.connect(process.env.JWT_API_MONGO, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 });
    } catch (error) {
        debug(error);
        process.exit(0)
    }
}

module.exports = startMongoose