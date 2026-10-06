// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import emailjs from "@emailjs/browser";
// import { useCart } from "../../contexts/CartContext";
// import "./CheckoutPage.css";

// /* =========================================================
//    EMAILJS CONFIGURATION
//    ========================================================= */

// const EMAILJS_SERVICE_ID = "service_0yy4boh";
// const EMAILJS_TEMPLATE_ID = "template_c00mmne";
// const EMAILJS_PUBLIC_KEY = "g2zziO6y7TRchkobH";

// /* =========================================================
//    EGYPT GOVERNORATES / CITIES / DELIVERY AREAS
//    ========================================================= */

// const egyptLocations = {
//   Cairo: [
//     "Cairo",
//     "New Cairo",
//     "Fifth Settlement",
//     "First Settlement",
//     "Third Settlement",
//     "Fourth Settlement",
//     "South Teseen",
//     "North Teseen",
//     "Katameya",
//     "Madinaty",
//     "El Rehab",
//     "El Shorouk",
//     "Badr City",
//     "New Administrative Capital",
//     "Nasr City",
//     "Heliopolis",
//     "New Heliopolis",
//     "Maadi",
//     "New Maadi",
//     "Degla Maadi",
//     "Mokattam",
//     "Zamalek",
//     "Downtown Cairo",
//     "Garden City",
//     "Abbassia",
//     "Ain Shams",
//     "El Mataria",
//     "El Marg",
//     "El Salam",
//     "Shubra",
//     "Hadayeq El Kobba",
//     "Rod El Farag",
//     "El Zawya El Hamra",
//     "El Zeitoun",
//     "Dar El Salam",
//     "Old Cairo",
//     "El Basatin",
//     "Helwan",
//     "Tora",
//     "15th of May",
//   ],

//   Giza: [
//     "Giza",
//     "Haram",
//     "Faisal",
//     "Dokki",
//     "Agouza",
//     "Mohandessin",
//     "Imbaba",
//     "Warraq",
//     "Kerdasa",
//     "Bulaq El Dakrour",
//     "6th of October",
//     "New 6th of October",
//     "Sheikh Zayed",
//     "New Sheikh Zayed",
//     "Hadayek October",
//     "October Gardens",
//     "Smart Village",
//     "October Plaza",
//     "El Hosseiniya",
//     "Abu El Nomros",
//     "Hawamdeya",
//     "Al Ayat",
//     "El Badrasheen",
//     "Saf",
//   ],

//   Alexandria: [
//     "Alexandria",
//     "Smouha",
//     "Sidi Gaber",
//     "Stanley",
//     "Miami",
//     "Mandara",
//     "Montaza",
//     "Gleem",
//     "San Stefano",
//     "Roushdy",
//     "Kafr Abdo",
//     "Sporting",
//     "Camp Caesar",
//     "Azarita",
//     "Moharam Bek",
//     "Agami",
//     "Borg El Arab",
//     "New Borg El Arab",
//     "King Mariout",
//   ],

//   Qalyubia: [
//     "Banha",
//     "Shubra El Kheima",
//     "Qalyub",
//     "Obour City",
//     "El Khanka",
//     "Kafr Shukr",
//     "Toukh",
//     "Shibin El Qanater",
//     "Qaha",
//     "Khosous",
//     "Kaloub",
//   ],

//   Dakahlia: [
//     "Mansoura",
//     "Talkha",
//     "Mit Ghamr",
//     "Aga",
//     "Sherbin",
//     "Belqas",
//     "Dikirnis",
//     "Manzala",
//     "Mataria",
//     "Meet Salsil",
//     "Gamalia",
//     "Nabroh",
//   ],

//   Sharqia: [
//     "Zagazig",
//     "10th of Ramadan",
//     "Belbeis",
//     "Minya El Qamh",
//     "Abu Kabir",
//     "Hehia",
//     "Faqous",
//     "Kafr Saqr",
//     "El Husseiniya",
//     "Awlad Saqr",
//     "Deyerb Negm",
//     "Mashtoul El Souk",
//   ],

//   Gharbia: [
//     "Tanta",
//     "Mahalla El Kubra",
//     "Kafr El Zayat",
//     "Zefta",
//     "Santa",
//     "Qutour",
//     "Basyoun",
//     "Samanoud",
//   ],

//   Beheira: [
//     "Damanhur",
//     "Kafr El Dawwar",
//     "Rashid",
//     "Edku",
//     "Abu Hummus",
//     "Itay El Baroud",
//     "Kom Hamada",
//     "Wadi El Natrun",
//     "Hosh Essa",
//     "Delengat",
//     "Mahmoudiyah",
//     "Shabrakhit",
//   ],

