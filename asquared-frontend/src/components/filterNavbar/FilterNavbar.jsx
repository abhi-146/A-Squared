import React, { useState, useRef } from "react";
import "./FilterNavbar.css";
import useClickOutside from "../../hooks/UseClickOutside";
import MoreFiltersModal from "../moreFilter/MoreFilters";

const SearchBar = ({ currentPageType, onFilter, onClear }) => {
  const [pageType, setPageType] = useState(currentPageType);
  const [propertyType, setPropertyType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [beds, setBeds] = useState([]);
  const [baths, setBaths] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [priceDropdownOpen, setPriceDropdownOpen] = useState(false);
  const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false);

  const dropdownRef = useRef();
  const priceDropdownRef = useRef();

  useClickOutside(dropdownRef, () => {
    setIsDropdownOpen(false);
  });

  useClickOutside(priceDropdownRef, () => {
    setPriceDropdownOpen(false);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const filterCriteria = {
      propertyType,
      searchTerm,
      minBeds: Math.max(...beds),
      minBaths: Math.max(...baths),
      minPrice,
      maxPrice,
      furnishing,
      minArea,
      maxArea,
    };
    onFilter(filterCriteria);
  };

  const handleClear = () => {
    setPageType(currentPageType);
    setPropertyType("");
    setSearchTerm("");
    setBeds([]);
    setBaths([]);
    setMinPrice("");
    setMaxPrice("");
    setFurnishing("");
    setMinArea("");
    setMaxArea("");
    onClear();
  };

  const handleBedsAndBathsReset = () => {
    setBeds([]);
    setBaths([]);
  };

  const handleBedsChange = (bed) => {
    setBeds((prevBeds) =>
      prevBeds.includes(bed)
        ? prevBeds.filter((b) => b !== bed)
        : [...prevBeds, bed]
    );
  };

  const handleBathsChange = (bath) => {
    setBaths((prevBaths) =>
      prevBaths.includes(bath)
        ? prevBaths.filter((b) => b !== bath)
        : [...prevBaths, bath]
    );
  };

  const getSelectedValues = () => {
    const bedsText = beds.length
      ? `${Math.min(...beds)} - ${Math.max(...beds)} Beds`
      : "";
    const bathsText = baths.length
      ? `${Math.min(...baths)} - ${Math.max(...baths)} Baths`
      : "";
    return `${bedsText}${bedsText && bathsText ? ", " : ""}${bathsText}`;
  };

  const togglePriceDropdown = () => {
    setPriceDropdownOpen(!priceDropdownOpen);
  };

  return (
    <>
      <div className="search-bar-container">
        <form className="search-bar" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="City, community or building"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search"
          />
          {/* <select
            className={`dropdown ${pageType ? "active" : ""}`}
            value={pageType}
            onChange={(e) => setPageType(e.target.value)}
            aria-label="Page Type"
          >
            <option value="rent">Rent</option>
            <option value="buy">Buy</option>
            <option value="newProjects">New projects</option>
            <option value="commercialRent">Commercial rent</option>
            <option value="commercialBuy">Commercial buy</option>
          </select> */}
          <select
            className={`dropdown ${propertyType ? "active" : ""}`}
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            aria-label="Property Type"
          >
            <option value="">Property Type</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="townhouse">Townhouse</option>
            <option value="penthouse">Penthouse</option>
            <option value="compound">Compound</option>
            <option value="duplex">Duplex</option>
          </select>
          <div className="custom-dropdown" ref={dropdownRef}>
            <div
              className={`dropdown-header ${
                beds?.length || baths.length ? "active" : ""
              }`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {getSelectedValues() || "Beds & Baths"}
            </div>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-section">
                  <span>Bedrooms</span>
                  <div className="options">
                    {[1, 2, 3, 4, 5, 6, 7].map((bed, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`option ${
                          beds.includes(bed) ? "selected" : ""
                        }`}
                        onClick={() => handleBedsChange(bed)}
                      >
                        {bed == 7 ? `${bed}+` : bed}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="dropdown-section">
                  <span>Bathrooms</span>
                  <div className="options">
                    {[1, 2, 3, 4, 5, 6, 7].map((bath, index) => (
                      <button
                        key={index}
                        type="button"
                        className={`option ${
                          baths.includes(bath) ? "selected" : ""
                        }`}
                        onClick={() => handleBathsChange(bath)}
                      >
                        {bath == 7 ? `${bath}+` : bath}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  className="reset-button"
                  onClick={handleBedsAndBathsReset}
                >
                  Reset
                </button>
              </div>
            )}
          </div>
          <div className="price-dropdown" ref={priceDropdownRef}>
            <div className="dropdown-header" onClick={togglePriceDropdown}>
              Price {minPrice && maxPrice ? `(${minPrice} - ${maxPrice})` : ""}
            </div>
            {priceDropdownOpen && (
              <div className="dropdown-menu price-menu">
                <div className="price-filter-minmax"> 
                  <input
                    type="number"
                    className="price-input"
                    placeholder="Min. Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <span className="price-separator">-</span>
                  <input
                    type="number"
                    className="price-input"
                    placeholder="Max. Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
                
                <div className="dropdown-buttons">
                  <button
                    type="button"
                    className="clear-button"
                    onClick={handleClear}
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    className="apply-button"
                    onClick={togglePriceDropdown}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>
          <button
            className="dropdown"
            aria-label="More Filters"
            type="button" 
            onClick={(e) => {
              e.preventDefault(); 
              setIsMoreFiltersOpen(true);
            }}
          >
            More Filters
          </button>
          <button className="find-button" type="submit">
            Find
          </button>
          <button className="clear-button" type="button" onClick={handleClear}>
            Clear
          </button>
        </form>
        <MoreFiltersModal
          isOpen={isMoreFiltersOpen}
          onClose={() => setIsMoreFiltersOpen(false)}
          furnishing={furnishing}
          setFurnishing={setFurnishing}
          minArea={minArea}
          setMinArea={setMinArea}
          maxArea={maxArea}
          setMaxArea={setMaxArea}
        />
      </div>
    </>
  );
};

export default SearchBar;
