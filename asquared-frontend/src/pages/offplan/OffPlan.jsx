import React, { useState, useEffect, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import OffPlanListingCard from "../../components/offPlanListingCard/OffPlanListingCard";
import SearchBar from "../../components/filterNavbar/FilterNavbar";
import { OffPlanListingApi } from "../../services/ListingApis";
import { navbarFilterApi } from "../../services/filterApis";
import "./OffPlan.css";

const OffPlan = () => {
  const offPlanSectionRef = useRef(null);
  const [offPlanListingData, setOffPlanListingData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleScroll = () => {
    if (offPlanSectionRef.current) {
      const offset = -200;
      const top = offPlanSectionRef.current.offsetTop + offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const offPlanListing = await OffPlanListingApi();
        console.log(offPlanListing);
        //currentPage: 1
        // offPlanListings: (9) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
        // totalItems: 9
        // totalPages: 1
        setOffPlanListingData(offPlanListing?.offPlanListings);
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
      setFilterData(filterData?.offPlanListings);
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
      <section className="offPlan-section">
        <div className="offPlan-hero">
          <div className="offPlan-overlay">
            <h1 className="offPlan-title">OFF PLAN</h1>
            <p className="offPlan-subtitle">A SQUARED REAL ESTATE</p>
            <button className="explore-button" onClick={handleScroll}>
              Explore Now
            </button>
          </div>
        </div>
        <SearchBar
          currentPageType="offPlan"
          onFilter={handleFilter}
          onClear={handleClearFilter}
        />
        <div className="offPlan-container" ref={offPlanSectionRef}>
          {(isFiltered ? filterData : offPlanListingData)?.map((listing) => (
            <OffPlanListingCard key={listing._id} listing={listing} propType={'offPlan'} />
          ))}
        </div>
      </section>
    </>
  );
};

export default OffPlan;
