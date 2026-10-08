// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { useCart } from "../../contexts/CartContext";
// import { supabase } from "../../lib/supabase";
// import "./ProductDetailsPage.css";
// import SEO from "../../seo/SEO";

// const createProductSlug = (product) => {
//   return [product.name, product.flavor]
//     .filter(Boolean)
//     .join(" ")
//     .trim()
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/^-+|-+$/g, "");
// };

// const ProductDetailsPage = () => {
//   const { slug } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const { addToCart } = useCart();
//   const [added, setAdded] = useState(false);

//   useEffect(() => {
//     const loadProduct = async () => {
//       setLoading(true);

//       try {
//         const { data, error } = await supabase
//           .from("products")
//           .select(`
//             *,
//             category:categories (
//               id,
//               name,
//               slug
//             )
//           `);

//         if (error) {
//           console.error("PRODUCT DETAILS LOAD ERROR:", error);
//           setProduct(null);
//           return;
//         }

//         const foundProduct = (data || []).find(
//           (item) => createProductSlug(item) === slug
//         );

//         if (!foundProduct) {
//           console.error("PRODUCT NOT FOUND FOR SLUG:", slug);
//           setProduct(null);
//           return;
//         }

//         setProduct(foundProduct);
//       } catch (error) {
//         console.error("PRODUCT DETAILS ERROR:", error);
//         setProduct(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (slug) {
//       loadProduct();
//     }
//   }, [slug]);

//   const handleAdd = () => {
//     if (!product) return;

//     addToCart(product);
//     setAdded(true);

//     setTimeout(() => setAdded(false), 2000);
//   };

//   if (loading) {
//     return <div className="loader">Loading...</div>;
//   }

//   if (!product) {
//     return (
//       <div className="loader">
//         Product not found.
//       </div>
//     );
//   }

//   return (
//     <>
//       <SEO
//         title={`${product.name} ${product.flavor} | Price in Egypt | VOZOL EGY`}
//         description={`Shop ${product.name} ${product.flavor} in Egypt. Check price and availability from VOZOL EGY.`}
//         image={product.image_url}
//         url={`/products/${slug}`}
//         type="product"
//         keywords={[
//           product.name,
//           product.flavor,
//           `${product.name} ${product.flavor}`,
//           `${product.name} Egypt`,
//           `${product.flavor} Egypt`,
//           `${product.name} price`,
//           "VOZOL Egypt",
//           "VOZOL EGY",
//           "فوزول مصر",
//           "VOZOL vape Egypt",
//           "VOZOL في مصر",
//           "VOZOL vape في مصر",
//           "disposable vape Egypt",
//           "disposable vape online Egypt",
//           "disposable vape flavors",
//           "disposable vape price",
//           "فوزول في مصر",
//           "فيب فوزول",
//           "اسعار فوزول",
//           "سعر VOZOL في مصر",
//           "فيب بدون نيكوتين Egypt",
//           "فيب بدون نيكوتين اونلاين Egypt",
//           "فيب بدون نيكوتين اونلاين مصر",
//           "فيب بدون نيكوتين مصر",
//           "فيب بدون نيكوتين اونلاين",
//         ]}
//       />

//       <div className="product-details">
//         <div className="product-details__image">
//           <img
//             src={product.image_url}
//             alt={`${product.name} ${product.flavor}`}
//           />
//         </div>

//         <div className="product-details__info">
//           <span className="product-category">
//             {product.category?.name || "—"}
//           </span>

//           <h1>{product.name}</h1>

//           <p className="product-flavor">
//             Flavor: {product.flavor}
//           </p>

//           <p className="product-price">
//             {product.price} LE
//           </p>

//           <p className="product-desc">
//             {product.description}
//           </p>

//           <button
//             className={`btn-add-to-cart ${added ? "added" : ""}`}
//             onClick={handleAdd}
//             disabled={!product.available}
//           >
//             {added ? "Added to Cart!" : "Add to Cart"}
//           </button>

//           {product.category?.slug && (
//             <Link
//               to={`/categories/${product.category.slug}`}
//               className="back-link"
//             >
//               ← Back to {product.category.name}
//             </Link>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductDetailsPage;


