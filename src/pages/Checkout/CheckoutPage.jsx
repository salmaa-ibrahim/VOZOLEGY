import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import "./CheckoutPage.css";

/* =========================================================
   EGYPT GOVERNORATES / CITIES / DELIVERY AREAS
   ========================================================= */

const egyptLocations = {
  Cairo: [
    "Cairo",
    "New Cairo",
    "Fifth Settlement",
    "First Settlement",
    "Third Settlement",
    "Fourth Settlement",
    "South Teseen",
    "North Teseen",
    "Katameya",
    "Madinaty",
    "El Rehab",
    "El Shorouk",
    "Badr City",
    "New Administrative Capital",
    "Nasr City",
    "Heliopolis",
    "New Heliopolis",
    "Maadi",
    "New Maadi",
    "Degla Maadi",
    "Mokattam",
    "Zamalek",
    "Downtown Cairo",
    "Garden City",
    "Abbassia",
    "Ain Shams",
    "El Mataria",
    "El Marg",
    "El Salam",
    "Shubra",
    "Hadayeq El Kobba",
    "Rod El Farag",
    "El Zawya El Hamra",
    "El Zeitoun",
    "Dar El Salam",
    "Old Cairo",
    "El Basatin",
    "Helwan",
    "Tora",
    "15th of May",
  ],

  Giza: [
    "Giza",
    "Haram",
    "Faisal",
    "Dokki",
    "Agouza",
    "Mohandessin",
    "Imbaba",
    "Warraq",
    "Kerdasa",
    "Bulaq El Dakrour",
    "6th of October",
    "New 6th of October",
    "Sheikh Zayed",
    "New Sheikh Zayed",
    "Hadayek October",
    "October Gardens",
    "Smart Village",
    "October Plaza",
    "El Hosseiniya",
    "Abu El Nomros",
    "Hawamdeya",
    "Al Ayat",
    "El Badrasheen",
    "Saf",
  ],

  Alexandria: [
    "Alexandria",
    "Smouha",
    "Sidi Gaber",
    "Stanley",
    "Miami",
    "Mandara",
    "Montaza",
    "Gleem",
    "San Stefano",
    "Roushdy",
    "Kafr Abdo",
    "Sporting",
    "Camp Caesar",
    "Azarita",
    "Moharam Bek",
    "Agami",
    "Borg El Arab",
    "New Borg El Arab",
    "King Mariout",
  ],

  Qalyubia: [
    "Banha",
    "Shubra El Kheima",
    "Qalyub",
    "Obour City",
    "El Khanka",
    "Kafr Shukr",
    "Toukh",
    "Shibin El Qanater",
    "Qaha",
    "Khosous",
    "Kaloub",
  ],

  Dakahlia: [
    "Mansoura",
    "Talkha",
    "Mit Ghamr",
    "Aga",
    "Sherbin",
    "Belqas",
    "Dikirnis",
    "Manzala",
    "Mataria",
    "Meet Salsil",
    "Gamalia",
    "Nabroh",
  ],

  Sharqia: [
    "Zagazig",
    "10th of Ramadan",
    "Belbeis",
    "Minya El Qamh",
    "Abu Kabir",
    "Hehia",
    "Faqous",
    "Kafr Saqr",
    "El Husseiniya",
    "Awlad Saqr",
    "Deyerb Negm",
    "Mashtoul El Souk",
  ],

  Gharbia: [
    "Tanta",
    "Mahalla El Kubra",
    "Kafr El Zayat",
    "Zefta",
    "Santa",
    "Qutour",
    "Basyoun",
    "Samanoud",
  ],

  Beheira: [
    "Damanhur",
    "Kafr El Dawwar",
    "Rashid",
    "Edku",
    "Abu Hummus",
    "Itay El Baroud",
    "Kom Hamada",
    "Wadi El Natrun",
    "Hosh Essa",
    "Delengat",
    "Mahmoudiyah",
    "Shabrakhit",
  ],

  Ismailia: [
    "Ismailia",
    "Fayed",
    "Qantara Sharq",
    "Qantara Gharb",
    "Abu Suwir",
    "Tal El Kebir",
    "Kasaseen",
  ],

  "Port Said": [
    "Port Said",
    "Port Fouad",
    "El Arab",
    "El Manakh",
    "El Dawahy",
    "El Zohour",
  ],

  Suez: ["Suez", "Ain Sokhna", "Ataka", "Arbaeen", "Faisal", "Ganayen"],

  Damietta: [
    "Damietta",
    "New Damietta",
    "Ras El Bar",
    "Faraskour",
    "Kafr Saad",
    "Zarqa",
    "Kafr El Batikh",
  ],

  "Kafr El Sheikh": [
    "Kafr El Sheikh",
    "Desouk",
    "Metoubes",
    "Fouh",
    "Baltim",
    "Beyala",
    "Sidi Salem",
    "Qallin",
    "El Hamoul",
  ],

  Fayoum: [
    "Fayoum",
    "New Fayoum",
    "Sinnuris",
    "Tamiya",
    "Ibshaway",
    "Itsa",
    "Youssef El Seddik",
  ],

  Minya: [
    "Minya",
    "New Minya",
    "Mallawi",
    "Samalut",
    "Beni Mazar",
    "Maghagha",
    "Abu Qurqas",
    "Deir Mawas",
    "Matai",
  ],

  Assiut: [
    "Assiut",
    "New Assiut",
    "Dairut",
    "Manfalut",
    "Qusiya",
    "Abnub",
    "Sahel Selim",
    "El Ghanayem",
    "Sodfa",
    "El Badari",
  ],

  Sohag: [
    "Sohag",
    "New Sohag",
    "Akhmim",
    "Girga",
    "Tahta",
    "Juhayna",
    "El Maragha",
    "El Balyana",
    "Tama",
    "Dar El Salam",
  ],

  Qena: [
    "Qena",
    "New Qena",
    "Nag Hammadi",
    "Qus",
    "Dishna",
    "Farshout",
    "Naqada",
    "Abu Tesht",
  ],

  Luxor: ["Luxor", "New Luxor", "Esna", "Armant", "Qurna", "Tod", "Bayadeya"],

  Aswan: [
    "Aswan",
    "New Aswan",
    "Kom Ombo",
    "Edfu",
    "Daraw",
    "Nasr El Nuba",
    "Kalabsha",
  ],

  "Red Sea": [
    "Hurghada",
    "New Hurghada",
    "El Gouna",
    "Sahl Hasheesh",
    "Makadi Bay",
    "Soma Bay",
    "Safaga",
    "El Quseir",
    "Marsa Alam",
    "Ras Gharib",
    "Shalateen",
  ],

  "New Valley": ["Kharga", "New Valley", "Dakhla", "Farafra", "Baris", "Mut"],

  Matrouh: [
    "Marsa Matrouh",
    "New Alamein",
    "El Alamein",
    "North Coast",
    "Dabaa",
    "Siwa",
    "Salloum",
    "Sidi Barrani",
    "Hammam",
  ],

  "North Sinai": [
    "Arish",
    "New Rafah",
    "Sheikh Zuweid",
    "Rafah",
    "Bir El Abd",
    "Nakhl",
  ],

  "South Sinai": [
    "Sharm El Sheikh",
    "Dahab",
    "Nuweiba",
    "Taba",
    "Saint Catherine",
    "Ras Sedr",
    "El Tor",
    "Abu Zenima",
    "Abu Rudeis",
  ],
};

