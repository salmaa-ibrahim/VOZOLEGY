import React, { useEffect, useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../../contexts/CartContext";

import { useAuth } from "../../contexts/AuthContext";

import { siteConfig } from "../../config/siteConfig";

import CartDrawer from "./CartDrawer";
import MobileMenu from "./MobileMenu";

import "./Header.css";

import VozolLogo from "/images/logo/Vozol-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const accountRef = useRef(null);

  const { cartCount } = useCart();

  const { user, profile, signOut, isAdmin } = useAuth();

  const navigate = useNavigate();

  // =====================================================
  // CLOSE ACCOUNT MENU WHEN CLICKING OUTSIDE
  // =====================================================

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setIsAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // =====================================================
  // ESCAPE
  // =====================================================

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsAccountOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // =====================================================
  // ACCOUNT
  // =====================================================

  const handleAccountClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setIsAccountOpen((current) => !current);
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {
    try {
      await signOut();

      setIsAccountOpen(false);

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      console.error("LOGOUT ERROR:", error);
    }
  };

  return (
    <>
      <header className="header">
        <div className="header__container">
          {/* MOBILE MENU */}

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

          {/* LOGO */}

          <Link to="/" className="header__logo">
            <img src={VozolLogo} alt="VOZOL EGY" />
          </Link>

          {/* ACTIONS */}

          <div className="header__actions">
            {/* ACCOUNT */}

            <div className="header__account-wrapper" ref={accountRef}>
              <button
                className={`header__icon ${isAccountOpen ? "is-active" : ""}`}
                onClick={handleAccountClick}
                aria-label="Account"
                aria-expanded={isAccountOpen}
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

              {user && isAccountOpen && (
                <div className="account-dropdown" role="menu">
                  {/* USER INFO */}

                  <div className="account-dropdown__user">
                    <div className="account-dropdown__avatar">
                      {(profile?.full_name || user.email || "V")
                        .slice(0, 1)
                        .toUpperCase()}
                    </div>

                    <div className="account-dropdown__user-info">
                      <strong>{profile?.full_name || "VOZOL Customer"}</strong>

                      <span>{user.email}</span>
                    </div>
                  </div>

                  <div className="account-dropdown__divider" />

                  {/* ACCOUNT */}

                  <Link
                    to="/account?section=overview"
                    className="account-dropdown__item"
                    onClick={() => setIsAccountOpen(false)}
                    role="menuitem"
                  >
                    <span className="account-dropdown__icon">◎</span>

                    <span>My Account</span>
                  </Link>

                  {/* ORDERS */}

                  <Link
                    to="/account"
                    className="account-dropdown__item"
                    onClick={() => setIsAccountOpen(false)}
                    role="menuitem"
                  >
                    <span className="account-dropdown__icon">▤</span>

                    <span>My Orders</span>
                  </Link>

                  {/* ADDRESSES */}

                  <Link
                    to="/account?section=addresses"
                    className="account-dropdown__item"
                    onClick={() => setIsAccountOpen(false)}
                    role="menuitem"
                  >
                    <span className="account-dropdown__icon">⌖</span>

                    <span>Saved Addresses</span>
                  </Link>

                  {/* ADMIN */}

                  {isAdmin && (
                    <>
                      <div className="account-dropdown__divider" />

                      <Link
                        to="/admin"
                        className="account-dropdown__item account-dropdown__admin"
                        onClick={() => setIsAccountOpen(false)}
                        role="menuitem"
                      >
                        <span className="account-dropdown__icon">⌘</span>

                        <span>Admin Dashboard</span>
                      </Link>
                    </>
                  )}

                  <div className="account-dropdown__divider" />

                  {/* LOGOUT */}

                  <button
                    type="button"
                    className="account-dropdown__logout"
                    onClick={handleLogout}
                  >
                    <span className="account-dropdown__icon">↗</span>

                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>

            {/* CART */}

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
