const express = require('express');
const router = express.Router();

const tagController = require('../controllers/tagController');

router.get('/tag', tagController.getTags)
router.get('/tag/:tagId', tagController.getTagById);
module.exports = router;