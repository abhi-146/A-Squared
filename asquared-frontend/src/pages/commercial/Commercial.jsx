import React, { useState, useEffect, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import ListingCard from "../../components/listingCard/ListingCard";
import SearchBar from "../../components/filterNavbar/FilterNavbar";
import { CommercialListingApi } from "../../services/ListingApis";
import { navbarFilterApi } from "../../services/filterApis";
import "./Commercial.css";

const Commercial = () => {
  const commercialSectionRef = useRef(null);
  const [commercialListingData, setCommercialListingData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleScroll = () => {
    if (commercialSectionRef.current) {
      const offset = -200;
      const top = commercialSectionRef.current.offsetTop + offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commercialListing = await CommercialListingApi();
        setCommercialListingData(commercialListing?.commercialListings);
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

    if (searchTerm || propertyType || minBeds) {
      handleFilter({ searchTerm, propertyType, minBeds, minBaths });
    }
  }, [searchParams]);

  const handleFilter = async (filterCriteria) => {
    try {
      const filterData = await navbarFilterApi(filterCriteria);
      setFilterData(filterData?.commercialListings);
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
      <section className="commercial-section">
        <div className="commercial-hero">
          <div className="commercial-overlay">
            <h1 className="commercial-title">COMMERCIAL</h1>
            <p className="commercial-subtitle">A SQUARED REAL ESTATE</p>
            <button className="explore-button" onClick={handleScroll}>
              Explore Now
            </button>
          </div>
        </div>
        <SearchBar
          currentPageType="commercial"
          onFilter={handleFilter}
          onClear={handleClearFilter}
        />
        <div className="commercial-container" ref={commercialSectionRef}>
          {(isFiltered ? filterData : commercialListingData)?.map((listing) => (
            <ListingCard key={listing._id} listing={listing} propType={'commercial'}/>
          ))}
        </div>
      </section>
    </>
  );
};

export default Commercial;
