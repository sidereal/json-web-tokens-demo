const logger = require('morgan');
const debug = require('debug')('jwt-api:server');

const cookieParser = require('cookie-parser')
const cors = require('cors');

const errorHandler = require('./helpers/error-handler');
const express = require('express');

const startExpress = () => {

    const app = express();

    const port = process.env.JWT_API_PORT ?? 3000


    app.use(logger('dev'));
    app.use(cookieParser())

    app.use(express.json());

    app.use(express.urlencoded({ extended: true }));

    app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

    // app.use(logUser)
    // app.use(logCookies)

    app.get('/', (req, res) => { res.send({ ok: true, 'message': 'navigate to /api' }) })

    app.use('/api', require('./routes/api-route.js'));

    app.use(errorHandler);

    app.listen(port, () => debug(`JWT server listening on port ${port}!`))
}

module.exports = startExpress