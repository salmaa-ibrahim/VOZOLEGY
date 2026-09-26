import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { getFeaturedCategories } from "../../services/categoriesService";

import "./CategoryShowcase.css";

const CategoryShowcase = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getFeaturedCategories();

        console.log("CategoryShowcase data:", data);

        setCategories(data || []);
      } catch (err) {
        console.error("Failed to load categories:", err);
        setError("Failed to load categories.");
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="category-showcase">
        <div className="loading">Loading categories...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="category-showcase">
        <div className="loading">{error}</div>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="category-showcase">
        <motion.h2
          className="all-products-title"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          Discover Our Category
        </motion.h2>

        <p className="loading">No categories available.</p>
      </section>
    );
  }

  return (
    <section className="category-showcase">
      <motion.h2
        className="all-products-title"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        Discover Our Category
      </motion.h2>

      <div className="category-grid">
        {categories.map((cat) => (
          <Link
            to={`/categories/${cat.slug}`}
            key={cat.id}
            className="category-card"
          >
            <div className="category-card__image-wrap">
              <img
                src={cat.image_url}
                alt={cat.alt_text || cat.name}
                className="category-card__img"
                loading="lazy"
              />
            </div>

            <div className="category-card__info">
              {cat.promo_label && (
                <p className="category-card__type">
                  {cat.promo_label}
                </p>
              )}

              <h3 className="category-card__title">
                {cat.name}
              </h3>

              {/* <span className="category-card__link">
                <span>›</span>
              </span> */}
              <span className="category-card__click">Explore →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryShowcase;