// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// import { siteConfig } from "../../config/siteConfig";
// import { supabase } from "../../lib/supabase";

// import "./Footer.css";

// const Footer = () => {
//   const [openSection, setOpenSection] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [categoriesLoading, setCategoriesLoading] = useState(true);

//   const toggleSection = (section) => {
//     setOpenSection(openSection === section ? null : section);
//   };

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         setCategoriesLoading(true);
//         const { data, error } = await supabase
//           .from("categories")
//           .select("id, name, slug, active, display_order")
//           .eq("active", true)
//           .order("display_order", { ascending: true });

//         if (error) throw error;
//         console.log("Footer categories from Supabase:", data);
//         setCategories(data || []);
//       } catch (error) {
//         console.error("Failed to load footer categories:", error);
//         setCategories([]);
//       } finally {
//         setCategoriesLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const footerData = {
//     "SHIPPING & POLICY": [
//       {
//         label: "سياسة الاستبدال والاسترجاع",
//         url: "/returns-refunds",
//         description:
//           "يمكن استبدال المنتجات خلال 1أيام من الاستلام في حالة وجود عيب بالمنتج.",
//       },
//       {
//         label: "سياسة الخصوصية",
//         url: "/privacy-policy",
//         description: "نحن نحترم خصوصيتك ونتعهد بحماية معلوماتك الشخصية.",
//       },
//       {
//         label: "سياسة الشحن والتوصيل",
//         url: "/shipping-policy",
//         description: "نقدم لك شحن سريع وآمن في نفس اليوم أو خلال يومين عمل.",
//       },
//       // { label: "Terms of Service", url: "/terms-of-service" },
//     ],
//     "CONTACT US": [
//       {
//         label: "WhatsApp",
//         url: `https://wa.me/${siteConfig.contact.whatsapp.number}`,
//         external: true,
//       },
//       { label: "Call Us", url: `tel:${siteConfig.contact.phone.number}` },
//       { label: "Instagram", url: siteConfig.social.instagram, external: true },
//       { label: "Facebook", url: siteConfig.social.facebook, external: true },
//     ],
//   };

//   return (
//     <footer className="footer">
//       <div className="footer__container">
//         <div className="footer__socials">
//           <h3>FOLLOW US</h3>
//           <div className="footer__icons">
//             <a
//               href={siteConfig.social.instagram}
//               target="_blank"
//               rel="noreferrer"
//               aria-label="Instagram"
//             >
//               <svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="#fff"
//                 strokeWidth="2"
//               >
//                 <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
//                 <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
//                 <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
//               </svg>
//             </a>
//             <a
//               href={siteConfig.social.facebook}
//               target="_blank"
//               rel="noreferrer"
//               aria-label="Facebook"
//             >
//               <svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="#fff"
//                 strokeWidth="2"
//               >
//                 <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
//               </svg>
//             </a>
//             <a
//               href={`https://wa.me/${siteConfig.contact.whatsapp.number}`}
//               target="_blank"
//               rel="noreferrer"
//               aria-label="WhatsApp"
//             >
//               <svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="#fff"
//                 strokeWidth="2"
//               >
//                 <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
//               </svg>
//             </a>
//             <a href={`tel:${siteConfig.contact.phone.number}`} aria-label="Phone">
//               <svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="#fff"
//                 strokeWidth="2"
//               >
//                 <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
//               </svg>
//             </a>
//           </div>
//         </div>

