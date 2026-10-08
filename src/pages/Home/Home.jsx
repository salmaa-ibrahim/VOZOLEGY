import React, { useEffect, useState } from "react";
import "./Home.css";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import ContactSection from "../../components/ContactSection/ContactSection";
import CategoryShowcase from "../../components/CategoryShowcase/CategoryShowcase";
import SocialFollowBanner from "../../components/SocialFollowBanner/SocialFollowBanner";
import ScrollingGallery from "../../components/ScrollingGallery/ScrollingGallery";
import HowToChooseSection from "../../components/HowToChoose/HowToChooseSection";
import AllProducts from "../../components/AllProducts/AllProducts";
import MakeJoyBanner from "../../components/makeJoyBanner/makJoyBanner";
import VozolVideo from "../../components/VozolVideo/VozolVideo";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
import { supabase } from "../../lib/supabase";
import SEO from "../../seo/SEO";
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
          .select(
            `
            *,
            category:categories (
              id,
              name,
              slug,
              active
            )
          `,
          )
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Home Products Supabase Error:", error);

          throw error;
        }

        if (isMounted) {
          setProducts(data || []);

          console.log("Home Products from Supabase:", data || []);
        }
      } catch (error) {
        console.error("Failed to fetch Home products:", error);

        if (isMounted) {
          setProducts([]);
          setProductsError("Unable to load products right now.");
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
    <>
      <SEO
        title="VOZOL EGY | VOZOL Vape in Egypt | افضل متجر فيب في مصر"
        description="Shop VOZOL vape products in Egypt from VOZOL EGY. Explore VOZOL flavors, disposable vapes and the latest VOZOL categories with fast delivery across Egypt."
        content="أكبر ستور للفيب في مصر فوزول ايچي - Vozol egy نوفر لك جميع منتجات الفيب الأصلية التي تساعدك علي الإقلاع عن التدخين وبأفضل الأٍسعار في السوق ..."
        url="https://vozolegy.com/"
        keywords={[
          "VAPE Egypt",
          "VAPE online Egypt",
          "VAPE shop Egypt",
          "VAPE store Egypt",
          "VAPE delivery Egypt",
          "VAPE products Egypt",
          "VAPE flavors Egypt",
          "VAPE",
          "vape",
          "VOZOL",
          "vozol",
          "disposable vape",
          "disposable vape Egypt",
          "disposable vape online Egypt",
          "fast delivery disposable vape Egypt",
          "VOZOL vape",
          "VOZOL Egypt",
          "VOZOL EGY",
          "VOZOL vape Egypt",
          "buy VOZOL Egypt",
          "buy VOZOL online Egypt",
          "VOZOL online Egypt",
          "VOZOL vape price Egypt",
          "VOZOL disposable vape Egypt",
          "fast delivery VOZOL Egypt",
          "fast delivery VOZOL online Egypt",
          "fast delivery VOZOL vape Egypt",
          "fast delivery VOZOL disposable vape Egypt",
          "فوزول",
          "فيب",
          "فوزول فيب",
          "فوزول مصر",
          "فوزول في مصر",
          "شراء فوزول",
          "سعر فوزول",
          "اسعار فوزول",
          "فيب فوزول",
          "شراء فيب اونلاين مصر",
          "زيرو نيكوتين",
          "فيب بدون نيكوتين",
          "فيب بدون نيكوتين مصر",
          "فيب بدون نيكوتين اونلاين مصر",
          "فيب بدون نيكوتين اونلاين",
          "فيب بدون نيكوتين اونلاين",
          "شحن سريع فيب مصر",
          "شحن سريع فيب اونلاين مصر",
          "شحن سريع فيب اونلاين",
          "شحن سريع فيب",
          "ديسبوسيبل فيب",
          " دسيبوسيبل فوزول",
          "ديسبوسيبل فيب مصر",
          "ديسبوسيبل فيب اونلاين مصر",
          "ديسبوسيبل فيب اونلاين",
          "vozzel",
          "vozell",
          "vosil",
          "vozol egypt",
          "vozol egy",
          "vozol vape egypt",
          "vozol vape egy",
          "vozol vct",
          "سعر vozol",
          "اسعار vozol",
          "شراء vozol",
          "شراء vozol vape",
          "سعر vozol في مصر",
          "اسعار vozol في مصر",
          "شراء vozol في مصر",
          "شراء vozol vape في مصر",
          "vozol liqued",
          "vozol flavors",
          "نكهات vozol",
          "نكهات vozol vape",
          
        ]}

      />

      <div className="home-page">
        {/* ======================================================
          HERO
      ======================================================= */}

        <HeroSlider />

        {/* ======================================================
          CONTACT
      ======================================================= */}
        <SearchComponent />

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
    </>
  );
};

export default Home;
