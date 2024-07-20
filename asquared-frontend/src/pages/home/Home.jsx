import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import dummy_property from "../../assets/dummy_property.jpg";

import better_peoples from "../../assets/better-peoples.jpg";
import better_results from "../../assets/better-result.jpg";
import better_exposures from "../../assets/better-exposure.jpg";
import better_insights from "../../assets/better-insights.jpg";

import herocover from "../../assets/hero_cover.mp4";
import { Link, useNavigate } from "react-router-dom";
import Newsletter from "../../components/newsletter/Newsletter";
import Testimonial from "../../components/testimonials/Testimonial";
import { apiInstance } from "../../services/apiInstance";
import FAQAccordion from "../../components/accordion/FAQAccordion";
import FormattedPrice from "../formattedPrice/FormattedPrice";
import Signup from "../../components/login/Login";
import EstateAgency from "../../components/estateAgency/EstateAgency";
import ClientLove from "../../components/clientLove/ClientLove";
import ImageButtons from "../../components/imageButtons/ImageButtons";
import TrustedPartner from "../../components/trustedPartner/TrustedPartner";
import Awards from "../../components/awards/Awards";
import CommunityCards from "../../components/communityCards.jsx/CommunityCards";
import LetsWorkTogether from "../../components/letsWorkTogether/LetsWorkTogether";
import CountAnimation from "../../components/countAnimation/CountAnimation";


const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: true,
      },
    },
  ],
};

