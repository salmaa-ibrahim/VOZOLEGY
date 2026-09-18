import React from 'react';
import Marquee from 'react-fast-marquee'; // Placeholder: Use framer motion or custom CSS for infinite marquee
import './ScrollingGallery.css';

const ScrollingGallery = () => {
  // Since 'react-fast-marquee' is not installed, we use CSS animation for the example.
  // In production, use a robust library or custom hook.
  const imagesRight = [
    '/images/gallery/gallery-1.webp', '/images/gallery/gallery-2.webp', '/images/gallery/gallery-3.webp',
    '/images/gallery/gallery-4.webp', '/images/gallery/gallery-5.webp', '/images/gallery/gallery-6.webp'
  ];

  const imagesLeft = [
    '/images/gallery/gallery-7.webp', '/images/gallery/gallery-8.webp', '/images/gallery/gallery-9.webp',
    '/images/gallery/gallery-1.png', '/images/gallery/2.png', '/images/gallery/3.png'
  ];

  return (
    <div className="scrolling-gallery">
      {/* Row 1 - Moves Right */}
      <div className="marquee marquee--right">
        <div className="marquee__track">
          {[...imagesRight, ...imagesRight].map((src, i) => (
            <img key={i} src={src} alt="gallery" className="marquee__img" />
          ))}
        </div>
      </div>
      {/* Row 2 - Moves Left */}
      <div className="marquee marquee--left">
        <div className="marquee__track">
          {[...imagesLeft, ...imagesLeft].map((src, i) => (
            <img key={i} src={src} alt="gallery" className="marquee__img" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollingGallery;