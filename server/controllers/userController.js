const bcrypt = require('bcrypt');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();
async function registerUser(req, res) {
    const { username, email, password } = req.body;
    try {
        const hashedPW = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPW
        });
        const newlyRegisteredUser = await newUser.save();
        res.status(201).json(newlyRegisteredUser);
    }
    catch (error){
        res.status(500).json({ message: error.message });
    }
}
const getUsernameFromId = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user.username);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const loginUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findOne({email});
        if (!user){
            return res.status(404).send('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch){
            return res.status(401).send('Invalid credentials');
        }
        const token = jwt.sign(
            { userId: user._id, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        req.session.token = token;
        req.session.user = { userId: user._id, username: user.username, email: user.email, reputation: user.reputation };
        res.status(200).json({ message: 'Login successful', user: req.session.user });
        console.log('Session Data:', req.session);
        console.log(user);
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Error logging in user');
    }
}
const logoutUser = async (req, res) => {
    try{
        req.session.destroy();
        res.status(200).send({ message: 'Logged out successfully' });
    } catch (error){
        res.status(500).send('Error logging out user');
    }
}
const getLoggedIn = async (req, res) => {
    try {
        if (!req.session.token) {
            console.log('No token found in session');
            return res.json({ isLoggedIn: false });
        }

        jwt.verify(req.session.token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                console.log('JWT verification error:', err);
                return res.json({ isLoggedIn: false });
            }

            console.log('JWT verified successfully, user:', user);
            return res.json({ isLoggedIn: true, user: {
                userId: user.userId,
                username: user.username,
                email: user.email,
                reputation: req.session.user.reputation
            }});
        });
    } catch (error) {
        console.error('Error getting logged in user:', error);
        res.status(500).send('Error getting logged in user');
    }
}
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne(req.params.email);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = { registerUser, loginUser, logoutUser, getLoggedIn, getUserById, getUsernameFromId, getUserByEmail};