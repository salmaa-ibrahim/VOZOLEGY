import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../contexts/CartContext";
import { siteConfig } from "../../config/siteConfig";
import { supabase } from "../../lib/supabase";
import "./CategoryDetailsPage.css";

/* ============================================================
   ICONS
============================================================ */

const ChevronIcon = ({ direction = "right" }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d={direction === "left" ? "M14.5 5 7.5 12l7 7" : "m9.5 5 7 7-7 7"}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ShareIcon = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <circle
      cx="24"
      cy="7"
      r="3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
    />

    <circle
      cx="8"
      cy="16"
      r="3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
    />

    <circle
      cx="24"
      cy="25"
      r="3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
    />

    <path
      d="m11 14.5 9.7-5.5M11 17.5l9.7 5.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
    />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <path
      d="M26.3 5.8A13.7 13.7 0 0 0 4.7 22.3L3 28.7l6.5-1.7A13.7 13.7 0 1 0 26.3 5.8Zm-10.2 21a11.2 11.2 0 0 1-5.7-1.6l-.4-.2-3.8 1 1-3.7-.2-.4a11.2 11.2 0 1 1 9.1 4.9Zm6.1-8.4c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.8.2-.2.3-.9 1-.9 1.2-.2.2-.3.2-.6.1-1.7-.9-2.8-1.6-3.9-3.7-.3-.5.3-.5.8-1.7.1-.3 0-.5-.1-.7-.1-.2-.8-1.9-1-2.6-.3-.7-.5-.6-.8-.6h-.7c-.3 0-.7.1-1 .5-.3.3-1.3 1.2-1.3 3s1.3 3.5 1.5 3.7c.2.2 2.5 3.8 6.1 5.3 2.3 1 2.3.7 2.7.7.4 0 1.9-.8 2.1-1.5.3-.7.3-1.3.2-1.5-.1-.2-.3-.3-.6-.4Z"
      fill="currentColor"
    />
  </svg>
);

const FeatureIcon = ({ type }) => {
  if (type === "ice") {
    return <span className="category-feature-icon">❄</span>;
  }

  if (type === "sweet") {
    return (
      <span className="category-feature-icon category-feature-icon--line">
        ♡
      </span>
    );
  }

  if (type === "coil") {
    return (
      <span className="category-feature-icon category-feature-icon--line">
        ≋
      </span>
    );
  }

  return (
    <span className="category-feature-icon category-feature-icon--line">▯</span>
  );
};

/* ============================================================
   HELPERS
============================================================ */

const getUniqueFlavors = (products = []) => {
  const flavorsMap = new Map();

  products.forEach((product) => {
    const flavor = product?.flavor?.trim();

    if (!flavor) return;

    const key = flavor.toLowerCase();

    if (!flavorsMap.has(key)) {
      flavorsMap.set(key, {
        id: product.id,
        productId: product.id,
        name: flavor,

        image:
          product.image_url ||
          product.image ||
          "/images/products/placeholder.png",

        slug: product.slug,

        price: Number(product.price || 0),

        available: product.available === true || product.status === "active",

        product,
      });
    }
  });

  return Array.from(flavorsMap.values());
};

const getCategoryFeatures = (category) => {
  if (!category) return [];

  if (Array.isArray(category.features)) {
    return category.features;
  }

  return [];
};

/* ============================================================
   MAIN COMPONENT
============================================================ */

