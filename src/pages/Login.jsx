import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  CarFront,
  LockKeyhole,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  UserRound,
  Zap,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import "./Login.css";

/* =========================================================
   DEMO CREDENTIALS
   ========================================================= */

const DEMO_EMAIL = "admin@autoelite.com";
const DEMO_PASSWORD = "admin123";

/* =========================================================
   LOGIN
   ========================================================= */

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(true);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /* =======================================================
     DEMO LOGIN
     ======================================================= */

  const handleDemoLogin = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setError("");
  };

  /* =======================================================
     LOGIN
     ======================================================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    const cleanEmail =
      email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      setError(
        "Please enter your email address and password."
      );
      return;
    }

    if (
      cleanEmail !== DEMO_EMAIL ||
      password !== DEMO_PASSWORD
    ) {
      setError(
        "Invalid login credentials. Use the demo credentials below."
      );
      return;
    }

    setLoading(true);

    /* -------------------------------------------------------
       STORE LOGIN SESSION
       ------------------------------------------------------- */

    const user = {
      name: "John Doe",
      email: DEMO_EMAIL,
      role: "Administrator",
    };

    localStorage.setItem(
      "autoelite_auth",
      "true"
    );

    localStorage.setItem(
      "autoelite_user",
      JSON.stringify(user)
    );

    if (rememberMe) {
      localStorage.setItem(
        "autoelite_remember",
        "true"
      );
    } else {
      localStorage.removeItem(
        "autoelite_remember"
      );
    }

    /* -------------------------------------------------------
       REDIRECT
       ------------------------------------------------------- */

    setTimeout(() => {
      navigate("/dashboard", {
        replace: true,
      });
    }, 500);
  };

  /* =======================================================
     JSX
     ======================================================= */

  return (
    <main className="autoelite-login-page">

      {/* ===================================================
          LEFT HERO
          =================================================== */}

      <section className="autoelite-login-hero">

        {/* -------------------------------------------------
            LOGO
            ------------------------------------------------- */}

        <div className="autoelite-login-logo">

          <div className="autoelite-login-logo-mark">
            <CarFront
              size={27}
              strokeWidth={2.2}
            />
          </div>

          <div className="autoelite-login-logo-text">

            <div className="autoelite-login-logo-name">
              Auto
              <span>Elite</span>
            </div>

            <div className="autoelite-login-logo-subtitle">
              Dealership Intelligence
            </div>

          </div>

        </div>

        {/* -------------------------------------------------
            HERO CONTENT
            ------------------------------------------------- */}

        <div className="autoelite-login-hero-content">

          {/* Badge */}

          <div className="autoelite-login-badge">

            <span className="autoelite-login-badge-dot" />

            <span className="autoelite-login-badge-text">
              Intelligent Dealership Operations
            </span>

          </div>

          {/* Main heading */}

          <h1 className="autoelite-login-hero-title">

            Drive your{" "}
            <span className="gradient-text">
              dealership
            </span>{" "}
            forward.

          </h1>

          {/* Description */}

          <p className="autoelite-login-hero-description">
            A unified intelligence platform for
            inventory, sales, customers, test drives
            and smarter dealership decisions.
          </p>

          {/* ------------------------------------------------
              FEATURES
              ------------------------------------------------ */}

          <div className="autoelite-login-features">

            {/* Feature 1 */}

            <div className="autoelite-login-feature">

              <div className="autoelite-login-feature-icon">
                <Zap size={20} />
              </div>

              <div>

                <div className="autoelite-login-feature-title">
                  Real-time inventory
                </div>

                <div className="autoelite-login-feature-description">
                  Live stock visibility and tracking.
                </div>

              </div>

            </div>

            {/* Feature 2 */}

            <div className="autoelite-login-feature">

              <div className="autoelite-login-feature-icon">
                <Sparkles size={20} />
              </div>

              <div>

                <div className="autoelite-login-feature-title">
                  AI-powered insights
                </div>

                <div className="autoelite-login-feature-description">
                  Smarter sales and inventory decisions.
                </div>

              </div>

            </div>

            {/* Feature 3 */}

            <div className="autoelite-login-feature">

              <div className="autoelite-login-feature-icon">
                <ShieldCheck size={20} />
              </div>

              <div>

                <div className="autoelite-login-feature-title">
                  Enterprise security
                </div>

                <div className="autoelite-login-feature-description">
                  Your dealership data stays protected.
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ===================================================
          RIGHT LOGIN PANEL
          =================================================== */}

      <section className="autoelite-login-panel">

        <div className="autoelite-login-container">

          {/* ------------------------------------------------
              SECURE WORKSPACE
              ------------------------------------------------ */}

          <div className="autoelite-login-secure">

            <div className="autoelite-login-secure-icon">
              <LockKeyhole size={21} />
            </div>

            <span className="autoelite-login-secure-text">
              Secure Workspace
            </span>

          </div>

          {/* ------------------------------------------------
              HEADING
              ------------------------------------------------ */}

          <h2 className="autoelite-login-title">
            Welcome back.
          </h2>

          <p className="autoelite-login-subtitle">
            Sign in to your AutoElite dealership
            workspace.
          </p>

          {/* =================================================
              LOGIN CARD
              ================================================= */}

          <div className="autoelite-login-card">

            <form
              className="autoelite-login-form"
              onSubmit={handleSubmit}
            >

              {/* =============================================
                  EMAIL
                  ============================================= */}

              <div className="autoelite-login-field">

                <div className="autoelite-login-field-header">

                  <label
                    htmlFor="email"
                    className="autoelite-login-label"
                  >
                    Email Address
                  </label>

                </div>

                <div className="autoelite-login-input-wrapper">

                  <Mail
                    className="autoelite-login-input-icon"
                    size={20}
                  />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(
                        event.target.value
                      );
                      setError("");
                    }}
                    placeholder="you@company.com"
                    autoComplete="email"
                    className="autoelite-login-input"
                  />

                </div>

              </div>

              {/* =============================================
                  PASSWORD
                  ============================================= */}

              <div className="autoelite-login-field">

                <div className="autoelite-login-field-header">

                  <label
                    htmlFor="password"
                    className="autoelite-login-label"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="autoelite-login-forgot"
                    onClick={() => {
                      setError(
                        "For demo access, use the credentials provided below."
                      );
                    }}
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="autoelite-login-input-wrapper">

                  <LockKeyhole
                    className="autoelite-login-input-icon"
                    size={20}
                  />

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(event) => {
                      setPassword(
                        event.target.value
                      );
                      setError("");
                    }}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="autoelite-login-input"
                  />

                  <button
                    type="button"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    title={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    onClick={() =>
                      setShowPassword(
                        (value) => !value
                      )
                    }
                    className="autoelite-login-password-toggle"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

              </div>

              {/* =============================================
                  META
                  ============================================= */}

              <div className="autoelite-login-meta">

                <label className="autoelite-login-remember">

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) =>
                      setRememberMe(
                        event.target.checked
                      )
                    }
                    className="autoelite-login-checkbox"
                  />

                  <span>
                    Remember me
                  </span>

                </label>

                <div className="autoelite-login-status">

                  <span className="autoelite-login-status-dot" />

                  <span>
                    All systems operational
                  </span>

                </div>

              </div>

              {/* =============================================
                  ERROR
                  ============================================= */}

              {error && (
                <div className="autoelite-login-error">

                  <AlertCircle
                    size={16}
                    flexShrink={0}
                  />

                  <span>
                    {error}
                  </span>

                </div>
              )}

              {/* =============================================
                  LOGIN BUTTON
                  ============================================= */}

              <button
                type="submit"
                disabled={loading}
                className="autoelite-login-button"
              >

                {loading ? (
                  <>
                    <span className="autoelite-login-spinner" />

                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in to AutoElite

                    <ArrowRight
                      className="autoelite-login-button-icon"
                    />
                  </>
                )}

              </button>

            </form>

            {/* =================================================
                DIVIDER
                ================================================= */}

            <div className="autoelite-login-divider">
              <span>Demo Access</span>
            </div>

            {/* =================================================
                DEMO HEADER
                ================================================= */}

            <div className="autoelite-login-demo-header">

              <span className="autoelite-login-demo-label">
                Administrator
              </span>

              <span className="autoelite-login-demo-action">
                One-click login
              </span>

            </div>

            {/* =================================================
                DEMO CARD
                ================================================= */}

            <div className="autoelite-login-demo-card">

              <div className="autoelite-login-demo-user">

                <div className="autoelite-login-demo-avatar">
                  <UserRound size={20} />
                </div>

                <div className="autoelite-login-demo-info">

                  <div className="autoelite-login-demo-name">
                    Administrator
                  </div>

                  <div className="autoelite-login-demo-email">
                    {DEMO_EMAIL}
                  </div>

                </div>

              </div>

              <button
                type="button"
                onClick={handleDemoLogin}
                className="autoelite-login-demo-button"
              >
                Use demo
              </button>

            </div>

            {/* =================================================
                CREDENTIAL HINT
                ================================================= */}

            <div
              style={{
                marginTop: "14px",
                textAlign: "center",
                fontSize: "10px",
                color: "#52657d",
                lineHeight: 1.5,
              }}
            >
              Demo credentials:
              {" "}
              <span
                style={{
                  color: "#71839a",
                }}
              >
                admin@autoelite.com
              </span>
              {" "}
              /
              {" "}
              <span
                style={{
                  color: "#71839a",
                }}
              >
                admin123
              </span>
            </div>

          </div>

          {/* =================================================
              FOOTER
              ================================================= */}

          <div className="autoelite-login-footer">

            Protected AutoElite dealership workspace
            {" • "}
            Secure administrator access

          </div>

        </div>

      </section>

    </main>
  );
}

export default Login;
