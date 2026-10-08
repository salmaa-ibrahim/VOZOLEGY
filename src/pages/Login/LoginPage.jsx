import React, { useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import SEO from "../../seo/SEO";

import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { signIn } = useAuth();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const from = location.state?.from || null;

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const result = await signIn(email, password);

      const role = String(result?.profile?.role || "").toLowerCase();

      if (role === "admin") {
        navigate("/admin", {
          replace: true,
        });

        return;
      }

      if (from) {
        navigate(from, {
          replace: true,
        });

        return;
      }

      navigate("/account", {
        replace: true,
      });
    } catch (error) {
      setError(error.message || "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Login | VOZOL EGY"
        description="Log in to your VOZOL EGY account."
        url="https://vozolegy.com/login"
        noIndex
      />
      <main className="auth-page">
        <section className="auth-card">
          <div className="auth-card-header">
            <span>VOZOL EGY</span>

            <h1>Welcome Back</h1>

            <p>Sign in to your account.</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </label>

            <div className="auth-forgot">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="auth-footer">
            <p>Don't have an account?</p>

            <Link to="/register" className="auth-link">
              Sign Up
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

export default LoginPage;
