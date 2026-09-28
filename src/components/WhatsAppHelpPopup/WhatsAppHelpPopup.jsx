import { useEffect, useState } from "react";
import "./WhatsAppHelpPopup.css";

const SESSION_KEY = "vozol-whatsapp-help-dismissed";

export default function WhatsAppHelpPopup({ whatsappNumber }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    try {
      if (window.sessionStorage.getItem(SESSION_KEY) === "1") {
        return undefined;
      }
    } catch {
      // Continue without session persistence if browser storage is unavailable.
    }

    const timerId = window.setTimeout(() => setIsOpen(true), 15_000);
    return () => window.clearTimeout(timerId);
  }, []);

  const closePopup = () => {
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // The popup still closes for this render if browser storage is unavailable.
    }
    setIsOpen(false);
  };

  if (!isOpen || !whatsappNumber) return null;

  const message = "Hi! I need a little help with my order.";
  const whatsappUrl = `https://wa.me/${String(whatsappNumber).replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;

  return (
    <div className="whatsapp-help-overlay" onClick={closePopup}>
      <section
        className="whatsapp-help-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="whatsapp-help-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="whatsapp-help-close"
          type="button"
          aria-label="Close WhatsApp help popup"
          onClick={closePopup}
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className="whatsapp-help-mark" aria-hidden="true">
          <img src="/icons/whatsappp.png" alt="" />
        </div>

        <p className="whatsapp-help-eyebrow">VOZOL EGYPT</p>
        <h2 id="whatsapp-help-title">Need a little help?</h2>
        {/* <p className="whatsapp-help-copy">We&apos;re here for you on WhatsApp.</p> */}
        <p className="whatsapp-help-copy">محتار في اختيارك ؟ محتاج مساعدة ؟ </p>
        <p className="whatsapp-help-copy">احنا معاك و موجودين علشان نساعدك 24 ساعه على واتساب .. تواصل معنا</p>


        <a
          className="whatsapp-help-cta"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/icons/whatsappp.png" alt="" />
          Chat with us
        </a>
        <p className="whatsapp-help-note">A real person is ready to help.</p>
      </section>
    </div>
  );
}
