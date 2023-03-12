const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //get token out of header
            token = req.headers.authorization.split(' ')[1];
            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //get user from decoded token
            req.user = await User.findById(decoded.uid).select('-password');

            next()
        } catch (e) {
            console.log(e)
            res.status(401);
            throw new Error('Unauthorized')
        }
    }

    if(!token){
        res.status(401);
        throw new Error('Unauthorized')
    }
})

module.exports = {protect}