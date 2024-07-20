import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ViewCommercialListings.css';
import axiosInstance from '../axiosInstance';

const ViewCommercialListings = () => {
  const [listings, setListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:5000/api/commercialListings/', {
          params: { page: currentPage }
        });
        setListings(response.data.commercialListings);
        setTotalPages(response.data.totalPages); // Assuming the API returns totalPages
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, [currentPage]);

  const handleDelete = async (id) => {
    try {
      const res = await axiosInstance.delete(`http://localhost:5000/api/commerciallistings/${id}`);
      setListings(listings.filter(listing => listing._id !== id));
      console.log(res)
      if(res.data.message){
        alert(res.data.message)
      }
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  console.log(listings)
  

  return (
    <div className="view-listings-container">
      <h2>Commercial Listings</h2>
      <div className="listings">
        {listings.map(listing => (
          <div key={listing._id} className="listing-card">
            {listing.displayImages[0] && (
              <img src={`http://localhost:5000${listing.displayImages[0]}`} alt={listing.title} className="listing-image" />
            )}
            <span className="adm-listing-title">{listing.title}</span>
            <div className="listing-buttons">
              <Link to={`/edit-commercial-listing?propertyId=${listing._id}`} className="edit-button">Edit</Link>
              <button onClick={() => handleDelete(listing._id)} className="delete-button">Delete</button>
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

export default ViewCommercialListings;
