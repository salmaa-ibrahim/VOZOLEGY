
import React, { useEffect, useState } from "react";

import HeroSlider from "../../components/HeroSlider/HeroSlider";
import ContactSection from "../../components/ContactSection/ContactSection";
import CategoryShowcase from "../../components/CategoryShowcase/CategoryShowcase";
import SocialFollowBanner from "../../components/SocialFollowBanner/SocialFollowBanner";
import ScrollingGallery from "../../components/ScrollingGallery/ScrollingGallery";
import HowToChooseSection from "../../components/HowToChoose/HowToChooseSection";
import AllProducts from "../../components/AllProducts/AllProducts";
import MakeJoyBanner from "../../components/makeJoyBanner/makJoyBanner";
import VozolVideo from "../../components/VozolVideo/VozolVideo";

import { supabase } from "../../lib/supabase";

// import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState("");

  // ============================================================
  // GET PRODUCTS FROM SUPABASE
  // ============================================================

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        setProductsLoading(true);
        setProductsError("");

        const { data, error } = await supabase
          .from("products")
          .select(`
            *,
            category:categories (
              id,
              name,
              slug,
              active
            )
          `)
          .order("created_at", { ascending: false });

        if (error) {
          console.error(
            "Home Products Supabase Error:",
            error
          );

          throw error;
        }

        if (isMounted) {
          setProducts(data || []);

          console.log(
            "Home Products from Supabase:",
            data || []
          );
        }
      } catch (error) {
        console.error(
          "Failed to fetch Home products:",
          error
        );

        if (isMounted) {
          setProducts([]);
          setProductsError(
            "Unable to load products right now."
          );
        }
      } finally {
        if (isMounted) {
          setProductsLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="home-page">

      {/* ======================================================
          HERO
      ======================================================= */}

      <HeroSlider />

      {/* ======================================================
          CONTACT
      ======================================================= */}

      <ContactSection />

      {/* ======================================================
          CATEGORIES
      ======================================================= */}

      <CategoryShowcase />

      {/* ======================================================
          SOCIAL
      ======================================================= */}

      <SocialFollowBanner />

      {/* ======================================================
          ALL PRODUCTS
      ======================================================= */}

      {productsLoading ? (
        <section className="all-products-loading">
          <p>Loading products...</p>
        </section>
      ) : productsError ? (
        <section className="all-products-error">
          <p>{productsError}</p>
        </section>
      ) : (
        <AllProducts products={products} />
      )}

      {/* ======================================================
          OTHER SECTIONS
      ======================================================= */}

      <HowToChooseSection />

      <VozolVideo />

      <MakeJoyBanner />

      <ScrollingGallery />

    </div>
  );
};

export default Home;
