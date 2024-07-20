import React, { useState } from "react";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io";
import { Link } from "react-router-dom";
import "./ListingCard.css";
import FormattedPrice from "../../pages/formattedPrice/FormattedPrice";

const ListingCard = ({ listing, propType }) => {
  const [isWishlist, setIsWishlist] = useState(false);

  const handleCall = () => {
    window.location.href = `tel:+971555581554`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:info@asquaredre.com?subject=Inquiry about ${listing.title}`;
  };

  const handleWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?phone=+971555581554&text=Hello, I am interested in [${listing.title}] https://asquared.ae/property/${listing._id}/`,
      "_blank"
    );
  };

  return (
    <>
    <Link
      to={"/property-details?propertyId=" + listing._id + "&propType=" + propType}
      className="property-detail-link"
    >
      <div className="rent-buy-card">
        <div className="image-container">
          <img
            src={`http://localhost:5000${listing.displayImages[0]}`}
            alt="Property"
            className="property-image"
          />
        </div>
        <div className="information">
          <div className="content">
            <p className="card-title listng-card">{listing.title}</p>
            <p className="card-price">FROM:  <FormattedPrice price={listing.price} /></p>
            <div className="info">
              <div className="info-item">
                <FaBed /> {listing.beds}
              </div>
              <div className="info-item">
                <FaBath /> {listing.baths}
              </div>
              <div className="info-item">
                <FaRulerCombined /> {listing.area} sqft
              </div>
            </div>
          </div>
          <div className="location-info listng-card">
            <FaMapMarkerAlt /> <span>{listing.location}</span>
          </div>
          <div className="actions">
            <button className="action-button" onClick={handleCall}>
              <IoCall /> Call
            </button>
            <button className="action-button" onClick={handleEmail}>
              <FaEnvelope /> Email
            </button>
            <button className="action-button" onClick={handleWhatsApp}>
              <IoLogoWhatsapp /> WhatsApp
            </button>
          </div>
        </div>
      </div>
    </Link>
    </>
  );
};

export default ListingCard;
