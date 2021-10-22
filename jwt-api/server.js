require('dotenv').config()
const startMongoose = require('./database/start-mongoose');



const logger = require('morgan');
const debug = require('debug')('jwt-api:server');

const cookieParser = require('cookie-parser')
const cors = require('cors');

startMongoose()


const express = require('express');
const app = express();

const port = process.env.BLOG_API_PORT ?? 3000

const errorHandler = require('./helpers/error-handler');
// const jwtHelper = require('helpers/jwt-helper');
// const { logCookies } = require('./helpers/express-helper');

app.use(logger('dev'));
app.use(cookieParser())

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

// app.use(logUser)
// app.use(logCookies)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// app.use('/api', require('routes/api-route.js'));

app.use(errorHandler);

app.listen(port, () => console.log(`jwt server listening on port ${port}!`));