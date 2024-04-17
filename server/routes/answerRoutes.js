const express = require('express');
const router = express.Router();

const { getAnswers, createAnswer } = require('../controllers/answerController');

router.get('/question/:id/answer', getAnswers)

router.post('/question/:id/answer', createAnswer)

module.exports = router