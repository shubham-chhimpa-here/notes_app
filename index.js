const express = require('express');
const { connection } = require('./db');
const { userRouter } = require('./router/user.router');
const cors = require('cors');
const { blogRouter } = require('./router/blog.router');
const cookieParser = require('cookie-parser');
const { userAuth } = require('./middlewares/auth.middleware');
const app = express()

require('dotenv').config() //envirnment variables 


const PORT = process.env.PORT;

app.use(cors({
    origin: process.env.frontend_url,
    credentials: "true",
}))
app.use(cookieParser())
app.use(express.json()) //parsing the data

app.get('/', (req, res) => {
    res.send({msg: 'homepage'})
})

app.use('/user', userRouter)
app.use('/blog', userAuth, blogRouter)

app.listen(PORT, () => {
    try {
        connection
        console.log(`connected to db`)
        console.log(`server is running on port ${PORT}`)
    } catch (error) {
        console.log(error)
    }
})