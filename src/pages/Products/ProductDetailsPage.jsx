import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMockProduct } from '../../services/productsService';
import { useCart } from '../../contexts/CartContext';
import './ProductDetailsPage.css';

const ProductDetailsPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    // Simulate API fetch
    setProduct(getMockProduct(slug));
  }, [slug]);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) return <div className="loader">Loading...</div>;

  return (
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
          className={`btn-add-to-cart ${added ? 'added' : ''}`} 
          onClick={handleAdd}
          disabled={!product.available}
        >
          {added ? 'Added to Cart!' : 'Add to Cart'}
        </button>

        <Link to={`/categories/${product.category.slug}`} className="back-link">
          ← Back to {product.category.name}
        </Link>
      </div>
    </div>
  );
};

export default ProductDetailsPage;