const express = require('express')

const userRouter = express.Router()


// Register a new user
userRouter.post('/register', (req, res) => {
    res.send('user has been registerd')
})


// Login a user and send token for private/protected routes
userRouter.post('/login', (req, res) => {
    res.send('user has logged in')
})

// Log out user and expire token
userRouter.get('/logout', (req, res) => {
    res.send('user has been logged out')
})


module.exports = {
    userRouter
}