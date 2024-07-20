const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');
const upload = require('../config/uploadConfig');

// CRUD routes
router.post('/upload/:id', upload, blogController.uploadImage);
router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogBySlug);
router.post('/', blogController.createBlog);
router.put('/:id', blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);


module.exports = router;
