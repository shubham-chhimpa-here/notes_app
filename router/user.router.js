const express = require('express')
const { UserModel } = require('../models/user.model');
const { hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

const userRouter = express.Router()

userRouter.get('/', async (req, res) => {
    const data = await UserModel.find();
    res.send(data)
})

// Register a new user
userRouter.post('/register', async (req, res) => {
    const { email, password, username } = req.body;
    const isExist = await UserModel.findOne({ email: email });
    if (isExist) res.send({ msg: "user already exist" });
    else {
        try {
            const hash = hashSync(password, 10)
            const user = UserModel({ email, password: hash, username })
            await user.save()
            res.json({ msg: 'user has been created succesfully', user })
        } catch (error) {
            console.log(error)
            res.send({ msg: 'something went wrong' })
        }
    }
})


// Login a user and send token for private/protected routes
userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
        const isAuth = compareSync(password, user.password)
        if (isAuth) {

            const token = sign({ username: user.username, email: user.email, userId: user._id }, process.env.jwtKey, { expiresIn: '24h' })
            res.cookie('token', token);
            res.send('user logged in')
        }
        else {
            res.send('wrong password')
        }
    }
    else {
        res.send({ msg: 'user not found' })
    }
})

userRouter.delete('/', async (req, res) => {
    const x = req.query;
    if (x.admin == 'true') {
        const resp = await UserModel.deleteMany();
        res.send({ resp })
    }
    else {
        res.send({ msg: 'not authorized for the opration' })
    }

})

// Log out user and expire token
userRouter.get('/logout', (req, res) => {
    res.send({ msg: 'user has been logged out' })
})


module.exports = {
    userRouter
}