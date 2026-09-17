import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../contexts/AppContext';
import './AgeVerification.css';

const AgeVerification = () => {
  const { isAgeVerified, verifyAge } = useApp();

  if (isAgeVerified) return null;

  return (
    <motion.div 
      className="age-gate"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="age-gate__content">
        <h1 className="age-gate__logo">VOZOL EGY</h1>
        <div className="age-gate__divider"></div>
        <h2 className="age-gate__title">AGE VERIFICATION</h2>
        <p className="age-gate__text">
          To use the VOZOL EGY website you must be aged 21 years old or over. 
          Please verify your age before entering the site.
        </p>
        <div className="age-gate__buttons">
          <button className="btn-outline" onClick={verifyAge}>I am 21+</button>
          <button className="btn-outline" onClick={() => alert('You must be 21+ to enter.')}>I am under 21</button>
        </div>
      </div>
    </motion.div>
  );
};

export default AgeVerification;