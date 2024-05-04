const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.post('/logout', UserController.logoutUser);
router.get('/loggedIn', UserController.getLoggedIn);
module.exports = router;