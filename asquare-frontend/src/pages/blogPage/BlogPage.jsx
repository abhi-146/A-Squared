import React, { useEffect, useState } from 'react';
import './BlogPage.css';
import { apiInstance } from '../../services/apiInstance';
import blogImage from "../../assets/blog_image.jpg";
import Pagination from '../pagination/Pagination';
import { Link } from 'react-router-dom';


const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [blogsPerPage] = useState(3);
    const [filter, setFilter] = useState('All News');
    const baseUrl = "http://localhost:5000";

    useEffect(() => {
        const fetchBlogs = async () => {
            const res = await apiInstance.get(`/blogs?page=${currentPage}&blogType=${filter}`);
            setBlogs(res.data.blogs);
            setTotalPages(res.data.totalPages)
        };

        fetchBlogs();
    }, [currentPage, filter]);

    // Get current blogs
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle filter change
    const handleFilterChange = (filterValue) => {
        setFilter(filterValue);
        setCurrentPage(1);
    };

    const filterOptions = [
        'All News', 'Buying', 'Renting', 'New Projects', 'Investment', 'Dubai'
    ];

    return (
        <div className="blog-page">
            <div
                className="blog-hero-section"
                style={{
                    backgroundImage: `url(${blogImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'white',
                    padding: '100px 20px',
                    paddingTop: '130px',
                    textAlign: 'center',
                }}
            >
                <h1 >Welcome to Our Blog</h1>
                <div className="blog-search-bar">
                    <div className="blog-filter-buttons">
                        {filterOptions.map(option => (
                            <button
                                key={option}
                                onClick={() => handleFilterChange(option)}
                                className={`blog-filter-button ${filter === option ? 'active' : ''}`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="blog-latest-blogs">
                <h2 className="blog-page-title">Latest Blogs</h2>
                <div className="blog-blog-cards">
                    {currentBlogs.map(blog => (
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
                <Pagination
                    blogsPerPage={blogsPerPage}
                    totalBlogs={blogs.length}
                    paginate={paginate}
                    currentPage={currentPage}
                    totalPages={totalPages}
                />
            </div>
        </div>
    );
};

export default BlogPage;
