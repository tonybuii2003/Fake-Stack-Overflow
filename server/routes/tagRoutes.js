const express = require('express');
const router = express.Router();

const tagController = require('../controllers/tagController');

router.get('/tag', tagController.getTags)
router.get('/tag/:tagId/usages', tagController.checkTagUsages);
router.get('/tag/:tagId', tagController.getTagById);
router.get('/tag/byowner/:owner', tagController.getTagsByOwner);
router.put('/tag/:tagId', tagController.updateTag);
router.delete('/tag/:tagId', tagController.deleteTag);
// router.post('/tag' , postQuestion);

// router.get('/question/:id', getQuestionByID)

// router.put('/question/:id/view', incrementQuestionView)
module.exports = router;