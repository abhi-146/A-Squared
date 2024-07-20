import React from 'react';
import { Link } from 'react-router-dom';
import "./EstateAgency.css";
import team from "../../assets/team.jpg";

const EstateAgency = () => {
  return (
    <section className="estestate-bluebg">
        <div className="estestate-left">
            <h2>Welcome to A Squared Real Estate</h2>
            <h1>Let Us Help You Find Your Dream Home</h1>
            <p>
              At A Squared Real Estate, we're dedicated to helping you find the perfect property. Whether you're searching for a cozy apartment in the heart of the city or a luxurious villa by the beach, our expert team is here to assist you every step of the way.
            </p>
            <Link to="/contact" className="estestate-btn  estestate-btn -primary">Get In Touch</Link>
        </div>
        <div className="estestate-right">
            <img src={team} alt="Real Estate Team" />
        </div>
    </section>
  );
};

export default EstateAgency;
