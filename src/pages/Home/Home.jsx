import React from 'react';
import HeroSlider from '../../components/HeroSlider/HeroSlider';
import ContactSection from '../../components/ContactSection/ContactSection';
import PromotionalBanner from '../../components/PromotionalBanner/PromotionalBanner';
import CategoryShowcase from '../../components/CategoryShowcase/CategoryShowcase';
import SocialFollowBanner from '../../components/SocialFollowBanner/SocialFollowBanner';
import ScrollingGallery from '../../components/ScrollingGallery/ScrollingGallery';
import HowToChooseSection from '../../components/HowToChoose/HowToChooseSection';
// import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <HeroSlider />
      <ContactSection />
      <PromotionalBanner />
      <CategoryShowcase />
      <SocialFollowBanner />
      <HowToChooseSection />
      <ScrollingGallery />
    </div>
  );
};

export default Home;