const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const User = require('../models/userModel')

//@desc register
//route api/users
//access Public
const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body
        //User info validation
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Please include all fields')
    }

    //Check if user is registered
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    //Salting and hashing the password
    const saltedPassword = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, saltedPassword)

    //after all validations - CREATE User
    const user = User.create({
        name,
        email,
        password: hashedPassword,
    })

    //return unique user credetials after registration and fire notification
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
        alert('User successfully registered')
    } else {
        res.status(400)
        throw new Error('Invalid user Data')
    }
})

//@desc login
//route api/users/login
//access Public
const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })


    // Check if user exists and compare password with the hashed one from db
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            password: user.password,
            token: generateToken(user._id)

        })

    } else {
        res.status(401)
        throw new Error('Invalid user credential')
    }

})

//@description get current user
//@route api/users/me
//access Private
const getMe = (req, res) => {
    const user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,

    }
    res.status(200).json(req.user)

}


//generate the unique user token
function generateToken(id) {
    return JWT.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}


module.exports = {
    registerUser,
    loginUser,
    getMe
}