"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "../styles/login.css";
import Image from "next/image";

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

    if (!email || !password) {
      setErrorMessage("Email dan Password wajib diisi.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Format email tidak valid (harus mengandung '@').");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password minimal harus 8 karakter.");
      return;
    }

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

      alert(`Oke udah bisa masuk ya ${data.user.fullname}!`);

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
        setErrorMessage("Kayaknya ada yang salah.");
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
            <div style={{ marginBottom: '20px' }}>
              <Image
                src="/Logo.png"
                alt="SkillUp! Logo"
                width={150}
                height={50}
                style={{ height: '60px', width: 'auto' }}
              />
            </div>
            <h1 className="welcome-title">Selamat Datang!</h1>
            <p className="welcome-text">
              Selamat datang di SkillUp! Mulai perjalanan belajarmu hari ini. Kami menyediakan berbagai kursus interaktif yang dirancang untuk membantumu menguasai keterampilan baru dengan mudah, kapan saja dan di mana saja.
            </p>
          </div>

          {/* Form Section (Kanan) */}
          <div className="form-section">
            
            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <div className="form-header">
                <h2 className="form-title">Login</h2>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="error-message" style={{ display: 'block', color: 'red', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '5px', marginBottom: '15px', fontSize: '14px' }}>
                  {errorMessage}
                </div>
              )}

              {/* Email Input */}
              <div className="input-group">
                <input
                  type="email"
                  id="loginEmail"
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