import React from 'react';
import "./ClientLove.css";
import trustIcon from "../../assets/trust-icon.png";
import supportIcon from "../../assets/support-icon.png";
import qualityIcon from "../../assets/quality-icon.png";
import satisfactionIcon from "../../assets/satisfaction-icon.png";

const ClientLove = () => {
  return (
    <section className="est-client-love">
      <h2 className="est-client-love-heading">Why Our Clients Love Working with Us</h2>
      <div className="est-card-container">
        <div className="est-card">
          <img src={trustIcon} alt="Trust Icon" className="est-card-icon" />
          <h3 className="est-card-title">Trustworthy Service</h3>
          <p className="est-card-text">Our commitment to transparency and reliability ensures peace of mind for our clients.</p>
        </div>
        <div className="est-card">
          <img src={supportIcon} alt="Support Icon" className="est-card-icon" />
          <h3 className="est-card-title">Dedicated Support</h3>
          <p className="est-card-text">24/7 support from our expert team, ensuring prompt assistance whenever needed.</p>
        </div>
        <div className="est-card">
          <img src={qualityIcon} alt="Quality Icon" className="est-card-icon" />
          <h3 className="est-card-title">Exceptional Quality</h3>
          <p className="est-card-text">Delivering high-quality service and properties that exceed expectations.</p>
        </div>
        <div className="est-card">
          <img src={satisfactionIcon} alt="Satisfaction Icon" className="est-card-icon" />
          <h3 className="est-card-title">Customer Satisfaction</h3>
          <p className="est-card-text">Ensuring our clients are happy with every aspect of their experience with us.</p>
        </div>
      </div>
    </section>
  );
};

export default ClientLove;
