import React from 'react';
import { Link } from 'react-router-dom';
import './HowToChooseSection.css';

const HowToChooseSection = () => {
  return (
    <section className="how-to-choose-section">
      <div className="how-to-choose-section__image">
        <img src="/images/how-to-choose/person.webp" alt="Person thinking about vape" />
        <div className="how-to-choose-section__bubble">
          <img src="/images/how-to-choose/products-bubble.webp" alt="Vape products" />
        </div>
      </div>
      <div className="how-to-choose-section__content">
        <h2>How to choose your vape?</h2>
        <Link to="/how-to-choose" className="btn-outline-dark">Click here</Link>
      </div>
    </section>
  );
};

export default HowToChooseSection;