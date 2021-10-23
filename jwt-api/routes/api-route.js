const express = require('express');
const router = express.Router();

const { login, logout } = require('../controllers/login-controller');
const  refreshTokens  = require('../helpers/refresh-Tokens')


router.use('/demo', require('./demo-route.js'));


//post a user & get an authorisation JWT & a refresh JWT cookie in return
router.post('/login', login)

//removes the refesh cookie from the client
router.post('/logout', logout)

//post with a valid refresh token cookie to receive
//a new authorisation token and a new refresah token cookie
router.post('/refreshtokens', refreshTokens)


router.get('/', (req, res) => { res.send({ ok: true, 'message': 'message from /api' }) });




module.exports = router;