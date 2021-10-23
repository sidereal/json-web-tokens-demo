const express = require('express');
const router = express.Router();

const { authoriseRoles, authoriseAll } = require('../middleware/authorisation')


router.get('/', (req, res) => { res.send({ ok: true, 'message': 'message from /api/demo' }) });

//This route will throw a 500 error with a custom message after a 2 second delay
router.get('/error', async (req, res, next) => { await new Promise(resolve => setTimeout(resolve, 2000)); next() }, (req, res) => { res.statusCode = 500; res.statusMessage = 'this is a test!'; res.end() })

//This route will return OK only if the role 'notarole' exists in the authorisation token
//or 401 (invalid token) handled by error-handler.js if the token is invalid
//or returns 401 (unauthorised) if the token is OK but the role is missing
router.get('/role-based-security', authoriseRoles('notarole'), (req, res) => { res.send({ ok: true, message: 'message from /api/demo/role-based-security' }) });

//This role will return OK only if the request has a valid authorisation token attached
//else 401 (invlaid token) handled by error-handler.js
router.get('/token-based-security', authoriseAll(), (req, res) => { res.send({ ok: true, message: 'message from /api/demo/token-based-security' }) })

module.exports = router