import React, { useEffect, useMemo, useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import { motion } from "framer-motion"; 
 
import { Swiper, SwiperSlide } from "swiper/react"; 
import { Autoplay, Navigation } from "swiper/modules"; 
 
import "swiper/css"; 
import "swiper/css/navigation"; 
 
import { useCart } from "../../contexts/CartContext"; 
import { supabase } from "../../lib/supabase"; 
 
import "./ProductDetailsPage.css"; 
 
const MODE_OPTIONS = ["MTL", "DL"]; 
 
const normalizeValue = (value) => { 
  return String(value || "") 
    .trim() 
    .toLowerCase(); 
}; 
 
const AllProductsSection = () => { 
  const navigate = useNavigate(); 
  const { addToCart } = useCart(); 
 
  // ============================================================ 
  // STATE 
  // ============================================================ 
 
  const [products, setProducts] = useState([]); 
  const [categories, setCategories] = useState([]); 
 
  const [activeMode, setActiveMode] = useState("MTL"); 
  const [activeCategory, setActiveCategory] = useState("all"); 
 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
 
  const [addedProducts, setAddedProducts] = useState({}); 
 
  // ============================================================ 
  // FETCH PRODUCTS + CATEGORIES FROM SUPABASE 
  // ============================================================ 
 
  useEffect(() => { 
    const fetchData = async () => { 
      try { 
        setLoading(true); 
        setError(null); 
 
        // ====================================================== 
        // GET PRODUCTS 
        // ====================================================== 
 
        const { data: productsData, error: productsError } = 
          await supabase.from("products").select(` 
            *, 
            categories ( 
              id, 
              name, 
              slug, 
      display_order   
            ) 
          `); 
 
        if (productsError) { 
          console.error("PRODUCTS ERROR:", productsError); 
          throw productsError; 
        } 
 
        // ====================================================== 
        // GET ACTIVE CATEGORIES 
        // ====================================================== 
 
        const { data: categoriesData, error: categoriesError } = await supabase 
          .from("categories") 
          .select("*") 
          .eq("active", true) 
          .order("display_order", { 
            ascending: true, 
          }); 
 
        if (categoriesError) { 
          console.error("CATEGORIES ERROR:", categoriesError); 
 
          throw categoriesError; 
        } 
 
        setProducts(productsData || []); 
        const sortedProducts = (productsData || []).sort((a, b) => { 
          const orderA = Number(a.categories?.display_order ?? 9999); 
          const orderB = Number(b.categories?.display_order ?? 9999); 
 
          return orderA - orderB; 
        }); 
 
        setProducts(sortedProducts); 
        setCategories(categoriesData || []); 
      } catch (err) { 
        console.error("FAILED TO LOAD DATA:", err); 
 
        setProducts([]); 
        setCategories([]); 
        setError(err); 
      } finally { 
        setLoading(false); 
      } 
    }; 
 
    fetchData(); 
  }, []); 
 
  // ============================================================ 
  // RESET CATEGORY WHEN MODE CHANGES 
  // ============================================================ 
 
  useEffect(() => { 
    setActiveCategory("all"); 
  }, [activeMode]); 
 
  // ============================================================ 
  // PRODUCTS FOR CURRENT MODE 
  // ============================================================ 
 
  const modeProducts = useMemo(() => { 
    return products.filter((product) => { 
      return normalizeValue(product.mode) === normalizeValue(activeMode); 
    }); 
  }, [products, activeMode]); 
 
  // ============================================================ 
  // AVAILABLE CATEGORIES FOR CURRENT MODE 
  // ============================================================ 
 
  const availableCategories = useMemo(() => { 
    const categoryIds = new Set( 
      modeProducts 
        .map((product) => { 
          if (product.category_id) { 
            return String(product.category_id); 
          } 
 
          if (product.categories?.id) { 
            return String(product.categories.id); 
          } 
 
          return null; 
        }) 
        .filter(Boolean), 
    ); 
 
    return categories.filter((category) => 
      categoryIds.has(String(category.id)), 
    ); 
  }, [categories, modeProducts]); 
 
  // ============================================================ 
  // FILTER PRODUCTS 
  // ============================================================ 
 
  const filteredProducts = useMemo(() => { 
    return modeProducts.filter((product) => { 
      if (activeCategory === "all") { 
        return true; 
      } 
 
      const productCategoryId = product.category_id || product.categories?.id; 
 
      return String(productCategoryId) === String(activeCategory); 
    }); 
  }, [modeProducts, activeCategory]); 
 
  // ============================================================ 
  // ADD TO CART 
  // ============================================================ 
 
  const handleAddToCart = (event, product) => { 
    event.preventDefault(); 
    event.stopPropagation(); 
 
    if (!product.available) { 
      return; 
    } 
 
    addToCart(product); 
 
    setAddedProducts((previous) => ({ 
      ...previous, 
      [product.id]: true, 
    })); 
 
    setTimeout(() => { 
      setAddedProducts((previous) => { 
        const updated = { 
          ...previous, 
        }; 
 
        delete updated[product.id]; 
 
        return updated; 
      }); 
    }, 2000); 
  }; 
 
  // ============================================================ 
  // PRODUCT CARD CLICK 
  // ============================================================ 
 
  const handleProductClick = (product) => { 
    const categorySlug = product.categories?.slug; 
 
    if (!categorySlug) { 
      console.error("CATEGORY SLUG NOT FOUND FOR PRODUCT:", product); 
 
      return; 
    } 
 
    navigate(`/categories/${categorySlug}`); 
  }; 
 
  // ============================================================ 
  // KEYBOARD ACCESS FOR CARD 
  // ============================================================ 
 
  const handleProductKeyDown = (event, product) => { 
    if (event.key === "Enter" || event.key === " ") { 
      event.preventDefault(); 
 
      handleProductClick(product); 
    } 
  }; 
 
  // ============================================================ 
  // LOADING 
  // ============================================================ 
 
  if (loading) { 
    return ( 
      <section className="all-products-section"> 
        <div className="all-products-container"> 
          <div className="all-products-loading">Loading products...</div> 
        </div> 
      </section> 
    ); 
  } 
 
  // ============================================================ 
  // ERROR 
  // ============================================================ 
 
  if (error) { 
    return ( 
      <section className="all-products-section"> 
        <div className="all-products-container"> 
          <div className="all-products-error">Failed to load products.</div> 
        </div> 
      </section> 
    ); 
  } 
 
  // ============================================================ 
  // RENDER 
  // ============================================================ 
 
  return ( 
    <section className="all-products-section"> 
      <div className="all-products-container"> 
        {/* ===================================================== 
            TITLE 
        ====================================================== */} 
 
        <motion.h2 
          className="all-products-title" 
          initial={{ 
            opacity: 0, 
            y: 25, 
          }} 
          whileInView={{ 
            opacity: 1, 
            y: 0, 
          }} 
          viewport={{ 
            once: true, 
            amount: 0.2, 
          }} 
          transition={{ 
            duration: 0.6, 
          }} 
        > 
          All products 
        </motion.h2> 
 
        {/* ===================================================== 
            MTL / DL SWITCH 
        ====================================================== */} 
 
        <div className="mode-switch-wrapper"> 
          <div className="mode-switch" role="tablist" aria-label="Product mode"> 
            {MODE_OPTIONS.map((mode) => { 
              const isActive = activeMode === mode; 
 
              return ( 
                <button 
                  key={mode} 
                  type="button" 
                  className={`mode-button ${isActive ? "active" : ""}`} 
                  onClick={() => setActiveMode(mode)} 
                  role="tab" 
                  aria-selected={isActive} 
                > 
                  {mode} 
                </button> 
              ); 
            })} 
          </div> 
        </div> 
 
        {/* ===================================================== 
            CATEGORY FILTER 
        ====================================================== */} 
 
        <div className="category-filter-wrapper"> 
          <div 
            className="category-filter" 
            role="tablist" 
            aria-label={`${activeMode} categories`} 
          > 
            <button 
              type="button" 
              className={`category-button ${ 
                activeCategory === "all" ? "active" : "" 
              }`} 
              onClick={() => setActiveCategory("all")} 
              role="tab" 
              aria-selected={activeCategory === "all"} 
            > 
              ALL 
            </button> 
 
            {availableCategories.map((category) => { 
              const isActive = String(activeCategory) === String(category.id); 
 
              return ( 
                <button 
                  key={category.id} 
                  type="button" 
                  className={`category-button ${isActive ? "active" : ""}`} 
                  onClick={() => setActiveCategory(category.id)} 
                  role="tab" 
                  aria-selected={isActive} 
                > 
                  {category.name} 
                </button> 
              ); 
            })} 
          </div> 
        </div> 
 
        {/* ===================================================== 
            PRODUCTS SLIDER 
        ====================================================== */} 
 
        {filteredProducts.length > 0 && ( 
          <div className="products-slider-wrapper"> 
            {/* SWIPER */} 
 
            <Swiper 
              modules={[Autoplay, Navigation]} 
              className="all-products-swiper" 
              slidesPerView={1.35} 
              spaceBetween={12} 
              loop={filteredProducts.length > 1} 
              speed={800} 
              grabCursor={true} 
              allowTouchMove={true} 
              watchOverflow={false} 
              navigation={{ 
                prevEl: ".products-slider-arrow--left", 
                nextEl: ".products-slider-arrow--right", 
              }} 
              autoplay={{ 
                delay: 2600, 
                disableOnInteraction: false, 
                pauseOnMouseEnter: true, 
              }} 
              breakpoints={{ 
                381: { 
                  slidesPerView: 2, 
                  spaceBetween: 12, 
                }, 
 
                601: { 
                  slidesPerView: 3, 
                  spaceBetween: 15, 
                }, 
 
                901: { 
                  slidesPerView: 4, 
                  spaceBetween: 18, 
                }, 
 
                1201: { 
                  slidesPerView: 5, 
                  spaceBetween: 20, 
                }, 
              }} 
            > 
              {filteredProducts.map((product) => { 
                const isAdded = Boolean(addedProducts[product.id]); 
 
                return ( 
                  <SwiperSlide key={product.id} className="all-product-slide"> 
                    <motion.article 
                      className="all-product-card" 
                      initial={{ 
                        opacity: 0, 
                        y: 25, 
                      }} 
                      animate={{ 
                        opacity: 1, 
                        y: 0, 
                      }} 
                      transition={{ 
                        duration: 0.35, 
                      }} 
                      onClick={() => handleProductClick(product)} 
                      role="button" 
                      tabIndex={0} 
                      onKeyDown={(event) => 
                        handleProductKeyDown(event, product) 
                      } 
                    > 
                      {/* ===================================== 
                            PRODUCT IMAGE 
                        ====================================== */} 
 
                      <div className="all-product-image-wrapper"> 
                        <img 
                          src={product.image_url || product.image} 
                          alt={`${product.name}${ 
                            product.flavor ? ` - ${product.flavor}` : "" 
                          }`} 
                          className="all-product-image" 
                          loading="lazy" 
                          draggable="false" 
                        /> 
 
                        {!product.available && ( 
                          <div className="product-unavailable-overlay"> 
                            <span>OUT OF STOCK</span> 
                          </div> 
                        )} 
                      </div> 
 
                      {/* ===================================== 
                            PRODUCT INFO 
                        ====================================== */} 
 
                      <div className="all-product-info"> 
                        <h3 className="all-product-name">{product.name}</h3> 
 
                        {product.flavor && ( 
                          <p className="all-product-flavor">{product.flavor}</p> 
                        )} 
 
                        <p className="all-product-price"> 
                          LE {Number(product.price || 0).toFixed(2)} 
                        </p> 
 
                        {/* =================================== 
                              ADD TO CART 
                          ==================================== */} 
 
                        <button 
                          type="button" 
                          className={`add-to-cart-button ${ 
                            isAdded ? "added" : "" 
                          } ${!product.available ? "disabled" : ""}`} 
                          disabled={!product.available || isAdded} 
                          onClick={(event) => handleAddToCart(event, product)} 
                        > 
                          {isAdded 
                            ? "Added !" 
                            : product.available 
                              ? "Add to cart" 
                              : "Out of stock"} 
                        </button> 
                      </div> 
                    </motion.article> 
                  </SwiperSlide> 
                ); 
              })} 
            </Swiper> 
 
            {/* LEFT ARROW */} 
 
            <div className="arrow-btns"> 
              <button 
                type="button" 
                className="products-slider-arrow products-slider-arrow--left" 
                aria-label="Previous products" 
              > 
                <span aria-hidden="true">&#10094;</span> 
              </button> 
 
              {/* RIGHT ARROW */} 
 
              <button 
                type="button" 
                className="products-slider-arrow products-slider-arrow--right" 
                aria-label="Next products" 
              > 
                <span aria-hidden="true">&#10095;</span> 
              </button> 
            </div> 
          </div> 
        )} 
 
        {/* ===================================================== 
            NO PRODUCTS 
        ====================================================== */} 
 
        {filteredProducts.length === 0 && ( 
          <motion.div 
            className="no-products" 
            initial={{ 
              opacity: 0, 
            }} 
            animate={{ 
              opacity: 1, 
            }} 
          > 
            <p>No products available in this category.</p> 
          </motion.div> 
        )} 
      </div> 
    </section> 
  ); 
}; 
 
export default AllProductsSection; 
