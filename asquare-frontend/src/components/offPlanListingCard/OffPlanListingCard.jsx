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
import FormattedPrice from "../../pages/formattedPrice/FormattedPrice";

const offPlanListingCard = ({ listing, propType }) => {
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
  console.log(listing)

  return (
    <>
    <Link
      to={"/offPlan-property-details?propertyId=" + listing._id + "&propType=" + propType}
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
            <p className="card-title">{listing.title}</p>
            <p className="card-price">FROM: <FormattedPrice price={listing.rent} /></p>
            <p className="card-title">Developer: {listing.developer.title}</p>
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

export default offPlanListingCard;