/* =========================================================
   CHECKOUT PAGE
   ========================================================= */

const CheckoutPage = () => {
  const navigate = useNavigate();

  const { cartItems, clearCart, subtotal } = useCart();

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

  /* =========================================================
     ALWAYS START CHECKOUT FROM TOP
     ========================================================= */

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);

  /* =========================================================
     IF CART IS EMPTY → RETURN TO CART
     ========================================================= */

  useEffect(() => {
    if (cartItems.length === 0 && !orderCompleted) {
      navigate("/cart", { replace: true });
    }
  }, [cartItems.length, orderCompleted, navigate]);

  /* =========================================================
     FORM CHANGE
     ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      /*
        When governorate changes:
        reset city because the previous city
        may not belong to the new governorate.
      */

      if (name === "governorate") {
        return {
          ...prev,
          governorate: value,
          city: "",
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  /* =========================================================
     PLACE ORDER
     ========================================================= */

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    /* Required fields */

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
      Show completed screen BEFORE clearing cart.
      Otherwise cart becomes empty and Checkout
      immediately redirects to Cart.
    */

    setOrderCompleted(true);

    /* =====================================================
       SAME DAY EXPRESS → WHATSAPP
       ===================================================== */

    if (deliveryMethod === "express") {
      const orderProducts = cartItems
        .map(
          (item) =>
            `• ${item.name} - ${item.flavor || "N/A"} x${item.quantity} - ${
              item.price * item.quantity
            } LE`,
        )
        .join("\n");

      const address = [
        formData.governorate,
        formData.city,
        formData.street,
        `Building ${formData.building}`,
        `Apartment ${formData.apartment}`,
        formData.addressDetails ? `Details: ${formData.addressDetails}` : "",
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

      /*
        Replace this with your real WhatsApp business number.
        Example:
        201070022988
      */

      const whatsappNumber = "201000000000";

      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage,
      )}`;

      clearCart();

      window.open(whatsappURL, "_blank");

      return;
    }

    /* =====================================================
       STANDARD DELIVERY
       NO WHATSAPP REDIRECT
       ===================================================== */

    clearCart();
  };

  /* =========================================================
     ORDER COMPLETED SCREEN
     ========================================================= */

  if (orderCompleted) {
    return (
      <main className="checkout-page checkout-page--success">
        <section className="order-success">
          <div className="order-success__icon">✓</div>

          <h1>Order Completed!</h1>

          <p className="order-success__message">Thank you for your order ❤️</p>

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

  /* =========================================================
     CHECKOUT PAGE
     ========================================================= */

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="checkout-header">
          <span className="checkout-header__line"></span>

          <h1>CHECKOUT</h1>

          <span className="checkout-header__line"></span>
        </div>

        <form className="checkout-layout" onSubmit={handlePlaceOrder}>
          {/* =================================================
              01 — CUSTOMER INFORMATION
          ================================================= */}

          <section className="checkout-card">
            <div className="checkout-card__heading">
              <span>01</span>

              <div>
                <h2>Customer Information</h2>
                <p>Enter your contact information</p>
              </div>
            </div>

            <div className="checkout-grid">
              {/* Full Name */}

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

              {/* Phone */}

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

              {/* WhatsApp */}

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

          {/* =================================================
              02 — DELIVERY ADDRESS
          ================================================= */}

          <section className="checkout-card">
            <div className="checkout-card__heading">
              <span>02</span>

              <div>
                <h2>Delivery Address</h2>
                <p>Where should we deliver your order?</p>
              </div>
            </div>

            <div className="checkout-grid">
              {/* =============================================
                  GOVERNORATE
              ============================================= */}

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

                  {Object.keys(egyptLocations).map((governorate) => (
                    <option key={governorate} value={governorate}>
                      {governorate}
                    </option>
                  ))}
                </select>
              </div>

              {/* =============================================
                  CITY / AREA
              ============================================= */}

              <div className="checkout-field">
                <label>
                  City / Area <span>*</span>
                </label>

                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={!formData.governorate}
                  required
                >
                  <option value="">
                    {formData.governorate
                      ? "Select City / Area"
                      : "Select Governorate First"}
                  </option>

                  {formData.governorate &&
                    egyptLocations[formData.governorate]?.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                </select>
              </div>

              {/* =============================================
                  STREET
              ============================================= */}

              <div className="checkout-field checkout-field--full">
                <label>Street</label>

                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="Street name"
                />
              </div>

              {/* =============================================
                  BUILDING
              ============================================= */}

              <div className="checkout-field">
                <label>Building Number</label>

                <input
                  type="text"
                  name="building"
                  value={formData.building}
                  onChange={handleChange}
                  placeholder="Building number"
                />
              </div>

              {/* =============================================
                  APARTMENT
              ============================================= */}

              <div className="checkout-field">
                <label>Apartment Number</label>

                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                  placeholder="Apartment number"
                />
              </div>

              {/* =============================================
                  ADDRESS DETAILS
              ============================================= */}

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

          {/* =================================================
              03 — DELIVERY METHOD
          ================================================= */}

          <section className="checkout-card">
            <div className="checkout-card__heading">
              <span>03</span>

              <div>
                <h2>Delivery Method</h2>
                <p>Choose your preferred delivery option</p>
              </div>
            </div>

            <div className="delivery-options">
              {/* STANDARD DELIVERY */}

              <label
                className={`delivery-option ${
                  deliveryMethod === "standard" ? "delivery-option--active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  value="standard"
                  checked={deliveryMethod === "standard"}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                />

                <div className="delivery-option__radio"></div>

                <div className="delivery-option__content">
                  <div className="delivery-option__top">
                    <h3>Standard Delivery</h3>

                    <strong>100 LE</strong>
                  </div>

                  <p>Delivery within 2–3 business days.</p>
                </div>
              </label>

              {/* SAME DAY EXPRESS */}

              <label
                className={`delivery-option ${
                  deliveryMethod === "express" ? "delivery-option--active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  value="express"
                  checked={deliveryMethod === "express"}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                />

                <div className="delivery-option__radio"></div>

                <div className="delivery-option__content">
                  <div className="delivery-option__top">
                    <h3>Same Day Express</h3>

                    <strong>By Agreement</strong>
                  </div>

                  <p>
                    Same-day delivery. Shipping cost will be confirmed with you
                    through WhatsApp.
                  </p>
                </div>
              </label>
            </div>
          </section>

          {/* =================================================
              ORDER SUMMARY
          ================================================= */}

          <aside className="checkout-summary">
            <div className="checkout-summary__header">
              <h2>ORDER SUMMARY</h2>

              <span>
                {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
              </span>
            </div>

            <div className="checkout-summary__items">
              {cartItems.map((item) => (
                <div className="checkout-summary__item" key={item.id}>
                  <div className="checkout-summary__image">
                    <img src={item.image_url || item.image} alt={item.name} />
                  </div>

                  <div className="checkout-summary__info">
                    <h3>{item.name}</h3>

                    {item.flavor && (
                      <p>
                        Flavor: <span>{item.flavor}</span>
                      </p>
                    )}

                    <p>Qty: {item.quantity}</p>
                  </div>

                  <strong>{item.price * item.quantity} LE</strong>
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
                  {deliveryMethod === "standard" ? "100 LE" : "By Agreement"}
                </strong>
              </div>

              <div className="checkout-summary__total">
                <span>Total</span>

                <strong>
                  {deliveryMethod === "standard" ? subtotal + 100 : subtotal} LE
                </strong>
              </div>
            </div>

            <button type="submit" className="place-order-button">
              PLACE ORDER
            </button>

            <p className="checkout-summary__note">
              By placing your order, you agree to our delivery terms.
            </p>
          </aside>
        </form>
      </div>
    </main>
  );
};

export default CheckoutPage;
