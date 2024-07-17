const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const upload = require('../middleware/multerConfig');

router.post('/posts', upload.single('file'), postController.createPost); // Handle single file upload
router.get('/users/:userId/feed', postController.getUserFeed);
router.post('/posts/:postId/like', postController.likePost); // Route to like a post
router.post('/posts/:postId/comment', postController.commentOnPost); // Route to comment on a post

module.exports = router;
