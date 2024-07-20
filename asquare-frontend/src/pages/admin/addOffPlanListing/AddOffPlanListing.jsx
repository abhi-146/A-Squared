// AddOffPlanListing.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './AddOffPlanListing.css'; // Import your CSS file for styling
import axiosInstance from '../axiosInstance';

const AddOffPlanListing = () => {
  const [listingData, setListingData] = useState({
    displayImages: [],
    title: '',
    rent: '',
    developer: {
      title: '',
      logo: ''
    },
    location: '',
    community: '',
    baths: '',
    beds: '',
    area: 0,
    city: '',
    lat: 0,
    lon: 0,
    information: {
      deliveryDate: '',
      numberOfBuildings: 0,
      paymentPlan: '',
      governmentFees: 0,
      propertyType: ''
    },
    description: '',
    paymentPlan: {
      downPayment: 0,
      duringConstruction: 0,
      onHandover: 0
    },
    projectTimeline: {
      projectAnnouncement: '',
      constructionStarted: '',
      expectedCompletion: ''
    },
    units: {
      apartment: {
        status: false,
        floors: "",
        areas: "",
        apartmentFloorImages: []
      },
      penthouse: {
        status: false,
        floors: "",
        areas: "",
        penthouseFloorImages: []
      },
      townhouse: {
        status: false,
        floors: "",
        areas: "",
        townhouseFloorImages: []
      },
      duplex: {
        status: false,
        floors: "",
        areas: "",
        duplexFloorImages: []
      },
      villa: {
        status: false,
        floors: "",
        areas: "",
        villaFloorImages: []
      }
    },
    masterplan: [],
    amenities: []
  });

  const [imageFile, setImageFile] = useState(null);
  const [uploadedId, setUploadedId] = useState(null);
  const [showUploadFields, setShowUploadFields] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      const unitType = name.split('.')[1]; // Extract unit type (apartment, penthouse, etc.)
      setListingData({
        ...listingData,
        units: {
          ...listingData.units,
          [unitType]: {
            ...listingData.units[unitType],
            status: checked
          }
        }
      });
    } else {
      setListingData({ ...listingData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleAddListing = async () => {
    try {
      const response = await axiosInstance.post('/offPlanListings/', listingData);
      const { _id } = response.data;
      setUploadedId(_id);
      setShowUploadFields(true); 
    } catch (error) {
      console.error('Error adding listing:', error);
    }
  };

  const handleDisplayImagesChange = async (e) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < e.target.files.length; i++) {
        formData.append('images', e.target.files[i]);
      }
  
      const response = await axios.post(`http://localhost:5000/api/offPlanListings/upload/displayImages/${uploadedId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log('Display images uploaded successfully:', response.data);
  
    } catch (error) {
      console.error('Error uploading display images:', error);
    }
  };
  
  const handleMasterPlanImageChange = async (e) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < e.target.files.length; i++) {
        formData.append('images', e.target.files[i]);
      }
  
      const response = await axios.post(`http://localhost:5000/api/offPlanListings/upload/masterplan/${uploadedId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log('Master plan images uploaded successfully:', response.data);
  
    } catch (error) {
      console.error('Error uploading master plan images:', error);
    }
  };
  
  const handleApartmentImageChange = async (e) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < e.target.files.length; i++) {
        formData.append('images', e.target.files[i]);
      }
  
      const response = await axios.post(`http://localhost:5000/api/offPlanListings/upload/apartment/${uploadedId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log('Apartment floor images uploaded successfully:', response.data);
  
    } catch (error) {
      console.error('Error uploading apartment floor images:', error);
    }
  };
  
  const handlePenthouseImageChange = async (e) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < e.target.files.length; i++) {
        formData.append('images', e.target.files[i]);
      }
  
      const response = await axios.post(`http://localhost:5000/api/offPlanListings/upload/penthouse/${uploadedId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log('Penthouse floor images uploaded successfully:', response.data);
  
    } catch (error) {
      console.error('Error uploading penthouse floor images:', error);
    }
  };
  
  const handleTownhouseImageChange = async (e) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < e.target.files.length; i++) {
        formData.append('images', e.target.files[i]);
      }
  
      const response = await axios.post(`http://localhost:5000/api/offPlanListings/upload/townhouse/${uploadedId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log('Townhouse floor images uploaded successfully:', response.data);
  
    } catch (error) {
      console.error('Error uploading townhouse floor images:', error);
    }
  };
  
  const handleDuplexImageChange = async (e) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < e.target.files.length; i++) {
        formData.append('images', e.target.files[i]);
      }
  
      const response = await axios.post(`http://localhost:5000/api/offPlanListings/upload/duplex/${uploadedId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log('Duplex floor images uploaded successfully:', response.data);
  
    } catch (error) {
      console.error('Error uploading duplex floor images:', error);
    }
  };
  
  const handleVillaImageChange = async (e) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < e.target.files.length; i++) {
        formData.append('images', e.target.files[i]);
      }
  
      const response = await axios.post(`http://localhost:5000/api/offPlanListings/upload/villa/${uploadedId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log('Villa floor images uploaded successfully:', response.data);
  
    } catch (error) {
      console.error('Error uploading villa floor images:', error);
    }
  };

  const handleNestedInputChange = (event) => {
    const { name, value } = event.target;
  
    // Split the name attribute into nested keys
    const keys = name.split('.');
  
    // Create a function to recursively update nested state
    const updateNestedState = (obj, keys, value) => {
      if (keys.length === 1) {
        return { ...obj, [keys[0]]: value };
      }
      return { ...obj, [keys[0]]: updateNestedState(obj[keys[0]], keys.slice(1), value) };
    };
  
    // Update state using the function
    setListingData(prevState => updateNestedState(prevState, keys, value));
  };
  
  

  return (
    <div className="main-container">
      <h2>Add Off-Plan Listing</h2>
      <div className="listing-form">
        {/* Flexbox layout for form */}
        <div className="form-section-container">
          {/* Basic Information */}
          <div className="form-section">
            <h3>Basic Information</h3>
            <label>Title:</label>
            <input type="text" name="title" value={listingData.title} onChange={handleInputChange} placeholder="Title" />

            <label>Rent:</label>
            <input type="text" name="rent" value={listingData.rent} onChange={handleInputChange} placeholder="Rent" />

            <label>Developer Title:</label>
            <input type="text" name="developer.title" value={listingData.developer.title} onChange={handleNestedInputChange} placeholder="Developer Title" />

            <label>Location:</label>
            <input type="text" name="location" value={listingData.location} onChange={handleInputChange} placeholder="Location" />

            <label>Community:</label>
            <input type="text" name="community" value={listingData.community} onChange={handleInputChange} placeholder="Community" />

            <label>City:</label>
            <input type="text" name="city" value={listingData.city} onChange={handleInputChange} placeholder="City" />

            <label>Latitude:</label>
            <input type="number" name="lat" value={listingData.lat} onChange={handleInputChange} placeholder="Latitude" />

            <label>Longitude:</label>
            <input type="number" name="lon" value={listingData.lon} onChange={handleInputChange} placeholder="Longitude" />
          </div>

          {/* Information */}
          <div className="form-section">
            <h3>Information</h3>
            <label>Delivery Date:</label>
            <input type="date" name="information.deliveryDate" value={listingData.information.deliveryDate} onChange={handleNestedInputChange} />

            <label>Number of Buildings:</label>
            <input type="number" name="information.numberOfBuildings" value={listingData.information.numberOfBuildings} onChange={handleNestedInputChange} />

            <label>Payment Plan:</label>
            <input type="text" name="information.paymentPlan" value={listingData.information.paymentPlan} onChange={handleNestedInputChange} />

            <label>Government Fees:</label>
            <input type="number" name="information.governmentFees" value={listingData.information.governmentFees} onChange={handleNestedInputChange} />

            <label>Property Type:</label>
            <input type="text" name="information.propertyType" value={listingData.information.propertyType} onChange={handleNestedInputChange} />
          </div>

          {/* Payment Plan */}
          <div className="form-section">
            <h3>Payment Plan</h3>
            <label>Down Payment:</label>
            <input type="number" name="paymentPlan.downPayment" value={listingData.paymentPlan.downPayment} onChange={handleNestedInputChange} />

            <label>During Construction:</label>
            <input type="number" name="paymentPlan.duringConstruction" value={listingData.paymentPlan.duringConstruction} onChange={handleNestedInputChange} />

            <label>On Handover:</label>
            <input type="number" name="paymentPlan.onHandover" value={listingData.paymentPlan.onHandover} onChange={handleNestedInputChange} />
          </div>

          {/* Project Timeline */}
          <div className="form-section">
            <h3>Project Timeline</h3>
            <label>Project Announcement:</label>
            <input type="date" name="projectTimeline.projectAnnouncement" value={listingData.projectTimeline.projectAnnouncement} onChange={handleNestedInputChange} />

            <label>Construction Started:</label>
            <input type="date" name="projectTimeline.constructionStarted" value={listingData.projectTimeline.constructionStarted} onChange={handleNestedInputChange} />

            <label>Expected Completion:</label>
            <input type="date" name="projectTimeline.expectedCompletion" value={listingData.projectTimeline.expectedCompletion} onChange={handleNestedInputChange} />
          </div>

          {/* Units */}
       
          <div className="form-section">
            <h3>Units</h3>
            <label>Apartment:</label>
            <input type="checkbox" name="units.apartment.status" checked={listingData.units.apartment.status} onChange={handleInputChange} />
            {listingData.units.apartment.status && (
              <>
                <label>Floors:</label>
                <input type="text" name="units.apartment.floors" value={listingData.units.apartment.floors} onChange={handleNestedInputChange} placeholder="Floors" />

                <label>Apartments Areas:</label>
                <input type="text" name="units.apartment.areas" value={listingData.units.apartment.areas} onChange={handleNestedInputChange} placeholder="Areas" />

                {/* Example for file input */}
                {showUploadFields && (
  <div>
    <label>Apartment Floor Images:</label>
    <input
      type="file"
      multiple
      name="units.apartment.apartmentFloorImages"
      onChange={handleApartmentImageChange}
    />
  </div>
)}

              </>
            )}

            <label>Penthouse:</label>
            <input type="checkbox" name="units.penthouse.status" checked={listingData.units.penthouse.status} onChange={handleInputChange} />
            {listingData.units.penthouse.status && (
              <>
                <label>Floors:</label>
                <input type="text" name="units.penthouse.floors" value={listingData.units.penthouse.floors} onChange={handleNestedInputChange} placeholder="Floors" />

                <label>Penthouse Areas:</label>
                <input type="text" name="units.penthouse.areas" value={listingData.units.penthouse.areas} onChange={handleNestedInputChange} placeholder="Areas" />

                {/* Example for file input */}
                {showUploadFields && (
  <div>
    <label>Penthouse Floor Images:</label>
    <input
      type="file"
      multiple
      name="units.penthouse.penthouseFloorImages"
      onChange={handlePenthouseImageChange}
    />
  </div>
)}

              </>
            )}

            <label>Townhouse:</label>
            <input type="checkbox" name="units.townhouse.status" checked={listingData.units.townhouse.status} onChange={handleInputChange} />
            {listingData.units.townhouse.status && (
              <>
                <label>Floors:</label>
                <input type="text" name="units.townhouse.floors" value={listingData.units.townhouse.floors} onChange={handleNestedInputChange} placeholder="Floors" />

                <label>Townhouse Areas:</label>
                <input type="text" name="units.townhouse.areas" value={listingData.units.townhouse.areas} onChange={handleNestedInputChange} placeholder="Areas" />

                {/* Example for file input */}
                {showUploadFields && (
  <div>
    <label>Townhouse Floor Images:</label>
    <input
      type="file"
      multiple
      name="units.townhouse.townhouseFloorImages"
      onChange={handleTownhouseImageChange}
    />
  </div>
)}

              </>
            )}

            <label>Duplex:</label>
            <input type="checkbox" name="units.duplex.status" checked={listingData.units.duplex.status} onChange={handleInputChange} />
            {listingData.units.duplex.status && (
              <>
                <label>Floors:</label>
                <input type="text" name="units.duplex.floors" value={listingData.units.duplex.floors} onChange={handleNestedInputChange} placeholder="Floors" />

                <label>Duplex Areas:</label>
                <input type="text" name="units.duplex.areas" value={listingData.units.duplex.areas} onChange={handleNestedInputChange} placeholder="Areas" />

                {/* Example for file input */}
                {showUploadFields && (
  <div> <label>Duplex Floor Images:</label>
                <input type="file" multiple name="units.duplex.duplexFloorImages" onChange={handleDuplexImageChange} />  </div>
)}
              </>
            )}

            <label>Villa:</label>
            <input type="checkbox" name="units.villa.status" checked={listingData.units.villa.status} onChange={handleInputChange} />
            {listingData.units.villa.status && (
              <>
                <label>Floors:</label>
                <input type="text" name="units.villa.floors" value={listingData.units.villa.floors} onChange={handleNestedInputChange} placeholder="Floors" />

                <label>Villa Areas:</label>
                <input type="text" name="units.villa.areas" value={listingData.units.villa.areas} onChange={handleNestedInputChange} placeholder="Areas" />

                {/* Example for file input */}
                {showUploadFields && (
  <div>
    <label>Villa Floor Images:</label>
    <input
      type="file"
      multiple
      name="units.villa.villaFloorImages"
      onChange={handleVillaImageChange}
    />
  </div>
)}

              </>
            )}
          </div>

          {/* Masterplan */}
          {showUploadFields && <div className="form-section">
            <h3>Masterplan</h3>
            <input type="file" multiple name="masterplan" onChange={handleMasterPlanImageChange} />
          </div>}

          {/* Amenities */}
          <div className="form-section">
          <label>Amenities:</label>
            <input type="text" name="amenities" value={listingData.amenities} onChange={handleInputChange} placeholder="Amenities (comma-separated)" />
          </div>

          {/* Conditional rendering for file upload */}
          {showUploadFields && (
            <div className="form-section">
              <h3>Upload Images</h3>
              <input type="file" onChange={handleDisplayImagesChange} />
              <button onClick={handleDisplayImagesChange} disabled={!imageFile}>Upload Image</button>
            </div>
          )}
        </div>

        {uploadedId && <span>Uploaded id: {uploadedId}</span>}

        {/* Button to add listing */}
        <button onClick={handleAddListing}>Add Listing</button>
      </div>
    </div>
  );
};

export default AddOffPlanListing;