const PropertyCard = ({ property, pType }) => {
console.log(pType)
  const linkTo = pType === 'offPlan' 
    ? `/offPlan-property-details?propertyId=${property._id}&propType=${pType}`
    : `/property-details?propertyId=${property._id}&propType=${pType}`;

  return (
    <div className="propertycard">
      <Link to={linkTo}>
        <img
          src={
            property.displayImages && property.displayImages.length > 0
              ? `http://localhost:5000${property.displayImages[0]}`
              : dummy_property
          }
          alt={property.title}
        />
     
        <div className="card-info">
          <h4 className="card-title">{property.title}</h4>
          {pType !== 'offPlan' && (
  <div className="card-details">
    <div className="detail">
      <FaBed /> {property.beds} Beds
    </div>
    <div className="detail">
      <FaBath /> {property.baths} Bathrooms
    </div>
    <div className="detail">
      <FaRulerCombined /> {property.area}
    </div>
  </div>
)}

          <div className="card-price">
            <span><strong>From:</strong> <FormattedPrice price={property.rent} /></span>
          </div>
        

          <div className="location-info">
            <FaMapMarkerAlt /> <span>{property.location}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

const Home = () => {
  const [offPlanProperties, setOffPlanProperties] = useState([]);
  const [rentalProperties, setRentalProperties] = useState([]);
  const [commercialProperties, setCommercialProperties] = useState([]);
  const [selectedOffPlanCity, setSelectedOffPlanCity] = useState("DUBAI");
  const [selectedRentalCity, setSelectedRentalCity] = useState("DUBAI");
  const [selectedCommercialCity, setSelectedCommercialCity] = useState("DUBAI");
  const [propType, setpropType] = useState("rent");
  const [searchTerm, setSearchTerm] = useState("");
  const [minBeds, setMinBeds] = useState("");
  const [propertyType, setpropertyType] = useState("");
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);

  const baseUrl = "http://localhost:5000";


  const offplansectionRef = useRef(null);
  const commercialsectionRef = useRef(null);
  const rentsectionRef = useRef(null);
 
  const fetchOffPlanProperties = async (city) => {
    try {
      const response = await apiInstance.get("/offplanlistings", {
        params: {
          limit: 6,
          page: 1,
          city: city,
        },
      });

      setOffPlanProperties(response.data.offPlanListings);
    } catch (error) {
      console.error("Error fetching off-plan properties:", error);
    }
  };

  const fetchRentalProperties = async (city) => {
    try {
      const response = await apiInstance.get("/rentallistings", {
        params: {
          limit: 6,
          page: 1,
          city: city,
        },
      });

      setRentalProperties(response.data.rentalListings);
    } catch (error) {
      console.error("Error fetching rental properties:", error);
    }
  };

  const fetchCommercialProperties = async (city) => {
    try {
      const response = await apiInstance.get("/commerciallistings", {
        params: {
          limit: 6,
          page: 1,
          city: city,
        },
      });
      setCommercialProperties(response.data.commercialListings);
    } catch (error) {
      console.error("Error fetching commercial properties:", error);
    }
  };
  const developers = [
    "Emaar",
    "Nakheel",
    "Meraas",
    "Damac",
    "Aldar",
    "Al Habtoor Group",
    "Deyaar Development",
    "Azizi Developments",
    "Danube Properties",
    "Sobha Realty",
  ];


  const faqs = [
    {
      question: "How can I find good real estate agents in Dubai?",
      answer: "The best way to find a good real estate agent in Dubai is to ask for referrals from friends, family, and colleagues who recently purchased property in the area. Additionally, you can research online for agents' customer reviews and ratings. You can also contact the Dubai Land Department for a list of licensed real estate agents."
    },
    {
      question: "Who is the best real estate broker in Dubai?",
      answer: "There are many reputable real estate brokers in Dubai. McCone Properties is one of the top-rated brokers, known for their extensive knowledge of the area and exceptional service."
    },
    {
      question: "How much do real estate brokers make in Dubai?",
      answer: "On average, real estate brokers in Dubai make around AED 33,000 per month. This can vary based on the agent's experience, location, and the type of properties they deal with."
    },
    {
      question: "Can I rent a property in Dubai?",
      answer: "Yes, expats can rent or purchase residential properties in Dubai with valid proof of residency. Dubai offers a wide range of rental options, from luxury to affordable housing."
    },
    {
      question: "Can I get a mortgage to buy property in Dubai?",
      answer: "Yes, both UAE nationals and expats can obtain home loans in Dubai. Necessary documentation includes proof of income, bank statements, and a valid ID."
    },
    {
      question: "What are the best places to buy property in Dubai?",
      answer: "Popular locations for buying property in Dubai include Downtown Dubai, Dubai Marina, Dubai Hills Estate, Dubai Creek Harbour, Palm Jumeirah, Business Bay, Jumeirah Village Circle, and Arabian Ranches."
    },
    {
      question: "How much does a property cost in Dubai?",
      answer: "Property prices in Dubai vary depending on the location, size, and amenities of the property. McCone Properties can help you find a property that fits your budget and needs."
    },
    {
      question: "How do I list my property for sale in Dubai?",
      answer: "To list your property for sale in Dubai, you need to sign Form A with a broker, and provide copies of your title deed, passport, and Emirates ID. The broker will then apply for a marketing license to promote your property."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    });

    if (offplansectionRef.current) {
      observer.observe(offplansectionRef.current);
    }
    if (commercialsectionRef.current) {
      observer.observe(commercialsectionRef.current);
    }
    if (rentsectionRef.current) {
      observer.observe(rentsectionRef.current);
    }

    return () => {
      if (offplansectionRef.current) {
        observer.unobserve(offplansectionRef.current);
      }
      if (commercialsectionRef.current) {
        observer.unobserve(commercialsectionRef.current);
      }
      if (rentsectionRef.current) {
        observer.unobserve(rentsectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    fetchOffPlanProperties(selectedOffPlanCity);
    fetchRentalProperties(selectedRentalCity);
    fetchCommercialProperties(selectedCommercialCity);
  }, [
    selectedOffPlanCity,
    selectedRentalCity,
    selectedCommercialCity,
    propType,
  ]);

  const handleCityChangeForOffPlan = (city) => {
    setSelectedOffPlanCity(city);
  };

  const handleCityChangeForRental = (city) => {
    setSelectedRentalCity(city);
  };

  const handleCityChangeForCommercial = (city) => {
    setSelectedCommercialCity(city);
  };

  const handlepropTypeChange = (type) => {
    setpropType(type);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    let path = `/${propType}`;
    let queryParams = new URLSearchParams({
      searchTerm,
      minBeds,
      propertyType,
    }).toString();
    navigate(`${path}?${queryParams}`);
  };

  const toggleSignup = () => {
    setShowSignup(!showSignup);
  };

  const closeSignup = () => {
    setShowSignup(false);
  };

  return (
    <>
      <section className="hero">
        <video
          className="background-video"
          src={herocover}
          autoPlay
          muted
          loop
        ></video>
        <div className="container">
          <h1>Your Gateway to Real Estate</h1>
          <form className="flex-form">
            <div className="tabs">
              <div
                className={`tab ${propType === "rent" ? "active" : ""}`}
                onClick={() => handlepropTypeChange("rent")}
              >
                Rent
              </div>
              <div
                className={`tab ${propType === "buy" ? "active" : ""}`}
                onClick={() => handlepropTypeChange("buy")}
              >
                Buy
              </div>
              <div
                className={`tab ${propType === "commercial" ? "active" : ""}`}
                onClick={() => handlepropTypeChange("commercial")}
              >
                Commercial
              </div>
              <div
                className={`tab ${propType === "offPlan" ? "active" : ""}`}
                onClick={() => handlepropTypeChange("offPlan")}
              >
                Off Plan
              </div>
            </div>
            <div className="fields">
              <div className="box">
                <input
                  type="text"
                  placeholder="City, community or building"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="box">
                <select onChange={(e) => setpropertyType(e.target.value)}>
                  <option value="">Property type</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="compound">Compound</option>
                  <option value="duplex">Duplex</option>
                </select>
              </div>
              <div className="box">
                <select onChange={(e) => setMinBeds(e.target.value)}>
                  <option value="">Beds & Baths</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <button
                className="search-btn"
                type="submit"
                onClick={(e) => handleSearch(e)}
              >
                <i className="fa fa-search"></i> Search
              </button>
            </div>
          </form>
        </div>
      </section>
<CountAnimation/>
      <TrustedPartner/>

      <section className="property-container" ref={offplansectionRef}>
        <div className="secTitle">
          <h3 className="title">Explore new projects in the UAE</h3>
          <p className="subtitle">
            Discover the latest off-plan properties and be informed.
          </p>
          <div className="places">
            {["DUBAI", "ABU DHABI", "SHARJAH", "RAS AL KHAIMAH"].map((city) => (
              <button
                key={city}
                className={`place ${
                  selectedOffPlanCity === city ? "active" : ""
                }`}
                onClick={() => handleCityChangeForOffPlan(city)}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
        <div className="secContent">
          <>
            {offPlanProperties && offPlanProperties.length > 0 ? (
              offPlanProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  pType={"offPlan"}
                />
              ))
            ) : (
              <p>No off-plan properties available</p>
            )}
          </>
        </div>
      </section>


      <section className="property-container" ref={commercialsectionRef}>
        <div className="secTitle">
          <h3 className="title">Explore commercial in the UAE</h3>
          <p className="subtitle">
            Discover the latest commercial properties and be informed.
          </p>
          <div className="places">
            {["DUBAI", "ABU DHABI", "SHARJAH", "RAS AL KHAIMAH"].map((city) => (
              <button
                key={city}
                className={`place ${
                  selectedCommercialCity === city ? "active" : ""
                }`}
                onClick={() => handleCityChangeForCommercial(city)}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
        <div className="secContent">
          <>
            {commercialProperties && commercialProperties.length > 0 ? (
              commercialProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  pType={"commercial"}
                />
              ))
            ) : (
              <p>No commercial properties available</p>
            )}
          </>
        </div>
      </section>

      <ImageButtons />



      <section className="why-choose-us">
        <div className="choose-container">
          <h2 className="heading">Why A SQUARED Real Estate?</h2>
          <p className="description">
            Choose A SQUARED Real Estate for unparalleled expertise and
            personalized service in the dynamic Dubai property market. With a
            commitment to excellence, transparency, and client satisfaction, we
            strive to make your real estate journey seamless and successful.
            Trust us to guide you through every step, whether buying, selling,
            or renting properties in Dubai.
          </p>
          <div className="features">
            <div className="feature-card">
              <img src={better_peoples} alt="Better Peoples" />
              <div className="feature-content">
                <h3>Better Peoples</h3>
                <p>
                  250+ community specialists Excellent 4.3/5 rating on Google
                  Reviews
                </p>
                <Link to="/buy">EXPLORE LISTINGS →</Link>
              </div>
            </div>
            <div className="feature-card">
              <img src={better_exposures} alt="Better exposure" />
              <div className="feature-content">
                <h3>Better exposure</h3>
                <p>
                  UAE’s highest leads generator Largest active database of
                  750,000+
                </p>
                <Link to="/buy">EXPLORE LISTINGS →</Link>
              </div>
            </div>
            <div className="feature-card">
              <img src={better_results} alt="Better results" />
              <div className="feature-content">
                <h3>Better results</h3>
                <p>30,000+ properties sold 8,500+ managed units</p>
                <Link to="/buy">EXPLORE LISTINGS →</Link>
              </div>
            </div>
            <div className="feature-card">
              <img src={better_insights} alt="Better insights" />
              <div className="feature-content">
                <h3>Better insights</h3>
                <p>38 years of market experience Unrivalled market knowledge</p>
                <Link to="/buy">EXPLORE LISTINGS →</Link>
              </div>
            </div>
          </div>
          <button className="list-property-button" onClick={toggleSignup}>List Your Property</button>
        </div>
      </section>
      <Newsletter />
      <CommunityCards/>

      <section className="partners-carousel">
        <div className="partners-container">
          <h2>DEVELOPERS PARTNERS</h2>
          <Slider {...settings}>
            {developers.length > 0 &&
              developers.map((developer, index) => (
                <div key={index} className="feature-card">
                  <img
                    src={
                      baseUrl +
                      `/uploads/${developer
                        .toLowerCase()
                        .replace(/\s+/g, "_")}.jpg`
                    }
                    alt={developer}
                    className="feature-logo"
                  />
                  {/* <div className="feature-content">
                    <h3>{developer.title}</h3>
                  </div> */}
                </div>
              ))}
          </Slider>
        </div>
      </section>
   
      <ClientLove/>
      <EstateAgency />
      <Testimonial />

      <section className="property-container" ref={rentsectionRef}>
        <div className="secTitle">
          <h3 className="title">Explore rental in the UAE</h3>
          <p className="subtitle">
            Discover the latest rental properties and be informed.
          </p>
          <div className="places">
            {["DUBAI", "ABU DHABI", "SHARJAH", "RAS AL KHAIMAH"].map((city) => (
              <button
                key={city}
                className={`place ${
                  selectedRentalCity === city ? "active" : ""
                }`}
                onClick={() => handleCityChangeForRental(city)}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        <div className="secContent">
          <>
            {rentalProperties && rentalProperties.length > 0 ? (
              rentalProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  pType={"rent"}
                />
              ))
            ) : (
              <p>No rental properties available</p>
            )}
          </>
        </div>
      </section>
      {showSignup && (
        <div className="signupPopup">
          <Signup closeSignup={closeSignup}/>
        </div>
      )}
  
      <div className="container mt-5">
        <FAQAccordion faqs={faqs} />
      </div>
    
    </>
  );
};

export default Home;
