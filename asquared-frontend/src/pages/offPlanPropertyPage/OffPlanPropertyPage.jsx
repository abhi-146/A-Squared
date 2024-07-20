import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "./OffPlanPropertyPage.css";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { CSSTransition } from "react-transition-group";
import UnitAccordion from "../../components/accordion/UnitAccordion";
import MapComponent from "../../components/MapComponent";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { apiInstance } from "../../services/apiInstance";
import ad from "../../assets/right-ad.gif";
import map from "../../assets/map.png";

const OffPlanPropertyPage = () => {
  const [showMore, setShowMore] = useState(false);
  const [propertyData, setPropertyData] = useState(null);
  const baseUrl = 'http://localhost:5000';
  const [showSlider, setShowSlider] = useState(false);
  const params = new URLSearchParams(location.search);
  const mapSectionRef = useRef(null);

  const propertyId = params.get('propertyId');

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiInstance.get(`/offplanlistings/${propertyId}`);

        setPropertyData(response.data);
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    };

    fetchData();
  }, [propertyId]);

  if (!propertyData) {
    return <div>Loading...</div>;
  }
  else{
    console.log(propertyData)
  }

  
  const toggleSlider = () => {
    setShowSlider(!showSlider);
  };

  const handleScroll = () => {
    if (mapSectionRef.current) {
      mapSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
  };
  return (
    <section className="offplan-property-section">
       <div className="navbar-shadow"></div>
      <div className="offplan-containerr">
        <div className="offplan-propertyy-container">
          <div className="offplan-left-container">
            <img src={baseUrl+propertyData.displayImages[0]} alt="Property" />
          </div>
          <div className="offplan-right-container">
  {propertyData.displayImages.slice(1, 3).map((image, index) => (
    <img key={index} src={baseUrl + image} alt={`Property Image ${index + 2}`} className="small-image" />
  ))}
</div>

        </div>
        <div className="buttons">
        <button className="show-photos-btn" onClick={toggleSlider}>Show more photos</button>
          <button className="view-map-btn" onClick={handleScroll}>View on map</button>
        </div>
        <div className="offplan-propertyy-info-container">
          <div className="offplan-left-container">
            <h1 className="offplan-heading">{propertyData.title}</h1>
            <h3 className="offplan-sub-heading">Starting from: {propertyData.rent} AED</h3>
           
            <h3 className="offplan-developer-name">
            <div className="offplan-developer-img">
                <img 
                    src={baseUrl + '/uploads/' + propertyData.developer.title.toLowerCase().replace(/ /g, '_') + '.jpg'} 
                    alt={propertyData.developer.title} 
                />
            </div>
              Developer <br />
              {propertyData.developer.title}
            </h3>
            <div className="offplan-horizontal-line"></div>

            <div className="key-info-container">
              <h2 className="key-info-heading">Key information</h2>
              <div className="key-info-details">
                <div className="key-info-detail">
                  <p className="key-info-title">Delivery date</p>
                  <p>{new Date(propertyData.information.deliveryDate).toLocaleDateString()}</p>
                  <p className="key-info-title">Payment plan</p>
                  <p>{propertyData.information.paymentPlan}</p>
                  <p className="key-info-title">Property types</p>
                  <p>{propertyData.information.propertyType}</p>
                </div>
                <div className="key-info-detail">
                  <p className="key-info-title">Number of buildings</p>
                  <p>{propertyData.information.numberOfBuildings}</p>
                  <p className="key-info-title">Government fee</p>
                  <p>{propertyData.information.governmentFees}%</p>
                </div>
                <div className="key-info-detail">
                  <p className="key-info-title">Location</p>
                  <p>{propertyData.location}</p>
                </div>
              </div>
            </div>
            <div className="offplan-horizontal-line"></div>
            <div className="payment-plan-container">
              <h2 className="payment-plan-heading">Payment plan</h2>
              <div className="payment-plan-flex">
                <div className="payment-plan-box">
                  <h3>{propertyData.paymentPlan.downPayment}%</h3>
                  <p>Down payment</p>
                </div>
                <MdKeyboardArrowRight className="payment-plan-arrow" />
                <div className="payment-plan-box">
                  <h3>{propertyData.paymentPlan.duringConstruction}%</h3>
                  <p>During construction</p>
                </div>
                <MdKeyboardArrowRight className="payment-plan-arrow" />
                <div className="payment-plan-box">
                  <h3>{propertyData.paymentPlan.onHandover}%</h3>
                  <p>On handover</p>
                </div>
              </div>
            </div>
            <div className="offplan-horizontal-line"></div>

            <div className="timeline-container">
              <h2>Project timeline</h2>
              <div className="timeline">
              <div className="timeline-item">
                  <FaCheckCircle className={` ${new Date() >= new Date(propertyData.projectTimeline.projectAnnouncement) ? 'icon' : 'notcomp-icon'}`} />
                      <div className="timeline-date">
                          <p>Project announcement</p>
                          <p>{new Date(propertyData.projectTimeline.projectAnnouncement).toLocaleDateString()}</p>
                      </div>
                  </div>
                  <div className="timeline-item">
                  <FaCheckCircle className={` ${new Date() >= new Date(propertyData.projectTimeline.constructionStarted) ? 'icon' : 'notcomp-icon'}`} />
                      <div className="timeline-date">
                          <p>Construction Started</p>
                          <p>{new Date(propertyData.projectTimeline.constructionStarted).toLocaleDateString()}</p>
                      </div>
                  </div>
                  <div className="timeline-item">
                      <FaCheckCircle className={` ${new Date() >= new Date(propertyData.projectTimeline.expectedCompletion) ? 'icon' : 'notcomp-icon'}`} />
                      <div className="timeline-date">
                          <p>Expected Completion</p>
                          <p>{new Date(propertyData.projectTimeline.expectedCompletion).toLocaleDateString()}</p>
                      </div>
                  </div>
              </div>
          </div>


            <div className="offplan-horizontal-line"></div>

            <UnitAccordion units={propertyData.units} />

            <div className="offplan-horizontal-line"></div>

            <div className="offplan-about-details">
              <div className="offplan-about-description">
                <h2>About the Project</h2>
                <div class="offplan-about-description-container">
                  <p>{propertyData.description}</p>
                  <CSSTransition
                    in={showMore}
                    timeout={300}
                    classNames="feature"
                    unmountOnExit
                  >
              <div className="transition-features">
                <h3>Features:</h3>
                <ul>
                  {propertyData.description.split("\n").map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
              </div>
                  </CSSTransition>
                  <button onClick={toggleShowMore} className="toggle-button-offplan">
                    {showMore ? "Read Less" : "Read More"}
                  </button>
                </div>
              </div>
            </div>
            <div className="offplan-horizontal-line"></div>

            <div className="offplan-project-masterplan">
              <h2>Project masterplan</h2>
              <div className="masterplan-img">
                <img src={baseUrl+propertyData.masterplan[0]} alt="masterplan" />
              </div>
            </div>
            <div className="offplan-horizontal-line"></div>

            <div className="offplan-amenities">
              <h2>Amenities</h2>
              <div className="offplan-amenities-container">
                <ul className="offplan-list">
                  {propertyData.amenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))}
                </ul>
              </div>
            </div>
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
          <div className="map-container"  ref={mapSectionRef}>
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
    </section>
  );
};

export default OffPlanPropertyPage;
