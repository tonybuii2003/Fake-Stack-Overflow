const express = require('express');
const router = express.Router();

const { postQuestion, getQuestions, getQuestionByID, incrementQuestionView, getQuestionsByUsername, deleteQuestion, updateQuestion} = require('../controllers/questionController');

router.get('/question', getQuestions)

router.post('/question' , postQuestion);

router.get('/question/:id', getQuestionByID)

router.put('/question/:id/view', incrementQuestionView)

router.get('/question/byuser/:username', getQuestionsByUsername);

router.delete('/question/:id', deleteQuestion);

router.put('/question/:id', updateQuestion);
module.exports = router;