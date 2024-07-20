import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import './CommunityCards.css'; // Make sure this path is correct

import downtown_dubai from "../../assets/downtown_dubai.jpg";
import dubai_marina from "../../assets/dubai_marina.jpg";
import palm_jumeriah from "../../assets/palm_jumeriah.jpg";
import jbr from "../../assets/jbr.jpg";
import business_bay from "../../assets/business_bay.jpg";
import jlt from "../../assets/jlt.jpg";
import arabian_ranches from "../../assets/arabian_ranches.jpg";
import emirates_hills from "../../assets/emirates_hills.jpg";
import the_greens from "../../assets/the_greens.jpg";
import bluewaters_island from "../../assets/bluewaters_island.jpg";
import the_lakes from "../../assets/the_lakes.jpg";
import the_meadows from "../../assets/the_meadows.jpg";
import the_springs from "../../assets/the_springs.jpg";
import al_barari from "../../assets/al_barari.jpg";
import city_walk from "../../assets/city_walk.jpg";
import dubai_hills_estate from "../../assets/dubai_hills_estate.jpg";

// Example data for popular communities in Dubai real estate
const communityData = [
  { id: 1, text: 'Downtown Dubai', image: downtown_dubai },
  { id: 2, text: 'Dubai Marina', image: dubai_marina },
  { id: 3, text: 'Palm Jumeirah', image: palm_jumeriah },
  { id: 4, text: 'Jumeirah Beach Residence', image: jbr },
  { id: 5, text: 'Business Bay', image: business_bay },
  { id: 6, text: 'Jumeirah Lake Towers', image: jlt },
  { id: 7, text: 'Arabian Ranches', image: arabian_ranches },
  { id: 8, text: 'Emirates Hills', image: emirates_hills },
  { id: 9, text: 'The Greens', image: the_greens },
  { id: 10, text: 'Bluewaters Island', image: bluewaters_island },
  { id: 11, text: 'The Lakes', image: the_lakes },
  { id: 12, text: 'The Meadows', image: the_meadows },
  { id: 13, text: 'The Springs', image: the_springs },
  { id: 14, text: 'Al Barari', image: al_barari },
  { id: 15, text: 'City Walk', image: city_walk },
  { id: 16, text: 'Dubai Hills Estate', image: dubai_hills_estate },
];

const CommunityCards = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className='comm-main-container'>
      <div className="comm-heading">
        <h1>Popular Communities in Dubai</h1>
        <p>Explore some of the most sought-after areas in Dubai real estate</p>
      </div>
      <div className="comm-container">
        {communityData.slice(0,  8).map(community => (
          <Link
            key={community.id}
            className="comm-card-link"
            to={`/buy?community=${community.text}`}
          >
            <div className="comm-card">
              <img
                src={community.image}
                alt={community.text}
                className="comm-card-image"
              />
              <div className="comm-card-text">{community.text}</div>
            </div>
          </Link>
        ))}
 </div>
        <CSSTransition
          in={showMore}
          classNames="comm"
          timeout={300}
          unmountOnExit
        >
          <div className="comm-container">
            {communityData.slice(8, communityData.length).map(community => (
              <Link
                key={community.id}
                className="comm-card-link"
                to={`/buy?community=${community.text}`}
              >
                <div className="comm-card">
                  <img
                    src={community.image}
                    alt={community.text}
                    className="comm-card-image"
                  />
                  <div className="comm-card-text">{community.text}</div>
                </div>
              </Link>
            ))}
          </div>
        </CSSTransition>

       
     
      <button onClick={toggleShowMore} className="comm toggle-button-offplan">
          {showMore ? "Show Less" : "Show More"}
        </button>
    </div>
  );
};

export default CommunityCards;
