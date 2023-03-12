const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");

// @desc    Register a new User
// @route   /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
        const {name, email, password} = req.body;
        if (!name || !email || !password) {
            res.status(400)
            throw new Error('Please include all required data fields')
        }
        // Find if user exists:
        const userExists = await User.findOne({email});
        if (userExists) {
            res.status(400);
            throw new Error(`User ${email} already exists. Please provide another email.`);
        }

        // Hash out password:
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user:
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            })
        } else {
            res.status(400);
            throw new Error('Unknown Error');
        }
})

// @desc    Log a user in
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(401)
        throw new Error('User did not exist or password was incorrect.')
    }
})

// @desc    Get current user
// @route   /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    const userData = {
        name: req.user.name,
        email: req.user.email,
        id: req.user._id,
        isAdmin: req.user.isAdmin,
    }
    res.status(200).json(userData);
})

//generate token

const generateToken = (uid) => {
    return jwt.sign({uid}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}