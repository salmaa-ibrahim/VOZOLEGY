import React from "react";
import { Link } from "react-router-dom";
import "./VozolVideo.css";

const VozolVideo = () => {
  return (
    <section className="video">
      <div className="all-products-title">
        OUR BRAND
      </div>
      <video width="99%" controls autoPlay loop playsInline>
        <source src="/videos/vozol-video.mp4" type="video/mp4" />
      </video>
    </section>
  );
};

export default VozolVideo;
