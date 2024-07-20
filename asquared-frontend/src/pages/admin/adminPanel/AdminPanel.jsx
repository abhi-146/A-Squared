import React, { useState, useEffect } from 'react';
import './AdminPanel.css';
import AdminSidebar from './AdminSidebar';
import AddRentalListing from '../addRentalListing/AddRentalListing';
import ViewRentalListings from '../addRentalListing/ViewRentalListings';
import axios from 'axios'; // Import Axios
import { apiInstance } from '../../../services/apiInstance';
import Cookies from 'js-cookie';
import { RiAccountCircleLine } from "react-icons/ri";
import AddBuyListing from '../addBuyListing/AddBuyListing';
import ViewBuyListings from '../addBuyListing/ViewBuyListings';
import AddCommercialListing from '../addCommercialListing/AddCommercialListing';
import ViewCommercialListings from '../addCommercialListing/ViewCommercialListings';
import AddOffPlanListing from '../addOffPlanListing/AddOffPlanListing';
import CreateBlog from '../addBlog/CreateBlog';
import BlogList from '../addBlog/BlogList';


const AdminPanel = () => {
  const [selectedOption, setSelectedOption] = useState('addRent');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await apiInstance.post('/users/signin', { email, password });
      console.log(response)
      const token = response.data.token;

      // Store token in cookie (assuming you are using js-cookie)
      Cookies.set('token', token, { expires: 7 });

      setIsLoggedIn(true);
      setError('');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  const handleSignOut = () => {
    // Remove token from cookie
    Cookies.remove('token');
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  const renderContent = () => {
    if (!isLoggedIn) {
      // If not authenticated, render sign-in form
      return (
        <div className="admin-content">
          <h2><RiAccountCircleLine/>Sign In</h2>
          <form  onSubmit={handleSignIn}>
            <div className="form-group">
              <label>email</label>
              <input
                type="text"
                value={email}
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button className='back-to-home' type="submit">Sign In</button>
          </form>
        </div>
      );
    }

    // If authenticated, render admin panel content based on selectedOption
    switch (selectedOption) {
      case 'addRent':
        return <AddRentalListing />;
      case 'viewRent':
        return <ViewRentalListings />;
      case 'addBuy':
        return <AddBuyListing />;
      case 'viewBuy':
        return <ViewBuyListings />;
      case 'addCommercial':
      return <AddCommercialListing />;
      case 'viewCommercial':
        return <ViewCommercialListings />;
      case 'addProject':
        return <AddOffPlanListing />;
      case 'addBlog':
        return <CreateBlog />;
      case 'viewBlog':
        return <BlogList />;
      default:
        return (
          <div className="admin-content">
            <h2>Welcome to Admin Panel</h2>
            <p>Please select an option from the sidebar.</p>
          </div>
        );
    }
  };

  return (
    <div className="sadmin-panel">
      {isLoggedIn&&
      <AdminSidebar onSelectOption={setSelectedOption} onSignOut={handleSignOut} />
      }
      <div className="admin-content-container">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPanel;