//         <div className="footer__accordion">
//           <button
//             type="button"
//             className="footer__accordion-header"
//             onClick={() => toggleSection("SHOP")}
//             aria-expanded={openSection === "SHOP"}
//           >
//             <span>SHOP</span>
//             <motion.span animate={{ rotate: openSection === "SHOP" ? 45 : 0 }}>
//               +
//             </motion.span>
//           </button>
//           <AnimatePresence>
//             {openSection === "SHOP" && (
//               <motion.div
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: "auto", opacity: 1 }}
//                 exit={{ height: 0, opacity: 0 }}
//                 className="footer__accordion-content"
//               >
//                 <ul>
//                   {categoriesLoading ? (
//                     <li>Loading categories...</li>
//                   ) : categories.length === 0 ? (
//                     <li>No categories available</li>
//                   ) : (
//                     categories.map((category) => (
//                       <li key={category.id}>
//                         <Link to={`/categories/${category.slug}`}>
//                           {category.name}
//                         </Link>
//                       </li>
//                     ))
//                   )}
//                 </ul>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {Object.entries(footerData).map(([key, items]) => (
//           <div
//             key={key}
//             className={`footer__accordion${key === "SHIPPING & POLICY" ? " footer__accordion--policies" : ""}`}
//           >
//             <button
//               type="button"
//               className="footer__accordion-header"
//               onClick={() => toggleSection(key)}
//               aria-expanded={openSection === key}
//             >
//               <span>{key}</span>
//               <motion.span animate={{ rotate: openSection === key ? 45 : 0 }}>
//                 +
//               </motion.span>
//             </button>
//             <AnimatePresence>
//               {openSection === key && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ height: "auto", opacity: 1 }}
//                   exit={{ height: 0, opacity: 0 }}
//                   className="footer__accordion-content"
//                 >
//                   <ul>
//                     {items.map((item) => (
//                       <li key={item.label}>
//                         {item.external ? (
//                           <a href={item.url} target="_blank" rel="noreferrer">
//                             {item.label}
//                           </a>
//                         ) : (
//                           <Link to={item.url}>{item.label}</Link>
//                         )}
//                         {item.description && (
//                           <p className="footer__policy-description">
//                             {item.description}
//                           </p>
//                         )}
//                       </li>
//                     ))}
//                   </ul>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         ))}

//         <div className="footer__bottom">
//           <p>{siteConfig.messages.copyright}</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;



import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { siteConfig } from "../../config/siteConfig";
import { supabase } from "../../lib/supabase";

import "./Footer.css";

const normalizeExternalUrl = (url) => {
  if (typeof url !== "string" || !url.trim()) {
    return null;
  }

  const value = url.trim();

  try {
    const parsedUrl = new URL(
      /^https?:\/\//i.test(value)
        ? value
        : `https://${value}`
    );

    if (
      parsedUrl.protocol !== "https:" &&
      parsedUrl.protocol !== "http:"
    ) {
      return null;
    }

    return parsedUrl.href;
  } catch {
    return null;
  }
};

const getWhatsAppUrl = (number) => {
  const normalizedNumber = String(number || "").replace(
    /\D/g,
    ""
  );

  return normalizedNumber
    ? `https://wa.me/${normalizedNumber}`
    : null;
};

const getPhoneUrl = (number) => {
  const normalizedNumber = String(number || "").replace(
    /[^\d+]/g,
    ""
  );

  return normalizedNumber ? `tel:${normalizedNumber}` : null;
};

