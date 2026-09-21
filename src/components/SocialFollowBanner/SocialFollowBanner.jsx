import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./SocialFollowBanner.css";

const SocialFollowBanner = () => {
  return (
    <motion.section
      className="social-banner initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}"
    >
      <div className="social-banner__text">
        <h2>Don't Forget to</h2>
        <h3>Follow Us</h3>
        <a
          href="https://instagram.com/vozolegy"
          target="_blank"
          rel="noreferrer"
          className="social-banner__btn"
        >
          FOLLOW US ON INSTAGRAM →
        </a>
      </div>
      <div className="social-banner__image">
        <img src="/images/banners/mobile.png" alt="Follow us on Instagram" />
      </div>
    </motion.section>
  );
};

export default SocialFollowBanner;
