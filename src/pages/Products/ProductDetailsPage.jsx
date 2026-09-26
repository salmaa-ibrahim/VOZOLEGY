import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { supabase } from "../../lib/supabase";
import "./ProductDetailsPage.css";

const ProductDetailsPage = () => {
  const { slug } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  // ============================================================
  // Get Product From Supabase
  // ============================================================

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        // --------------------------------------------------------
        // Get product by slug
        // --------------------------------------------------------

        const { data, error: productError } = await supabase
          .from("products")
          .select(`
            *,
            category:categories (
              id,
              name,
              slug,
              description,
              image_url,
              mobile_image_url,
              active
            )
          `)
          .eq("slug", slug)
          .maybeSingle();

        if (productError) {
          console.error(
            "Product Details Supabase Error:",
            productError
          );

          throw productError;
        }

        if (!data) {
          if (isMounted) {
            setProduct(null);
            setError("Product not found.");
          }

          return;
        }

        // --------------------------------------------------------
        // Product found
        // --------------------------------------------------------

        if (isMounted) {
          setProduct(data);
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);

        if (isMounted) {
          setProduct(null);
          setError("Something went wrong while loading this product.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (slug) {
      fetchProduct();
    }

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // ============================================================
  // Add To Cart
  // ============================================================

  const handleAdd = () => {
    if (!product || !product.available) {
      return;
    }

    addToCart(product);

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  // ============================================================
  // Loading
  // ============================================================

  if (loading) {
    return (
      <div className="loader">
        Loading...
      </div>
    );
  }

  // ============================================================
  // Error / Product Not Found
  // ============================================================

  if (error || !product) {
    return (
      <div className="product-details-error">
        <h2>Product Not Found</h2>

        <p>
          {error || "This product does not exist."}
        </p>

        <Link to="/products">
          ← Back to All Products
        </Link>
      </div>
    );
  }

  // ============================================================
  // Product Data
  // ============================================================

  const category = product.category;

  const productImage =
    product.image_url ||
    product.image ||
    "/images/products/placeholder.png";

  const productPrice = Number(product.price || 0);

  const isAvailable =
    product.available === true ||
    product.status === "active";

  // ============================================================
  // Render
  // ============================================================

  return (
    <div className="product-details">

      {/* ========================================================
          PRODUCT IMAGE
      ======================================================== */}

      <div className="product-details__image">
        <img
          src={productImage}
          alt={`${product.name}${product.flavor ? ` - ${product.flavor}` : ""}`}
        />
      </div>

      {/* ========================================================
          PRODUCT INFO
      ======================================================== */}

      <div className="product-details__info">

        {/* Category */}
        {category && (
          <span className="product-category">
            {category.name}
          </span>
        )}

        {/* Product Name */}
        <h1>
          {product.name}
        </h1>

        {/* Flavor */}
        {product.flavor && (
          <p className="product-flavor">
            Flavor: {product.flavor}
          </p>
        )}

        {/* Mode */}
        {product.mode && (
          <p className="product-mode">
            Mode: {product.mode}
          </p>
        )}

        {/* Price */}
        <p className="product-price">
          {productPrice.toFixed(2)} LE
        </p>

        {/* Description */}
        {product.description && (
          <p className="product-desc">
            {product.description}
          </p>
        )}

        {/* Add To Cart */}
        <button
          type="button"
          className={`btn-add-to-cart ${
            added ? "added" : ""
          }`}
          onClick={handleAdd}
          disabled={!isAvailable}
        >
          {added
            ? "Added to Cart!"
            : isAvailable
            ? "Add to Cart"
            : "Out of Stock"}
        </button>

        {/* Back To Category */}
        {category?.slug && (
          <Link
            to={`/categories/${category.slug}`}
            className="back-link"
          >
            ← Back to {category.name}
          </Link>
        )}

      </div>
    </div>
  );
};

export default ProductDetailsPage;