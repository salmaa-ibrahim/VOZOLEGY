import React from "react";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import ContactSection from "../../components/ContactSection/ContactSection";
// import PromotionalBanner from "../../components/PromotionalBanner/PromotionalBanner";
import CategoryShowcase from "../../components/CategoryShowcase/CategoryShowcase";
import SocialFollowBanner from "../../components/SocialFollowBanner/SocialFollowBanner";
import ScrollingGallery from "../../components/ScrollingGallery/ScrollingGallery";
import HowToChooseSection from "../../components/HowToChoose/HowToChooseSection";
import AllProducts from "../../components/AllProducts/AllProducts";
import mockProducts from "../../data/mockProducts";
import MakeJoyBanner from "../../components/makeJoyBanner/makJoyBanner";
import VozolVideo from "../../components/VozolVideo/VozolVideo";
// import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <HeroSlider />
      <ContactSection />
      {/* <PromotionalBanner /> */}
      <CategoryShowcase />
      <SocialFollowBanner />
      <AllProducts
        products={mockProducts}
        onAddToCart={(product) => {
          console.log("Add to cart:", product);
        }}
      />
      <HowToChooseSection />
      <VozolVideo />
      <MakeJoyBanner />
      <ScrollingGallery />
    </div>
  );
};

export default Home;
