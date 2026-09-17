import React from 'react';
import Marquee from 'react-fast-marquee'; // Placeholder: Use framer motion or custom CSS for infinite marquee
import './ScrollingGallery.css';

const ScrollingGallery = () => {
  // Since 'react-fast-marquee' is not installed, we use CSS animation for the example.
  // In production, use a robust library or custom hook.
  const images = [
    '/images/gallery/img1.webp', '/images/gallery/img2.webp', '/images/gallery/img3.webp',
    '/images/gallery/img4.webp', '/images/gallery/img5.webp', '/images/gallery/img6.webp'
  ];

  return (
    <div className="scrolling-gallery">
      {/* Row 1 - Moves Right */}
      <div className="marquee marquee--right">
        <div className="marquee__track">
          {[...images, ...images].map((src, i) => (
            <img key={i} src={src} alt="gallery" className="marquee__img" />
          ))}
        </div>
      </div>
      {/* Row 2 - Moves Left */}
      <div className="marquee marquee--left">
        <div className="marquee__track">
          {[...images.reverse(), ...images].map((src, i) => (
            <img key={i} src={src} alt="gallery" className="marquee__img" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollingGallery;