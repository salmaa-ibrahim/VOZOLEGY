
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./ContactSection.css";

const ContactSection = () => {
  const contacts = [
    {
      id: "whatsapp",
      title: "WhatsApp",
      description: "Contact us directly on WhatsApp",
      icon: "/images/icons/whatsapp_icon.png",
      url: "https://wa.me/201505337422",
      action: "Chat with us",
    },
  ];

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
              rel="noopener noreferrer"
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
