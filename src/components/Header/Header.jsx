import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import CartDrawer from "./CartDrawer";
import MobileMenu from "./MobileMenu";
import "./Header.css";
import VozolLogo from "/images/logo/Vozol-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleAccountClick = () => {
    if (user) {
      setIsAccountOpen(!isAccountOpen);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <header className="header">
        <div className="header__container">
          <button
            className="header__icon"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>

          <Link to="/" className="header__logo">
            <img src={VozolLogo} alt="vozolegy-logo" />
          </Link>

          <div className="header__actions">
            <div className="header__account-wrapper">
              <button
                className="header__icon"
                onClick={handleAccountClick}
                aria-label="Account"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>
              {isAccountOpen && (
                <div className="account-dropdown">
                  <Link to="/account" onClick={() => setIsAccountOpen(false)}>
                    My Account
                  </Link>
                  <Link
                    to="/account/orders"
                    onClick={() => setIsAccountOpen(false)}
                  >
                    My Orders
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setIsAccountOpen(false)}>
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      signOut();
                      setIsAccountOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            <button
              className="header__icon header__cart"
              onClick={() => setIsCartOpen(true)}
              aria-label="Open cart"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
