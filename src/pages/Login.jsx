
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaGraduationCap,
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaCheckCircle
} from "react-icons/fa";


const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const fillDemo = () => {
    setEmail("admin@gmail.com");
    setPassword("admin123");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("isAuthenticated", "true");
    navigate("/");
  };

  return (
    <div className="student-login-page">
      <div className="login-shell">

       
        <div className="login-welcome">
          <div className="welcome-brand">
            <span className="brand-mark">
              <FaGraduationCap />
            </span>
            <span>
              Student<span className="brand-light">Hub</span>
            </span>
          </div>

          <div className="welcome-content">
            <span className="welcome-tag">
              STUDENT MANAGEMENT SYSTEM
            </span>

            <h1>
              Make your
              <br />
              learning journey
              <br />
              <span>count.</span>
            </h1>

            <p>
              One simple place to manage student records,
              stay organized, and keep every detail in reach.
            </p>

            <div className="welcome-points">
              <div>
                <FaCheckCircle /> Simple student records
              </div>
              <div>
                <FaCheckCircle /> Everything in one place
              </div>
              <div>
                <FaCheckCircle /> Easy and organized workflow
              </div>
            </div>
          </div>

          <div className="welcome-footer">
            Your campus. Your progress. One dashboard.
          </div>

          <div className="welcome-orb orb-one"></div>
          <div className="welcome-orb orb-two"></div>
        </div>

       
        <div className="login-form-side">

          <div className="mobile-brand">
            <span className="brand-mark">
              <FaGraduationCap />
            </span>
            <span>
              Student<span className="brand-light">Hub</span>
            </span>
          </div>

          <div className="form-inner">
            <div className="form-topline">
              YOUR STUDENT SPACE
            </div>

            <h2>
              {isSignUp ? "Create your account" : "Welcome back!"}
            </h2>

            <p className="form-subtitle">
              {isSignUp
                ? "Get started by creating your StudentHub account."
                : "Enter your details to access your dashboard."}
            </p>

            <form onSubmit={handleSubmit}>
              <div className="login-field">
                <label htmlFor="login-email">Email address</label>

                <div className="input-with-icon">
                  <FaEnvelope />

                  <input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="login-field">
                <label htmlFor="login-password">Password</label>

                <div className="input-with-icon">
                  <FaLock />

                  <input
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {!isSignUp && (
                <button
                  type="button"
                  className="demo-fill-button"
                  onClick={fillDemo}
                >
                  <span>Fill demo credentials</span>
                  <span className="demo-arrow">↗</span>
                </button>
              )}

              <button type="submit" className="login-submit">
                <span>
                  {isSignUp
                    ? "Create account"
                    : "Sign in to dashboard"}
                </span>

                <FaArrowRight />
              </button>
            </form>

            {!isSignUp && (
              <div className="demo-note">
                <span className="demo-dot"></span>

                <div>
                  <strong>Demo account</strong>
                  <br />
                  <span>admin@gmail.com · admin123</span>
                </div>
              </div>
            )}

            <div className="login-switch">
              {isSignUp
                ? "Already have an account?"
                : "New to StudentHub?"}

              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Sign in" : "Create account"}
              </button>
            </div>
          </div>

          <div className="login-bottom-note">
            © 2026 StudentHub <span>•</span>
            Built for better organization
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
