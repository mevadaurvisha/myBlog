const express = require('express');
const routes = express.Router();
const upload = require('../middleware/multer');
const blogController = require('../controllers/blogController');
const { ensureAuthenticated } = require('../middleware/auth');

routes.get('/addBlog' , ensureAuthenticated, blogController.addBlogController);
routes.post('/abbBlogForm' , ensureAuthenticated, upload.single('image'), blogController.addBlogFormController);
routes.get('/myBlog' , ensureAuthenticated , blogController.viewMyBlogController);
routes.get('/getAllBlogs', blogController.allBlogController);
routes.get('/editBlog/:id' , ensureAuthenticated, blogController.editBlogController)//render edit form
routes.post('/editBlogForm/:id' , ensureAuthenticated,upload.single('image'), blogController.editFormController);//edit process
routes.post('/deleteBlog/:id' , ensureAuthenticated, blogController.deleteBlogController);

routes.post('/commentForm/:id' , blogController.addcommentController)
module.exports = routes;