import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import './EditBlog.css';
import axiosInstance from '../axiosInstance';

import { Link } from 'react-router-dom';

const EditBlog = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [featuredImage, setFeaturedImage] = useState(null);
    const [type, setType] = useState('Buying'); 
    const [message, setMessage] = useState(''); 
    const [messageType, setMessageType] = useState(''); 

    const queryString = new URLSearchParams(window.location.search);
    const id = queryString.get('blogId');


    useEffect(() => {
        // Fetch the blog data when the component mounts
        const fetchBlog = async () => {
            try {
                const response = await axiosInstance.get(`/blogs/${id}`);
                const blog = response.data;
                setTitle(blog.title);
                setAuthor(blog.author);
                setContent(blog.content);
                setType(blog.type);
                // You might want to handle the featuredImage separately if needed
            } catch (error) {
                console.error('Error fetching blog:', error);
                setMessage('Error fetching blog data. Please try again.');
                setMessageType('error');
            }
        };

        fetchBlog();
    }, [id]);

    // Function to handle blog update
    const handleUpdate = async (e) => {
        e.preventDefault();

        const blogData = {
            title,
            author,
            content,
            type,
        };

        try {
            await axiosInstance.put(`/blogs/${id}`, blogData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (featuredImage) {
                const formData = new FormData();
                formData.append('images', featuredImage);

                await axiosInstance.post(`/blogs/upload/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }

            setMessage('Blog updated successfully!');
            setMessageType('success');
        } catch (error) {
            console.error('Error updating blog:', error);
            setMessage('Error updating blog. Please try again.');
            setMessageType('error');
        }
    };

    const handleImageUpload = async (e) => {
        e.preventDefault();
        if (!id || !featuredImage) {
            setMessage('Please provide an image and ensure the blog is created.');
            setMessageType('error');
            return;
        }

        const formData = new FormData();
        formData.append('images', featuredImage);

        try {
            await axiosInstance.post(`/blogs/upload/${id}`, formData, {
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

    return (
        <div className="edit-blog">
             <div className='button-edit-buy'>
                    <Link to="/admin">
                    <button className='go-to-admin' type="button">Go to Admin</button>
                    </Link>
            
                </div>
            <h2 className='edit-blog-heading'>Edit Blog</h2>
            <form className="create-blog-form edit-blog-form" onSubmit={handleUpdate}>
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

                <button type="submit">Update Blog</button>
            </form>

            {message && (
                <div className={`admin-message ${messageType}`}>
                    {message}
                </div>
            )}
            
            <form className="image-upload-form" onSubmit={(e) => handleImageUpload(e)}>
                <label htmlFor="featured-image">Featured Image</label>
                <input
                    id="featured-image"
                    type="file"
                    onChange={(e) => setFeaturedImage(e.target.files[0])}
                />
                <button type="submit">Upload Image</button>
            </form>
         
        </div>
    );
};

export default EditBlog;
