
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { useCart } from "../../contexts/CartContext";
import { supabase } from "../../lib/supabase";

import "./AllProduct.css";

const MODE_OPTIONS = ["MTL", "DL"];

const normalizeValue = (value) => {
  return String(value || "").trim().toLowerCase();
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

      // Get products WITHOUT filtering
      const {
        data: productsData,
        error: productsError,
      } = await supabase
        .from("products")
        .select("*");

      if (productsError) {
        console.error(
          "PRODUCTS ERROR:",
          productsError
        );

        throw productsError;
      }

      // Get categories
      const {
        data: categoriesData,
        error: categoriesError,
      } = await supabase
        .from("categories")
        .select("*")
        .eq("active", true)
        .order("display_order", {
          ascending: true,
        });

      if (categoriesError) {
        console.error(
          "CATEGORIES ERROR:",
          categoriesError
        );

        throw categoriesError;
      }

      console.log(
        "================================"
      );

      console.log(
        "ALL PRODUCTS:",
        productsData
      );

      console.log(
        "ALL CATEGORIES:",
        categoriesData
      );

      console.log(
        "PRODUCT MODES:",
        productsData?.map((product) => ({
          id: product.id,
          name: product.name,
          mode: product.mode,
          category_id: product.category_id,
          available: product.available,
        }))
      );

      console.log(
        "================================"
      );

      setProducts(productsData || []);
      setCategories(categoriesData || []);
    } catch (err) {
      console.error(
        "FAILED TO LOAD DATA:",
        err
      );

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
      return (
        normalizeValue(product.mode) ===
        normalizeValue(activeMode)
      );
    });
  }, [products, activeMode]);

  // ============================================================
  // CATEGORIES FOR CURRENT MODE
  //
  // Only show categories that actually have products
  // in the selected MTL / DL mode.
  // ============================================================

  const availableCategories = useMemo(() => {
    const categoryIds = new Set(
      modeProducts
        .map((product) => {
          // Prefer category_id from products table
          if (product.category_id) {
            return String(product.category_id);
          }

          // Fallback if Supabase relationship exists
          if (product.categories?.id) {
            return String(product.categories.id);
          }

          return null;
        })
        .filter(Boolean)
    );

    const filteredCategories = categories.filter((category) =>
      categoryIds.has(String(category.id))
    );

    return filteredCategories;
  }, [categories, modeProducts]);

  // ============================================================
  // FILTER PRODUCTS
  //
  // First:
  // MTL / DL
  //
  // Then:
  // selected category
  // ============================================================

  const filteredProducts = useMemo(() => {
    return modeProducts.filter((product) => {
      // ALL categories
      if (activeCategory === "all") {
        return true;
      }

      // Product category ID
      const productCategoryId =
        product.category_id ||
        product.categories?.id;

      return (
        String(productCategoryId) ===
        String(activeCategory)
      );
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

    setAddedProducts((prev) => ({
      ...prev,
      [product.id]: true,
    }));

    setTimeout(() => {
      setAddedProducts((prev) => {
        const updated = { ...prev };

        delete updated[product.id];

        return updated;
      });
    }, 2000);
  };

  // ============================================================
  // PRODUCT CARD CLICK
  // ============================================================

  const handleProductClick = (product) => {
    const productIdentifier =
      product.slug || product.id;

    navigate(`/products/${productIdentifier}`);
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <section className="all-products-section">
        <div className="all-products-container">
          <div className="all-products-loading">
            Loading products...
          </div>
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
          <div className="all-products-error">
            Failed to load products.
          </div>
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
          initial={{ opacity: 0, y: 25 }}
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
          <div
            className="mode-switch"
            role="tablist"
            aria-label="Product mode"
          >
            {MODE_OPTIONS.map((mode) => {
              const isActive =
                activeMode === mode;

              return (
                <button
                  key={mode}
                  type="button"
                  className={`mode-button ${
                    isActive ? "active" : ""
                  }`}
                  onClick={() =>
                    setActiveMode(mode)
                  }
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

            {/* ALL */}

            <button
              type="button"
              className={`category-button ${
                activeCategory === "all"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveCategory("all")
              }
              role="tab"
              aria-selected={
                activeCategory === "all"
              }
            >
              ALL
            </button>

            {/* DATABASE CATEGORIES */}

            {availableCategories.map(
              (category) => {
                const isActive =
                  String(activeCategory) ===
                  String(category.id);

                return (
                  <button
                    key={category.id}
                    type="button"
                    className={`category-button ${
                      isActive ? "active" : ""
                    }`}
                    onClick={() =>
                      setActiveCategory(
                        category.id
                      )
                    }
                    role="tab"
                    aria-selected={isActive}
                  >
                    {category.name}
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* =====================================================
            PRODUCTS GRID
        ====================================================== */}

        <div className="all-products-grid">
          <AnimatePresence mode="popLayout">

            {filteredProducts.map(
              (product) => {
                const isAdded =
                  Boolean(
                    addedProducts[
                      product.id
                    ]
                  );

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
                      handleProductClick(
                        product
                      )
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (
                        event.key ===
                          "Enter" ||
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
                        IMAGE
                    ================================================== */}

                    <div className="all-product-image-wrapper">
                      <img
                        src={
                          product.image_url ||
                          product.image
                        }
                        alt={`${product.name}${
                          product.flavor
                            ? ` - ${product.flavor}`
                            : ""
                        }`}
                        className="all-product-image"
                        loading="lazy"
                      />

                      {!product.available && (
                        <div className="product-unavailable-overlay">
                          <span>
                            OUT OF STOCK
                          </span>
                        </div>
                      )}
                    </div>

                    {/* =================================================
                        INFO
                    ================================================== */}

                    <div className="all-product-info">

                      <h3 className="all-product-name">
                        {product.name}
                      </h3>

                      {product.flavor && (
                        <p className="all-product-flavor">
                          {product.flavor}
                        </p>
                      )}

                      <p className="all-product-price">
                        LE{" "}
                        {Number(
                          product.price || 0
                        ).toFixed(2)}
                      </p>

                      {/* =================================================
                          ADD TO CART
                      ================================================= */}

                      <button
                        type="button"
                        className={`add-to-cart-button ${
                          isAdded
                            ? "added"
                            : ""
                        } ${
                          !product.available
                            ? "disabled"
                            : ""
                        }`}
                        disabled={
                          !product.available ||
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
                          ? "Added !"
                          : product.available
                          ? "Add to cart"
                          : "Out of stock"}
                      </button>
                    </div>
                  </motion.article>
                );
              }
            )}

          </AnimatePresence>
        </div>

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
            <p>
              No products available in
              this category.
            </p>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default AllProductsSection;
