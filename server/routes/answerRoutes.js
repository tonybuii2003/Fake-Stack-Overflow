const express = require('express');
const router = express.Router();
const auth = require('../middleware/authHandle');
const commentController = require('../controllers/commentController');
const { getAnswers, createAnswer } = require('../controllers/answerController');

router.get('/question/:id/answer', getAnswers)

router.post('/question/:id/answer', auth.verify, createAnswer)

router.get('/answer/:answerId/comment', commentController.getComments);

router.post('/answer/:answerId/comment', auth.verify, commentController.createComment);

router.post('/comment/:commentId/upvote', auth.verify, commentController.upVoteComment);

module.exports = router