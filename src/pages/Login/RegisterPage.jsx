import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import SEO from "../../seo/SEO";

import "./LoginPage.css";

/* =====================================
   EGYPT GOVERNORATES & CITIES
===================================== */

const egyptGovernorates = {
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

/* =====================================
   REGISTER PAGE
===================================== */

const RegisterPage = () => {
  const navigate = useNavigate();

  const { signUp } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    whatsapp: "",
    governorate: "",
    city: "",
    fullAddress: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);

  /* =====================================
     HANDLE INPUT CHANGE
  ===================================== */

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "governorate") {
      setFormData((previous) => ({
        ...previous,
        governorate: value,
        city: "",
      }));

      return;
    }

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =====================================
     HANDLE SUBMIT
  ===================================== */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");

      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");

      return;
    }

    if (!formData.governorate) {
      setError("Please select your governorate.");

      return;
    }

    if (!formData.city) {
      setError("Please select your city.");

      return;
    }

    setLoading(true);

    try {
      const result = await signUp({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        governorate: formData.governorate,
        city: formData.city,
        fullAddress: formData.fullAddress,
      });

      if (result?.session) {
        navigate("/account", {
          replace: true,
        });

        return;
      }

      setSuccess(
        "Your account was created successfully. Please check your email if email confirmation is enabled, then sign in.",
      );

      setTimeout(() => {
        navigate("/login");
      }, 1800);
    } catch (error) {
      setError(error.message || "Unable to create your account.");
    } finally {
      setLoading(false);
    }
  };

  /* =====================================
     GET CITIES FOR SELECTED GOVERNORATE
  ===================================== */

  const selectedCities = formData.governorate
    ? egyptGovernorates[formData.governorate] || []
    : [];

  /* =====================================
     RENDER
  ===================================== */

  return (
    <>
      <SEO
        title="Create Account | VOZOL EGY"
        description="Create your VOZOL EGY account."
        url="https://vozolegy.com/register"
        noIndex
      />

      <main className="auth-page">
        <section className="auth-card">
          <div className="auth-card-header">
            <span>VOZOL EGY</span>

            <h1>Create Account</h1>

            <p>Create your customer account.</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          {success && <div className="auth-success">{success}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            {/* FULL NAME */}

            <label>
              Full Name
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </label>

            {/* EMAIL */}

            <label>
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </label>

            {/* PHONE */}

            <label>
              Phone Number
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
                required
              />
            </label>

            {/* WHATSAPP */}

            <label>
              WhatsApp Number
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
                required
              />
            </label>

            {/* GOVERNORATE */}

            <label>
              Governorate
              <select
                className="auth-select"
                name="governorate"
                value={formData.governorate}
                onChange={handleChange}
                required
              >
                <option value="">Select Governorate</option>

                {Object.keys(egyptGovernorates).map((governorate) => (
                  <option key={governorate} value={governorate}>
                    {governorate}
                  </option>
                ))}
              </select>
            </label>

            {/* CITY */}

            <label>
              City
              <select
                className="auth-select"
                name="city"
                value={formData.city}
                onChange={handleChange}
                disabled={!formData.governorate}
                required
              >
                <option value="">
                  {formData.governorate
                    ? "Select City"
                    : "Select Governorate First"}
                </option>

                {selectedCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>

            {/* FULL ADDRESS */}

            <label>
              Full Address
              <textarea
                className="auth-select"
                name="fullAddress"
                value={formData.fullAddress}
                onChange={handleChange}
                placeholder="Full address, building, apartment, street..."
                rows="4"
              />
            </label>

            {/* PASSWORD */}

            <label>
              Password
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                autoComplete="new-password"
                required
              />
            </label>

            {/* CONFIRM PASSWORD */}

            <label>
              Confirm Password
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat your password"
                autoComplete="new-password"
                required
              />
            </label>

            {/* SUBMIT */}

            <button className="auth-submit" type="submit" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* FOOTER */}

          <div className="auth-footer">
            <p>Already have an account?</p>

            <Link to="/login" className="auth-link">
              Sign In
            </Link>

            <Link to="/" className="auth-home-link">
              ← Back to Home
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default RegisterPage;
