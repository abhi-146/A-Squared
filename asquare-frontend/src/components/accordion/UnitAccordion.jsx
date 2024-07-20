import React, { useState } from 'react';
import { Accordion, Card, useAccordionButton } from 'react-bootstrap';
import { FaRuler } from 'react-icons/fa';
import { IoIosArrowDown } from "react-icons/io";
import "./UnitAccordion.css";
import floorplan from "../../assets/dummy_property.jpg";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const CustomToggle = ({ children, eventKey }) => {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log('Custom toggle clicked!')
  );

  return (
    <Card.Header type="button" onClick={decoratedOnClick}>
      {children}
    </Card.Header>
  );
};

const baseUrl = "http://localhost:5000";

const UnitAccordion = ({ units }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupImage, setPopupImage] = useState(null);

  const handleImageClick = (image) => {
    setPopupImage(image);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupImage(null);
  };

  const renderUnitAccordion = (unitType, unitData) => {
    if (!unitData.status) return null;

    // Trim and convert comma-separated strings to arrays
    const areas = unitData.areas.split(',').map(area => area.trim());
    const floors = unitData.floors.split(',').map(floor => floor.trim());

    return (
      <div className="my-3" key={unitType}>
        <h5>{unitType.toUpperCase()}</h5>
        {floors.map((floor, index) => (
          <Accordion className="mb-2" key={index}>
            <Card className='accordion-card'>
              <CustomToggle eventKey={index.toString()}>
                <div className="d-flex justify-content-between">
                  <span>{unitType === 'apartment' ? `${floor} Bed` : `${floor} Floor`}</span>
                  <span>
                    <FaRuler className="mr-2" />
                    {areas[index]} sqft
                  </span>
                  <span>
                    <IoIosArrowDown />
                  </span>
                </div>
              </CustomToggle>
              <Accordion.Collapse eventKey={index.toString()}>
                <Card.Body className='d-flex justify-content-between'>
                  <div>
                    <p>Layout Type</p>
                    <span>Type A</span>
                  </div>
                  <div>
                    <p>Size (sqft)</p>
                    <span>{areas[index]}</span>
                  </div>
                  <div>
                    <p>Floor Plan</p>
                    <img 
                      src={baseUrl + (unitData[`${unitType}FloorImages`] ? unitData[`${unitType}FloorImages`][index] : floorplan)} 
                      alt="floorplan" 
                      style={{ width: '100px', height: '100px', cursor: 'pointer' }}
                      onClick={() => handleImageClick(baseUrl + (unitData[`${unitType}FloorImages`] ? unitData[`${unitType}FloorImages`][index] : floorplan))}
                    />
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ))}
      </div>
    );
  };

  return (
    <>
      <h1>Units</h1>
      <p>from developer</p>
      <div className="mt-4 accordion-container">
        {Object.keys(units).map(unitType => (
          renderUnitAccordion(unitType, units[unitType])
        ))}
      </div>

      {showPopup && (
        <div className="image-popup">
          <div className="popup-overlay" onClick={closePopup}></div>
          <div className="popup-content">
            <button className="close-button" onClick={closePopup}>X</button>
            <img src={popupImage} alt="Popup" className="popup-image"/>
          </div>
        </div>
      )}
    </>
  );
};

export default UnitAccordion;
