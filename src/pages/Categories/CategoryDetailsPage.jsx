
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { supabase } from "../../lib/supabase";
import { useCart } from "../../contexts/CartContext";

import "./CategoryDetailsPage.css";

/* ============================================================
   MAIN COMPONENT
============================================================ */

const CategoryDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [recommendedCategories, setRecommendedCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [addedProducts, setAddedProducts] = useState({});

  /* ============================================================
     PRODUCT CLICK
  ============================================================ */

  const handleProductClick = (product) => {
    if (!product?.slug) return;

    navigate(`/products/${product.slug}`);
  };

  /* ============================================================
     ADD TO CART
  ============================================================ */

  const handleAddToCart = (event, product) => {
    event.stopPropagation();

    const isAvailable =
      product?.available === true ||
      product?.status === "active";

    if (!isAvailable) return;

    addToCart(product);

    setAddedProducts((previous) => ({
      ...previous,
      [product.id]: true,
    }));

    window.setTimeout(() => {
      setAddedProducts((previous) => ({
        ...previous,
        [product.id]: false,
      }));
    }, 2000);
  };

  /* ============================================================
     FETCH CATEGORY + PRODUCTS + ALL OTHER CATEGORIES
  ============================================================ */

  useEffect(() => {
    let isMounted = true;

    const fetchCategory = async () => {
      try {
        setLoading(true);
        setError("");

        /* --------------------------------------------------------
           1. GET CURRENT CATEGORY
        -------------------------------------------------------- */

        const {
          data: categoryData,
          error: categoryError,
        } = await supabase
          .from("categories")
          .select("*")
          .eq("slug", slug)
          .maybeSingle();

        if (categoryError) {
          throw categoryError;
        }

        if (!categoryData) {
          if (isMounted) {
            setCategory(null);
            setProducts([]);
            setRecommendedCategories([]);
            setError("Category not found.");
          }

          return;
        }

        /* --------------------------------------------------------
           2. GET PRODUCTS BELONGING TO CURRENT CATEGORY
        -------------------------------------------------------- */

        const {
          data: productsData,
          error: productsError,
        } = await supabase
          .from("products")
          .select("*")
          .eq("category_id", categoryData.id)
          .order("created_at", {
            ascending: true,
          });

        if (productsError) {
          throw productsError;
        }

        /* --------------------------------------------------------
           3. GET ALL OTHER ACTIVE CATEGORIES

           Current category excluded.
           No limit — show every available category.
        -------------------------------------------------------- */

        const {
          data: categoriesData,
          error: categoriesError,
        } = await supabase
          .from("categories")
          .select("*")
          .neq("id", categoryData.id)
          .eq("active", true)
          .order("display_order", {
            ascending: true,
          });

        if (categoriesError) {
          console.error(
            "Recommended categories error:",
            categoriesError
          );
        }

        /* --------------------------------------------------------
           4. SAVE DATA
        -------------------------------------------------------- */

        if (isMounted) {
          setCategory(categoryData);
          setProducts(productsData || []);
          setRecommendedCategories(categoriesData || []);
        }
      } catch (err) {
        console.error("Category Details Error:", err);

        if (isMounted) {
          setCategory(null);
          setProducts([]);
          setRecommendedCategories([]);

          setError(
            err?.message ||
              "Something went wrong while loading this category."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (slug) {
      fetchCategory();
    } else {
      setLoading(false);
      setError("Category slug is missing.");
    }

    return () => {
      isMounted = false;
    };
  }, [slug]);

  /* ============================================================
     AVAILABLE FLAVORS

     Every flavor keeps its original product.
  ============================================================ */

  const flavors = useMemo(() => {
    const unique = new Map();

    products.forEach((product) => {
      if (!product?.flavor) return;

      const flavorName = product.flavor.trim();

      if (!flavorName) return;

      const key = flavorName.toLowerCase();

      if (!unique.has(key)) {
        unique.set(key, {
          id: product.id,
          productId: product.id,
          name: flavorName,

          image:
            product.image_url ||
            product.image ||
            "/images/products/placeholder.png",

          price: Number(product.price || 0),

          slug: product.slug,

          available:
            product.available === true ||
            product.status === "active",

          product,
        });
      }
    });

    return Array.from(unique.values());
  }, [products]);

  /* ============================================================
     PRODUCT INFORMATION
  ============================================================ */

  const information = useMemo(() => {
    if (!category) return [];

    return [
      ["Name", category.name],
      [
        "Flavor",
        flavors.length > 0
          ? flavors.map((item) => item.name).join(", ")
          : null,
      ],
      ["Battery", category.battery],
      ["Capacity", category.capacity],
      ["Nicotine Strength", category.nicotine_strength],
      ["Puff Counts", category.puff_counts],
      ["Charging", category.charging],
      ["Special Feature", category.special_feature],
    ];
  }, [category, flavors]);

  /* ============================================================
     LOADING
  ============================================================ */

  if (loading) {
    return (
      <div className="category-page-loading">
        Loading...
      </div>
    );
  }

  /* ============================================================
     ERROR
  ============================================================ */

  if (error || !category) {
    return (
      <div className="category-page-error">
        <h2>Category Not Found</h2>

        <p>
          {error || "This category does not exist."}
        </p>

        <Link to="/categories">
          Back to Categories
        </Link>
      </div>
    );
  }

  /* ============================================================
     PAGE
  ============================================================ */

  return (
    <main className="category-page">

      {/* ======================================================
          BREADCRUMB
      ====================================================== */}

      <div className="category-container">

        <nav
          className="category-breadcrumb"
          aria-label="Breadcrumb"
        >
          <Link to="/">
            Home
          </Link>

          <span>/</span>

          <Link to="/">
            Categories
          </Link>

          <span>/</span>

          <strong>
            {category.name}
          </strong>
        </nav>

      </div>

      {/* ======================================================
          HERO
      ====================================================== */}

      {/* <section className="category-hero">

        <div className="category-container category-hero-inner">

          <motion.div
            className="category-hero-content"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
          >
            <h1>
              {category.name}
            </h1>
          </motion.div>

          <motion.div
            className="category-hero-image"
            initial={{
              opacity: 0,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <img
              src={
                category.image_url ||
                category.mobile_image_url ||
                "/images/products/placeholder.png"
              }
              alt={category.name}
            />
          </motion.div>

        </div>

      </section> */}





      <section className="category-hero">

        <div className="category-container category-hero-inner">


          <motion.div
            className="category-hero-image"
            initial={{
              opacity: 0,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <img
              src={
                category.banner_image ||
                category.mobile_image_url ||
                "/images/products/placeholder.png"
              }
              alt={category.name}
            />
          </motion.div>

        </div>

      </section>

      {/* ======================================================
          ALL PRODUCTS / FLAVORS
      ====================================================== */}

      {flavors.length > 0 && (
        <section className="category-section">

          <div className="category-container">

            <div className="category-section-heading">
              <h2>
                CHOOSE YOUR FLAVOR
              </h2>
            </div>

            <div className="all-products-grid">

              <AnimatePresence mode="popLayout">

                {products.map((product) => {

                  const isAdded =
                    Boolean(
                      addedProducts[product.id]
                    );

                  const isAvailable =
                    product.available === true ||
                    product.status === "active";

                  return (
                    <motion.article
                      key={product.id}
                      className="all-product-card"

                      layout

                      initial={{
                        opacity: 0,
                        y: 25,
                      }}

                      animate={{
                        opacity: 1,
                        y: 0,
                      }}

                      exit={{
                        opacity: 0,
                        scale: 0.96,
                      }}

                      transition={{
                        duration: 0.35,
                      }}

                      onClick={() =>
                        handleProductClick(product)
                      }

                      role="button"
                      tabIndex={0}

                      onKeyDown={(event) => {

                        if (
                          event.key === "Enter" ||
                          event.key === " "
                        ) {
                          event.preventDefault();

                          handleProductClick(
                            product
                          );
                        }

                      }}
                    >

                      {/* =================================================
                          PRODUCT IMAGE
                      ================================================= */}

                      <div className="all-product-image-wrapper">

                        <img
                          src={
                            product.image_url ||
                            product.image ||
                            "/images/products/placeholder.png"
                          }

                          alt={`${product.name}${
                            product.flavor
                              ? ` - ${product.flavor}`
                              : ""
                          }`}

                          className="all-product-image"

                          loading="lazy"
                        />

                        {!isAvailable && (
                          <div className="product-unavailable-overlay">
                            <span>
                              OUT OF STOCK
                            </span>
                          </div>
                        )}

                      </div>

                      {/* =================================================
                          PRODUCT INFO
                      ================================================= */}

                      <div className="all-product-info">

                        <h3 className="all-product-name">
                          {product.flavor}
                        </h3>

                        <p className="all-product-price">
                          LE{" "}
                          {Number(
                            product.price || 0
                          ).toFixed(2)}
                        </p>

                        {/* ADD TO CART */}

                        <button
                          type="button"

                          className={`add-to-cart-button ${
                            isAdded
                              ? "added"
                              : ""
                          } ${
                            !isAvailable
                              ? "disabled"
                              : ""
                          }`}

                          disabled={
                            !isAvailable ||
                            isAdded
                          }

                          onClick={(event) =>
                            handleAddToCart(
                              event,
                              product
                            )
                          }
                        >
                          {isAdded
                            ? "Added!"
                            : isAvailable
                              ? "Add to Cart"
                              : "Out of Stock"}
                        </button>

                      </div>

                    </motion.article>
                  );
                })}

              </AnimatePresence>

            </div>

          </div>

        </section>
      )}

      {/* ======================================================
          PRODUCT INFORMATION
      ====================================================== */}

      <section className="category-section category-info-section">

        <div className="category-container">

          <section className="category-information-section">

            <div className="category-container">

              <h2 className="category-section-title">
                PRODUCT INFORMATION
              </h2>

              <div className="category-information-table">

                {information.map(
                  ([label, value]) => (
                    <div
                      className="category-information-row"
                      key={label}
                    >

                      <div className="category-information-label">
                        {label}
                      </div>

                      <div className="category-information-value">
                        {value || "—"}
                      </div>

                    </div>
                  )
                )}

              </div>

            </div>

          </section>

        </div>

      </section>

      {/* ======================================================
          CATEGORY BANNERS
          
          Static grid — no slider
      ====================================================== */}

      {(category.banner_1_image ||
        category.banner_2_image ||
        category.banner_3_image) && (

        <section className="category-banners">

          <div className="category-container">

            <div className="category-banner-grid">

              {[
                category.banner_1_image,
                category.banner_2_image,
                category.banner_3_image,
              ]

                .filter(Boolean)

                .map((banner, index) => (

                  <motion.div
                    className="category-banner"
                    key={banner}

                    initial={{
                      opacity: 0,
                      y: 20,
                    }}

                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}

                    viewport={{
                      once: true,
                    }}

                    transition={{
                      duration: 0.45,
                      delay: index * 0.08,
                    }}
                  >

                    <img
                      src={banner}
                      alt={`${category.name} banner ${
                        index + 1
                      }`}
                      loading="lazy"
                    />

                  </motion.div>

                ))}

            </div>

          </div>

        </section>
      )}

      {/* ======================================================
          YOU MAY ALSO LIKE

          ALL ACTIVE CATEGORIES
          Current category excluded
      ====================================================== */}

      {recommendedCategories.length > 0 && (

        <section className="category-section category-recommended-section">

          <div className="category-container">

            <div className="category-section-heading">

              <div>
                <h2>
                  YOU MAY ALSO LIKE
                </h2>
              </div>

            </div>

            <div className="category-recommended-grid">

              {recommendedCategories.map(
                (item) => (

                  <Link
                    to={`/categories/${item.slug}`}
                    className="category-recommended-card"
                    key={item.id}
                  >

                    <div className="category-recommended-image">

                      <img
                        src={
                          item.image_url ||
                          item.mobile_image_url ||
                          "/images/products/placeholder.png"
                        }

                        alt={item.name}

                        loading="lazy"
                      />

                    </div>

                    <div className="category-recommended-content">

                      <h4>
                        {item.name}
                      </h4>

                      <span className="category-recommended-arrow">
                        Explore →
                      </span>

                    </div>

                  </Link>

                )
              )}

            </div>

          </div>

        </section>

      )}

    </main>
  );
};

export default CategoryDetailsPage;