//   Ismailia: [
//     "Ismailia",
//     "Fayed",
//     "Qantara Sharq",
//     "Qantara Gharb",
//     "Abu Suwir",
//     "Tal El Kebir",
//     "Kasaseen",
//   ],

//   "Port Said": [
//     "Port Said",
//     "Port Fouad",
//     "El Arab",
//     "El Manakh",
//     "El Dawahy",
//     "El Zohour",
//   ],

//   Suez: ["Suez", "Ain Sokhna", "Ataka", "Arbaeen", "Faisal", "Ganayen"],

//   Damietta: [
//     "Damietta",
//     "New Damietta",
//     "Ras El Bar",
//     "Faraskour",
//     "Kafr Saad",
//     "Zarqa",
//     "Kafr El Batikh",
//   ],

//   "Kafr El Sheikh": [
//     "Kafr El Sheikh",
//     "Desouk",
//     "Metoubes",
//     "Fouh",
//     "Baltim",
//     "Beyala",
//     "Sidi Salem",
//     "Qallin",
//     "El Hamoul",
//   ],

//   Fayoum: [
//     "Fayoum",
//     "New Fayoum",
//     "Sinnuris",
//     "Tamiya",
//     "Ibshaway",
//     "Itsa",
//     "Youssef El Seddik",
//   ],

//   Minya: [
//     "Minya",
//     "New Minya",
//     "Mallawi",
//     "Samalut",
//     "Beni Mazar",
//     "Maghagha",
//     "Abu Qurqas",
//     "Deir Mawas",
//     "Matai",
//   ],

//   Assiut: [
//     "Assiut",
//     "New Assiut",
//     "Dairut",
//     "Manfalut",
//     "Qusiya",
//     "Abnub",
//     "Sahel Selim",
//     "El Ghanayem",
//     "Sodfa",
//     "El Badari",
//   ],

//   Sohag: [
//     "Sohag",
//     "New Sohag",
//     "Akhmim",
//     "Girga",
//     "Tahta",
//     "Juhayna",
//     "El Maragha",
//     "El Balyana",
//     "Tama",
//     "Dar El Salam",
//   ],

//   Qena: [
//     "Qena",
//     "New Qena",
//     "Nag Hammadi",
//     "Qus",
//     "Dishna",
//     "Farshout",
//     "Naqada",
//     "Abu Tesht",
//   ],

//   Luxor: ["Luxor", "New Luxor", "Esna", "Armant", "Qurna", "Tod", "Bayadeya"],

//   Aswan: [
//     "Aswan",
//     "New Aswan",
//     "Kom Ombo",
//     "Edfu",
//     "Daraw",
//     "Nasr El Nuba",
//     "Kalabsha",
//   ],

//   "Red Sea": [
//     "Hurghada",
//     "New Hurghada",
//     "El Gouna",
//     "Sahl Hasheesh",
//     "Makadi Bay",
//     "Soma Bay",
//     "Safaga",
//     "El Quseir",
//     "Marsa Alam",
//     "Ras Gharib",
//     "Shalateen",
//   ],

//   "New Valley": ["Kharga", "New Valley", "Dakhla", "Farafra", "Baris", "Mut"],

//   Matrouh: [
//     "Marsa Matrouh",
//     "New Alamein",
//     "El Alamein",
//     "North Coast",
//     "Dabaa",
//     "Siwa",
//     "Salloum",
//     "Sidi Barrani",
//     "Hammam",
//   ],

//   "North Sinai": [
//     "Arish",
//     "New Rafah",
//     "Sheikh Zuweid",
//     "Rafah",
//     "Bir El Abd",
//     "Nakhl",
//   ],

//   "South Sinai": [
//     "Sharm El Sheikh",
//     "Dahab",
//     "Nuweiba",
//     "Taba",
//     "Saint Catherine",
//     "Ras Sedr",
//     "El Tor",
//     "Abu Zenima",
//     "Abu Rudeis",
//   ],
// };

// /* =========================================================
//    CHECKOUT PAGE
//    ========================================================= */

// const CheckoutPage = () => {
//   const navigate = useNavigate();

//   const { cartItems, clearCart, subtotal } = useCart();

//   const [orderCompleted, setOrderCompleted] = useState(false);
//   const [isSendingOrder, setIsSendingOrder] = useState(false);

