import React from 'react';
import './Disclaimer.css';

const Disclaimer = () => {
  return (
    <section className="disc-section">
        <div className="disc-hero">
          <div className="disc-overlay">
            <h1 className="disc-title">Disclaimer</h1>
          </div>
        </div>
    <div className="disclaimer-container">
      <div className="disclaimer-content">
        <h2 className="disclaimer-heading">Disclaimer</h2>
        <div className = "disclaimer-text">
        <p>
          The information provided on this website is for general informational purposes only. While we strive to ensure its accuracy, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information. Any reliance you place on such information is strictly at your own risk.
        </p>
        <br/>
        <p>
          We make every effort to keep the information up to date and accurate, but we cannot guarantee that all information is current or complete. We reserve the right to modify or update the content on this website at any time without prior notice.
        </p>
        <br/>
        <p>
          In no event will we be liable for any loss or damage, including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of or in connection with the use of this website.
        </p>
        <br/>
        <p>
          Through this website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites. Links to other websites do not imply a recommendation for all the content found on these sites.
        </p>
        <br/>
        <p>
          Please be aware that when you leave our website, other sites may have different privacy policies and terms that are beyond our control. Therefore, we encourage you to review the privacy policies of these websites before providing any personal information.
        </p>
        <br/>
        <p>
          By using our website, you agree to these terms and conditions of use.
        </p>
        </div>
        
      </div>
    </div>
    </section>
  );
};

export default Disclaimer;
