import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './SingleBlog.css';
import { apiInstance } from '../../services/apiInstance';
import env from "react-dotenv";
import ad from "../../assets/right-ad.gif";
const SingleBlog = () => {
    const params = new URLSearchParams(location.search);
    const slug = params.get('blogId');
    const [blog, setBlog] = useState(null);
    const [moreBlogs, setMoreBlogs] = useState([]);
const baseUrl = "http://localhost:5000";

    useEffect(() => {
        // Fetch the single blog by ID
        const fetchBlog = async () => {
            try {
                const response = await apiInstance.get(`/blogs/${slug}`);
                console.log(response.data)
                setBlog(response.data);
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        };

        // Fetch more blogs
        const fetchMoreBlogs = async () => {
            try {
                const response = await apiInstance.get('/blogs');
                setMoreBlogs(response.data.blogs.filter(b => b.slug !== slug));
            } catch (error) {
                console.error('Error fetching more blogs:', error);
            }
        };

        fetchBlog();
        fetchMoreBlogs();
    }, [slug]);

    return (
        <div className="single-blog-page">
            <div className="navbar-placeholder"></div>
            <div className="blog-container">
                <div className="blog-content">
                    {blog && (
                        <>
                            <img src={baseUrl + blog.featuredImage} alt={blog.title} className="featured-image" />
                            <div className="blog-details">
                                <h1>{blog.title}</h1>
                                <div className="blog-blog-card-author">
                                <p>Author: {blog.author}</p>
                                <p>Date Published: {new Date(blog.createdAt).toLocaleDateString()}</p>
                            </div>
                                <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
                            
                            </div>
                        </>
                    )}
                    <hr/>
                    <div className="blog-page-title">Explore More </div>
                    <div className="blog-blog-cards">
                    {moreBlogs.slice(0, 3).map(blog => (
                 <Link to={`/single-blog?blogId=${blog.slug}`} className="blog-blog-card" key={blog._id}>
                            <div className="blog-blog-card-image">
                                {blog.featuredImage && <img src={baseUrl + blog.featuredImage} alt={blog.title} className="blog-featured-image" />}
                            </div>
                            <div className="blog-blog-card-author">
                                <p>{blog.author}</p>
                                <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="blog-blog-card-title">
                                <h3>{blog.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
                </div>
                <div className="single-blog-sidebar">
                    <a href="/">
                        <img src={ad} alt="Ad" className="ad-image" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SingleBlog;