const Footer = () => {
  const [openSection, setOpenSection] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] =
    useState(true);

  // SOCIAL & CONTACT URLS
  // siteConfig.social.instagram is an object,
  // so we must read its .url property.

  const instagramUrl = normalizeExternalUrl(
    siteConfig.social?.instagram?.url
  );

  const facebookUrl = normalizeExternalUrl(
    siteConfig.social?.facebook?.url
  );

  const whatsappUrl = getWhatsAppUrl(
    siteConfig.contact?.whatsapp?.number
  );

  const phoneUrl = getPhoneUrl(
    siteConfig.contact?.phone?.number
  );

  const toggleSection = (section) => {
    setOpenSection((current) =>
      current === section ? null : section
    );
  };

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);

        const { data, error } = await supabase
          .from("categories")
          .select("id, name, slug, active, display_order")
          .eq("active", true)
          .order("display_order", { ascending: true });

        if (error) {
          throw error;
        }

        if (isMounted) {
          setCategories(data || []);
        }
      } catch (error) {
        console.error(
          "Failed to load footer categories:",
          error
        );

        if (isMounted) {
          setCategories([]);
        }
      } finally {
        if (isMounted) {
          setCategoriesLoading(false);
        }
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const footerData = {
    "SHIPPING & POLICY": [
      {
        label: "سياسة الاستبدال والاسترجاع",
        url: "/returns-refunds",
        description:
          "يمكن استبدال المنتجات خلال يوم من الاستلام في حالة وجود عيب بالمنتج.",
      },
      {
        label: "سياسة الخصوصية",
        url: "/privacy-policy",
        description:
          "نحن نحترم خصوصيتك ونتعهد بحماية معلوماتك الشخصية.",
      },
      {
        label: "سياسة الشحن والتوصيل",
        url: "/shipping-policy",
        description:
          "نقدم لك خدمة الشحن وفقًا لسياسة التوصيل المعتمدة لدينا.",
      },
    ],

    "CONTACT US": [
      {
        label: "WhatsApp",
        url: whatsappUrl,
        external: true,
      },
      {
        label: "Call Us",
        url: phoneUrl,
        external: true,
      },
      {
        label: "Instagram",
        url: instagramUrl,
        external: true,
      },
      ...(facebookUrl
        ? [
            {
              label: "Facebook",
              url: facebookUrl,
              external: true,
            },
          ]
        : []),
    ],
  };

  // Reusable external link renderer.
  // External links never use React Router Link.

  const renderExternalLink = (
    url,
    content,
    className,
    ariaLabel
  ) => {
    if (!url) {
      return (
        <span
          className={className}
          aria-label={`${ariaLabel}: link unavailable`}
          title="Please check the URL in siteConfig.js"
        >
          {content}
        </span>
      );
    }

    const isPhoneLink = url.startsWith("tel:");

    return (
      <a
        href={url}
        className={className}
        target={isPhoneLink ? undefined : "_blank"}
        rel={
          isPhoneLink
            ? undefined
            : "noopener noreferrer"
        }
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* SOCIAL ICONS */}

        <div className="footer__socials">
          <h3>FOLLOW US</h3>

          <div className="footer__icons">
            {renderExternalLink(
              instagramUrl,
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
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
              </svg>,
              "footer__social-link",
              "Instagram"
            )}

            {renderExternalLink(
              facebookUrl,
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>,
              "footer__social-link",
              "Facebook"
            )}

            {renderExternalLink(
              whatsappUrl,
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>,
              "footer__social-link",
              "WhatsApp"
            )}

            {renderExternalLink(
              phoneUrl,
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>,
              "footer__social-link",
              "Phone"
            )}
          </div>
        </div>

        {/* SHOP ACCORDION */}

        <div className="footer__accordion">
          <button
            type="button"
            className="footer__accordion-header"
            onClick={() => toggleSection("SHOP")}
            aria-expanded={openSection === "SHOP"}
          >
            <span>SHOP</span>

            <motion.span
              animate={{
                rotate: openSection === "SHOP" ? 45 : 0,
              }}
            >
              +
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {openSection === "SHOP" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="footer__accordion-content"
              >
                <ul>
                  {categoriesLoading ? (
                    <li>Loading categories...</li>
                  ) : categories.length === 0 ? (
                    <li>No categories available</li>
                  ) : (
                    categories.map((category) => (
                      <li key={category.id}>
                        <Link
                          to={`/categories/${category.slug}`}
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* POLICIES & CONTACT ACCORDIONS */}

        {Object.entries(footerData).map(([key, items]) => (
          <div
            key={key}
            className={`footer__accordion${
              key === "SHIPPING & POLICY"
                ? " footer__accordion--policies"
                : ""
            }`}
          >
            <button
              type="button"
              className="footer__accordion-header"
              onClick={() => toggleSection(key)}
              aria-expanded={openSection === key}
            >
              <span>{key}</span>

              <motion.span
                animate={{
                  rotate: openSection === key ? 45 : 0,
                }}
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {openSection === key && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="footer__accordion-content"
                >
                  <ul>
                    {items.map((item) => (
                      <li key={item.label}>
                        {item.external ? (
                          renderExternalLink(
                            item.url,
                            item.label,
                            undefined,
                            item.label
                          )
                        ) : (
                          <Link to={item.url}>
                            {item.label}
                          </Link>
                        )}

                        {item.description && (
                          <p className="footer__policy-description">
                            {item.description}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* COPYRIGHT */}

        <div className="footer__bottom">
          <p>{siteConfig.messages.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
