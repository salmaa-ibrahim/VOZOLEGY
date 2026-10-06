import React, {
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

import "./LoginPage.css";

const RegisterPage = () => {
  const navigate = useNavigate();

  const {
    signUp,
  } = useAuth();

  const [formData, setFormData] =
    useState({
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

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );

      return;
    }

    if (
      formData.password.length < 6
    ) {
      setError(
        "Password must be at least 6 characters."
      );

      return;
    }

    setLoading(true);

    try {
      const result =
        await signUp({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          phone: formData.phone,
          whatsapp: formData.whatsapp,
          governorate:
            formData.governorate,
          city: formData.city,
          fullAddress:
            formData.fullAddress,
        });

      if (result?.session) {
        navigate("/account", {
          replace: true,
        });

        return;
      }

      setSuccess(
        "Your account was created successfully. Please check your email if email confirmation is enabled, then sign in."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1800);
    } catch (error) {
      setError(
        error.message ||
          "Unable to create your account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">

        <div className="auth-card-header">
          <span>VOZOL EGY</span>

          <h1>
            Create Account
          </h1>

          <p>
            Create your customer account.
          </p>
        </div>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        {success && (
          <div className="auth-success">
            {success}
          </div>
        )}

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

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

          <label>
            Governorate

            <input
              name="governorate"
              value={formData.governorate}
              onChange={handleChange}
              placeholder="Governorate"
              required
            />
          </label>

          <label>
            City

            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              required
            />
          </label>

          <label>
            Full Address

            <textarea
              name="fullAddress"
              value={formData.fullAddress}
              onChange={handleChange}
              placeholder="Full address, building, apartment, street..."
              rows="4"
              required
            />
          </label>

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

          <label>
            Confirm Password

            <input
              type="password"
              name="confirmPassword"
              value={
                formData.confirmPassword
              }
              onChange={handleChange}
              placeholder="Repeat your password"
              autoComplete="new-password"
              required
            />
          </label>

          <button
            className="auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        <div className="auth-footer">

          <p>
            Already have an account?
          </p>

          <Link
            to="/login"
            className="auth-link"
          >
            Sign In
          </Link>

          <Link
            to="/"
            className="auth-home-link"
          >
            ← Back to Home
          </Link>

        </div>

      </section>
    </main>
  );
};

export default RegisterPage;