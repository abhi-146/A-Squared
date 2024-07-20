import React, { useState } from 'react';
import axios from 'axios';
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import asquaredlogo from "../../assets/logo-Asquared.png";
import { Link } from "react-router-dom";
import "./Login.css";
import { apiInstance } from '../../services/apiInstance';

const Signup = ({ closeSignup }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    countryCode: '',
    phone: '',
  });

  const [signupStatus, setSignupStatus] = useState(''); // State for signup status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiInstance.post('/users/signup', formData);
      console.log('Signup response:', response.data);

      setSignupStatus('success'); // Set success status for message

      // Optionally, reset form data here
      setFormData({
        name: '',
        email: '',
        password: '',
        countryCode: '',
        phone: '',
      });
    } catch (error) {
      console.error('Error during signup:', error);
      setSignupStatus('error'); // Set error status for message
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="close-icon" onClick={closeSignup}>
          X
        </div>
        <img src={asquaredlogo} alt="logo" className="login-logo" />
        <h2 className='login-heading'>Sign Up for an account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              name="countryCode"
              placeholder="Country Code"
              value={formData.countryCode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <p className='term-service'>By clicking “Continue” you agree to our Terms of Service and Privacy Policy.</p>

          {signupStatus === 'success' && (
            <p className="success-message">Thank you for signing up! You can now log in to your account.</p>
          )}
          {signupStatus === 'error' && (
            <p className="error-message">Oops! Something went wrong during signup. Please try again later.</p>
          )}

          <button type="submit" className="continue-btn">Continue</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
