import React, {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { supabase } from "../../lib/supabase";

import "./LoginPage.css";

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [ready, setReady] =
    useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setReady(true);
      }
    };

    checkSession();

    const {
      data: { subscription },
    } =
      supabase.auth.onAuthStateChange(
        (event, session) => {
          if (
            event === "PASSWORD_RECOVERY" ||
            session
          ) {
            setReady(true);
          }
        }
      );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );

      return;
    }

    if (
      password !==
      confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );

      return;
    }

    setLoading(true);

    try {
      const {
        error,
      } =
        await supabase.auth.updateUser({
          password,
        });

      if (error) {
        throw new Error(
          error.message
        );
      }

      setSuccess(
        "Password updated successfully."
      );

      setTimeout(() => {
        navigate("/login", {
          replace: true,
        });
      }, 1500);
    } catch (error) {
      setError(
        error.message ||
          "Unable to update password."
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
            Reset Password
          </h1>

          <p>
            Create a new password for your account.
          </p>
        </div>

        {!ready && (
          <div className="auth-error">
            Please open this page using the password reset link sent to your email.
          </div>
        )}

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
            New Password

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              autoComplete="new-password"
              required
            />
          </label>

          <label>
            Confirm New Password

            <input
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(
                  event.target.value
                )
              }
              autoComplete="new-password"
              required
            />
          </label>

          <button
            className="auth-submit"
            type="submit"
            disabled={
              loading || !ready
            }
          >
            {loading
              ? "Updating..."
              : "Update Password"}
          </button>

        </form>

        <div className="auth-footer">
          <Link
            to="/login"
            className="auth-link"
          >
            Back to Sign In
          </Link>
        </div>

      </section>
    </main>
  );
};

export default ResetPasswordPage;