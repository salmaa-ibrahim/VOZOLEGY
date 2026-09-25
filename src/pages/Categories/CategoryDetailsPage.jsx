// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { getProductsByCategory } from '../../services/productsService';
// import './CategoryDetailsPage.css';

// const CategoryDetailsPage = () => {
//   const { slug } = useParams();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // In real app: fetch category by slug, then products by category ID
//     // For now, use mock
//     setTimeout(() => {
//       setProducts([
//         { id: 1, name: 'VOZOL GEAR 50K', flavor: 'Watermelon Ice', price: 999, image_url: '/images/products/gear-wm.webp', slug: 'vozol-gear-wm' },
//         { id: 2, name: 'VOZOL GEAR 50K', flavor: 'Mango Ice', price: 999, image_url: '/images/products/gear-mango.webp', slug: 'vozol-gear-mango' },
//       ]);
//       setLoading(false);
//     }, 500);
//   }, [slug]);

//   if (loading) return <div className="loader">Loading products...</div>;

//   return (
//     <div className="category-page">
//       <div className="category-header">
//         <h1>VOZOL GEAR 50K PUFFS</h1>
//         <p>Explore our collection of premium flavors.</p>
//       </div>
//       <div className="product-grid">
//         {products.map(product => (
//           <Link to={`/products/${product.slug}`} key={product.id} className="product-card">
//             <img src={product.image_url} alt={product.name} />
//             <h3>{product.name}</h3>
//             <p className="product-flavor">{product.flavor}</p>
//             <p className="product-price">{product.price} LE</p>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryDetailsPage;



import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../hooks/useCart";
import { siteConfig } from "../../config/siteConfig";
import "./CategoryDetailsPage.css";

/*
========================================================
TEMPORARY MOCK DATA
========================================================

This data is ONLY for testing the UI.

Later:
Supabase
   ↓
Category
   ↓
Product
   ↓
Flavors
   ↓
Gallery
   ↓
Features
   ↓
Product Information

The page structure will remain the same.
========================================================
*/

