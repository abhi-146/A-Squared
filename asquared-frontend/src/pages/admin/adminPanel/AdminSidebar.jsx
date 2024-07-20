import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaPlus, FaEye, FaSignOutAlt, FaBuilding, FaProjectDiagram, FaShoppingCart } from 'react-icons/fa';

const AdminSidebar = ({ onSelectOption, onSignOut }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  return (
    <div className="admin-sidebar">
      <h2>Admin Panel</h2>
      <hr/>
      <ul>
        {/* Back to Home */}
        <li>
          <Link className='back-to-home' to="/">
            <FaHome /> Back to Home
          </Link>
        </li>

        {/* Buy Listings */}
        <li onClick={() => handleCategoryClick('buy')}>
          <p>Buy Listings</p>
          {activeCategory === 'buy' && (
            <ul>
              <li onClick={() => onSelectOption('addBuy')}><FaPlus /> Add Buy Listing</li>
              <li onClick={() => onSelectOption('viewBuy')}><FaEye /> View Buy Listings</li>
            </ul>
          )}
        </li>

        {/* Rent Listings */}
        <li onClick={() => handleCategoryClick('rent')}>
          <p> Rent Listings</p>
          {activeCategory === 'rent' && (
            <ul>
              <li onClick={() => onSelectOption('addRent')}><FaPlus /> Add Rent Listing</li>
              <li onClick={() => onSelectOption('viewRent')}><FaEye /> View Rent Listings</li>
            </ul>
          )}
        </li>

        {/* Commercial Listings */}
        <li onClick={() => handleCategoryClick('commercial')}>
          <p> Commercial Listings</p>
          {activeCategory === 'commercial' && (
            <ul>
              <li onClick={() => onSelectOption('addCommercial')}><FaPlus /> Add Commercial Listing</li>
              <li onClick={() => onSelectOption('viewCommercial')}><FaEye /> View Commercial Listings</li>
            </ul>
          )}
        </li>

        {/* Project Listings */}
        <li onClick={() => handleCategoryClick('project')}>
          <p> New Projects</p>
          {activeCategory === 'project' && (
            <ul>
              <li onClick={() => onSelectOption('addProject')}><FaPlus /> Add New Project</li>
            </ul>
          )}
        </li>

          {/* Blog Listings */}
          <li onClick={() => handleCategoryClick('blog')}>
          <p>Blogs</p>
          {activeCategory === 'blog' && (
            <ul>
              <li onClick={() => onSelectOption('addBlog')}><FaPlus /> Add Blog</li>
              <li onClick={() => onSelectOption('viewBlog')}><FaEye /> View All Blog</li>
            </ul>
          )}
        </li>

        {/* Sign Out */}
        <li id='sign-out' onClick={onSignOut}>
          <p><FaSignOutAlt /> Sign Out</p>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
