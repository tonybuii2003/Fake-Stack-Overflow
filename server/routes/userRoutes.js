const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.post('/logout', UserController.logoutUser);
router.get('/loggedIn', UserController.getLoggedIn);
router.get('/user/:userId/username', UserController.getUsernameFromId);
router.get('/user/:userId/email', UserController.getUsernameFromId);
router.get('/user/:userId', UserController.getUserById);

module.exports = router;