
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { siteConfig } from "../../config/siteConfig";
import { supabase } from "../../lib/supabase";

import "./Footer.css";

const Footer = () => {
  const [openSection, setOpenSection] = useState(null);

  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // ============================================================
  // TOGGLE ACCORDION
  // ============================================================

  const toggleSection = (section) => {
    setOpenSection(
      openSection === section ? null : section
    );
  };

  // ============================================================
  // FETCH CATEGORIES FROM SUPABASE
  // ============================================================

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);

        const {
          data,
          error,
        } = await supabase
          .from("categories")
          .select("id, name, slug, active, display_order")
          .eq("active", true)
          .order("display_order", {
            ascending: true,
          });

        if (error) {
          throw error;
        }

        console.log(
          "Footer categories from Supabase:",
          data
        );

        setCategories(data || []);
      } catch (error) {
        console.error(
          "Failed to load footer categories:",
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
  // FOOTER DATA
  //
  // SHOP categories are NOT hardcoded anymore.
  // They come from Supabase below.
  // ============================================================

  const footerData = {
    "SHIPPING & POLICY": [
      {
        label: "Shipping Policy",
        url: "/shipping-policy",
      },
      {
        label: "Returns & Refunds",
        url: "/returns-refunds",
      },
      {
        label: "Terms of Service",
        url: "/terms-of-service",
      },
    ],

    "CONTACT US": [
      {
        label: "WhatsApp",
        url: `https://wa.me/${siteConfig.contact.whatsapp}`,
        external: true,
      },
      {
        label: "Call Us",
        url: `tel:${siteConfig.contact.phone}`,
        external: false,
      },
      {
        label: "Instagram",
        url: siteConfig.social.instagram,
        external: true,
      },
      {
        label: "Facebook",
        url: siteConfig.social.facebook,
        external: true,
      },
    ],
  };

  // ============================================================
  // SOCIAL LINKS
  // ============================================================

  return (
    <footer className="footer">
      <div className="footer__container">

        {/* =====================================================
            SOCIAL ICONS
        ====================================================== */}

        <div className="footer__socials">
          <h3>FOLLOW US</h3>

          <div className="footer__icons">

            {/* Instagram */}

            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect
                  x="2"
                  y="2"
                  width="20"
                  height="20"
                  rx="5"
                  ry="5"
                />

                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />

                <line
                  x1="17.5"
                  y1="6.5"
                  x2="17.51"
                  y2="6.5"
                />
              </svg>
            </a>

            {/* Facebook */}

            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>

            {/* WhatsApp */}

            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </a>

            {/* Phone */}

            <a
              href={`tel:${siteConfig.contact.phone}`}
              aria-label="Phone"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </a>
          </div>
        </div>

        {/* =====================================================
            SHOP / CATEGORIES
        ====================================================== */}

        <div className="footer__accordion">

          <button
            type="button"
            className="footer__accordion-header"
            onClick={() =>
              toggleSection("SHOP")
            }
            aria-expanded={
              openSection === "SHOP"
            }
          >
            <span>SHOP</span>

            <motion.span
              animate={{
                rotate:
                  openSection === "SHOP"
                    ? 45
                    : 0,
              }}
            >
              +
            </motion.span>
          </button>

          <AnimatePresence>
            {openSection === "SHOP" && (
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0,
                }}
                animate={{
                  height: "auto",
                  opacity: 1,
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                }}
                className="footer__accordion-content"
              >
                <ul>

                  {categoriesLoading ? (
                    <li>
                      Loading categories...
                    </li>
                  ) : categories.length === 0 ? (
                    <li>
                      No categories available
                    </li>
                  ) : (
                    categories.map(
                      (category) => (
                        <li
                          key={category.id}
                        >
                          <Link
                            to={`/categories/${category.slug}`}
                          >
                            {category.name}
                          </Link>
                        </li>
                      )
                    )
                  )}

                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* =====================================================
            SHIPPING / POLICY + CONTACT
        ====================================================== */}

        {Object.entries(footerData).map(
          ([key, items]) => (
            <div
              key={key}
              className="footer__accordion"
            >

              <button
                type="button"
                className="footer__accordion-header"
                onClick={() =>
                  toggleSection(key)
                }
                aria-expanded={
                  openSection === key
                }
              >
                <span>{key}</span>

                <motion.span
                  animate={{
                    rotate:
                      openSection === key
                        ? 45
                        : 0,
                  }}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence>
                {openSection === key && (
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    className="footer__accordion-content"
                  >
                    <ul>
                      {items.map(
                        (item) => {
                          const isExternal =
                            item.external;

                          return (
                            <li
                              key={
                                item.label
                              }
                            >
                              {isExternal ? (
                                <a
                                  href={
                                    item.url
                                  }
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {
                                    item.label
                                  }
                                </a>
                              ) : (
                                <Link
                                  to={
                                    item.url
                                  }
                                >
                                  {
                                    item.label
                                  }
                                </Link>
                              )}
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          )
        )}

        {/* =====================================================
            FOOTER BOTTOM
        ====================================================== */}

        <div className="footer__bottom">
          <p>
            {siteConfig.messages.copyright}
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
