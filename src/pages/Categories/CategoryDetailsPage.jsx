import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductsByCategory } from '../../services/productsService';
import './CategoryDetailsPage.css';

const CategoryDetailsPage = () => {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In real app: fetch category by slug, then products by category ID
    // For now, use mock
    setTimeout(() => {
      setProducts([
        { id: 1, name: 'VOZOL GEAR 50K', flavor: 'Watermelon Ice', price: 999, image_url: '/images/products/gear-wm.webp', slug: 'vozol-gear-wm' },
        { id: 2, name: 'VOZOL GEAR 50K', flavor: 'Mango Ice', price: 999, image_url: '/images/products/gear-mango.webp', slug: 'vozol-gear-mango' },
      ]);
      setLoading(false);
    }, 500);
  }, [slug]);

  if (loading) return <div className="loader">Loading products...</div>;

  return (
    <div className="category-page">
      <div className="category-header">
        <h1>VOZOL GEAR 50K PUFFS</h1>
        <p>Explore our collection of premium flavors.</p>
      </div>
      <div className="product-grid">
        {products.map(product => (
          <Link to={`/products/${product.slug}`} key={product.id} className="product-card">
            <img src={product.image_url} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="product-flavor">{product.flavor}</p>
            <p className="product-price">{product.price} LE</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryDetailsPage;