import React, { useState, useEffect, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import ListingCard from "../../components/listingCard/ListingCard";
import SearchBar from "../../components/filterNavbar/FilterNavbar";
import { RentListingApi } from "../../services/ListingApis";
import { navbarFilterApi } from "../../services/filterApis";
import "./Rent.css";

const Rent = () => {
  const rentSectionRef = useRef(null);
  const [rentListingData, setRentListingData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleScroll = () => {
    if (rentSectionRef.current) {
      const offset = -200;
      const top = rentSectionRef.current.offsetTop + offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rentListing = await RentListingApi();
        setRentListingData(rentListing?.rentalListings);
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



    if (searchTerm || propertyType || minBeds ) {
      handleFilter({ searchTerm, propertyType, minBeds, minBaths });
    }
  }, [searchParams]);

  const handleFilter = async (filterCriteria) => {
    try {
      const filterData = await navbarFilterApi(filterCriteria);
      setFilterData(filterData?.rentalListings);
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
      <section className="rent-section">
        <div className="rent-hero">
          <div className="rent-overlay">
            <h1 className="rent-title">RENT</h1>
            <p className="rent-subtitle">A SQUARED REAL ESTATE</p>
            <button className="explore-button" onClick={handleScroll}>
              Explore Now
            </button>
          </div>
        </div>
        <SearchBar
          currentPageType="rent"
          onFilter={handleFilter}
          onClear={handleClearFilter}
        />
        <div className="rent-container" ref={rentSectionRef}>
          {(isFiltered ? filterData : rentListingData)?.map((listing) => (
            <ListingCard key={listing._id} listing={listing} propType={'rent'}/>
          ))}
        </div>
      </section>
    </>
  );
};

export default Rent;
