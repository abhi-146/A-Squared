const Blog = require('../models/Blog');
const fs = require('fs'); 
const path = require('path'); 


// Get all blogs
exports.getAllBlogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 6; 
        const skip = (page - 1) * limit;
        const blogType = req.query.blogType || '';

        const query = blogType && blogType !== 'All News' ? { type: blogType } : {};

        const blogs = await Blog.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalBlogs = await Blog.countDocuments(query);

        res.status(200).json({
            blogs,
            totalPages: Math.ceil(totalBlogs / limit),
            currentPage: page,
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// Get blog by ID
exports.getBlogBySlug = async (req, res) => {
    try {
        console.log(req.params)
        const blog = await Blog.findOne({ slug: req.params.id });
        console.log(blog)
        if (blog) {
            res.status(200).json(blog);
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Create a new blog
exports.createBlog = async (req, res) => {

    const blog = new Blog(req.body);

    try {
        const newBlog = await blog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a blog by ID
exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.id });
        if (blog) {
            blog.title = req.body.title || blog.title;
            blog.content = req.body.content || blog.content;
            blog.author = req.body.author || blog.author;
            const updatedBlog = await blog.save();
            res.status(200).json(updatedBlog);
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a blog by ID

exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (blog) {
            // Delete the blog document
            await Blog.findByIdAndDelete(req.params.id);

            // If the blog has a featured image, delete the file from the filesystem
            if (blog.featuredImage) {
                const imagePath =  "." + blog.featuredImage;
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Error deleting image:', err);
                    }
                });
            }

            res.status(200).json({ message: 'Blog and featured image deleted' });
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.uploadImage = async (req, res) => {
    try {
        const slug = req.params.id;

        // Check if files have been uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        // Get the first image URL
        const imageUrl = `/uploads/${req.files[0].filename}`;

        // Find the blog by ID
        const blog = await Blog.findOne({ slug: req.params.id });
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
       
        // Update the blog with the new image URL
        blog.featuredImage = imageUrl;
        blog.slug = slug;

        await blog.save();

        res.status(200).json({
            message: 'Image uploaded and blog updated successfully',
            imageUrl,
            blog
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
