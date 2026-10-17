
import React from "react";
import { siteConfig } from "../../config/siteConfig";
import { motion } from "framer-motion";
import "./ContactSection.css";

const ContactSection = () => {
  // باقي وسائل التواصل من siteConfig فقط
  const contacts = siteConfig.getSocialLinks();

  // رقم الواتساب بشكل مستقل
  const whatsappNumber = "201505337422";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

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

        {/* WhatsApp مستقل عن siteConfig */}
        <div className="contact-card" key="whatsapp">
          <img
            src="/images/icons/whatsapp_icon.png"
            alt="WhatsApp"
            className="c-icon"
          />
          <h3>WhatsApp</h3>
          <p>Contact us directly on WhatsApp</p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            Chat with us →
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
