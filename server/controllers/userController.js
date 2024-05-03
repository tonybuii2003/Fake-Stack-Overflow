const bcrypt = require('bcrypt');
const User = require('../models/users');

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
module.exports = { registerUser };