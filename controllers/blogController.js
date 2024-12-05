const blogModel = require('../models/blogModel');
const userModel = require('../models/userModel');
const commentModel = require('../models/commentModel');

const addBlogController = (req, res) => {

    res.render('addBlog');
}

const addBlogFormController = async (req, res) => {

    try { 

        const newBlog = new blogModel({
            title : req.body.title,
            content : req.body.content,
            image : req.file.filename,
            user : req.user.id
        })

        await newBlog.save();
        res.redirect('/myBlog');
    }
    catch (err) {
        console.log('add blog err : ', err);
        res.send('catch err');
    }

    console.log('Blog Added Sucessfully...');
}

const viewMyBlogController = async (req, res) => {

    try  {

        const blogs = await blogModel.find({user : req.user._id});

        res.render('myBlog' , {blogs});
    }
    catch (err) {
        res.send('My blog error');
    }
}

const allBlogController = async (req, res) => {

    try {

        const blogs = await blogModel.find().populate('user', 'name'); 
        
        const comments = await commentModel.find().populate({
            path : 'blog',
            select : '_id',
            populate : {path : 'user' , select : 'name'}
        }).populate('user' , 'name');

        res.render('allBlogs' , {blogs, comments});

    }catch(err) {
        res.send('view blog error');
    }
}

const editBlogController = async (req, res) => {

    try { 

        const blog = await blogModel.findById(req.params.id);

        if(!blog) {
            res.send('blog not found..');
        }

        if(blog.user.toString() !== req.user.id) {
            return res.send('umauthorized user!!');
        }

        res.render('editBlog' , {blog});

    }catch (err) {
        res.send('edit blog err' , err);
    }
}

const editFormController = async (req, res) => {

    try {

        const blog = await blogModel.findById(req.params.id);

        blog.title = req.body.title;
        blog.content = req.body.content;
        if(req.file) {
            blog.image = req.file.filename;
        }

        await blog.save();

        res.redirect('/myBlog');

    }catch (err) {
        console.log('edit form error',err);
        res.send('edited form can not submitted..');
    }

    console.log('blog editd sucessfully...');
}

const deleteBlogController = async (req, res) => {

    try { 

        const blog = await blogModel.findById(req.params.id);

        await blogModel.findByIdAndDelete(req.params.id);

        res.redirect('/myBlog');

    }catch (err) {
        console.log('delete blog error' , err);
        res.send('delete blog error..');
    }

    console.log('blog deleted sucessfully...');
}

const addcommentController = async (req, res) => {

    try {

        const newComment = new commentModel({
            comment : req.body.comment,
            blog : req.params.id,
            user : req.user.id
        })

        await newComment.save();

        console.log('new comment added sucessfully..' , newComment);

        res.redirect('/getAllBlogs');
    }
    catch (err) {
        console.log('err', err);
        res.send('comment error');
    }
}


module.exports = {addBlogController, addBlogFormController, viewMyBlogController, allBlogController, editBlogController, editFormController, deleteBlogController, addcommentController}