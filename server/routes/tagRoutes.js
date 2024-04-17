const express = require('express');
const router = express.Router();

const {getTags} = require('../controllers/tagController');

router.get('/tag', getTags)

// router.post('/tag' , postQuestion);

// router.get('/question/:id', getQuestionByID)

// router.put('/question/:id/view', incrementQuestionView)
module.exports = router;