import React, { useRef, useEffect, useState } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { TbMessagePlus } from "react-icons/tb";
import { SlLocationPin } from "react-icons/sl";
import "./Contact.css";
import { apiInstance } from "../../services/apiInstance";

const Contact = () => {
  const informationSectionRef = useRef(null);
  const [formData, setFormData] = useState({
    type: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    propertyType: "",
    zipCode: "",
    city: "",
    beds: "",
    baths: "",
    budget: "",
  });
  const [message, setMessage] = useState("");
  const [signupStatus, setSignupStatus] = useState(""); // Add this state for signup status

  const handleScroll = () => {
    if (informationSectionRef.current) {
      informationSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiInstance.post("/contactUsUsers", formData);
      setMessage("Your request has been submitted successfully!");
      setSignupStatus("success"); // Set signup status to success
    } catch (error) {
      setMessage("There was an error submitting your request. Please try again.");
      setSignupStatus("error"); // Set signup status to error
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    });

    if (informationSectionRef.current) {
      observer.observe(informationSectionRef.current);
    }

    return () => {
      if (informationSectionRef.current) {
        observer.unobserve(informationSectionRef.current);
      }
    };
  }, []);

  return (
    <>
      <section className="contact-section">
        <div className="contact-hero">
          <div className="contact-overlay">
            <h1 className="contact-title">Contact Us</h1>
            <p className="contact-subtitle">A SQUARED REAL ESTATE</p>
            <button className="explore-button" onClick={handleScroll}>
              Explore Now
            </button>
          </div>
        </div>
        <div className="information-section" ref={informationSectionRef}>
          <div className="information-stats">
            <div className="info-stats">
              <div className="icon">
                <FiPhoneCall className="svg" />
                <p>Call Us</p>
                <span>(+971) 55 558 1554</span>
              </div>
            </div>
            <div className="info-stats">
              <div className="icon">
                <TbMessagePlus className="svg" />
                <p>Message Us</p>
                <span>info@asquaredre.com</span>
              </div>
            </div>
            <div className="info-stats">
              <div className="icon">
                <SlLocationPin className="svg" />
                <p>Stay connected</p>
                <span>Office No 2154 - Business Bay - Dubai</span>
              </div>
            </div>
          </div>
        </div>
        <div className="formm-section">
          <div className="form-container">
            <div className="form-content">
              <div className="contact-info">
                <h2>Contact us</h2>
                <span>
                  Get in touch with A SQUARED Real Estate for expert assistance
                  with buying, selling, or renting properties in Dubai. We're
                  here to help. Reach us via phone, email, or our contact form.
                </span>
                <p>
                  <strong>Contact us</strong>
                </p>
                <p>(+971) 55 558 1554</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <select
                    className="form-select"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="">Select type</option>
                    <option value="Buyer">Buyer</option>
                    <option value="Broker">Broker</option>
                    <option value="Owner">Owner</option>
                  </select>
                  <input
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    className="form-input"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                    className="form-input"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-row">
                  <input
                    type="email"
                    placeholder="Email address"
                    name="email"
                    className="form-input flex-2"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    placeholder="Phone number"
                    name="phone"
                    className="form-input flex-1"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-row">
                  <select
                    className="form-select"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                  >
                    <option value="">Property Type</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Compound">Compound</option>
                    <option value="Duplex">Duplex</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Zip code"
                    name="zipCode"
                    className="form-input"
                    value={formData.zipCode}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    className="form-input"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-row">
                  <input
                    type="number"
                    placeholder="N. of beds"
                    name="beds"
                    className="form-input"
                    value={formData.beds}
                    onChange={handleChange}
                  />
                  <input
                    type="number"
                    placeholder="N. of baths"
                    name="baths"
                    className="form-input"
                    value={formData.baths}
                    onChange={handleChange}
                  />
                  <input
                    type="text"
                    placeholder="Your budget"
                    name="budget"
                    className="form-input"
                    value={formData.budget}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="form-submit">
                  SUBMIT
                </button>
                {signupStatus === 'success' && (
                  <p className="success-message">Thank you! We will contact you shortly.</p>
                )}
                {signupStatus === 'error' && (
                  <p className="error-message">Oops! Something went wrong. Please try again later.</p>
                )}
              </form>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
