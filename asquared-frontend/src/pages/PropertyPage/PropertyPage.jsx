import React, { useState, useEffect } from "react";
import "./PropertyPage.css";
import ad from "../../assets/right-ad.gif";
import offplanimage from "../../assets/dummy_property.jpg";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaBed, FaBath, FaCheck } from "react-icons/fa";
import { BiArea } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { CSSTransition } from "react-transition-group";
import map from "../../assets/map.png";
import MortgageCalculator from "../../components/mortgageCalculator/MortgageCalculator";
import { useLocation } from "react-router-dom";
import { apiInstance } from "../../services/apiInstance";
import MapComponent from "../../components/MapComponent";
import FormattedPrice from "../formattedPrice/FormattedPrice";
import Slider from "react-slick";
import { Link } from 'react-router-dom';

const UpfrontCostModal = ({ onClose, upfrontCosts, total }) => (
  <div className="modal-overlay">
    <div className="upfrontmodal-content">
      <div className="upfrontmodal-header">
        <h2>Estimated payment breakdown</h2>
        <button className="close-btn" onClick={onClose}>
          <AiOutlineClose />
        </button>
      </div>
      <div className="modal-body">
        {upfrontCosts.map((cost, index) => (
          <div className="modal-row" key={index}>
            <span>{cost.label}</span>
            <span><FormattedPrice price={cost.amount}/></span>
          </div>
        ))}
        <div className="modal-total">
          <span>Total upfront costs</span>
          <span>AED {total.toFixed(2)}</span>
        </div>
        <div className="modal-info">
          <p>
            In addition to the upfront costs, prospective renters should note
            the total annual rent may increase when paying with multiple cheques
            throughout the year.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const PropertyPage = () => {
  const [showMore, setShowMore] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [propertyData, setPropertyData] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const propertyId = params.get('propertyId');
  const propType = params.get('propType');
  const baseUrl = "http://localhost:5000";
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        let response;
        if (propType === "rent") {
          response = await apiInstance.get(`/rentallistings/${propertyId}`);
        } else if (propType === "buy") {
          response = await apiInstance.get(`/buylistings/${propertyId}`);
        } else {
          response = await apiInstance.get(`/commerciallistings/${propertyId}`);
        }
        setPropertyData(response.data);
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    };

    fetchPropertyData();
  }, [propertyId, propType]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  if (!propertyData) {
    return <div>Loading...</div>;
  }

  const toggleSlider = () => {
    setShowSlider(!showSlider);
  };

  const toggleImages = () => {
    const sliderElements = document.getElementsByClassName('mob-only');
  
    for (let i = 0; i < sliderElements.length; i++) {
      const element = sliderElements[i];
      element.style.display = element.style.display === 'none' ? 'block' : 'none';
    }
  };
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const annualRent = propertyData.price || 270000;

  // Calculate the real estate agency fee (5% of the annual rent + 5% VAT)
  const agencyFee = (annualRent * 0.05) * 1.05;
  
  // Calculate the security deposit as 5% of the annual rent
  const securityDeposit = annualRent * 0.05;
  
  // Calculate the DEWA deposit based on the property type
  const dewaDeposit = propertyData.propertyType === "villa" 
    ? 4130 
    : 2130;  

    const total = agencyFee + securityDeposit + dewaDeposit + 220;

  const upfrontCosts = [
    { label: "Annual rent", amount: annualRent },
    { label: "Real estate agency fee", amount: agencyFee },
    { label: "Security deposit", amount: securityDeposit },
    { label: "DEWA deposit", amount: dewaDeposit },
    { label: "Ejari Fee", amount: propertyData.ejariFee || 220 },
  ];
  

  return (
    <section className="property-section">
       <div className="navbar-shadow"></div>
      <div className="containerr">
        <div className="propertyy-container">
          <div className="property-left-container">
          <img 
            src={propertyData.displayImages && propertyData.displayImages.length > 0 
                  ? baseUrl + propertyData.displayImages[0] 
                  : offplanimage} 
            alt="Property" 
          />

          </div>
          <div className="property-right-container">
            {propertyData.displayImages && propertyData.displayImages.slice(1, 3).map((img, index) => (
              <img src={baseUrl + img} alt={`Small Property ${index + 1}`} className="small-image" key={index} />
            ))}
            {propertyData.displayImages && propertyData.displayImages.slice( 3).map((img, index) => (
              <img src={baseUrl + img} alt={`Small Property ${index + 1}`} className="small-image mob-only" key={index} />
            ))}
          </div>
        </div>
        <div className="buttons">
        <button className="show-photos-btn desk-only" onClick={toggleSlider}>Show more photos</button>
        <button className="show-photos-btn mob-btn-only" onClick={toggleImages}>Show more photos</button>
          <button className="view-map-btn">View on map</button>
        </div>
        <div className="propertyy-info-container">
          <div className="propertyy-left-container">
            <div className="property-details">
              <div className="price">
                <div className="price-cost">
                  <div>
                  <FormattedPrice price={propertyData.price} />
                  </div>
                  {propType !== "buy" &&
                  <div>
                    <button className="upfrontcost-button" onClick={openModal}>See UpFront Cost</button>
                  </div>}
                </div>
                <div className="details">
                  <div className="detail-icon">
                    <FaBed /> {propertyData.beds} Bedrooms
                  </div>
                  <div className="detail-icon">
                    <FaBath /> {propertyData.baths} Bathrooms
                  </div>
                  <div className="detail-icon">
                    <BiArea /> {propertyData.area} sqft
                  </div>
                </div>
              </div>
            </div>

            <div className="offplan-horizontal-line"></div>

            <div className="property-type">
              <div className="type">
                <div className="type-place">
                  <h1>{propertyData.title}</h1>
                  <div className="type-description">
                    {propertyData.tagline}
                  </div>
                  <div className="type-availabel">
                    <div>
                      <FaBed /> Property Type: {propertyData.propertyType}
                    </div>
                    <div>
                      <FaBed /> Property Type: {propertyData.propertyType}
                    </div>
                  </div>
                  <div>
                    <FaBed /> Available From: {new Date(propertyData.availableFrom).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>

            <div className="offplan-horizontal-line"></div>

            <div className="property-location">
              <div className="location-container">
                <div className="location-heading">
                  <h1>Location</h1>
                  <div className="map-information">
                    <div className="map-img">
                      <img src={map} alt="map" />
                    </div>
                    <div className="map-description">
                      <div>{propertyData.location}</div>
                      <div>{propertyData.community}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="offplan-horizontal-line"></div>

            <div className="amenities-details">
              <div className="amenities">
                <div className="amenities-heading">
                  <h1>Amenities</h1>
                </div>
                <div className="amenities-details">
                    {propertyData.amenities[0].split(",").map((amenity, index) => (
                      <div className="amenities-detail-icon" key={index}>
                        <FaCheck  /> {amenity.trim()} 
                      </div>
                    ))}
                    </div>
              </div>
            </div>

            <div className="offplan-horizontal-line"></div>

            <div className="actual-details">
              <div className="actual-features">
                <h2>Description</h2>
                <p>Property Details:</p>
                <div className="description-container">
                  <div dangerouslySetInnerHTML={{ __html: propertyData.description }} />
                </div>
                <CSSTransition
                  in={showMore}
                  timeout={300}
                  classNames="feature"
                  unmountOnExit
                >
                  <div className="transition-features">
                    <h3>Features:</h3>
                    <ul>
                      {propertyData.description.split("\n").map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </CSSTransition>

                <button onClick={toggleShowMore} className="toggle-button">
                  {showMore ? "Read Less" : "Read More"}
                </button>
              </div>
            </div>

            <div className="offplan-horizontal-line"></div>
            <MortgageCalculator />


            {/* <div className="regulatory-info-container">
              <h2 className="regulatory-info-heading">
                Regulatory Information
              </h2>
              <div className="regulatory-info-content">
                <div className="regulatory-info-list-container">
                  <ul>
                    <li>Reference</li>
                    <li>Listed</li>
                    <li>Broker ORN</li>
                    <li>Zone name</li>
                    <li>DLD Permit Number</li>
                  </ul>
                </div>
                <div className="regulatory-info-values-container">
                  <ul>
                    <li>{propertyData.reference}</li>
                    <li>{propertyData.listed}</li>
                    <li>{propertyData.brokerORN}</li>
                    <li>{propertyData.zoneName}</li>
                    <li>
                      <a href="https://example.com">{propertyData.dldPermitNumber}</a>
                    </li>
                  </ul>
                </div>
                <div className="regulatory-info-qr-container">
                  <img src="" alt="QR Code" />
                  <p>DLD Permit Number</p>
                </div>
              </div>
            </div> */}
            <div className="offplan-horizontal-line"></div>
          </div>
          <div className="offplan-right-ad-container">
            <img
              src={ad}
              alt="Small Property"
              className="small-image"
            />
          </div>
        </div>
      </div>
      <div className="property-location">
          <div className="map-container">
            <MapComponent
              location={propertyData.location}
              community={propertyData.community}
              lat={propertyData.lat}
              lon={propertyData.lon}
            />
          </div>
      </div>
      {showSlider && (
        <div className="slider-overlay">
          <div className="slider-popup">
            <button className="offplan-close-button" onClick={toggleSlider}>
              X
            </button>
            <Slider {...sliderSettings}>
              {propertyData.displayImages.slice(3).map((img, index) => (
                <div key={index}>
                  <img
                    src={`http://localhost:5000${img}`}
                    alt={`Property ${index + 4}`}
                    className="slider-image"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}

      { isModalOpen && (
        <UpfrontCostModal onClose={closeModal} upfrontCosts={upfrontCosts} total={total} />
      )}
    </section>
  );
};

export default PropertyPage;
