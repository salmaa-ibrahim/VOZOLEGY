import React from 'react';
import './PromotionalBanner.css';

const PromotionalBanner = () => {
  return (
    <section className="promo-banner">
      <div className="promo-banner__content">
        <h2 className='wave-text'>MAKE JOY HAPPEN</h2>
        <p>Vozol is an international vape brand devoted to accelerating the world's transition to a smoking-free place.</p>
      </div>
      {/* <div className="promo-banner__image">
        <img src="/images/banners/make-joy-happen.webp" alt="Make Joy Happen" />
      </div> */}
    </section>
  );
};

export default PromotionalBanner;