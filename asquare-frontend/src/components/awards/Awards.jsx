import React from 'react';
import './Awards.css';
import award1 from '../../assets/award1.png';
import award2 from '../../assets/award2.png';
import award3 from '../../assets/award3.png';
import award4 from '../../assets/award4.png';

const Awards = () => {
  return (
    <section className="est-awards-section">
      <h2 className="est-awards-heading">Awards and Recognition</h2>
      <div className="est-awards-container">
        <div className="est-award-card">
          <img src={award1} alt="Award 1" className="est-award-image" />
          <h3 className="est-award-title">Best Real Estate Agency 2021</h3>
        </div>
        <div className="est-award-card">
          <img src={award2} alt="Award 2" className="est-award-image" />
          <h3 className="est-award-title">Top Sales Performance 2020</h3>
        </div>
        <div className="est-award-card">
          <img src={award3} alt="Award 3" className="est-award-image" />
          <h3 className="est-award-title">Customer Choice Award 2019</h3>
        </div>
        <div className="est-award-card">
          <img src={award4} alt="Award 4" className="est-award-image" />
          <h3 className="est-award-title">Excellence in Service 2018</h3>
        </div>
      </div>
    </section>
  );
};

export default Awards;