const CategoryDetailsPage = () => {
  const { slug } = useParams();

  const { addToCart } = useCart();

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [recommendedCategories, setRecommendedCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedFlavorId, setSelectedFlavorId] = useState(null);

  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  /* ==========================================================
     FETCH CATEGORY
  ========================================================== */

  useEffect(() => {
    let isMounted = true;

    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("====================================");
        console.log("CATEGORY DETAILS PAGE");
        console.log("Slug from URL:", slug);
        console.log("====================================");

        /* ======================================================
           1. GET CATEGORY
        ====================================================== */

        const { data: categoryData, error: categoryError } = await supabase
          .from("categories")
          .select("*")
          .eq("slug", slug)
          .maybeSingle();

        console.log("Category response:", categoryData);
        console.log("Category error:", categoryError);

        if (categoryError) {
          throw categoryError;
        }

        if (!categoryData) {
          if (isMounted) {
            setCategory(null);
            setProducts([]);
            setError(`Category not found for slug: ${slug}`);
          }

          return;
        }

        /* ======================================================
           2. GET PRODUCTS BELONGING TO CATEGORY
        ====================================================== */

        const { data: productsData, error: productsError } = await supabase
          .from("products")
          .select("*")
          .eq("category_id", categoryData.id);

        console.log("Products response:", productsData);
        console.log("Products error:", productsError);

        if (productsError) {
          throw productsError;
        }

        /* ======================================================
           3. GET OTHER CATEGORIES
        ====================================================== */

        const { data: otherCategories, error: otherCategoriesError } =
          await supabase
            .from("categories")
            .select("*")
            .neq("id", categoryData.id)
            .order("display_order", {
              ascending: true,
            })
            .limit(2);

        console.log("Recommended categories:", otherCategories);

        console.log("Recommended categories error:", otherCategoriesError);

        if (isMounted) {
          setCategory(categoryData);
          setProducts(productsData || []);
          setRecommendedCategories(otherCategories || []);
        }
      } catch (err) {
        console.error("====================================");

        console.error("CATEGORY DETAILS PAGE ERROR");

        console.error(err);

        console.error("====================================");

        if (isMounted) {
          setCategory(null);
          setProducts([]);

          setError(
            err?.message || "Something went wrong while loading this category.",
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (slug) {
      fetchCategoryData();
    } else {
      setLoading(false);
      setError("Category slug is missing.");
    }

    return () => {
      isMounted = false;
    };
  }, [slug]);

  /* ==========================================================
     FLAVORS
  ========================================================== */

  const flavors = useMemo(() => {
    const result = getUniqueFlavors(products);

    console.log("Category flavors:", result);

    return result;
  }, [products]);

  /* ==========================================================
     RESET WHEN CATEGORY / FLAVORS CHANGE
  ========================================================== */

  useEffect(() => {
    if (flavors.length > 0) {
      setSelectedFlavorId(flavors[0].id);
    } else {
      setSelectedFlavorId(null);
    }

    setSelectedGalleryIndex(0);
    setQuantity(1);
    setAdded(false);
  }, [category, flavors]);

  /* ==========================================================
     SELECTED FLAVOR
  ========================================================== */

  const selectedFlavor = useMemo(() => {
    return (
      flavors.find((flavor) => flavor.id === selectedFlavorId) || flavors[0]
    );
  }, [flavors, selectedFlavorId]);

  /* ==========================================================
     SELECTED IMAGE
  ========================================================== */

  const selectedImage =
    selectedFlavor?.image ||
    category?.image_url ||
    category?.mobile_image_url ||
    "/images/products/placeholder.png";

  /* ==========================================================
     SELECTED GALLERY INDEX
  ========================================================== */

  useEffect(() => {
    if (!selectedFlavor) return;

    const index = flavors.findIndex(
      (flavor) => flavor.id === selectedFlavor.id,
    );

    if (index >= 0) {
      setSelectedGalleryIndex(index);
    }
  }, [selectedFlavor, flavors]);

  /* ==========================================================
     CHANGE FLAVOR
  ========================================================== */

  const changeFlavor = (flavorId) => {
    setSelectedFlavorId(flavorId);

    const index = flavors.findIndex((flavor) => flavor.id === flavorId);

    if (index >= 0) {
      setSelectedGalleryIndex(index);
    }
  };

  /* ==========================================================
     GALLERY
  ========================================================== */

  const changeGallery = (index) => {
    const flavor = flavors[index];

    if (!flavor) return;

    setSelectedGalleryIndex(index);
    setSelectedFlavorId(flavor.id);
  };

  const previousGallery = () => {
    if (flavors.length === 0) return;

    const nextIndex =
      selectedGalleryIndex === 0
        ? flavors.length - 1
        : selectedGalleryIndex - 1;

    changeGallery(nextIndex);
  };

  const nextGallery = () => {
    if (flavors.length === 0) return;

    const nextIndex =
      selectedGalleryIndex === flavors.length - 1
        ? 0
        : selectedGalleryIndex + 1;

    changeGallery(nextIndex);
  };

  /* ==========================================================
     ADD TO CART
  ========================================================== */

  const handleAddToCart = () => {
    if (!category || !selectedFlavor) {
      return;
    }

    if (!selectedFlavor.available) {
      return;
    }

    const cartId = `${category.id}-${selectedFlavor.productId}`;

    addToCart({
      id: cartId,

      productId: selectedFlavor.productId,

      name: category.name,

      flavor: selectedFlavor.name,

      price: selectedFlavor.price,

      image_url: selectedFlavor.image,

      slug: selectedFlavor.slug || category.slug,

      category: category.slug,

      category_id: category.id,

      quantity,
    });

    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  /* ==========================================================
     SHARE
  ========================================================== */

  const handleShare = async () => {
    if (!category) return;

    const shareData = {
      title: category.name,

      text: `Check out ${category.name} - ${selectedFlavor?.name || ""}`,

      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch {
      // User cancelled sharing.
    }
  };

  /* ==========================================================
     WHATSAPP
  ========================================================== */

  const whatsappValue =
    siteConfig?.contact?.whatsapp?.number ||
    siteConfig?.contact?.whatsapp ||
    "";

  const whatsappNumber = String(whatsappValue).replace(/\D/g, "");

  const whatsappUrl = whatsappNumber ? `https://wa.me/${whatsappNumber}` : "#";

  /* ==========================================================
     CATEGORY INFORMATION
     
     IMPORTANT:
     DATA COMES FROM CATEGORIES TABLE.
     
     Flavor is assembled from PRODUCTS because
     flavors are product variants belonging to
     the selected category.
  ========================================================== */

  const categoryInformation = useMemo(() => {
    if (!category) return [];

    const flavorNames = flavors.map((flavor) => flavor.name).filter(Boolean);

    return [
      ["Name", category.name || "—"],

      ["Flavor", flavorNames.length > 0 ? flavorNames.join(", ") : "—"],

      ["Battery", category.battery || "—"],

      ["Capacity", category.capacity || "—"],

      ["Nicotine Strength", category.nicotine_strength || "—"],

      ["Puff Counts", category.puff_counts || "—"],

      ["Charging", category.charging || "—"],

      ["Special Feature", category.special_feature || "—"],
    ];
  }, [category, flavors]);

  /* ==========================================================
     CATEGORY BANNERS
     
     DATA COMES FROM:
     banner_1_image
     banner_2_image
     banner_3_image
  ========================================================== */

  const categoryBanners = useMemo(() => {
    if (!category) return [];

    return [
      category.banner_1_image,
      category.banner_2_image,
      category.banner_3_image,
    ].filter((banner) => typeof banner === "string" && banner.trim() !== "");
  }, [category]);

  /* ==========================================================
     FEATURES
  ========================================================== */

  const features = useMemo(() => {
    return getCategoryFeatures(category);
  }, [category]);

  /* ==========================================================
     LOADING
  ========================================================== */

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  /* ==========================================================
     ERROR
  ========================================================== */

  if (error || !category) {
    return (
      <div className="product-details-error">
        <h2>Category Not Found</h2>

        <p>{error || "This category does not exist."}</p>

        <Link to="/categories">← Back to Categories</Link>
      </div>
    );
  }

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <main className="category-details-page">
      <div className="category-details-container">
        {/* ==================================================
            BREADCRUMB
        ================================================== */}

        {/* <nav
          className="category-breadcrumb"
          aria-label="Breadcrumb"
        >
          <Link to="/">
            Home
          </Link>

          <span>
            &gt;
          </span>


          <strong>
            {category.name}
          </strong>
        </nav> */}

        {/* ==================================================
            CATEGORY MAIN BANNER
        ================================================== */}

        {(category.banner_image || category.banner_image) && (
          <section className="category-main-banner">
            <motion.div
              className="category-main-banner-wrapper"
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
              <img
                src={category.banner_image || category.banner_image}
                alt={`${category.name} banner`}
              />
            </motion.div>
          </section>
        )}

        {/* ==================================================
            TOP CATEGORY SECTION
        ================================================== */}

        <section className="category-product-top">
          {/* ==================================================
              GALLERY
          ================================================== */}

          <div className="category-gallery">
            <div className="category-gallery-main">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={selectedImage}
                  alt={`${category.name} ${selectedFlavor?.name || ""}`}
                  initial={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 1.02,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                />
              </AnimatePresence>
            </div>

            {/* ==================================================
                GALLERY CONTROLS
            ================================================== */}

            {flavors.length > 0 && (
              <div className="category-gallery-controls">
                <button
                  type="button"
                  className="category-gallery-arrow"
                  onClick={previousGallery}
                  aria-label="Previous flavor"
                >
                  <ChevronIcon direction="left" />
                </button>

                <div className="category-gallery-thumbnails">
                  {flavors.map((flavor, index) => (
                    <button
                      type="button"
                      key={flavor.id}
                      className={`category-gallery-thumbnail ${
                        selectedGalleryIndex === index ? "is-active" : ""
                      }`}
                      onClick={() => changeGallery(index)}
                      aria-label={`Show ${flavor.name}`}
                    >
                      <img src={flavor.image} alt={flavor.name} />
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  className="category-gallery-arrow"
                  onClick={nextGallery}
                  aria-label="Next flavor"
                >
                  <ChevronIcon />
                </button>
              </div>
            )}
          </div>

          {/* ==================================================
              CATEGORY SUMMARY
          ================================================== */}

          <div className="category-product-summary">
            <motion.h1
              key={category.name}
              initial={{
                opacity: 0,
                y: 16,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.45,
              }}
            >
              {category.name}
            </motion.h1>

            {/* VENDOR */}

            {category.vendor && (
              <p className="category-meta">
                <strong>Vendor</strong>

                <span>:</span>

                {category.vendor}
              </p>
            )}

            {/* AVAILABILITY */}

            <p className="category-meta">
              <strong>Availability</strong>

              <span>:</span>

              <span className="category-stock">
                {category.active === false ? "Out of Stock" : "In Stock"}
              </span>
            </p>

            {/* PRICE */}

            {selectedFlavor && (
              <div className="category-price">
                LE {Number(selectedFlavor.price || 0).toFixed(2)}
              </div>
            )}

            {/* ==================================================
                FLAVORS
            ================================================== */}

            <section className="category-flavors">
              <h2>Flavors</h2>

              <div className="category-flavor-grid">
                {flavors.length > 0 ? (
                  flavors.map((flavor) => (
                    <button
                      type="button"
                      key={flavor.id}
                      className={`category-flavor-button ${
                        selectedFlavorId === flavor.id ? "is-selected" : ""
                      }`}
                      onClick={() => changeFlavor(flavor.id)}
                    >
                      {flavor.name}
                    </button>
                  ))
                ) : (
                  <p>No flavors available.</p>
                )}
              </div>
            </section>

            {/* ==================================================
                QUANTITY
            ================================================== */}

            <section className="category-buy-area">
              <h2>Quantity</h2>

              <div className="category-quantity-control">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  onClick={() => setQuantity((value) => value + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* ADD TO CART */}

              <div className="category-action-row">
                <button
                  type="button"
                  className={`category-add-button ${added ? "is-added" : ""}`}
                  onClick={handleAddToCart}
                  disabled={!selectedFlavor || !selectedFlavor.available}
                >
                  {added
                    ? "Added to Cart ✓"
                    : selectedFlavor?.available
                      ? "Add to Cart"
                      : "Out of Stock"}
                </button>

                <button
                  type="button"
                  className="category-share-button"
                  onClick={handleShare}
                  aria-label="Share category"
                >
                  <ShareIcon />
                </button>
              </div>

              {/* WHATSAPP */}

              <a
                className="category-help-button"
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
              >
                <WhatsAppIcon />

                <span>Need Help ?</span>
              </a>
            </section>
          </div>
        </section>

        {/* ==================================================
            FEATURES
        ================================================== */}

        {features.length > 0 && (
          <section className="category-features-section">
            <div className="category-features-grid">
              {features.map((feature, index) => (
                <div className="category-feature" key={feature.title || index}>
                  <div className="category-feature-circle">
                    <FeatureIcon type={feature.icon} />
                  </div>

                  <h3>{feature.title}</h3>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ==================================================
            PRODUCT INFORMATION
             
            DATA COMES FROM CATEGORIES
        ================================================== */}

        <section className="category-information-section">
          <h2 className="category-section-title">
            <span className="category-section-title-icon">▤</span>
            PRODUCT INFORMATION
          </h2>

          <div className="category-information-table">
            {categoryInformation.map(([label, value]) => (
              <div className="category-information-row" key={label}>
                <div className="category-information-label">{label}</div>

                <div className="category-information-value">{value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ==================================================
            CATEGORY BANNERS
             
            DATA FROM:
            banner_1_image
            banner_2_image
            banner_3_image
        ================================================== */}

        {categoryBanners.length > 0 && (
          <section className="category-banners-section">
            <div className="category-banners-grid">
              {categoryBanners.map((banner, index) => (
                <motion.div
                  className="category-banner-card"
                  key={`${banner}-${index}`}
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
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                  }}
                >
                  <img
                    src={banner}
                    alt={`${category.name} banner ${index + 1}`}
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ==================================================
            YOU MAY ALSO LIKE
        ================================================== */}

        {recommendedCategories.length > 0 && (
          <section className="category-recommendations">
            <h2>You may also like</h2>

            <div className="category-recommendation-grid">
              {recommendedCategories.map((item) => (
                <Link
                  to={`/categories/${item.slug}`}
                  className="category-recommendation-card"
                  key={item.id}
                >
                  <div className="category-recommendation-image">
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

                  {/* <span className="category-recommendation-puffs">
                    {item.puff_counts || ""}
                  </span> */}

                  <h5>{item.name}</h5>

                  <span className="category-card__click">Explore →</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default CategoryDetailsPage;
