import React from 'react';
import './Pagination.css'; 

const Pagination = ({ blogsPerPage, totalBlogs, paginate, currentPage, totalPages }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalBlogs / blogsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                        <span onClick={() => paginate(number)} className="page-link">
                            {number}
                        </span>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
