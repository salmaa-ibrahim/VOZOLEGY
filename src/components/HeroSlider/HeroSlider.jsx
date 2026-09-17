import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './HeroSlider.css';

const HeroSlider = () => {
  const slides = [
    { id: 1, image: '/images/hero/hero-01.webp', title: 'New Arrival' },
    { id: 2, image: '/images/hero/hero-02.webp', title: 'Best Seller' },
  ];

  return (
    <div className="hero-slider">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id}>
            <div className="hero-slide">
              <img src={slide.image} alt={slide.title} className="hero-slide__img" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;