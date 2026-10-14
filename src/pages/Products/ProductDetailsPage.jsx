


import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useCart } from "../../contexts/CartContext";
import { supabase } from "../../lib/supabase";

import SEO from "../../seo/SEO";
import "./ProductDetailsPage.css";

const WHATSAPP_NUMBER = "201556220922"; // VOZOL EGY WhatsApp number
const WHATSAPP_ICON = "/icons/whatsapp.jpg";

const createProductSlug = (product) => {
  return [product.name, product.flavor]
    .filter(Boolean)
    .join(" ")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const isProductAvailable = (product) =>
  product.available === true || product.status === "active";

const getProductImage = (product) =>
  product.image_url || product.image || "";

const formatPrice = (price) =>
  `${Number(price || 0).toLocaleString("en-EG", {
    maximumFractionDigits: 2,
  })} LE`;

const ProductDetailsPage = () => {
  const { slug } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [error, setError] = useState(false);
  const [addedProductId, setAddedProductId] = useState(null);

  // Load the selected product and its category information
  useEffect(() => {
    let isMounted = true;

    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(false);
        setProduct(null);
        setRelatedProducts([]);

        const { data, error: fetchError } = await supabase
          .from("products")
          .select(`
            *,
            category:categories (
              id,
              name,
              slug,
              battery,
              capacity,
              nicotine_strength,
              puff_counts,
              charging,
              special_feature
            )
          `);

        if (fetchError) throw fetchError;

        const foundProduct = (data || []).find(
          (item) => createProductSlug(item) === slug
        );

        if (!foundProduct) {
          if (isMounted) setProduct(null);
          return;
        }

        if (isMounted) setProduct(foundProduct);
      } catch (err) {
        console.error("PRODUCT DETAILS LOAD ERROR:", err);

        if (isMounted) {
          setError(true);
          setProduct(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (slug) {
      loadProduct();
    } else {
      setLoading(false);
      setProduct(null);
    }

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Load other available flavors from the same category
  useEffect(() => {
    let isMounted = true;

    const loadRelatedProducts = async () => {
      if (!product?.category_id) {
        setRelatedProducts([]);
        return;
      }

      try {
        setRelatedLoading(true);

        const { data, error: relatedError } = await supabase
          .from("products")
          .select("*")
          .eq("category_id", product.category_id);

        if (relatedError) throw relatedError;

        const related = (data || []).filter(
          (item) =>
            String(item.id) !== String(product.id) &&
            isProductAvailable(item)
        );

        if (isMounted) setRelatedProducts(related);
      } catch (err) {
        console.error("RELATED PRODUCTS LOAD ERROR:", err);

        if (isMounted) setRelatedProducts([]);
      } finally {
        if (isMounted) setRelatedLoading(false);
      }
    };

    loadRelatedProducts();

    return () => {
      isMounted = false;
    };
  }, [product]);

  // Add the selected product or a related product to the cart
  const handleAddToCart = (item) => {
    if (!item || !isProductAvailable(item)) return;

    addToCart(item);
    setAddedProductId(String(item.id));

    setTimeout(() => {
      setAddedProductId(null);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="product-page-message">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-page-message">
        <h2>
          {error
            ? "Unable to load this product."
            : "Product not found."}
        </h2>

        <Link to="/" className="back-link">
          Return to Home
        </Link>
      </div>
    );
  }

  const productName = [product.name, product.flavor]
    .filter(Boolean)
    .join(" ");

  const productSlug = createProductSlug(product);

  const category = Array.isArray(product.category)
    ? product.category[0]
    : product.category;

  // Product Information table
  // Name and Flavor come from the selected product.
  // Specifications come from its related category.
  const information = [
    ["Name", product.name],
    ["Flavor", product.flavor],
    ["Battery", category?.battery],
    ["Capacity", category?.capacity],
    ["Nicotine Strength", category?.nicotine_strength],
    ["Puff Count", category?.puff_counts],
    ["Charging", category?.charging],
    ["Special Feature", category?.special_feature],
  ];

  const whatsappMessage = encodeURIComponent(
    `Hello VOZOL EGY, I'm interested in ${productName}.`
  );

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <>
      <SEO
        title={`${productName} | Price in Egypt | VOZOL EGY`}
        description={`Explore ${productName} at VOZOL EGY. Check product flavor, price, and availability.`}
        image={getProductImage(product)}
        url={`/products/${productSlug}`}
        type="product"
        keywords={[
          product.name,
          product.flavor,
          `${product.name} ${product.flavor || ""}`.trim(),
          `${product.name} Egypt`,
          `${product.flavor || product.name} price`,
          "VOZOL Egypt",
          "VOZOL EGY",
          "فوزول مصر",
          "سعر VOZOL في مصر",
        ]}
      />

      <main className="product-page">
        {/* Breadcrumb */}
        <nav
          className="product-breadcrumb"
          aria-label="Breadcrumb"
        >
          <Link to="/">Home</Link>

          <span className="product-breadcrumb__separator">
            /
          </span>

          {category?.slug ? (
            <Link to={`/categories/${category.slug}`}>
              {category.name}
            </Link>
          ) : (
            <span>{category?.name || "Category"}</span>
          )}

          <span className="product-breadcrumb__separator">
            /
          </span>

          <span
            className="product-breadcrumb__current"
            aria-current="page"
          >
            {product.flavor || product.name}
          </span>
        </nav>

        {/* Main product */}
        <section className="product-details">
          <div className="product-details__image">
            {getProductImage(product) ? (
              <img
                src={getProductImage(product)}
                alt={productName}
              />
            ) : (
              <div className="product-image-placeholder">
                Image unavailable
              </div>
            )}
          </div>

          <div className="product-details__info">
            <h1>
              Flavor: {product.flavor || product.name}
            </h1>

            {product.flavor && (
              <p className="product-flavor">
                {product.name}
              </p>
            )}

            <p className="product-price">
              {formatPrice(product.price)}
            </p>

            {!isProductAvailable(product) && (
              <p className="product-unavailable">
                OUT OF STOCK
              </p>
            )}

            <div className="product-details__actions">
              <button
                type="button"
                className={`btn-add-to-cart ${
                  addedProductId === String(product.id)
                    ? "added"
                    : ""
                }`}
                onClick={() => handleAddToCart(product)}
                disabled={
                  !isProductAvailable(product) ||
                  addedProductId === String(product.id)
                }
              >
                {!isProductAvailable(product)
                  ? "Out of Stock"
                  : addedProductId === String(product.id)
                    ? "Added to Cart!"
                    : "Add to Cart"}
              </button>

              <a
                href={whatsappUrl}
                className="product-whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Contact VOZOL EGY on WhatsApp about ${productName}`}
              >
                <img
                  src={WHATSAPP_ICON}
                  alt=""
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </section>

        {/* Product Information */}
        <section
          className="product-information"
          aria-labelledby="product-information-title"
        >
          <h2
            id="product-information-title"
            className="category-section-title"
          >
            PRODUCT INFORMATION
          </h2>

          <div className="category-information-table">
            {information.map(([label, value]) => (
              <div
                className="category-information-row"
                key={label}
              >
                <div className="category-information-label">
                  {label}
                </div>

                <div className="category-information-value">
                  {value !== null &&
                  value !== undefined &&
                  value !== ""
                    ? value
                    : "—"}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related products */}
        <section className="related-products">
          <div className="related-products__heading">
            <h2>Related Products</h2>

            {category?.slug && (
              <Link to={`/categories/${category.slug}`}>
                View All
              </Link>
            )}
          </div>

          {relatedLoading ? (
            <p className="related-products__message">
              Loading related products...
            </p>
          ) : relatedProducts.length > 0 ? (
            <div className="related-products__grid">
              {relatedProducts.map((item) => {
                const itemSlug = createProductSlug(item);
                const itemAdded =
                  addedProductId === String(item.id);

                return (
                  <article
                    className="related-product-card"
                    key={item.id}
                  >
                    <Link
                      to={`/products/${itemSlug}`}
                      className="related-product-card__image-link"
                      aria-label={`View ${item.flavor || item.name}`}
                    >
                      {getProductImage(item) ? (
                        <img
                          className="related-product-card__image"
                          src={getProductImage(item)}
                          alt={[item.name, item.flavor]
                            .filter(Boolean)
                            .join(" ")}
                          loading="lazy"
                        />
                      ) : (
                        <div className="related-product-card__placeholder">
                          Image unavailable
                        </div>
                      )}
                    </Link>

                    <div className="related-product-card__info">
                      {item.flavor && (
                        <p className="related-product-card__flavor">
                          {item.flavor}
                        </p>
                      )}

                      <p className="related-product-card__price">
                        {formatPrice(item.price)}
                      </p>

                      <button
                        type="button"
                        className={`related-product-card__button ${
                          itemAdded ? "added" : ""
                        }`}
                        onClick={() => handleAddToCart(item)}
                        disabled={
                          !isProductAvailable(item) || itemAdded
                        }
                      >
                        {!isProductAvailable(item)
                          ? "Out of Stock"
                          : itemAdded
                            ? "Added to Cart!"
                            : "Add to Cart"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <p className="related-products__message">
              No related products available right now.
            </p>
          )}
        </section>
      </main>
    </>
  );
};

export default ProductDetailsPage;