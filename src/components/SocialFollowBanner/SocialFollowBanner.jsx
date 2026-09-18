import React from 'react';
import './SocialFollowBanner.css';

const SocialFollowBanner = () => {
  return (
    <section className="social-banner">
      <div className="social-banner__text">
        <h2>Don't Forget to</h2>
        <h3>Follow Us</h3>
        <a href="https://instagram.com/vozolegy" target="_blank" rel="noreferrer" className="social-banner__btn">FOLLOW US ON INSTAGRAM →</a>
      </div>
      <div className="social-banner__image">
        <img src="/images/banners/mobile.png" alt="Follow us on Instagram" />
      </div>
    </section>
  );
};

export default SocialFollowBanner;