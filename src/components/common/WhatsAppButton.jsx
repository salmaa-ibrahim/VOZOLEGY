
import React from "react";
import { siteConfig } from "../../config/siteConfig";
import "./WhatsAppButton.css";

const WhatsAppButton = () => {
  const whatsappNumber = siteConfig?.contact?.whatsapp?.number;

  if (!whatsappNumber) {
    return null;
  }

  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <a
      href={whatsappUrl}
      className="whatsapp-floating-button"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <img
        src={siteConfig.contact.whatsapp.icon}
        alt="WhatsApp"
        className="whatsapp-floating-button__icon"
      />

      <span className="whatsapp-floating-button__tooltip">
        Chat with us
      </span>
    </a>
  );
};

export default WhatsAppButton;
