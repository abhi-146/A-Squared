import React from 'react';
import { Link } from 'react-router-dom';
import "./ImageButtons.css";
import rent from "../../assets/rent_image.jpg";
import buy from "../../assets/buy_image.jpg";
import commercial from "../../assets/commercial_image.jpg";

const ImageButtons = () => {
  return (
    <section className="est-image-buttons">
      <div className="est-image-button">
        <img src={buy} alt="Buy Property" />
        <div className="est-button-overlay">
          <h3>Buy</h3>
          <Link to="/buy" className="est-button">Buy Now</Link>
        </div>
      </div>
      <div className="est-image-button">
        <img src={rent} alt="Rent Property" />
        <div className="est-button-overlay">
          <h3>Rent</h3>
          <Link to="/rent" className="est-button">Rent Now</Link>
        </div>
      </div>
      <div className="est-image-button">
        <img src={commercial} alt="Commercial Property" />
        <div className="est-button-overlay">
          <h3>Commercial</h3>
          <Link to="/commercial" className="est-button">Explore Now</Link>
        </div>
      </div>
    </section>
  );
};

export default ImageButtons;
