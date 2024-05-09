const express = require('express');
const router = express.Router();
const auth = require('../middleware/authHandle');

const { postQuestion, getQuestions, getQuestionByID, incrementQuestionView} = require('../controllers/questionController');

router.get('/question', getQuestions)

router.post('/question' , auth.verify, postQuestion);

router.get('/question/:id', getQuestionByID)

router.put('/question/:id/view', incrementQuestionView)
module.exports = router;