const express = require('express');
const { login, logout } = require('../controllers/login-controller');
const router = express.Router();


// const { refreshTokens } = require('../helpers/refreshToken-helper')
// const { authoriseAll } = require('../helpers/jwt-helper')



// router.use('/users', require('routes/user-route.js'));
// router.use('/blogs', require('routes/blog-route.js'));
// router.use('/comments', require('routes/comment-route.js'));
// router.use('/errortest', require('routes/error-test'));
// router.post('/refreshtoken', refreshTokens)

// router.get('/security', authoriseAll(), (req, res) => {
//     res.send({ message: 'secure route!' })
// })
login

// router.post('/logout', (req, res) => { res.send({ message: 'logout TBD' }) })
router.post('/login', login)
router.post('/logout', logout)
router.get('/', (req, res) => { res.send({ ok: true, 'message': 'message from /api' }) });




module.exports = router;