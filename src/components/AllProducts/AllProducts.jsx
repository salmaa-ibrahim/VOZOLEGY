import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../../contexts/CartContext";
import "./AllProduct.css";

const MODE_OPTIONS = ["MTL", "DL"];

const CATEGORY_ORDER = [
  "all",
  "star",
  "gear",
  "aiuono",
  "utouch",
  "hookah",
];

const CATEGORY_LABELS = {
  all: "ALL",
  star: "STAR",
  gear: "GEAR",
  aiuono: "AIUONO",
  utouch: "UTOUCH",
  hookah: "HOOKAH",
};

const normalizeValue = (value) => {
  return String(value || "").trim().toLowerCase();
};

const AllProductsSection = ({ products = [] }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [activeMode, setActiveMode] = useState("MTL");
  const [activeCategory, setActiveCategory] = useState("all");

  /*
   * Stores the IDs of products that were just added.
   * Each product gets its own 2-second Added state.
   */
  const [addedProducts, setAddedProducts] = useState({});

  /*
   * Categories available for the selected mode.
   */
  const availableCategories = useMemo(() => {
    const modeProducts = products.filter(
      (product) =>
        normalizeValue(product.mode) === normalizeValue(activeMode)
    );

    const categories = [
      ...new Set(
        modeProducts
          .map((product) => normalizeValue(product.category))
          .filter(Boolean)
      ),
    ];

    const orderedCategories = [
      ...CATEGORY_ORDER.filter(
        (category) =>
          category === "all" || categories.includes(category)
      ),
      ...categories.filter(
        (category) => !CATEGORY_ORDER.includes(category)
      ),
    ];

    return orderedCategories;
  }, [products, activeMode]);

  /*
   * When switching between MTL and DL,
   * automatically return to ALL.
   */
  useEffect(() => {
    setActiveCategory("all");
  }, [activeMode]);

  /*
   * Filter by:
   *
   * 1. Mode
   * 2. Category
   */
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const productMode = normalizeValue(product.mode);
      const productCategory = normalizeValue(product.category);

      const modeMatches =
        productMode === normalizeValue(activeMode);

      const categoryMatches =
        activeCategory === "all" ||
        productCategory === normalizeValue(activeCategory);

      return modeMatches && categoryMatches;
    });
  }, [products, activeMode, activeCategory]);

  /*
   * Category label.
   */
  const getCategoryLabel = (category) => {
    return (
      CATEGORY_LABELS[category] ||
      category.replace(/[-_]/g, " ").toUpperCase()
    );
  };

  /*
   * ADD TO CART
   *
   * Uses the existing CartContext.
   */
  const handleAddToCart = (event, product) => {
    /*
     * VERY IMPORTANT:
     * Prevent clicking Add to Cart from
     * opening the Product Details page.
     */
    event.preventDefault();
    event.stopPropagation();

    if (!product.available) {
      return;
    }

    /*
     * Add product to the existing cart.
     */
    addToCart(product);

    /*
     * Change this product button to "Added"
     */
    setAddedProducts((prev) => ({
      ...prev,
      [product.id]: true,
    }));

    /*
     * Return button to normal after 2 seconds.
     */
    setTimeout(() => {
      setAddedProducts((prev) => {
        const updated = { ...prev };
        delete updated[product.id];
        return updated;
      });
    }, 2000);
  };

  /*
   * PRODUCT CARD CLICK
   *
   * Clicking the card opens Product Details.
   */
  const handleProductClick = (product) => {
    /*
     * Prefer slug if your product has one.
     * Otherwise use the product ID.
     */
    const productIdentifier =
      product.slug || product.id;

    navigate(`/products/${productIdentifier}`);
  };

  return (
    <section className="all-products-section">
      <div className="all-products-container">

        {/* =====================================================
            TITLE
        ====================================================== */}
        <motion.h2
          className="all-products-title"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
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
              const isActive = activeMode === mode;

              return (
                <button
                  key={mode}
                  type="button"
                  className={`mode-button ${
                    isActive ? "active" : ""
                  }`}
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
            {availableCategories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  className={`category-button ${
                    isActive ? "active" : ""
                  }`}
                  onClick={() => setActiveCategory(category)}
                  role="tab"
                  aria-selected={isActive}
                >
                  {getCategoryLabel(category)}
                </button>
              );
            })}
          </div>
        </div>

        {/* =====================================================
            PRODUCTS
        ====================================================== */}
        <div className="all-products-grid">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const isAdded = Boolean(
                addedProducts[product.id]
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
                      handleProductClick(product);
                    }
                  }}
                >

                  {/* =================================================
                      IMAGE
                  ================================================== */}
                  <div className="all-product-image-wrapper">
                    <img
                      src={product.image}
                      alt={`${product.name} - ${product.flavor}`}
                      className="all-product-image"
                      loading="lazy"
                    />

                    {!product.available && (
                      <div className="product-unavailable-overlay">
                        <span>OUT OF STOCK</span>
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

                    <p className="all-product-flavor">
                      {product.flavor}
                    </p>

                    <p className="all-product-price">
                      LE{" "}
                      {Number(product.price).toFixed(2)}
                    </p>

                    {/* =================================================
                        ADD TO CART
                    ================================================== */}
                    <button
                      type="button"
                      className={`add-to-cart-button ${
                        isAdded ? "added" : ""
                      } ${
                        !product.available
                          ? "disabled"
                          : ""
                      }`}
                      disabled={
                        !product.available || isAdded
                      }
                      onClick={(event) =>
                        handleAddToCart(event, product)
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
            })}
          </AnimatePresence>
        </div>

        {/* =====================================================
            NO PRODUCTS
        ====================================================== */}
        {filteredProducts.length === 0 && (
          <motion.div
            className="no-products"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>
              No products available in this category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AllProductsSection;