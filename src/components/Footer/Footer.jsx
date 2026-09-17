import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const footerData = {
    shop: ['VOZOL GEAR', 'VOZOL STAR', 'VOZOL HOOKAH', 'AIVONO', 'VTOUCH'],
    shipping: ['Shipping Policy', 'Returns & Refunds', 'Terms of Service'],
    contact: ['WhatsApp', 'Call Us', 'Instagram', 'Facebook']
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Social Icons */}
        <div className="footer__socials">
          <h3>FOLLOW US</h3>
          <div className="footer__icons">
            <a href="https://instagram.com/vozolegy" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://facebook.com/vozolegy" target="_blank" rel="noreferrer" aria-label="Facebook">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            </a>
            <a href="tel:+1234567890" aria-label="Phone">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </a>
          </div>
        </div>

        {/* Accordions */}
        {Object.entries(footerData).map(([key, items]) => (
          <div key={key} className="footer__accordion">
            <button 
              className="footer__accordion-header" 
              onClick={() => toggleSection(key)}
              aria-expanded={openSection === key}
            >
              <span>{key.toUpperCase()}</span>
              <motion.span animate={{ rotate: openSection === key ? 45 : 0 }}>+</motion.span>
            </button>
            <AnimatePresence>
              {openSection === key && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="footer__accordion-content"
                >
                  <ul>
                    {items.map(item => (
                      <li key={item}><Link to={`/${item.toLowerCase().replace(/ /g, '-')}`}>{item}</Link></li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        <div className="footer__bottom">
          <p>Copy right vozolegy</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;