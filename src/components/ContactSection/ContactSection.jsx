import React from "react";
import { siteConfig } from "../../config/siteConfig";
import { AnimatePresence, motion } from "framer-motion";
import "./ContactSection.css";

const ContactSection = () => {
  // جلب قائمة وسائل الاتصال من الملف المركزي
  const contacts = siteConfig.getSocialLinks();

  return (
    <section className="contact-section">
      <motion.h2
                className="all-products-title"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
              >
                GET IN TOUCH
              </motion.h2>
      <p className="section-subtitle">
        Have a question? Need help? We're here for you ツ
      </p>
      <div className="contact-grid">
        {contacts.map((c) => (
          <div key={c.id} className="contact-card">
            <img src={c.icon} alt={c.title} className="c-icon" />
            <h3>{c.title}</h3>
            <p>{c.description}</p>
            <a
              href={c.url}
              target="_blank"
              rel="noreferrer"
              className="contact-link"
            >
              {c.action} →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactSection;
