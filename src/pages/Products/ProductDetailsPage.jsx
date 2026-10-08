import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import "./ProductDetailsPage.css";
import SEO from "../../seo/SEO";
const ProductDetailsPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) return <div className="loader">Loading...</div>;

  return (
    <>
      <SEO
        title={`${product.name} ${product.flavor} | Price in Egypt | VOZOL EGY`}
        description={`Shop ${product.name} ${product.flavor} in Egypt. Check price and availability from VOZOL EGY.`}
        image={product.image_url}
        url={`/products/${product.id}`}
        type="product"
        keywords={[
          product.name,
          product.flavor,
          `${product.name} ${product.flavor}`,
          `${product.name} Egypt`,
          `${product.flavor} Egypt`,
          `${product.name} price`,
          "VOZOL Egypt",
          "VOZOL EGY",
          "فوزول مصر",
          "VOZOL vape Egypt",
          "VOZOL في مصر",
          "VOZOL vape في مصر",
          "disposable vape Egypt",
          "disposable vape online Egypt",
          "disposable vape flavors",
          "disposable vape price",
          "فوزول في مصر",
          "فيب فوزول",
          "اسعار فوزول",
          "سعر VOZOL في مصر",
          "فيب بدون نيكوتين Egypt",
          "فيب بدون نيكوتين اونلاين Egypt",
          "فيب بدون نيكوتين اونلاين مصر",
          "فيب بدون نيكوتين مصر",
          "فيب بدون نيكوتين اونلاين",
        ]}
      />
      <div className="product-details">
        <div className="product-details__image">
          <img src={product.image_url} alt={product.name} />
        </div>
        <div className="product-details__info">
          <span className="product-category">{product.category.name}</span>
          <h1>{product.name}</h1>
          <p className="product-flavor">Flavor: {product.flavor}</p>
          <p className="product-price">{product.price} LE</p>
          <p className="product-desc">{product.description}</p>

          <button
            className={`btn-add-to-cart ${added ? "added" : ""}`}
            onClick={handleAdd}
            disabled={!product.available}
          >
            {added ? "Added to Cart!" : "Add to Cart"}
          </button>

          <Link
            to={`/categories/${product.category.slug}`}
            className="back-link"
          >
            ← Back to {product.category.name}
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsPage;
