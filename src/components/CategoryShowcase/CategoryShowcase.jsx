import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFeaturedCategories } from "../../services/categoriesService";
import { motion } from "framer-motion";

import "./CategoryShowcase.css";

const CategoryShowcase = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await getFeaturedCategories();
        setCategories(data || []);
      } catch (error) {
        console.error("Failed to load categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCats();
  }, []);

  if (loading) {
    return <div className="loading">Loading categories...</div>;
  }

  return (
    <section className="category-showcase">
      {/* <h2>Discover Our Products</h2> */}
      <motion.h2
                className="all-products-title"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
              >
                Discover Our 
              </motion.h2>
      <div className="category-grid">
        {categories.map((cat, index) => (
          <Link to={`/categories/${cat.slug}`} key={cat.id} className="category-card">
            <div className="category-card__image-wrap">
              <img
                src={cat.image_url}
                alt={cat.name}
                className="category-card__img"
                loading="lazy"
              />
            </div>

            <div className="category-card__info">
              <p className="category-card__type">{cat.puffs}</p>

              <h3 className="category-card__title">{cat.name}</h3>

              <span className="category-card__link">
                <span>›</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryShowcase;
