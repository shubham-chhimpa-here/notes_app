const express = require('express');
const { connection } = require('./db');
const { userRouter } = require('./router/user.router');
const app = express()

require('dotenv').config() //envirnment variables 


const PORT = process.env.PORT;

app.use(express.json()) //parsing the data

app.get('/', (req, res) => {
    res.send('homepage')
})

app.use('/user', userRouter)

app.listen(PORT, () => {
    try {
        connection
        console.log(`connected to db`)
        console.log(`server is running on port ${PORT}`)
    } catch (error) {
        console.log(error)
    }
})