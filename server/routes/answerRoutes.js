const express = require('express');
const router = express.Router();
const auth = require('../middleware/authHandle');

const { getAnswers, createAnswer } = require('../controllers/answerController');

router.get('/question/:id/answer', auth.verify, getAnswers)

router.post('/question/:id/answer', auth.verify, createAnswer)

module.exports = router