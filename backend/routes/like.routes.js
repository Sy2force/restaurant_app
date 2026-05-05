const express = require('express');
const router = express.Router();
const likeController = require('../controllers/like.controller');
const { auth } = require('../middleware/auth');

router.get('/user', auth, likeController.getUserLikes);
router.get('/check/:type/:id', auth, likeController.checkIfLiked);
router.post('/:type/:id', auth, likeController.toggleLike);

module.exports = router;
