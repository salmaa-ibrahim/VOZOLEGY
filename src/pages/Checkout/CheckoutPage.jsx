
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    clearCart,
    subtotal,
  } = useCart();

  const [orderCompleted, setOrderCompleted] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    whatsapp: "",
    governorate: "",
    city: "",
    street: "",
    building: "",
    apartment: "",
    addressDetails: "",
  });

  const [deliveryMethod, setDeliveryMethod] = useState("standard");

  // Always start Checkout from the top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  // If there is no cart AND no completed order, go back to cart
  useEffect(() => {
    if (cartItems.length === 0 && !orderCompleted) {
      navigate("/cart", { replace: true });
    }
  }, [cartItems.length, orderCompleted, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // Make sure required fields are filled
    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.whatsapp ||
      !formData.governorate ||
      !formData.city ||
      !formData.street ||
      !formData.building ||
      !formData.apartment
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    /*
      IMPORTANT:
      Set orderCompleted BEFORE clearing the cart.
      Otherwise the cart becomes empty and the page
      immediately shows "Your Cart is Empty".
    */
    setOrderCompleted(true);

    // SAME DAY EXPRESS → WhatsApp
    if (deliveryMethod === "express") {
      const orderProducts = cartItems
        .map(
          (item) =>
            `• ${item.name} - ${item.flavor || "N/A"} x${item.quantity} - ${
              item.price * item.quantity
            } LE`
        )
        .join("\n");

      const address = [
        formData.governorate,
        formData.city,
        formData.street,
        `Building ${formData.building}`,
        `Apartment ${formData.apartment}`,
        formData.addressDetails
          ? `Details: ${formData.addressDetails}`
          : "",
      ]
        .filter(Boolean)
        .join(", ");

      const whatsappMessage = `
Hello VOZOL EGY 👋🏻

I would like to place an order.

Customer Name:
${formData.fullName}

Phone:
${formData.phone}

WhatsApp:
${formData.whatsapp}

Address:
${address}

Delivery:
Same Day Express

Products:
${orderProducts}

Subtotal:
${subtotal} LE

Express shipping:
To be confirmed

Total:
To be confirmed

Thank you ❤️
      `.trim();

      const whatsappNumber = "201000000000";

      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`;

      // Clear cart after preparing order
      clearCart();

      // Open WhatsApp
      window.open(whatsappURL, "_blank");

      return;
    }

    // STANDARD DELIVERY
    // No WhatsApp redirect
    clearCart();
  };

  // --------------------------------------------------
  // ORDER COMPLETED SCREEN
  // --------------------------------------------------

  if (orderCompleted) {
    return (
      <main className="checkout-page checkout-page--success">
        <section className="order-success">
          <div className="order-success__icon">
            ✓
          </div>

          <h1>Order Completed!</h1>

          <p className="order-success__message">
            Thank you for your order ❤️
          </p>

          {deliveryMethod === "standard" ? (
            <p className="order-success__details">
              Your order has been received successfully.
              <br />
              Our team will contact you shortly to confirm your order.
            </p>
          ) : (
            <p className="order-success__details">
              Your order has been prepared successfully.
              <br />
              Please complete the confirmation through WhatsApp.
            </p>
          )}

          <button
            className="order-success__button"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </section>
      </main>
    );
  }

  // --------------------------------------------------
  // CHECKOUT PAGE
  // --------------------------------------------------

  return (
    <main className="checkout-page">
      <div className="checkout-container">

        <div className="checkout-header">
          <span className="checkout-header__line"></span>

          <h1>CHECKOUT</h1>

          <span className="checkout-header__line"></span>
        </div>

        <form
          className="checkout-layout"
          onSubmit={handlePlaceOrder}
        >

          {/* =========================
              CUSTOMER INFORMATION
          ========================== */}

          <section className="checkout-card">
            <div className="checkout-card__heading">
              <span>01</span>

              <div>
                <h2>Customer Information</h2>
                <p>Enter your contact information</p>
              </div>
            </div>

            <div className="checkout-grid">

              <div className="checkout-field checkout-field--full">
                <label>
                  Full Name <span>*</span>
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="checkout-field">
                <label>
                  Phone Number <span>*</span>
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="01XXXXXXXXX"
                  required
                />
              </div>

              <div className="checkout-field">
                <label>
                  WhatsApp Number <span>*</span>
                </label>

                <input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="01XXXXXXXXX"
                  required
                />
              </div>

            </div>
          </section>

          {/* =========================
              DELIVERY ADDRESS
          ========================== */}

          <section className="checkout-card">
            <div className="checkout-card__heading">
              <span>02</span>

              <div>
                <h2>Delivery Address</h2>
                <p>Where should we deliver your order?</p>
              </div>
            </div>

            <div className="checkout-grid">

              <div className="checkout-field">
                <label>
                  Governorate <span>*</span>
                </label>

                <select
                  name="governorate"
                  value={formData.governorate}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Governorate</option>
                  <option value="Cairo">Cairo</option>
                  <option value="Giza">Giza</option>
                  <option value="Alexandria">Alexandria</option>
                  <option value="Qalyubia">Qalyubia</option>
                  <option value="Dakahlia">Dakahlia</option>
                  <option value="Sharqia">Sharqia</option>
                  <option value="Gharbia">Gharbia</option>
                  <option value="Beheira">Beheira</option>
                  <option value="Ismailia">Ismailia</option>
                  <option value="Port Said">Port Said</option>
                  <option value="Suez">Suez</option>
                </select>
              </div>

              <div className="checkout-field">
                <label>
                  City <span>*</span>
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  required
                />
              </div>

              <div className="checkout-field checkout-field--full">
                <label>
                  Street <span>*</span>
                </label>

                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="Street name"
                  required
                />
              </div>

              <div className="checkout-field">
                <label>
                  Building Number <span>*</span>
                </label>

                <input
                  type="text"
                  name="building"
                  value={formData.building}
                  onChange={handleChange}
                  placeholder="Building number"
                  required
                />
              </div>

              <div className="checkout-field">
                <label>
                  Apartment Number <span>*</span>
                </label>

                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                  placeholder="Apartment number"
                  required
                />
              </div>

              <div className="checkout-field checkout-field--full">
                <label>Address Details</label>

                <textarea
                  name="addressDetails"
                  value={formData.addressDetails}
                  onChange={handleChange}
                  placeholder="Landmark, floor, additional details..."
                  rows="4"
                />
              </div>

            </div>
          </section>

          {/* =========================
              DELIVERY METHOD
          ========================== */}

          <section className="checkout-card">

            <div className="checkout-card__heading">
              <span>03</span>

              <div>
                <h2>Delivery Method</h2>
                <p>Choose your preferred delivery option</p>
              </div>
            </div>

            <div className="delivery-options">

              <label
                className={`delivery-option ${
                  deliveryMethod === "standard"
                    ? "delivery-option--active"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  value="standard"
                  checked={deliveryMethod === "standard"}
                  onChange={(e) =>
                    setDeliveryMethod(e.target.value)
                  }
                />

                <div className="delivery-option__radio"></div>

                <div className="delivery-option__content">
                  <div className="delivery-option__top">
                    <h3>Standard Delivery</h3>

                    <strong>100 LE</strong>
                  </div>

                  <p>
                    Delivery within 2–3 business days.
                  </p>
                </div>
              </label>

              <label
                className={`delivery-option ${
                  deliveryMethod === "express"
                    ? "delivery-option--active"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  value="express"
                  checked={deliveryMethod === "express"}
                  onChange={(e) =>
                    setDeliveryMethod(e.target.value)
                  }
                />

                <div className="delivery-option__radio"></div>

                <div className="delivery-option__content">
                  <div className="delivery-option__top">
                    <h3>Same Day Express</h3>

                    <strong>By Agreement</strong>
                  </div>

                  <p>
                    Same-day delivery. Shipping cost will
                    be confirmed with you through WhatsApp.
                  </p>
                </div>
              </label>

            </div>

          </section>

          {/* =========================
              ORDER SUMMARY
          ========================== */}

          <aside className="checkout-summary">

            <div className="checkout-summary__header">
              <h2>ORDER SUMMARY</h2>

              <span>
                {cartItems.length}{" "}
                {cartItems.length === 1 ? "Item" : "Items"}
              </span>
            </div>

            <div className="checkout-summary__items">

              {cartItems.map((item) => (
                <div
                  className="checkout-summary__item"
                  key={item.id}
                >

                  <div className="checkout-summary__image">
                    <img
                      src={item.image_url || item.image}
                      alt={item.name}
                    />
                  </div>

                  <div className="checkout-summary__info">

                    <h3>{item.name}</h3>

                    {item.flavor && (
                      <p>
                        Flavor:{" "}
                        <span>{item.flavor}</span>
                      </p>
                    )}

                    <p>
                      Qty: {item.quantity}
                    </p>

                  </div>

                  <strong>
                    {item.price * item.quantity} LE
                  </strong>

                </div>
              ))}

            </div>

            <div className="checkout-summary__totals">

              <div>
                <span>Subtotal</span>
                <strong>{subtotal} LE</strong>
              </div>

              <div>
                <span>Shipping</span>

                <strong>
                  {deliveryMethod === "standard"
                    ? "100 LE"
                    : "By Agreement"}
                </strong>
              </div>

              <div className="checkout-summary__total">
                <span>Total</span>

                <strong>
                  {deliveryMethod === "standard"
                    ? subtotal + 100
                    : subtotal}{" "}
                  LE
                </strong>
              </div>

            </div>

            <button
              type="submit"
              className="place-order-button"
            >
              PLACE ORDER
            </button>

            <p className="checkout-summary__note">
              By placing your order, you agree to our
              delivery terms.
            </p>

          </aside>

        </form>

      </div>
    </main>
  );
};

export default CheckoutPage;
