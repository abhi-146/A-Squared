import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import './CreateBlog.css';
import axiosInstance from '../axiosInstance';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [featuredImage, setFeaturedImage] = useState(null);
    const [type, setType] = useState('Buying');
    const [blogId, setBlogId] = useState(null); 
    const [showImageUpload, setShowImageUpload] = useState(false); 
    const [message, setMessage] = useState(''); 
    const [messageType, setMessageType] = useState(''); 

    // Function to create the blog without the image
    const handleSubmit = async (e) => {
        e.preventDefault();

        const blogData = {
            title,
            author,
            content,
            type,
        };

        try {
            const response = await axiosInstance.post('/blogs', blogData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const newBlogId = response.data._id; // Get the blog ID
            setBlogId(newBlogId);
            setShowImageUpload(true); // Show image upload field
            setMessage('Blog created successfully! Now upload the featured image.');
            setMessageType('success');
        } catch (error) {
            console.error('Error creating blog:', error);
            setMessage('Error creating blog. Please try again.');
            setMessageType('error');
        }
    };

    // Function to upload the featured image
    const handleImageUpload = async (e) => {
        e.preventDefault();
        if (!blogId || !featuredImage) {
            setMessage('Please provide an image and ensure the blog is created.');
            setMessageType('error');
            return;
        }

        const formData = new FormData();
        formData.append('images', featuredImage);

        try {
            await axiosInstance.post(`/blogs/upload/${blogId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Image uploaded successfully!');
            setMessageType('success');

        } catch (error) {
            console.error('Error uploading image:', error);
            setMessage('Error uploading image. Please try again.');
            setMessageType('error');
        }
    };

    const resetFields = () => {
        setTitle('');
        setAuthor('');
        setContent('');
        setFeaturedImage(null);
        setType('Buying');
        setBlogId(null);
        setShowImageUpload(false);
        setMessage('');
        setMessageType('');
    };


    return (
        <div className="create-blog">
            <h2 className='edit-blog-heading'>Create New Blog</h2>
            <form className="create-blog-form" onSubmit={handleSubmit}>
                <label htmlFor="blog-title">Blog Title</label>
                <input
                    id="blog-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Blog Title"
                    required
                />
              
                <label htmlFor="blog-content">Blog Content</label>
                <ReactQuill
                    id="blog-content"
                    value={content}
                    onChange={setContent}
                    placeholder="Blog Content"
                    className="blog-editor"
                    required
                />
                
                <label htmlFor="blog-author">Blog Author</label>
                <input
                    id="blog-author"
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Blog Author"
                    required
                />
                
                <label htmlFor="blog-type">Blog Type</label>
                <select
                    id="blog-type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="blog-type-select"
                    required
                >
                    <option value="Buying">Buying</option>
                    <option value="Renting">Renting</option>
                    <option value="New Projects">New Projects</option>
                    <option value="Investment">Investment</option>
                    <option value="Dubai">Dubai</option>
                </select>
                <div >
                    <button type="submit">Create Blog</button>
                    <button onClick={resetFields}>Reset Fields</button> 
                </div>
            </form>

            {message && (
                <div className={`admin-message ${messageType}`}>
                    {message}
                </div>
            )}

            {showImageUpload && (
                <form className="image-upload-form" onSubmit={handleImageUpload}>
                    <label htmlFor="featured-image">Featured Image</label>
                    <input
                        id="featured-image"
                        type="file"
                        onChange={(e) => setFeaturedImage(e.target.files[0])}
                        required
                    />
                    <button type="submit">Upload Image</button>
                </form>
            )}
        </div>
    );
};

export default CreateBlog;
