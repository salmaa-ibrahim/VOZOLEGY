import React, {
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import { supabase } from "../../lib/supabase";

import "./LoginPage.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] =
    useState("");

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const redirectUrl =
        `${window.location.origin}/reset-password`;

      const {
        error,
      } =
        await supabase.auth.resetPasswordForEmail(
          email.trim(),
          {
            redirectTo:
              redirectUrl,
          }
        );

      if (error) {
        throw new Error(
          error.message
        );
      }

      setSuccess(
        "Password reset instructions have been sent to your email."
      );
    } catch (error) {
      setError(
        error.message ||
          "Unable to send reset instructions."
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
            Forgot Password?
          </h1>

          <p>
            Enter your email and we'll send you a reset link.
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
            Email

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              placeholder="Enter your email"
              required
            />
          </label>

          <button
            className="auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Sending..."
              : "Send Reset Link"}
          </button>

        </form>

        <div className="auth-footer">

          <Link
            to="/login"
            className="auth-link"
          >
            ← Back to Sign In
          </Link>

          <Link
            to="/"
            className="auth-home-link"
          >
            Back to Home
          </Link>

        </div>

      </section>
    </main>
  );
};

export default ForgotPasswordPage;