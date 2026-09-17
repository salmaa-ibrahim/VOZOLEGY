import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './HeroSlider.css';

const HeroSlider = () => {
  const slides = [
    { id: 1, image: '/images/banners/HeroSlider/1.png', title: 'New Arrival' },
    { id: 2, image: '/images/banners/HeroSlider/2.png', title: 'Best Seller' },
    { id: 3, image: '/images/banners/HeroSlider/3.png', title: 'Limited Edition' },
    { id: 4, image: '/images/banners/HeroSlider/4.png', title: 'Limited Edition' },
    { id: 5, image: '/images/banners/HeroSlider/5.png', title: 'Limited Edition' },


  ];

  return (
    <div className="hero-slider">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={14}
        slidesPerView="auto"
        centeredSlides={true}
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