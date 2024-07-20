import React from 'react';
import { Link } from 'react-router-dom';
import "./LetsWorkTogether.css"

import letsworktogether from "../../assets/Lets_Work_Together_.png";

const LetsWorkTogether = () => {
  return (
    <section className="work-together-section">
      <div className="work-together-container">
        <div className="left-side">
          <p className="ready-to-help">WE’RE READY TO HELP</p>
          <h1 className="work-together-title">Let’s work together.</h1>
          <p className='ready-to-help'>Looking to sell, buy, or rent a property in Dubai? We’re here to help!</p>
          <div className="buttons">
          <Link to="/contact">
        <button className="toggle-button-offplan">Get in touch</button>
      </Link>
          </div>
        </div>
        <div className="right-side">
          <img src={letsworktogether} alt="Let's work together" />
        </div>
      </div>
    </section>
  )
}

export default LetsWorkTogether
