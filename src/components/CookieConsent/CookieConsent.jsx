import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../contexts/AppContext';
import './CookieConsent.css';

const CookieConsent = () => {
  const { acceptCookies } = useApp();

  return (
    <motion.div 
      className="cookie-banner"
      initial={{ y: 200 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    >
      <div className="cookie-banner__content">
        <h3>Our page uses Cookies</h3>
        <p>
          We use cookies to personalize and enhance your browsing experience on our website. 
          By clicking "Accept All", you agree to use cookies. You can read our Cookie Policy for more information.
        </p>
        <div className="cookie-banner__actions">
          <button className="btn-outline-white" onClick={() => window.location.href='/cookie-policy'}>To Learn</button>
          <button className="btn-solid-white" onClick={acceptCookies}>Accept All</button>
        </div>
      </div>
    </motion.div>
  );
};

export default CookieConsent;