const express = require('express');
const router = express.Router();

const { postQuestion, getQuestions, getQuestionByID, incrementQuestionView} = require('../controllers/questionController');

router.get('/question', getQuestions)

router.post('/question' , postQuestion);

router.get('/question/:id', getQuestionByID)

router.put('/question/:id/view', incrementQuestionView)
module.exports = router;