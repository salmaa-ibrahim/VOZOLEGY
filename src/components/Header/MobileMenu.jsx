import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './MobileMenu.css';

const MobileMenu = ({ isOpen, onClose }) => {
  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const categories = [
    { name: 'VOZOL GEAR 50K', slug: 'vozol-gear-50k' },
    { name: 'VOZOL STAR 40K', slug: 'vozol-star-40k' },
    { name: 'VOZOL HOOKAH 40K', slug: 'vozol-hookah-40k' },
    { name: 'AIVONO ZERO NICOTINE', slug: 'aivono-zero' },
    { name: 'VTOUCH SMART VAPE', slug: 'vtouch-smart' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="drawer-overlay" 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div 
            className="drawer drawer--left"
            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="drawer__header">
              <h2>MENU</h2>
              <button onClick={onClose} className="drawer__close">✕</button>
            </div>
            
            <div className="drawer__body">
              <div className="menu-search">
                <input type="text" placeholder="Search products..." />
              </div>

              <nav className="menu-nav">
                <Link to="/" onClick={onClose} className="menu-link menu-link--home">HOME</Link>
                
                <div className="menu-categories">
                  {categories.map(cat => (
                    <Link key={cat.slug} to={`/categories/${cat.slug}`} onClick={onClose} className="menu-link">
                      {cat.name}
                    </Link>
                  ))}
                </div>

                <div className="menu-divider"></div>
                <Link to="/how-to-choose" onClick={onClose} className="menu-link menu-link--bold">How to choose your vape?</Link>
                <Link to="/shipping-policy" onClick={onClose} className="menu-link">Shipping & Policy</Link>
                
                <div className="menu-divider"></div>
                <p className="menu-heading">Come closer to us</p>
                
                <div className="menu-socials">
                  <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="social-link">WhatsApp</a>
                  <a href="tel:+1234567890" className="social-link">Call</a>
                  <a href="https://instagram.com/vozolegy" target="_blank" rel="noreferrer" className="social-link">Instagram</a>
                  <a href="https://facebook.com/vozolegy" target="_blank" rel="noreferrer" className="social-link">Facebook</a>
                </div>
              </nav>
            </div>
            
            <div className="drawer__footer">
              <p className="copyright">Copyright save</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;