const CATEGORY_DETAILS = {
  "vozol-hookah-40k": {
    name: "VOZOL HOOKAH 40K",
    slug: "vozol-hookah-40k",

    vendor: "disposable",
    availability: "in stock",
    price: 999,

    heroImage:
      "/images/categories/vozol-shisha-40k-category-imgg.png",

    gallery: [
      {
        id: "watermelon-ice",
        flavor: "Watermelon Ice",
        image:
          "/images/categories/vozol-shisha-40k-category-imgg.png",
      },
      {
        id: "grape-mint",
        flavor: "Grape Mint",
        image: "/images/categories/hookah-40kk.webp",
      },
      {
        id: "melon",
        flavor: "Melon",
        image: "/images/categories/hookah-40k.webp",
      },
    ],

    flavors: [
      {
        id: "watermelon-ice",
        name: "Watermelon Ice",
      },
      {
        id: "grape-mint",
        name: "Grape Mint",
      },
      {
        id: "melon",
        name: "Melon",
      },
    ],

    features: [
      {
        icon: "ice",
        title: "4 Ice Levels",
      },
      {
        icon: "sweet",
        title: "2 Sweet Levels",
      },
      {
        icon: "coil",
        title: "Triple Mesh Coil",
      },
      {
        icon: "screen",
        title: "3D Curved Screen",
      },
    ],

    information: [
      ["Brand", "VOZOL GEAR SERIES"],
      ["Flavor", "Cherry, Cola, Ice"],
      [
        "Battery",
        "Rechargeable 1100mAh Battery with screen display",
      ],
      ["Capacity", "25ml e-juice capacity"],
      ["Nicotine Strength", "50mg Salt"],
      ["Puff Counts", "50000 puffs"],
      ["Charging", "Type-C"],
      [
        "Special Feature",
        "Ice & Sweet Control, Power & Airflow Control, Triple Mesh Coil for enhanced flavor and vapor",
      ],
    ],
  },

  "vozol-gear-50k": {
    name: "VOZOL GEAR 50K",
    slug: "vozol-gear-50k",

    vendor: "disposable",
    availability: "in stock",
    price: 999,

    heroImage: "/images/categories/gear-50kk.webp",

    gallery: [
      {
        id: "watermelon-ice",
        flavor: "Watermelon Ice",
        image: "/images/categories/gear-50kk.webp",
      },
      {
        id: "mango-ice",
        flavor: "Mango Ice",
        image:
          "/images/categories/vozol-gear-50k-category-img.png",
      },
      {
        id: "blue-razz",
        flavor: "Blue Razz",
        image: "/images/categories/gear-50k.webp",
      },
    ],

    flavors: [
      {
        id: "watermelon-ice",
        name: "Watermelon Ice",
      },
      {
        id: "mango-ice",
        name: "Mango Ice",
      },
      {
        id: "blue-razz",
        name: "Blue Razz",
      },
    ],

    features: [
      {
        icon: "ice",
        title: "4 Ice Levels",
      },
      {
        icon: "sweet",
        title: "2 Sweet Levels",
      },
      {
        icon: "coil",
        title: "Triple Mesh Coil",
      },
      {
        icon: "screen",
        title: "Smart Screen",
      },
    ],

    information: [
      ["Brand", "VOZOL GEAR SERIES"],
      ["Flavor", "Watermelon, Mango, Blue Razz"],
      ["Battery", "Rechargeable 1100mAh Battery"],
      ["Capacity", "25ml e-juice capacity"],
      ["Nicotine Strength", "50mg Salt"],
      ["Puff Counts", "50000 puffs"],
      ["Charging", "Type-C"],
      [
        "Special Feature",
        "Adjustable ice, sweet, power and airflow control",
      ],
    ],
  },

  "vozol-star-40k": {
    name: "VOZOL STAR 40K",
    slug: "vozol-star-40k",

    vendor: "disposable",
    availability: "in stock",
    price: 850,

    heroImage: "/images/categories/star-40k.webp",

    gallery: [
      {
        id: "mango-ice",
        flavor: "Mango Ice",
        image: "/images/categories/star-40k.webp",
      },
      {
        id: "berry-ice",
        flavor: "Berry Ice",
        image:
          "/images/categories/vozol-star-40k-category-img.png",
      },
      {
        id: "grape-ice",
        flavor: "Grape Ice",
        image: "/images/categories/star-40kk.webp",
      },
    ],

    flavors: [
      {
        id: "mango-ice",
        name: "Mango Ice",
      },
      {
        id: "berry-ice",
        name: "Berry Ice",
      },
      {
        id: "grape-ice",
        name: "Grape Ice",
      },
    ],

    features: [
      {
        icon: "ice",
        title: "4 Ice Levels",
      },
      {
        icon: "sweet",
        title: "2 Sweet Levels",
      },
      {
        icon: "coil",
        title: "Dual Mesh Coil",
      },
      {
        icon: "screen",
        title: "Smart Display",
      },
    ],

    information: [
      ["Brand", "VOZOL STAR SERIES"],
      ["Flavor", "Mango, Berry, Grape"],
      ["Battery", "Rechargeable battery"],
      ["Capacity", "20ml e-juice capacity"],
      ["Nicotine Strength", "50mg Salt"],
      ["Puff Counts", "40000 puffs"],
      ["Charging", "Type-C"],
      [
        "Special Feature",
        "Smart screen and adjustable airflow",
      ],
    ],
  },

  "vozol-rave-40k": {
    name: "VOZOL RAVE 40K",
    slug: "vozol-rave-40k",

    vendor: "disposable",
    availability: "in stock",
    price: 899,

    heroImage:
      "/images/categories/vozol-rave-40k-category-img.webp",

    gallery: [
      {
        id: "mixed-berry",
        flavor: "Mixed Berry",
        image:
          "/images/categories/vozol-rave-40k-category-img.webp",
      },
      {
        id: "strawberry-ice",
        flavor: "Strawberry Ice",
        image:
          "/images/categories/vozol-rave-40k-category-img.png",
      },
      {
        id: "blueberry-mint",
        flavor: "Blueberry Mint",
        image:
          "/images/categories/vozol-rave-40k-category-img.webp",
      },
    ],

    flavors: [
      {
        id: "mixed-berry",
        name: "Mixed Berry",
      },
      {
        id: "strawberry-ice",
        name: "Strawberry Ice",
      },
      {
        id: "blueberry-mint",
        name: "Blueberry Mint",
      },
    ],

    features: [
      {
        icon: "ice",
        title: "4 Ice Levels",
      },
      {
        icon: "sweet",
        title: "2 Sweet Levels",
      },
      {
        icon: "coil",
        title: "Mesh Coil",
      },
      {
        icon: "screen",
        title: "Smart Screen",
      },
    ],

    information: [
      ["Brand", "VOZOL RAVE SERIES"],
      ["Flavor", "Berry, Strawberry, Blueberry"],
      ["Battery", "Rechargeable battery"],
      ["Capacity", "20ml e-juice capacity"],
      ["Nicotine Strength", "50mg Salt"],
      ["Puff Counts", "40000 puffs"],
      ["Charging", "Type-C"],
      [
        "Special Feature",
        "Smart display and airflow control",
      ],
    ],
  },
};

