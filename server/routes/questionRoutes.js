const express = require('express');
const router = express.Router();
const auth = require('../middleware/authHandle');

const { postQuestion, getQuestions, getQuestionByID, incrementQuestionView, getQuestionsByUsername, deleteQuestion, updateQuestion, upVoteQuestion, downVoteQuestion} = require('../controllers/questionController');

router.get('/question', getQuestions)

router.post('/question' , auth.verify, postQuestion);

router.get('/question/:id', getQuestionByID)

router.put('/question/:id/view', incrementQuestionView)

router.get('/question/byuser/:username', getQuestionsByUsername);

router.delete('/question/:id', deleteQuestion);

router.put('/question/:id', updateQuestion);

router.put('/question/:id/upvote', auth.verify, upVoteQuestion);
router.put('/question/:id/downvote', auth.verify, downVoteQuestion);
module.exports = router;