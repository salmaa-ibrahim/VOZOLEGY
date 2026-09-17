import React from "react";
import "./PromotionalBanner.css";
import PromotionalBannerimg from "../../../public/images/banners/PromotionalBanner.png"

const PromotionalBanner = () => {
  return (
    <section className="promo-banner">
      {/* <div className="promo-banner__content">
         <h2 className='wave-text'>MAKE JOY HAPPEN</h2>
         <p>Vozol is an international vape brand devoted to accelerating the world's transition to a smoking-free place.</p>
      </div> */}
      {/* <div className="promo-banner__image">
         <img src="/images/banners/make-joy-happen.webp" alt="Make Joy Happen" />
      </div> */}
      <section className="make-joy">
        <img src={PromotionalBannerimg} alt="" className="make-joy-bg" />

        <div className="make-joy-content">
          <h2 className="make-joy-title">
            <span>MAKE</span>
            <span>JOY</span>
            <span>HAPPEN</span>
          </h2>

          <p>
            Vozol is an international vape brand devoted to accelerating the
            world's transition to a smoking-free place.
          </p>
        </div>
      </section>
    </section>
  );
};

export default PromotionalBanner;
