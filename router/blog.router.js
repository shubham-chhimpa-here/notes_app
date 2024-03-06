const express = require('express')
const { BlogModel } = require('../models/blog.model')
const blogRouter = express.Router()


blogRouter.get('/', async (req, res) => {
    const { userId } = req.body;
    const data = await BlogModel.find({ userId: userId });

    res.send({ msg: 'blog data', login: true, data })
})

blogRouter.get('/:blogId', async (req, res) => {
    const { blogId } = req.params;
    const data = await BlogModel.findOne({ _id: blogId })
    res.send({ msg: 'blog', data })
})

blogRouter.post('/create', async (req, res) => {
    const { title, content, userId } = req.body;
    const blog = BlogModel({ title, content, userId });
    const response = await blog.save()
    res.send({ msg: 'new blog has been added', response })

})

blogRouter.patch('/update/:blogId', async (req, res) => {
    const { title, content, userId } = req.body;
    const { blogId } = req.params;

    await BlogModel.findByIdAndUpdate(blogId, { title, content, userId })
    res.send({ msg: 'blog has been updated' })
})

blogRouter.delete('/delete/:blogId', async (req, res) => {
    const { blogId } = req.params;
    await BlogModel.findByIdAndDelete(blogId);
    res.send({ msg: 'blog has been deleted' });
})
module.exports = {
    blogRouter
}