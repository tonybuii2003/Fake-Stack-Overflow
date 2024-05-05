const bcrypt = require('bcrypt');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();
async function registerUser(req, res) {
    const { first_name, last_name, email, password } = req.body;
    try {
        const hashedPW = await bcrypt.hash(password, 10);
        const newUser = new User({
            first_name,
            last_name,
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
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if (!user){
            return res.status(404).send('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch){
            return res.status(401).send('Invalid credentials');
        }
        const token = jwt.sign(
            { userId: user._id,
            email: user.email, 
            first_name: user.first_name,
            },
            process.env.JWT_SECRET,
        );
        res.cookie('token', token, {
            httpOnly: true,
            secure: false, 
            maxAge: 3600000 
        });
        res.status(200).json({ message: 'Login successful', token});
        console.log('Login successful', token);
        //print cookies token
        console.log('Cookies: ', req.cookies);
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Error logging in user');
    }
}
const logoutUser = async (req, res) => {
    try{
        await res.clearCookie('token');
        res.status(200).send({ message: 'Logged out successfully' });
    } catch (error){
        res.status(500).send('Error logging out user');
    }
}
const getLoggedIn = async (req, res) => {
    try {
        // Log incoming cookies to see if the token is being sent correctly
        console.log('Cookies received:', req.cookies);

        const token = req.cookies.token;
        if (!token) {
            console.log('No token found');
            return res.json({ isLoggedIn: false });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                console.log('JWT verification error:', err);
                return res.json({ isLoggedIn: false });
            }

            console.log('JWT verified successfully, user:', user);
            return res.json({ isLoggedIn: true, user:{
                email: user.email
            }});
        });
    } catch (error) {
        console.error('Error getting logged in user:', error);
        res.status(500).send('Error getting logged in user');
    }
}

module.exports = { registerUser, loginUser, logoutUser, getLoggedIn};