/*
========================================================
ICONS
========================================================
*/

const ChevronIcon = ({ direction = "right" }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d={
        direction === "left"
          ? "M14.5 5 7.5 12l7 7"
          : "m9.5 5 7 7-7 7"
      }
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
    return (
      <span className="category-feature-icon">
        ❄
      </span>
    );
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
    <span className="category-feature-icon category-feature-icon--line">
      ▯
    </span>
  );
};

/*
========================================================
HELPERS
========================================================
*/

const getCategoryData = (slug) => {
  const normalizedSlug = decodeURIComponent(
    slug || ""
  ).toLowerCase();

  return (
    CATEGORY_DETAILS[normalizedSlug] ||
    CATEGORY_DETAILS["vozol-hookah-40k"]
  );
};

/*
========================================================
MAIN COMPONENT
========================================================
*/

const CategoryDetailsPage = () => {
  const { slug } = useParams();

  const { addToCart } = useCart();

  const category = useMemo(
    () => getCategoryData(slug),
    [slug]
  );

  const [selectedFlavorId, setSelectedFlavorId] =
    useState(category.flavors[0]?.id);

  const [quantity, setQuantity] = useState(1);

  const [selectedGalleryIndex, setSelectedGalleryIndex] =
    useState(0);

  const [added, setAdded] = useState(false);

  /*
  Reset when category changes
  */

  useEffect(() => {
    setSelectedFlavorId(
      category.flavors[0]?.id
    );

    setSelectedGalleryIndex(0);

    setQuantity(1);

    setAdded(false);
  }, [category]);

  /*
  Selected flavor
  */

  const selectedFlavor =
    category.flavors.find(
      (flavor) =>
        flavor.id === selectedFlavorId
    ) || category.flavors[0];

  /*
  Selected image

  Every flavor has the same ID as its gallery image.
  */

  const selectedGallery =
    category.gallery.find(
      (item) =>
        item.id === selectedFlavorId
    ) ||
    category.gallery[selectedGalleryIndex] ||
    category.gallery[0];

  /*
  ========================================================
  FLAVOR
  ========================================================
  */

  const changeFlavor = (flavorId) => {
    setSelectedFlavorId(flavorId);

    const nextIndex =
      category.gallery.findIndex(
        (image) =>
          image.id === flavorId
      );

    if (nextIndex >= 0) {
      setSelectedGalleryIndex(nextIndex);
    }
  };

  /*
  ========================================================
  GALLERY
  ========================================================
  */

  const changeGallery = (index) => {
    const item =
      category.gallery[index];

    setSelectedGalleryIndex(index);

    if (item?.id) {
      setSelectedFlavorId(item.id);
    }
  };

  const previousGallery = () => {
    const nextIndex =
      selectedGalleryIndex === 0
        ? category.gallery.length - 1
        : selectedGalleryIndex - 1;

    changeGallery(nextIndex);
  };

  const nextGallery = () => {
    const nextIndex =
      selectedGalleryIndex ===
      category.gallery.length - 1
        ? 0
        : selectedGalleryIndex + 1;

    changeGallery(nextIndex);
  };

  /*
  ========================================================
  ADD TO CART
  ========================================================
  */

  const handleAddToCart = () => {
    if (!selectedFlavor) return;

    const cartId =
      `${category.slug}-${selectedFlavor.id}`;

    addToCart({
      id: cartId,

      productId:
        category.slug,

      name:
        category.name,

      flavor:
        selectedFlavor.name,

      price:
        category.price,

      image_url:
        selectedGallery?.image ||
        category.heroImage,

      slug:
        category.slug,

      category:
        category.slug,

      quantity,
    });

    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  /*
  ========================================================
  SHARE
  ========================================================
  */

  const handleShare = async () => {
    const shareData = {
      title: category.name,

      text:
        `Check out ${category.name} - ${
          selectedFlavor?.name || ""
        }`,

      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(
          shareData
        );
      } else if (
        navigator.clipboard
      ) {
        await navigator.clipboard.writeText(
          window.location.href
        );
      }
    } catch {
      // User cancelled share.
    }
  };

  /*
  ========================================================
  WHATSAPP
  ========================================================
  */

  const whatsappNumber =
    siteConfig?.contact?.whatsapp?.number ||
    "";

  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}`
    : "#";

  /*
  ========================================================
  RENDER
  ========================================================
  */

  return (
    <main className="category-details-page">

      <div className="category-details-container">

        {/* ==================================================
            BREADCRUMB
        ================================================== */}
     <div className="category-header">
         <h1>VOZOL GEAR 50K PUFFS</h1>
         <p>Explore our collection of premium flavors.</p>
      </div>
      
        <nav
          className="category-breadcrumb"
          aria-label="Breadcrumb"
        >
          <Link to="/">
            Home
          </Link>

          <span>&gt;</span>

          <span>
            Category
          </span>

          <span>&gt;</span>

          <strong>
            {category.name}
          </strong>
        </nav>

        {/* ==================================================
            TOP PRODUCT SECTION
        ================================================== */}

        <section className="category-product-top">

          {/* ==================================================
              GALLERY
          ================================================== */}

          <div className="category-gallery">

            <div className="category-gallery-main">

              <AnimatePresence mode="wait">

                <motion.img
                  key={
                    selectedGallery?.image
                  }
                  src={
                    selectedGallery?.image ||
                    category.heroImage
                  }
                  alt={`${category.name} ${
                    selectedFlavor?.name || ""
                  }`}
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

            <div className="category-gallery-controls">

              <button
                type="button"
                className="category-gallery-arrow"
                onClick={
                  previousGallery
                }
                aria-label="Previous image"
              >
                <ChevronIcon
                  direction="left"
                />
              </button>

              <div className="category-gallery-thumbnails">

                {category.gallery.map(
                  (item, index) => (
                    <button
                      type="button"
                      key={item.id}
                      className={`category-gallery-thumbnail ${
                        selectedGalleryIndex ===
                        index
                          ? "is-active"
                          : ""
                      }`}
                      onClick={() =>
                        changeGallery(index)
                      }
                      aria-label={`Show ${item.flavor}`}
                    >
                      <img
                        src={item.image}
                        alt=""
                      />
                    </button>
                  )
                )}

              </div>

              <button
                type="button"
                className="category-gallery-arrow"
                onClick={
                  nextGallery
                }
                aria-label="Next image"
              >
                <ChevronIcon />
              </button>

            </div>

          </div>

          {/* ==================================================
              PRODUCT DETAILS
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

            <p className="category-meta">
              <strong>
                Vendor
              </strong>

              <span>:</span>

              {category.vendor}
            </p>

            <p className="category-meta">
              <strong>
                Availability
              </strong>

              <span>:</span>

              <span className="category-stock">
                {category.availability}
              </span>
            </p>

            <div className="category-price">
              LE{" "}
              {category.price.toFixed(2)}
            </div>

            {/* ==================================================
                FLAVORS
            ================================================== */}

            <section className="category-flavors">

              <h2>
                Flavors
              </h2>

              <div className="category-flavor-grid">

                {category.flavors.map(
                  (flavor) => (
                    <button
                      type="button"
                      key={flavor.id}
                      className={`category-flavor-button ${
                        selectedFlavorId ===
                        flavor.id
                          ? "is-selected"
                          : ""
                      }`}
                      onClick={() =>
                        changeFlavor(
                          flavor.id
                        )
                      }
                    >
                      {flavor.name}
                    </button>
                  )
                )}

              </div>

            </section>

            {/* ==================================================
                QUANTITY
            ================================================== */}

            <section className="category-buy-area">

              <h2>
                Quantity
              </h2>

              <div className="category-quantity-control">

                <button
                  type="button"
                  onClick={() =>
                    setQuantity(
                      (value) =>
                        Math.max(
                          1,
                          value - 1
                        )
                    )
                  }
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <span>
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity(
                      (value) =>
                        value + 1
                    )
                  }
                  aria-label="Increase quantity"
                >
                  +
                </button>

              </div>

              {/* ==================================================
                  ADD TO CART
              ================================================== */}

              <div className="category-action-row">

                <button
                  type="button"
                  className={`category-add-button ${
                    added
                      ? "is-added"
                      : ""
                  }`}
                  onClick={
                    handleAddToCart
                  }
                >
                  {added
                    ? "Added to Cart ✓"
                    : "Add to Cart"}
                </button>

                <button
                  type="button"
                  className="category-share-button"
                  onClick={
                    handleShare
                  }
                  aria-label="Share product"
                >
                  <ShareIcon />
                </button>

              </div>

              {/* ==================================================
                  WHATSAPP
              ================================================== */}

              <a
                className="category-help-button"
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
              >
                <WhatsAppIcon />

                <span>
                  Need Help ?
                </span>
              </a>

            </section>

          </div>

        </section>

        {/* ==================================================
            FEATURES
        ================================================== */}

        <section className="category-features-section">

          <div className="category-features-grid">

            {category.features.map(
              (feature) => (
                <div
                  className="category-feature"
                  key={feature.title}
                >
                  <div className="category-feature-circle">

                    <FeatureIcon
                      type={
                        feature.icon
                      }
                    />

                  </div>

                  <h3>
                    {feature.title}
                  </h3>

                </div>
              )
            )}

          </div>

        </section>

        {/* ==================================================
            PRODUCT INFORMATION
        ================================================== */}

        <section className="category-information-section">

          <h2 className="category-section-title">

            <span className="category-section-title-icon">
              ▤
            </span>

            PRODUCT INFORMATION

          </h2>

          <div className="category-information-table">

            {category.information.map(
              ([label, value]) => (
                <div
                  className="category-information-row"
                  key={label}
                >
                  <div className="category-information-label">
                    {label}
                  </div>

                  <div className="category-information-value">
                    {value}
                  </div>
                </div>
              )
            )}

          </div>

        </section>

        {/* ==================================================
            YOU MAY ALSO LIKE
        ================================================== */}

        <section className="category-recommendations">

          <h2>
            You may also like
          </h2>

          <div className="category-recommendation-grid">

            {Object.values(
              CATEGORY_DETAILS
            )
              .filter(
                (item) =>
                  item.slug !==
                  category.slug
              )
              .slice(0, 2)
              .map((item) => (

                <Link
                  to={`/categories/${item.slug}`}
                  className="category-recommendation-card"
                  key={item.slug}
                >

                  <div className="category-recommendation-image">

                    <img
                      src={
                        item.heroImage
                      }
                      alt={
                        item.name
                      }
                      loading="lazy"
                    />

                  </div>

                  <span className="category-recommendation-puffs">

                    {
                      item.information.find(
                        (row) =>
                          row[0] ===
                          "Puff Counts"
                      )?.[1] || ""
                    }

                  </span>

                  <h3>
                    {item.name}
                  </h3>

                  <span className="category-recommendation-arrow">
                    ›
                  </span>

                </Link>

              ))}

          </div>

        </section>

      </div>

    </main>
  );
};

export default CategoryDetailsPage;
