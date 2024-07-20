import React, { useState, useEffect, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import ListingCard from "../../components/listingCard/ListingCard";
import SearchBar from "../../components/filterNavbar/FilterNavbar";
import { BuyListingApi } from "../../services/ListingApis";
import { navbarFilterApi } from "../../services/filterApis";
import "./Buy.css";

const Buy = () => {
  const buySectionRef = useRef(null);
  const [buyListingData, setBuyListingData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleScroll = () => {
    if (buySectionRef.current) {
      const offset = -200;
      const top = buySectionRef.current.offsetTop + offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const buyListing = await BuyListingApi();
        setBuyListingData(buyListing?.buyListings);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const searchTerm = searchParams.get("searchTerm") || "";
    const propertyType = searchParams.get("propertyType") || "";
    const minBeds = searchParams.get("minBeds") || "";
    const minBaths = minBeds || "";

    let community = searchParams.get("community") || "";
    if (community) {
       community = community.replace( '%20', ' ');
    }

    if (searchTerm || propertyType || minBeds || community) {
      handleFilter({ searchTerm, propertyType, minBeds, minBaths, community });
    }
  }, [searchParams]);

  const handleFilter = async (filterCriteria) => {
    try {
      const filterData = await navbarFilterApi(filterCriteria);
      setFilterData(filterData?.buyListings);
      setIsFiltered(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearFilter = () => {
    setIsFiltered(false);
    setFilterData([]);
  };

  return (
    <>
      <section className="buy-section">
        <div className="buy-hero">
          <div className="buy-overlay">
            <h1 className="buy-title">BUY</h1>
            <p className="buy-subtitle">ASQUARED REAL ESTATE</p>
            <button className="explore-button" onClick={handleScroll}>
              Explore Now
            </button>
          </div>
        </div>
        <SearchBar
          currentPageType="buy"
          onFilter={handleFilter}
          onClear={handleClearFilter}
        />
        <div className="buy-container" ref={buySectionRef}>
          {(isFiltered ? filterData : buyListingData)?.map((listing) => (
            <ListingCard key={listing._id} listing={listing} propType={'buy'}/>
          ))}
        </div>
      </section>
    </>
  );
};

export default Buy;
