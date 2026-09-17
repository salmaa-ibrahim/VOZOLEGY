import React from 'react';
import { Link } from 'react-router-dom';
import './HowToChoosePage.css';

const HowToChoosePage = () => {
  return (
    <div className="page-container">
      <h1>How to Choose Your Vape?</h1>
      <p className="page-subtitle">A comprehensive guide to finding the perfect device for you.</p>
      
      <div className="guide-steps">
        <div className="guide-step">
          <h3>1. Consider Your Nicotine Needs</h3>
          <p>Are you transitioning from smoking? Choose a device with higher nicotine strength. If you're looking to cut down, opt for lower nicotine or zero-nicotine options like AIVONO.</p>
        </div>
        <div className="guide-step">
          <h3>2. Puff Count & Battery Life</h3>
          <p>Devices like VOZOL GEAR 50K offer massive puff counts for long-lasting use. Smaller devices are better for portability and travel.</p>
        </div>
        <div className="guide-step">
          <h3>3. Flavor Profile</h3>
          <p>From fruity to menthol, the flavor is key. We recommend trying a variety pack or reading our flavor descriptions to find your match.</p>
        </div>
        <div className="guide-step">
          <h3>4. Smart Features</h3>
          <p>Looking for a tech-forward experience? The VTOUCH SMART VAPE offers touchscreen controls and customizable settings.</p>
        </div>
      </div>

      <Link to="/products" className="btn-primary">Browse Our Collection</Link>
    </div>
  );
};

export default HowToChoosePage;