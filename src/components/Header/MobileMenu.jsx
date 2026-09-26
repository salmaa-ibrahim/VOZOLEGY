// import React, { useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { siteConfig } from '../../config/siteConfig';
// import './MobileMenu.css';

// const MobileMenu = ({ isOpen, onClose }) => {
//   // Lock body scroll when open
//   useEffect(() => {
//     document.body.style.overflow = isOpen ? 'hidden' : 'unset';
//     return () => { document.body.style.overflow = 'unset'; };
//   }, [isOpen]);

//   // Handle ESC key
//   useEffect(() => {
//     const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
//     window.addEventListener('keydown', handleEsc);
//     return () => window.removeEventListener('keydown', handleEsc);
//   }, [onClose]);

//   const categories = [
//     { name: 'VOZOL GEAR 50K', slug: 'vozol-gear-50k' },
//     { name: 'VOZOL STAR 40K', slug: 'vozol-star-40k' },
//     { name: 'VOZOL HOOKAH 40K', slug: 'vozol-hookah-40k' },
//     { name: 'AIVONO ZERO NICOTINE', slug: 'aivono-zero' },
//     { name: 'VTOUCH SMART VAPE', slug: 'vtouch-smart' },
//   ];

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             className="drawer-overlay"
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             onClick={onClose}
//           />
//           <motion.div
//             className="drawer drawer--left"
//             initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
//             transition={{ type: 'spring', damping: 25, stiffness: 200 }}
//           >
//             <div className="drawer__header">
//               <h2>MENU</h2>
//               <button onClick={onClose} className="drawer__close">✕</button>
//             </div>

//             <div className="drawer__body">
//               <div className="menu-search">
//                 <input type="text" placeholder="Search products..." />
//               </div>

//               <nav className="menu-nav">
//                 <Link to="/" onClick={onClose} className="menu-link menu-link--home">HOME</Link>

//                 <div className="menu-categories">
//                   {categories.map(cat => (
//                     <Link key={cat.slug} to={`/categories/${cat.slug}`} onClick={onClose} className="menu-link">
//                       {cat.name}
//                     </Link>
//                   ))}
//                 </div>

//                 <div className="menu-divider"></div>
//                 <Link to="/how-to-choose" onClick={onClose} className="menu-link menu-link--bold">How to choose your vape?</Link>
//                 <Link to="/shipping-policy" onClick={onClose} className="menu-link">Shipping & Policy</Link>

//                 <div className="menu-divider"></div>
//                 <p className="menu-heading">Come closer to us</p>

//                 <div className="menu-socials">
// <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noreferrer" className="social-link">
//   WhatsApp
// </a>
// <a href={`tel:${siteConfig.contact.phone}`} className="social-link">
//   Call
// </a>
// <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="social-link">
//   Instagram
// </a>
// <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" className="social-link">
//   Facebook
// </a>
// </div>
//               </nav>
//             </div>

//             <div className="drawer__footer">
//               <p className="copyright">Copyright save</p>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export default MobileMenu;



import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import { siteConfig } from "../../config/siteConfig";
import { searchProducts } from "../../services/searchService";
import { getAllCategories } from "../../services/categoriesService";

import "./MobileMenu.css";

const MobileMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  // ============================================================
  // Search State
  // ============================================================

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(false);

  // ============================================================
  // Categories State
  // ============================================================

  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // ============================================================
  // Lock body scroll when menu is open
  // ============================================================

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ============================================================
  // Close menu with ESC
  // ============================================================

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  // ============================================================
  // Fetch Categories from Supabase
  // ============================================================

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);

        const data = await getAllCategories();

        setCategories(data || []);

        console.log("Mobile Menu Categories:", data);
      } catch (error) {
        console.error(
          "Failed to load mobile menu categories:",
          error
        );

        setCategories([]);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // ============================================================
  // Live Product Search
  // ============================================================

  useEffect(() => {
    const query = searchQuery.trim();

    // No search query
    if (!query) {
      setSearchResults([]);
      setIsSearching(false);
      setSearchError(false);
      return;
    }

    // Wait 300ms before searching
    const timeoutId = setTimeout(async () => {
      try {
        setIsSearching(true);
        setSearchError(false);

        const results = await searchProducts(query);

        setSearchResults(results);
      } catch (error) {
        console.error("Product search error:", error);

        setSearchResults([]);
        setSearchError(true);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    // Cancel previous search if user keeps typing
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchQuery]);

  // ============================================================
  // Search Submit
  // ============================================================

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) {
      return;
    }

    navigate(`/search?q=${encodeURIComponent(query)}`);

    setSearchQuery("");
    setSearchResults([]);

    onClose();
  };

  // ============================================================
  // Social Links
  // ============================================================

  const socialLinks = siteConfig.getSocialLinks();

  // ============================================================
  // Render
  // ============================================================

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ================================================== */}
          {/* Overlay */}
          {/* ================================================== */}

          <motion.div
            className="drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* ================================================== */}
          {/* Drawer */}
          {/* ================================================== */}

          <motion.div
            className="drawer drawer--left"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
          >
            {/* ================================================== */}
            {/* Header */}
            {/* ================================================== */}

            <div className="drawer__header">
              <h2>MENU</h2>

              <button
                type="button"
                onClick={onClose}
                className="drawer__close"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* ================================================== */}
            {/* Body */}
            {/* ================================================== */}

            <div className="drawer__body">

              {/* ================================================== */}
              {/* Search */}
              {/* ================================================== */}

              <div className="menu-search-wrapper">
                <form
                  className="menu-search"
                  onSubmit={handleSearch}
                >
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) =>
                      setSearchQuery(event.target.value)
                    }
                    placeholder="Search products..."
                    aria-label="Search products"
                    autoComplete="off"
                  />
                </form>

                {/* ================================================== */}
                {/* Search Suggestions */}
                {/* ================================================== */}

                {searchQuery.trim() && (
                  <div className="search-suggestions">

                    {/* Loading */}

                    {isSearching && (
                      <div className="search-status">
                        Searching...
                      </div>
                    )}

                    {/* Results */}

                    {!isSearching &&
                      !searchError &&
                      searchResults.length > 0 && (
                        <div className="search-results">
                          {searchResults.map((product) => (
                            <Link
                              key={product.id}
                              to={`/products/${product.slug}`}
                              className="search-result"
                              onClick={() => {
                                setSearchQuery("");
                                setSearchResults([]);
                                onClose();
                              }}
                            >
                              <div className="search-result__content">
                                <span className="search-result__name">
                                  {product.name}
                                </span>

                                {product.price !== undefined &&
                                  product.price !== null && (
                                    <span className="search-result__price">
                                      {product.price}{" "}
                                      {siteConfig.store.currencySymbol}
                                    </span>
                                  )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}

                    {/* No Results */}

                    {!isSearching &&
                      !searchError &&
                      searchResults.length === 0 && (
                        <div className="search-status">
                          No products found
                        </div>
                      )}

                    {/* Error */}

                    {searchError && (
                      <div className="search-status search-status--error">
                        Something went wrong. Please try again.
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ================================================== */}
              {/* Navigation */}
              {/* ================================================== */}

              <nav className="menu-nav">

                {/* Home */}

                <Link
                  to="/"
                  onClick={onClose}
                  className="menu-link menu-link--home"
                >
                  HOME
                </Link>

                {/* ================================================== */}
                {/* Categories */}
                {/* ================================================== */}

                <div className="menu-categories">
                  {categoriesLoading ? (
                    <div className="menu-category-loading">
                      Loading categories...
                    </div>
                  ) : categories.length > 0 ? (
                    categories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/categories/${category.slug}`}
                        onClick={onClose}
                        className="menu-link"
                      >
                        {category.name}
                      </Link>
                    ))
                  ) : (
                    <div className="menu-category-empty">
                      No categories available
                    </div>
                  )}
                </div>

                <div className="menu-divider" />

                {/* ================================================== */}
                {/* Main Navigation */}
                {/* ================================================== */}

                {siteConfig.navigation.main
                  .filter((item) => item.path !== "/")
                  .map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={onClose}
                      className={`menu-link ${
                        item.path === "/how-to-choose"
                          ? "menu-link--bold"
                          : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}

                <div className="menu-divider" />

                {/* ================================================== */}
                {/* Social Heading */}
                {/* ================================================== */}

                <p className="menu-heading">
                  Come closer to us
                </p>

                {/* ================================================== */}
                {/* Social Links */}
                {/* ================================================== */}

                <div className="menu-socials">
                  {socialLinks.map((social) => (
                    <a
                      key={social.id}
                      href={social.url}
                      target={
                        social.id === "phone"
                          ? undefined
                          : "_blank"
                      }
                      rel={
                        social.id === "phone"
                          ? undefined
                          : "noopener noreferrer"
                      }
                      className="social-link"
                    >
                      <img
                        src={social.icon}
                        alt={social.title}
                        className="social-icon"
                      />

                      {social.title}
                    </a>
                  ))}
                </div>
              </nav>
            </div>

            {/* ================================================== */}
            {/* Footer */}
            {/* ================================================== */}

            <div className="drawer__footer">
              <p className="copyright">
                {siteConfig.messages.copyright}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
