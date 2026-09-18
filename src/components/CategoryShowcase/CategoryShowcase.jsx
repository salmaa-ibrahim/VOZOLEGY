import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedCategories } from '../../services/categoriesService';
import './CategoryShowcase.css';

const CategoryShowcase = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCats = async () => {
      const data = await getFeaturedCategories();
      setCategories(data);
      setLoading(false);
    };
    fetchCats();
  }, []);

  if (loading) return <div className="loading">Loading categories...</div>;

  return (
    <section className="category-showcase">
      {/* <h2 className="section-title">SHOP BY CATEGORY</h2> */}
      <div className="category-grid">
        {categories.map(cat => (
          <Link to={`/categories/${cat.slug}`} key={cat.id} className="category-card">
            <img src={cat.image_url} alt={cat.name} className="category-card__img" />
            <div className="category-card__info">
              <h3>{cat.name}</h3>
              <p>{cat.puffs}</p>
              <span className="category-card__link">Explore →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryShowcase;