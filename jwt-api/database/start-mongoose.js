const mongoose = require('mongoose');
const debug = require('debug')('jwt-api:mongoose');

const startMongoose = async () => {
    try {
        await mongoose.connect(process.env.BLOG_API_MONGO, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 });
    } catch (error) {
        debug(error);
        process.exit(0)
    }
    await startMongoose()
    var db = mongoose.connection;
    db.on('error', e => console.error.bind(console, e))

}

export default startMongoose