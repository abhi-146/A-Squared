import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import './BlogList.css';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [totalPages, setTotalPages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axiosInstance.get(`/blogs?page=${currentPage}`);
                setBlogs(res.data.blogs);
                setTotalPages(res.data.totalPages);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
      };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await axiosInstance.delete(`/blogs/${id}`);
                setBlogs(blogs.filter(blog => blog._id !== id));
                alert('Blog deleted successfully!');
            } catch (error) {
                console.error('Error deleting blog:', error);
            }
        }
    };

    return (
        <div className="view-listings-container">
            <h2>All Blogs</h2>
            <div className="listings">
                {blogs.map(blog => (
                    <div key={blog._id} className="listing-card">
                        {blog.featuredImage && (
                            <img
                                src={`http://localhost:5000${blog.featuredImage}`}
                                alt={blog.title}
                                className="listing-image"
                            />
                        )}
                        <div className="blog-info">
                            <h3 className="blog-title">{blog.title}</h3>
                            <p className="blog-author">Author: {blog.author}</p>
                        </div>
                        <div className="listing-buttons">
                            <Link to={`/edit-blog?blogId=${blog.slug}`} className="edit-button">Edit</Link>
                            <button onClick={() => handleDelete(blog._id)} className="delete-button">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={page === currentPage ? 'active' : ''}
          >
            {page}
          </button>
        ))}
      </div>
        </div>
    );
};

export default BlogList;
