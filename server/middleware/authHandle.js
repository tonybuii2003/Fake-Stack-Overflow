const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    const token = req.session.token;

    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }
};

module.exports = { verify }; 
