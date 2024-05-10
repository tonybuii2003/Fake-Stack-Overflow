const express = require('express');
const router = express.Router();
const auth = require('../middleware/authHandle');

const { getAnswers, createAnswer } = require('../controllers/answerController');

router.get('/answer/:qid', getAnswers)

router.post('/answer/:qid', auth.verify, createAnswer)

module.exports = router