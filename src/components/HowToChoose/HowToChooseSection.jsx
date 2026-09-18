// import React from 'react';
// import { Link } from 'react-router-dom';
// import './HowToChooseSection.css';

// const HowToChooseSection = () => {
//   return (
//     <section className="how-to-choose-section">
//       <div className="how-to-choose-section__image">
//         <img src="/images/banners/how-to-choose-img.png" alt="Person thinking about vape" />
//       </div>
//       <div className="how-to-choose-section__content">
//         <h2>How to choose your vape?</h2>
//         <Link to="/how-to-choose" className="btn-outline-dark">Click here</Link>
//       </div>
//     </section>
//   );
// };

// export default HowToChooseSection;


import React from 'react';
import { Link } from 'react-router-dom';
import './HowToChooseSection.css';

const HowToChooseSection = () => {
  return (
    <section className="how-to-choose-section">
      {/* حاوية الصورة */}
      <div className="how-to-choose-section__image-wrapper">
        <img 
          src="/images/banners/how-to-choose-img.png" 
          alt="Person thinking about vape" 
          className="how-to-choose-section__img"
        />
        
        {/* النص والزر هنحطهم جوه الـ wrapper عشان نتحكم في مكانهم بالنسبة للصورة */}
        <div className="how-to-choose-section__content-overlay">
          <h2>How to choose your vape?</h2>
          <Link to="/how-to-choose" className="btn-outline-dark">Click here</Link>
        </div>
      </div>
    </section>
  );
};

export default HowToChooseSection;