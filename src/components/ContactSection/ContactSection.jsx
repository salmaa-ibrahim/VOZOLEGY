import React from 'react';
import './ContactSection.css';

const ContactSection = () => {
  const contacts = [
    { id: 1, title: 'WhatsApp', desc: 'Chat with us directly', action: 'CHAT NOW →', link: 'https://wa.me/1234567890' },
    { id: 2, title: 'Phone Call', desc: 'Give us a call and we\'ll be happy to help', action: 'CALL NOW →', link: 'tel:+1234567890' },
    { id: 3, title: 'Instagram', desc: 'Follow us on Instagram', action: 'VISIT PAGE →', link: 'https://instagram.com/vozolegy' },
    { id: 4, title: 'Facebook', desc: 'Like our page to stay connected', action: 'VISIT PAGE →', link: 'https://facebook.com/vozolegy' },
  ];

  return (
    <section className="contact-section">
      <h2>GET IN TOUCH</h2>
      <p className="section-subtitle">Have a question? Need help? We're here for you.</p>
      <div className="contact-grid">
        {contacts.map(c => (
          <div key={c.id} className="contact-card">
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
            <a href={c.link} target="_blank" rel="noreferrer" className="contact-link">{c.action}</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactSection;