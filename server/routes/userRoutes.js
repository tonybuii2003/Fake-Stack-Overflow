const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/user/register', UserController.registerUser);
router.post('/user/login', UserController.loginUser);
router.post('/user/logout', UserController.logoutUser);
router.get('/user/loggedIn', UserController.getLoggedIn);
router.get('/user/:userId/username', UserController.getUsernameFromId);
router.get('/user/:userId/email', UserController.getUsernameFromId);
router.get('/user/:userId', UserController.getUserById);

module.exports = router;