const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema({
    featuredImage: {
        type: String,
        required: false,
    },
    type: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Pre-save hook to generate slug from title
blogSchema.pre('validate', function (next) {
    if (this.isModified('title')) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

module.exports = mongoose.model('Blog', blogSchema);
