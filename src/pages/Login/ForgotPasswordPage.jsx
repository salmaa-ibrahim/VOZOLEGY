import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "./LoginPage.css";

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [validSession, setValidSession] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkRecoverySession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (!mounted) return;

        if (error) {
          setError(error.message);
          setValidSession(false);
          setCheckingSession(false);
          return;
        }

        if (data?.session) {
          setValidSession(true);
        } else {
          setError(
            "This password reset link is invalid or has expired. Please request a new password reset link."
          );
          setValidSession(false);
        }
      } catch (error) {
        if (!mounted) return;

        setError(
          error.message ||
            "Unable to verify the password reset link."
        );

        setValidSession(false);
      } finally {
        if (mounted) {
          setCheckingSession(false);
        }
      }
    };

    checkRecoverySession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return;

        if (
          event === "PASSWORD_RECOVERY" ||
          session
        ) {
          setValidSession(true);
          setError("");
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      setSuccess(
        "Your password has been updated successfully."
      );

      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError(
        error.message ||
          "Unable to update your password."
      );
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <div className="auth-card-header">
            <span>VOZOL EGY</span>

            <h1>Reset Password</h1>

            <p>Verifying your password reset link...</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-card-header">
          <span>VOZOL EGY</span>

          <h1>Reset Password</h1>

          <p>
            Enter your new password below.
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

        {validSession && !success && (
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
                  setPassword(event.target.value)
                }
                placeholder="Enter your new password"
                minLength={6}
                required
              />
            </label>

            <label>
              Confirm Password

              <input
                type="password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                placeholder="Confirm your new password"
                minLength={6}
                required
              />
            </label>

            <button
              className="auth-submit"
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Updating..."
                : "Update Password"}
            </button>
          </form>
        )}

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

export default ResetPasswordPage;