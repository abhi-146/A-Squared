import React from "react";
import "./MoreFilters.css";

const MoreFiltersModal = ({
  isOpen,
  onClose,
  furnishing,
  setFurnishing,
  minArea,
  setMinArea,
  maxArea,
  setMaxArea,
}) => {
  const handleFurnishingChange = (value) => {
    setFurnishing(value);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="modal-header">More Filters</div>
        <div className="modal-section">
          <div className="modal-section-header">Furnishing</div>
          <div className="furnishing-options">
            {["Furnished", "Unfurnished", "Partly furnished"].map((option) => (
              <button
                key={option}
                className={`option-button ${
                  furnishing === option ? "selected" : ""
                }`}
                onClick={() => handleFurnishingChange(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="modal-section">
          <div className="modal-section-header">Property Size (Sqft)</div>
          <div className="area-inputs">
            <input
              type="number"
              placeholder="Min. Area"
              value={minArea}
              onChange={(e) => setMinArea(e.target.value)}
            />
            <span> - </span>
            <input
              type="number"
              placeholder="Max. Area"
              value={maxArea}
              onChange={(e) => setMaxArea(e.target.value)}
            />
          </div>
        </div>
        <div className="modal-actions">
          <button
            className="clear-button"
            onClick={() => {
              setFurnishing("");
              setMinArea("");
              setMaxArea("");
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoreFiltersModal;
