import { useEffect, useState } from "react";
import "./WhatsAppHelpPopup.css";

const SESSION_KEY = "vozol-whatsapp-help-dismissed";

export default function WhatsAppHelpPopup({ whatsappNumber }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    let timerId;

    const showPopup = () => {
      setIsOpen(true);
    };

    // First appearance after 20 seconds
    timerId = window.setTimeout(showPopup, 20_000);

    return () => {
      window.clearTimeout(timerId);
    };
  }, []);

  const closePopup = () => {
    setIsOpen(false);

    // Show again 40 seconds after closing
    window.setTimeout(() => {
      setIsOpen(true);
    }, 200_000);
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

        <p className="whatsapp-help-eyebrow">VOZOL EGY</p>
        <h2 id="whatsapp-help-title">Need Help?</h2>
        {/* <p className="whatsapp-help-copy">We&apos;re here for you on WhatsApp.</p> */}
        <p className="whatsapp-help-copy">محتار في اختيارك ؟ محتاج مساعدة ؟ </p>
        <p className="whatsapp-help-copy">
          احنا معاك و موجودين علشان نساعدك 24 ساعه على واتساب .. تواصل معنا
        </p>

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