//   const [formData, setFormData] = useState({
//     fullName: "",
//     phone: "",
//     whatsapp: "",
//     governorate: "",
//     city: "",
//     street: "",
//     building: "",
//     apartment: "",
//     addressDetails: "",
//   });

//   const [deliveryMethod, setDeliveryMethod] = useState("standard");

//   /* =========================================================
//      ALWAYS START CHECKOUT FROM TOP
//      ========================================================= */

//   useEffect(() => {
//     window.scrollTo({
//       top: 0,
//       left: 0,
//       behavior: "instant",
//     });
//   }, [orderCompleted]);

//   /* =========================================================
//      IF CART IS EMPTY → RETURN TO CART
//      ========================================================= */

//   useEffect(() => {
//     if (cartItems.length === 0 && !orderCompleted) {
//       navigate("/cart", { replace: true });
//     }
//   }, [cartItems.length, orderCompleted, navigate]);

//   /* =========================================================
//      FORM CHANGE
//      ========================================================= */

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => {
//       if (name === "governorate") {
//         return {
//           ...prev,
//           governorate: value,
//           city: "",
//         };
//       }

//       return {
//         ...prev,
//         [name]: value,
//       };
//     });
//   };

//   /* =========================================================
//      SEND ORDER EMAIL
//      ========================================================= */

//   const sendOrderEmail = async () => {
//     const orderNumber = `VZ-${Date.now().toString().slice(-8)}`;

//     const orderDate = new Date().toLocaleString("en-EG", {
//       dateStyle: "medium",
//       timeStyle: "short",
//     });

//     const orderItems = cartItems
//       .map((item) => {
//         const itemTotal = item.price * item.quantity;

//         return `
//           <div style="padding:12px 0; border-bottom:1px solid #eeeeee;">
//             <div style="font-weight:700; color:#222222;">
//               ${item.name}
//             </div>

//             ${
//               item.flavor
//                 ? `
//                   <div style="margin-top:3px; color:#777777; font-size:13px;">
//                     Flavor: ${item.flavor}
//                   </div>
//                 `
//                 : ""
//             }

//             <div style="margin-top:3px; color:#777777; font-size:13px;">
//               Quantity: ${item.quantity}
//             </div>

//             <div style="margin-top:5px; color:#7b35d6; font-weight:700;">
//               ${itemTotal} LE
//             </div>
//           </div>
//         `;
//       })
//       .join("");

//     const shipping = deliveryMethod === "standard" ? 100 : "By Agreement";

//     const total =
//       deliveryMethod === "standard" ? `${subtotal + 100} LE` : "To be confirmed";

//     const templateParams = {
//       order_number: orderNumber,
//       order_date: orderDate,

//       customer_name: formData.fullName,
//       phone: formData.phone,
//       whatsapp: formData.whatsapp,

//       governorate: formData.governorate,
//       city: formData.city,
//       street: formData.street || "Not provided",
//       building: formData.building || "Not provided",
//       apartment: formData.apartment || "Not provided",
//       address_details: formData.addressDetails || "None",

//       delivery_method:
//         deliveryMethod === "standard"
//           ? "Standard Delivery - 2–3 Business Days"
//           : "Same Day Express - By Agreement",

//       order_items: orderItems,

//       subtotal: subtotal,
//       shipping: shipping,
//       total: total,
//     };

//     await emailjs.send(
//       EMAILJS_SERVICE_ID,
//       EMAILJS_TEMPLATE_ID,
//       templateParams,
//       {
//         publicKey: EMAILJS_PUBLIC_KEY,
//       },
//     );

//     return orderNumber;
//   };

//   /* =========================================================
//      PLACE ORDER
//      ========================================================= */

//   const handlePlaceOrder = async (e) => {
//     e.preventDefault();

//     if (isSendingOrder) return;

//     /* Required fields */

//     if (
//       !formData.fullName ||
//       !formData.phone ||
//       !formData.whatsapp ||
//       !formData.governorate ||
//       !formData.city
//     ) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     setIsSendingOrder(true);

//     try {
//       /*
//         Send the order details to EmailJS
//         BEFORE clearing the cart.
//       */

//       await sendOrderEmail();

//       /*
//         Show completed screen BEFORE clearing cart.
//         Otherwise cart becomes empty and Checkout
//         immediately redirects to Cart.
//       */

//       setOrderCompleted(true);

//       /* =====================================================
//          SAME DAY EXPRESS → WHATSAPP
//          ===================================================== */

//       if (deliveryMethod === "express") {
//         const orderProducts = cartItems
//           .map(
//             (item) =>
//               `• ${item.name} - ${item.flavor || "N/A"} x${
//                 item.quantity
//               } - ${item.price * item.quantity} LE`,
//           )
//           .join("\n");

//         const address = [
//           formData.governorate,
//           formData.city,
//           formData.street,
//           formData.building
//             ? `Building ${formData.building}`
//             : "",
//           formData.apartment
//             ? `Apartment ${formData.apartment}`
//             : "",
//           formData.addressDetails
//             ? `Details: ${formData.addressDetails}`
//             : "",
//         ]
//           .filter(Boolean)
//           .join(", ");

//         const whatsappMessage = `
// Hello VOZOL EGY 👋🏻

// I would like to place an order.

// Customer Name:
// ${formData.fullName}

// Phone:
// ${formData.phone}

// WhatsApp:
// ${formData.whatsapp}

// Address:
// ${address}

// Delivery:
// Same Day Express

// Products:
// ${orderProducts}

// Subtotal:
// ${subtotal} LE

// Express shipping:
// To be confirmed

// Total:
// To be confirmed

// Thank you ❤️
//         `.trim();

//         /*
//           Replace this with your real WhatsApp business number.
//         */

//         const whatsappNumber = "201000000000";

//         const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
//           whatsappMessage,
//         )}`;

//         clearCart();

//         window.open(whatsappURL, "_blank");

//         return;
//       }

//       /* =====================================================
//          STANDARD DELIVERY
//          NO WHATSAPP REDIRECT
//          ===================================================== */

//       clearCart();
//     } catch (error) {
//       console.error("EmailJS order error:", error);

//       alert(
//         "We couldn't send your order right now. Please try again.",
//       );

//       setOrderCompleted(false);
//       setIsSendingOrder(false);

//       return;
//     }

//     setIsSendingOrder(false);
//   };

//   /* =========================================================
//      ORDER COMPLETED SCREEN
//      ========================================================= */

//   if (orderCompleted) {
//     return (
//       <main className="checkout-page checkout-page--success">
//         <section className="order-success">
//           <div className="order-success__icon">✓</div>

//           <h1>Order Completed!</h1>

//           <p className="order-success__message">
//             Thank you for your order ❤️
//           </p>

//           {deliveryMethod === "standard" ? (
//             <p className="order-success__details">
//               Your order has been received successfully.
//               <br />
//               Our team will contact you shortly to confirm your order.
//             </p>
//           ) : (
//             <p className="order-success__details">
//               Your order has been prepared successfully.
//               <br />
//               Please complete the confirmation through WhatsApp.
//             </p>
//           )}

//           <button
//             className="order-success__button"
//             onClick={() => navigate("/")}
//           >
//             Back to Home
//           </button>
//         </section>
//       </main>
//     );
//   }

//   /* =========================================================
//      CHECKOUT PAGE
//      ========================================================= */

//   return (
//     <main className="checkout-page">
//       <div className="checkout-container">

//         {/* ===================================================
//             HEADER
//         =================================================== */}

//         <div className="checkout-header">
//           <span className="checkout-header__line"></span>

//           <h1>CHECKOUT</h1>

//           <span className="checkout-header__line"></span>
//         </div>

//         <form
//           className="checkout-layout"
//           onSubmit={handlePlaceOrder}
//         >

//           {/* =================================================
//               01 — CUSTOMER INFORMATION
//           ================================================= */}

//           <section className="checkout-card">
//             <div className="checkout-card__heading">
//               <span>01</span>

//               <div>
//                 <h2>Customer Information</h2>
//                 <p>Enter your contact information</p>
//               </div>
//             </div>

//             <div className="checkout-grid">

//               <div className="checkout-field checkout-field--full">
//                 <label>
//                   Full Name <span>*</span>
//                 </label>

//                 <input
//                   type="text"
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   placeholder="Enter your full name"
//                   required
//                 />
//               </div>

//               <div className="checkout-field">
//                 <label>
//                   Phone Number <span>*</span>
//                 </label>

//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="01XXXXXXXXX"
//                   required
//                 />
//               </div>

//               <div className="checkout-field">
//                 <label>
//                   WhatsApp Number <span>*</span>
//                 </label>

//                 <input
//                   type="tel"
//                   name="whatsapp"
//                   value={formData.whatsapp}
//                   onChange={handleChange}
//                   placeholder="01XXXXXXXXX"
//                   required
//                 />
//               </div>

//             </div>
//           </section>

//           {/* =================================================
//               02 — DELIVERY ADDRESS
//           ================================================= */}

//           <section className="checkout-card">
//             <div className="checkout-card__heading">
//               <span>02</span>

//               <div>
//                 <h2>Delivery Address</h2>
//                 <p>Where should we deliver your order?</p>
//               </div>
//             </div>

//             <div className="checkout-grid">

//               <div className="checkout-field">
//                 <label>
//                   Governorate <span>*</span>
//                 </label>

//                 <select
//                   name="governorate"
//                   value={formData.governorate}
//                   onChange={handleChange}
//                   required
//                 >
//                   <option value="">
//                     Select Governorate
//                   </option>

//                   {Object.keys(egyptLocations).map(
//                     (governorate) => (
//                       <option
//                         key={governorate}
//                         value={governorate}
//                       >
//                         {governorate}
//                       </option>
//                     ),
//                   )}
//                 </select>
//               </div>

//               <div className="checkout-field">
//                 <label>
//                   City / Area <span>*</span>
//                 </label>

//                 <select
//                   name="city"
//                   value={formData.city}
//                   onChange={handleChange}
//                   disabled={!formData.governorate}
//                   required
//                 >
//                   <option value="">
//                     {formData.governorate
//                       ? "Select City / Area"
//                       : "Select Governorate First"}
//                   </option>

//                   {formData.governorate &&
//                     egyptLocations[
//                       formData.governorate
//                     ]?.map((city) => (
//                       <option key={city} value={city}>
//                         {city}
//                       </option>
//                     ))}
//                 </select>
//               </div>

//               <div className="checkout-field checkout-field--full">
//                 <label>Street</label>

//                 <input
//                   type="text"
//                   name="street"
//                   value={formData.street}
//                   onChange={handleChange}
//                   placeholder="Street name"
//                 />
//               </div>

//               <div className="checkout-field">
//                 <label>Building Number</label>

//                 <input
//                   type="text"
//                   name="building"
//                   value={formData.building}
//                   onChange={handleChange}
//                   placeholder="Building number"
//                 />
//               </div>

//               <div className="checkout-field">
//                 <label>Apartment Number</label>

//                 <input
//                   type="text"
//                   name="apartment"
//                   value={formData.apartment}
//                   onChange={handleChange}
//                   placeholder="Apartment number"
//                 />
//               </div>

//               <div className="checkout-field checkout-field--full">
//                 <label>Address Details</label>

//                 <textarea
//                   name="addressDetails"
//                   value={formData.addressDetails}
//                   onChange={handleChange}
//                   placeholder="Landmark, floor, additional details..."
//                   rows="4"
//                 />
//               </div>

//             </div>
//           </section>

//           {/* =================================================
//               03 — DELIVERY METHOD
//           ================================================= */}

//           <section className="checkout-card">
//             <div className="checkout-card__heading">
//               <span>03</span>

//               <div>
//                 <h2>Delivery Method</h2>
//                 <p>
//                   Choose your preferred delivery option
//                 </p>
//               </div>
//             </div>

//             <div className="delivery-options">

//               <label
//                 className={`delivery-option ${
//                   deliveryMethod === "standard"
//                     ? "delivery-option--active"
//                     : ""
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name="delivery"
//                   value="standard"
//                   checked={deliveryMethod === "standard"}
//                   onChange={(e) =>
//                     setDeliveryMethod(e.target.value)
//                   }
//                 />

//                 <div className="delivery-option__radio"></div>

//                 <div className="delivery-option__content">
//                   <div className="delivery-option__top">
//                     <h3>Standard Delivery</h3>

//                     <strong>100 LE</strong>
//                   </div>

//                   <p>
//                     Delivery within 2–3 business days.
//                   </p>
//                 </div>
//               </label>

//               <label
//                 className={`delivery-option ${
//                   deliveryMethod === "express"
//                     ? "delivery-option--active"
//                     : ""
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name="delivery"
//                   value="express"
//                   checked={deliveryMethod === "express"}
//                   onChange={(e) =>
//                     setDeliveryMethod(e.target.value)
//                   }
//                 />

//                 <div className="delivery-option__radio"></div>

//                 <div className="delivery-option__content">
//                   <div className="delivery-option__top">
//                     <h3>Same Day Express</h3>

//                     <strong>By Agreement</strong>
//                   </div>

//                   <p>
//                     Same-day delivery. Shipping cost will be
//                     confirmed with you through WhatsApp.
//                   </p>
//                 </div>
//               </label>

//             </div>
//           </section>

//           {/* =================================================
//               ORDER SUMMARY
//           ================================================= */}

//           <aside className="checkout-summary">

//             <div className="checkout-summary__header">
//               <h2>ORDER SUMMARY</h2>

//               <span>
//                 {cartItems.length}{" "}
//                 {cartItems.length === 1
//                   ? "Item"
//                   : "Items"}
//               </span>
//             </div>

//             <div className="checkout-summary__items">

//               {cartItems.map((item) => (
//                 <div
//                   className="checkout-summary__item"
//                   key={item.id}
//                 >

//                   <div className="checkout-summary__image">
//                     <img
//                       src={item.image_url || item.image}
//                       alt={item.name}
//                     />
//                   </div>

//                   <div className="checkout-summary__info">

//                     <h3>{item.name}</h3>

//                     {item.flavor && (
//                       <p>
//                         Flavor:{" "}
//                         <span>{item.flavor}</span>
//                       </p>
//                     )}

//                     <p>Qty: {item.quantity}</p>

//                   </div>

//                   <strong>
//                     {item.price * item.quantity} LE
//                   </strong>

//                 </div>
//               ))}

//             </div>

//             <div className="checkout-summary__totals">

//               <div>
//                 <span>Subtotal</span>

//                 <strong>{subtotal} LE</strong>
//               </div>

//               <div>
//                 <span>Shipping</span>

//                 <strong>
//                   {deliveryMethod === "standard"
//                     ? "100 LE"
//                     : "By Agreement"}
//                 </strong>
//               </div>

//               <div className="checkout-summary__total">

//                 <span>Total</span>

//                 <strong>
//                   {deliveryMethod === "standard"
//                     ? subtotal + 100
//                     : subtotal}{" "}
//                   LE
//                 </strong>

//               </div>

//             </div>

//             <button
//               type="submit"
//               className="place-order-button"
//               disabled={isSendingOrder}
//             >
//               {isSendingOrder
//                 ? "PLACING ORDER..."
//                 : "PLACE ORDER"}
//             </button>

//             <p className="checkout-summary__note">
//               By placing your order, you agree to our
//               delivery terms.
//             </p>

//           </aside>

//         </form>
//       </div>
//     </main>
//   );
// };

// export default CheckoutPage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { supabase } from "../../lib/supabase";
import "./CheckoutPage.css";

/* =========================================================
   EMAILJS CONFIGURATION
   ========================================================= */

const EMAILJS_SERVICE_ID = "service_0yy4boh";
const EMAILJS_TEMPLATE_ID = "template_c00mmne";
const EMAILJS_PUBLIC_KEY = "g2zziO6y7TRchkobH";

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

  /*
    IMPORTANT:
    user can be NULL.
    This means Guest Checkout is allowed.
  */
  const { user, profile } = useAuth();

  const [orderCompleted, setOrderCompleted] = useState(false);
  const [isSendingOrder, setIsSendingOrder] = useState(false);

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

  useEffect(() => {
    if (!profile) return;

    setFormData((previous) => ({
      ...previous,

      fullName: previous.fullName || profile.full_name || "",

      phone: previous.phone || profile.phone || "",

      whatsapp: previous.whatsapp || profile.whatsapp || "",

      governorate: previous.governorate || profile.governorate || "",

      city: previous.city || profile.city || "",

      addressDetails: previous.addressDetails || profile.full_address || "",
    }));
  }, [profile]);

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
  }, [orderCompleted]);

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
     CREATE ORDER NUMBER
     ========================================================= */

  const generateOrderNumber = () => {
    return `VZ-${Date.now().toString().slice(-8)}`;
  };

  /* =========================================================
     CREATE ORDER IN SUPABASE
     ========================================================= */

  const createOrderInSupabase = async () => {
    const shippingCost = deliveryMethod === "standard" ? 100 : 0;

    const totalAmount =
      deliveryMethod === "standard" ? Number(subtotal) + 100 : Number(subtotal);

    // Generate the order ID on the client.
    // This allows us to insert the order without needing SELECT permission.
    const orderId = crypto.randomUUID();

    const orderNumber = generateOrderNumber();

    const orderData = {
      id: orderId,

      user_id: user?.id || null,

      customer_name: formData.fullName.trim(),
      customer_email: user?.email || null,

      customer_phone: formData.phone.trim(),
      customer_whatsapp: formData.whatsapp.trim(),

      order_number: orderNumber,

      order_status: "pending",

      payment_method: "cash_on_delivery",
      payment_status: "pending",

      delivery_method: deliveryMethod,

      shipping_cost: shippingCost,

      governorate: formData.governorate,
      city: formData.city,

      street: formData.street.trim() || null,
      building_number: formData.building.trim() || null,
      apartment_number: formData.apartment.trim() || null,
      address_details: formData.addressDetails.trim() || null,

      subtotal: Number(subtotal),
      total_amount: totalAmount,

      currency: "EGP",

      customer_notes: null,
      admin_notes: null,
    };

    console.log("CREATING ORDER:", orderData);

    // --------------------------------------------------
    // INSERT ORDER
    // --------------------------------------------------

    const { error: orderError } = await supabase
      .from("orders")
      .insert(orderData);

    if (orderError) {
      console.error("ORDER INSERT ERROR:", orderError);
      throw orderError;
    }

    console.log("ORDER CREATED:", {
      id: orderId,
      order_number: orderNumber,
    });

    // --------------------------------------------------
    // CREATE ORDER ITEMS
    // --------------------------------------------------

    const orderItems = cartItems.map((item) => {
      const quantity = Number(item.quantity || 1);
      const unitPrice = Number(item.price || 0);
      const totalPrice = unitPrice * quantity;

      return {
        order_id: orderId,
        product_id: Number(item.id),
        product_name: item.name,
        flavor: item.flavor || null,
        quantity,
        unit_price: unitPrice,
        total_price: totalPrice,
      };
    });

    console.log("CREATING ORDER ITEMS:", orderItems);

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error("ORDER ITEMS INSERT ERROR:", itemsError);

      // Try to remove the order if items failed.
      // This may fail for anon because DELETE is intentionally not allowed.
      // That's okay; the error is still returned.
      try {
        await supabase.from("orders").delete().eq("id", orderId);
      } catch (deleteError) {
        console.error("ORDER CLEANUP ERROR:", deleteError);
      }

      throw itemsError;
    }

    console.log("ORDER ITEMS CREATED SUCCESSFULLY");

    return {
      id: orderId,
      order_number: orderNumber,
      total_amount: totalAmount,
      shipping_cost: shippingCost,
    };
  };

  /* =========================================================
     SEND ORDER EMAIL
     ========================================================= */

  const sendOrderEmail = async (orderNumber) => {
    const orderDate = new Date().toLocaleString("en-EG", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const orderItems = cartItems
      .map((item) => {
        const itemTotal = Number(item.price) * Number(item.quantity);

        return `
          <div style="padding:12px 0; border-bottom:1px solid #eeeeee;">
            <div style="font-weight:700; color:#222222;">
              ${item.name}
            </div>

            ${
              item.flavor
                ? `
                  <div style="margin-top:3px; color:#777777; font-size:13px;">
                    Flavor: ${item.flavor}
                  </div>
                `
                : ""
            }

            <div style="margin-top:3px; color:#777777; font-size:13px;">
              Quantity: ${item.quantity}
            </div>

            <div style="margin-top:5px; color:#7b35d6; font-weight:700;">
              ${itemTotal} LE
            </div>
          </div>
        `;
      })
      .join("");

    const shipping = deliveryMethod === "standard" ? 100 : "By Agreement";

    const total =
      deliveryMethod === "standard"
        ? `${Number(subtotal) + 100} LE`
        : "To be confirmed";

    const templateParams = {
      order_number: orderNumber,
      order_date: orderDate,

      customer_name: formData.fullName,
      phone: formData.phone,
      whatsapp: formData.whatsapp,

      governorate: formData.governorate,
      city: formData.city,

      street: formData.street || "Not provided",

      building: formData.building || "Not provided",

      apartment: formData.apartment || "Not provided",

      address_details: formData.addressDetails || "None",

      delivery_method:
        deliveryMethod === "standard"
          ? "Standard Delivery - 2–3 Business Days"
          : "Same Day Express - By Agreement",

      order_items: orderItems,

      subtotal: subtotal,

      shipping: shipping,

      total: total,
    };

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      {
        publicKey: EMAILJS_PUBLIC_KEY,
      },
    );
  };

  /* =========================================================
     PLACE ORDER
     ========================================================= */
  const saveOrderToDatabase = async (orderNumber) => {
    const shippingAddress = JSON.stringify({
      fullName: formData.fullName,

      phone: formData.phone,

      whatsapp: formData.whatsapp,

      governorate: formData.governorate,

      city: formData.city,

      fullAddress: [
        formData.street,
        formData.building ? `Building ${formData.building}` : "",
        formData.apartment ? `Apartment ${formData.apartment}` : "",
        formData.addressDetails,
      ]
        .filter(Boolean)
        .join(", "),
    });

    const isStandard = deliveryMethod === "standard";

    /*
     * Express shipping is "By Agreement",
     * so we store the product subtotal
     * until the shipping cost is confirmed.
     */

    const totalAmount = isStandard ? Number(subtotal) + 100 : Number(subtotal);

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user?.id || null,

        order_number: orderNumber,

        status: "pending",

        total_amount: totalAmount,

        currency: "EGP",

        shipping_address: shippingAddress,

        notes: isStandard
          ? "Standard delivery - 2-3 business days"
          : "Same day express - shipping cost by agreement",
      })
      .select("id")
      .single();

    if (orderError) {
      throw orderError;
    }

    const orderItems = cartItems.map((item) => ({
      order_id: order.id,

      product_id: item.id,

      product_name: item.name,

      flavor: item.flavor || null,

      quantity: Number(item.quantity || 1),

      unit_price: Number(item.price || 0),
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      throw itemsError;
    }

    return order;
  };
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (isSendingOrder) return;

    /* =======================================================
       REQUIRED FIELDS
       ======================================================= */

    if (
      !formData.fullName.trim() ||
      !formData.phone.trim() ||
      !formData.whatsapp.trim() ||
      !formData.governorate ||
      !formData.city
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    /* =======================================================
       CART CHECK
       ======================================================= */

    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty.");
      navigate("/cart");
      return;
    }

    setIsSendingOrder(true);

    try {
      /* =====================================================
         1. CREATE ORDER + ORDER ITEMS IN SUPABASE
         ===================================================== */

      const { order, orderNumber } = await createOrderInSupabase();

      console.log("ORDER CREATED SUCCESSFULLY:", order);

      /* =====================================================
         2. SEND EMAILJS
         ===================================================== */

      try {
        const orderNumber = await sendOrderEmail();

        await saveOrderToDatabase(orderNumber);

        setOrderCompleted(true);
        console.log("ORDER EMAIL SENT SUCCESSFULLY");
      } catch (emailError) {
        /*
          IMPORTANT:
          The order already exists in Supabase.

          We don't delete the order just because EmailJS
          failed, because the customer order is still valid.
        */

        console.error("EMAILJS ERROR:", emailError);
      }

      /* =====================================================
         3. SHOW SUCCESS SCREEN
         ===================================================== */

      setOrderCompleted(true);

      /* =====================================================
         4. SAME DAY EXPRESS → WHATSAPP
         ===================================================== */

      if (deliveryMethod === "express") {
        const orderProducts = cartItems
          .map(
            (item) =>
              `• ${item.name} - ${item.flavor || "N/A"} x${item.quantity} - ${
                Number(item.price) * Number(item.quantity)
              } LE`,
          )
          .join("\n");

        const address = [
          formData.governorate,
          formData.city,
          formData.street,

          formData.building ? `Building ${formData.building}` : "",

          formData.apartment ? `Apartment ${formData.apartment}` : "",

          formData.addressDetails ? `Details: ${formData.addressDetails}` : "",
        ]
          .filter(Boolean)
          .join(", ");

        const whatsappMessage = `
Hello VOZOL EGY 👋🏻

I would like to place an order.

Order Number:
${orderNumber}

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
        */

        const whatsappNumber = "201000000000";

        const whatsappURL =
          `https://wa.me/${whatsappNumber}` +
          `?text=${encodeURIComponent(whatsappMessage)}`;

        /*
          Clear cart only after order was successfully
          saved in Supabase.
        */

        clearCart();

        window.open(whatsappURL, "_blank");

        setIsSendingOrder(false);

        return;
      }

      /* =====================================================
         5. STANDARD DELIVERY
         ===================================================== */

      clearCart();

      setIsSendingOrder(false);
    } catch (error) {
      console.error("PLACE ORDER ERROR:", error);

      alert("We couldn't place your order right now. Please try again.");

      setOrderCompleted(false);

      setIsSendingOrder(false);
    }
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

                  <strong>
                    {Number(item.price) * Number(item.quantity)} LE
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
                  {deliveryMethod === "standard" ? "100 LE" : "By Agreement"}
                </strong>
              </div>

              <div className="checkout-summary__total">
                <span>Total</span>

                <strong>
                  {deliveryMethod === "standard"
                    ? Number(subtotal) + 100
                    : Number(subtotal)}{" "}
                  LE
                </strong>
              </div>
            </div>

            <button
              type="submit"
              className="place-order-button"
              disabled={isSendingOrder}
            >
              {isSendingOrder ? "PLACING ORDER..." : "PLACE ORDER"}
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
