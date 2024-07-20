import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AddRentalListing.css';
import { useParams } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const EditRentalListing = () => {
  const getPropertyIdFromQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get('propertyId');
  };

  const propertyId = getPropertyIdFromQuery();

  const [listingData, setListingData] = useState({
    displayImages: [],
    title: '',
    price: 0,
    propertyType: '',
    furnishing: '',
    tagline: '',
    developer: {
      title: '',
      logo: ''
    },
    availableFrom: new Date().toISOString().split('T')[0],
    location: '',
    community: '',
    baths: '',
    beds: '',
    lat: 0,
    lon: 0,
    haveMaid: 0,
    haveStudio: 0,
    area: 0,
    soldType: '',
    description: '',
    amenities: [],
    transaction: {
      soldFor: [],
      rentedFor: []
    },
    priceTrends: [],
    regulatoryInformation: {
      reference: '',
      listed: '',
      brokerOrn: '',
      zoneName: '',
      dldPermitNumber: '',
      barcode: ''
    }
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => {
    if (propertyId) {
      // Fetch existing listing data if in edit mode
      fetchListingData(propertyId);
    }
  }, [propertyId]);

  const fetchListingData = async (propertyId) => {
    try {
      const response = await axiosInstance.get(`http://localhost:5000/api/rentalListings/${propertyId}`);
      const { data } = response;
      setListingData(data);
    } catch (error) {
      console.error('Error fetching listing:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [parent, child] = name.split('.');
    if (child) {
      setListingData((prevData) => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: value
        }
      }));
    } else {
      setListingData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
  };

  const handleUpdateListing = async () => {
    try {
      await axios.put(`http://localhost:5000/api/rentalListings/${propertyId}`, listingData);
      setUploadStatus('Listing updated successfully!');

      // Handle image upload after updating the listing
      if (imageFiles.length > 0) {
        await handleImageUpload();
      }
    } catch (error) {
      console.error('Error updating listing:', error);
      setUploadStatus('Error updating listing. Please try again.');
    }
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    imageFiles.forEach((file) => {
      formData.append('images', file);
    });

    try {
      await axios.post(`http://localhost:5000/api/rentalListings/upload/${propertyId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadStatus((prevStatus) => `${prevStatus} Images uploaded successfully!`);
    } catch (error) {
      console.error('Error uploading images:', error);
      setUploadStatus((prevStatus) => `${prevStatus} Error uploading images. Please try again.`);
    }
  };

  const handleGoToAdmin = () => {
    history.push('/admin');
  };

  return (
    <div className="main-container">
      <div className='button-edit-rental'>
        <Link to="/admin">
          <button className='go-to-admin' type="button">Go to Admin</button>
        </Link>
     
      </div>
      <h2>Edit Rental Listing</h2>
      <div className="listing-form">
        {/* Basic Information */}
        <div className="form-section">
          <h3>Basic Information</h3>
          <label>Title:</label>
          <input type="text" name="title" value={listingData.title} onChange={handleInputChange} placeholder="Title" />

          <label>Price:</label>
          <input type="number" name="price" value={listingData.price} onChange={handleInputChange} placeholder="Price" />

          <label>Property Type:</label>
          <input type="text" name="propertyType" value={listingData.propertyType} onChange={handleInputChange} placeholder="Property Type" />

          <label>Furnishing:</label>
          <select className='furnishing-options' name="furnishing" value={listingData.furnishing} onChange={handleInputChange}>
            <option value="Furnished">Furnished</option>
            <option value="Semi-Furnished">Semi-Furnished</option>
            <option value="Unfurnished">Unfurnished</option>
          </select>

          <label>Tagline:</label>
          <input type="text" name="tagline" value={listingData.tagline} onChange={handleInputChange} placeholder="Tagline" />

          <label>Developer Title:</label>
          <input type="text" name="developer.title" value={listingData.developer.title} onChange={handleInputChange} placeholder="Developer Title" />

          <label>Developer Logo:</label>
          <input type="text" name="developer.logo" value={listingData.developer.logo} onChange={handleInputChange} placeholder="Developer Logo URL" />

          <label>Available From:</label>
          <input type="date" name="availableFrom" value={listingData.availableFrom} onChange={handleInputChange} />
        </div>

        {/* Location and Property Details */}
        <div className="form-section">
          <h3>Location and Property Details</h3>
          <label>Location:</label>
          <input type="text" name="location" value={listingData.location} onChange={handleInputChange} placeholder="Location" />

          <label>Community:</label>
          <input type="text" name="community" value={listingData.community} onChange={handleInputChange} placeholder="Community" />

          <label>Baths:</label>
          <input type="text" name="baths" value={listingData.baths} onChange={handleInputChange} placeholder="Baths" />

          <label>Beds:</label>
          <input type="text" name="beds" value={listingData.beds} onChange={handleInputChange} placeholder="Beds" />

          <label>Area:</label>
          <input type="number" name="area" value={listingData.area} onChange={handleInputChange} placeholder="Area" />

          <label>Maid Room:</label>
            <input type="number" name="haveMaid" value={listingData.haveMaid} onChange={handleInputChange} placeholder="Maid" />

            <label>Studio Room:</label>
            <input type="number" name="haveStudio" value={listingData.haveStudio} onChange={handleInputChange} placeholder="Studio" />


            <label>Latitude:</label>
            <input type="number" name="lat" value={listingData.lat} onChange={handleInputChange} placeholder="lat" />
            <label>Longitude:</label>
            <input type="number" name="lon" value={listingData.lon} onChange={handleInputChange} placeholder="lon" />
        </div>

        {/* Transaction Details */}
        <div className="form-section">
          <h3>Transaction Details</h3>
          <label>Sold Type:</label>
          <input type="text" name="soldType" value={listingData.soldType} onChange={handleInputChange} placeholder="Sold Type" />

          <label>Description:</label>
          <textarea name="description" value={listingData.description} onChange={handleInputChange} placeholder="Description"></textarea>

          <label>Amenities:</label>
          <input type="text" name="amenities" value={listingData.amenities} onChange={handleInputChange} placeholder="Amenities (comma-separated)" />
        </div>

        {/* Regulatory Information */}
        <div className="form-section">
          <h3>Regulatory Information</h3>
          <label>Reference:</label>
          <input type="text" name="regulatoryInformation.reference" value={listingData.regulatoryInformation.reference} onChange={handleInputChange} placeholder="Reference" />

          <label>Listed:</label>
          <input type="text" name="regulatoryInformation.listed" value={listingData.regulatoryInformation.listed} onChange={handleInputChange} placeholder="Listed" />

          <label>Broker ORN:</label>
          <input type="text" name="regulatoryInformation.brokerOrn" value={listingData.regulatoryInformation.brokerOrn} onChange={handleInputChange} placeholder="Broker ORN" />

          <label>Zone Name:</label>
          <input type="text" name="regulatoryInformation.zoneName" value={listingData.regulatoryInformation.zoneName} onChange={handleInputChange} placeholder="Zone Name" />

          <label>DLD Permit Number:</label>
          <input type="text" name="regulatoryInformation.dldPermitNumber" value={listingData.regulatoryInformation.dldPermitNumber} onChange={handleInputChange} placeholder="DLD Permit Number" />

          <label>Barcode:</label>
          <input type="text" name="regulatoryInformation.barcode" value={listingData.regulatoryInformation.barcode} onChange={handleInputChange} placeholder="Barcode" />
        </div>

        {/* Upload Images */}
        <div className="form-section">
          <h3>Upload Images</h3>
          <input className='input-file' type="file" multiple onChange={handleImageChange} />
        </div>

        {/* Button to update listing */}
        <button onClick={handleUpdateListing}>Update Listing</button>
        {uploadStatus && <p>{uploadStatus}</p>}
      </div>
    </div>
  );
};

export default EditRentalListing;
