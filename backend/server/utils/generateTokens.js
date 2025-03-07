const jwt = require('jsonwebtoken')

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d' //expiry of token
    });
    // code above will create token, now we need to store it in a http only cookie, code below
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // will set secure true (https) in production and not in development
        sameSite: 'strict', // prevent csrf attacks
        maxAge: 30 * 24 * 60 * 60 * 1000 //30 days -- this takes time in as milliseconds
    });
    return token
};

module.exports = generateToken;