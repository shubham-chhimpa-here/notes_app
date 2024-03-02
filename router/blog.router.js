const express = require('express')
const { BlogModel } = require('../models/blog.model')
const blogRouter = express.Router()


blogRouter.get('/', async (req,res) => {
    const {userId} = req.body;
    const data = await BlogModel.find({ userId : userId});
    
    res.send({msg: 'blog data', login: true , data})
})

blogRouter.post('/create', async (req, res) => {
    const { title, content, userId } = req.body;
    console.log(req.body)
    const blog = BlogModel({title, content, userId});
    const response = await blog.save()
    res.send({msg: 'new blog has been added', response})

})
module.exports = {
    blogRouter
}