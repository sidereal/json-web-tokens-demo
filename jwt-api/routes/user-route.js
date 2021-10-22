const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller')
const commentController = require('../controllers/comment-controller')
const blogController = require('../controllers/blog-controller')


router.get('/', (req, res) => { res.send({ 'test': 'message from /api/user' }) });
router.post('/authenticate', userController.authenticate);
router.get('/:id', userController.getUserById)
router.get('/:id/comments', commentController.getUsersComments) // Get comments for user
router.get('/:id/blogs', blogController.getUsersBlogs) // Get blogs for user




module.exports = router;