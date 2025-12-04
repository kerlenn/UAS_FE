"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "../styles/login.css"; 

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Gagal login');
      }

      alert(`Selamat datang kembali, ${data.user.fullname}!`);

      if (typeof window !== "undefined") {
        localStorage.setItem("currentUser", JSON.stringify(data.user));

        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("userName", data.user.fullname);
      }

      router.push("/");

    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Terjadi kesalahan saat login");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="auth-container">
        {/* Back to Home Button */}
        <div className="back-home">
          <Link href="/" className="btn-back-home">
            ← Kembali ke Beranda
          </Link>
        </div>

        {/* Tab Toggle */}
        <div className="auth-tabs">
          <button className="tab-btn active">Login</button>
          <Link href="/signup">
            <button className="tab-btn">Sign Up</button>
          </Link>
        </div>

        {/* Auth Card */}
        <div className="auth-card">
          {/* Welcome Section (Kiri) */}
          <div className="welcome-section">
            <div className="logo-badge">Logo</div>
            <h1 className="welcome-title">Selamat Datang!</h1>
            <p className="welcome-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed non risus. Suspendisse lectus tortor, dignissim sit amet, 
              adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.
            </p>
          </div>

          {/* Form Section (Kanan) */}
          <div className="form-section">
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-header">
                <h2 className="form-title">Login</h2>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="error-message" style={{ display: 'block' }}>
                  {errorMessage}
                </div>
              )}

              {/* Email Input */}
              <div className="input-group">
                <input 
                  type="email" 
                  id="loginEmail" 
                  required 
                  placeholder=" " 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="loginEmail">Email</label>
              </div>

              {/* Password Input */}
              <div className="input-group password-input">
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="loginPassword" 
                  required 
                  placeholder=" " 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="loginPassword">Password</label>
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>

              {/* Form Options */}
              <div className="form-options">
                <label className="checkbox-container">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-password">Lupa password?</a>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className={`btn-submit ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Memproses..." : "Login"}
              </button>

              {/* Link to Sign Up */}
              <p style={{ marginTop: "20px", textAlign: "center", fontSize: "13px", color: "#6B7280" }}>
                Belum punya akun?{" "}
                <Link href="/signup" style={{ color: "#4C1D95", fontWeight: "600" }}>
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}