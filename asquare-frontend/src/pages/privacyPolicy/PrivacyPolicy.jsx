import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <section className="privacy-section">
        <div className="privacy-hero">
          <div className="privacy-overlay">
            <h1 className="privacy-title">Privacy and Policy</h1>
          </div>
        </div>
    <div className="privacy-policy-container">
          <div className="pp-content-container">
          {/* <h1>Privacy Policy</h1> */}
      <p>
        At Asquared Real Estate, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website <a href="https://asquaredre.com/" target="_blank" rel="noopener noreferrer">https://asquaredre.com/</a> or interact with us through other channels.
      </p>
      <h2>Information We Collect</h2>
      <p>
        We may collect personal information, including but not limited to your name, email address, phone number, and any other details you provide when you contact us or use our services.
      </p>
      <h2>How We Use Your Information</h2>
      <p>
        We use the information we collect to provide you with our services, respond to your inquiries, personalize your experience, and improve our website and services.
      </p>
      <h2>Data Security</h2>
      <p>
        We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
      </p>
      <h2>Third-Party Links</h2>
      <p>
        Our website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third-party sites.
      </p>
      <h2>Contact Us</h2>
      <p>
        If you have any questions or concerns about our Privacy Policy or the handling of your personal information, please contact us at:
      </p>
      <p>
        Phone: (+971) 55 558 1554<br />
        Email: <a href="mailto:info@asquaredre.com">info@asquaredre.com</a>
      </p>
      <h2>Updates to This Policy</h2>
      <p>
        We reserve the right to update or modify this Privacy Policy at any time. We will post the updated policy on our website with the effective date.
      </p>
      <p>
        By using our website or services, you consent to the terms of this Privacy Policy.
      </p>
          </div>
      
    </div>
    
    </section>
  );
};

export default PrivacyPolicy;
