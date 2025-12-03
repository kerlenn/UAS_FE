"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "../styles/signUp.css";

export default function SignUpPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // State untuk form
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    // Validasi sederhana di frontend
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Konfirmasi password tidak cocok.");
      setIsSubmitting(false);
      return;
    }

    if (!agreeTerms) {
      setErrorMessage("Anda harus menyetujui syarat dan ketentuan.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Kirim data ke API
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullname: formData.fullname,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Gagal mendaftar');
      }

      // Jika sukses
      alert("Akun berhasil dibuat! Silakan login.");
      router.push("/login");

    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Terjadi kesalahan yang tidak diketahui");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="auth-container">
        {/* Back to Home Button */}
        <div className="back-home">
          <Link href="/" className="btn-back-home">
            ← Kembali ke Beranda
          </Link>
        </div>

        {/* Tab Toggle */}
        <div className="auth-tabs">
          <Link href="/login">
            <button className="tab-btn">Login</button>
          </Link>
          <button className="tab-btn active">Sign Up</button>
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
                <h2 className="form-title">Sign Up</h2>
              </div>
              
              {/* Error Message */}
              {errorMessage && (
                <div className="error-message" style={{ display: 'block' }}>
                  {errorMessage}
                </div>
              )}

              {/* Nama Lengkap */}
              <div className="input-group">
                <input 
                  type="text" 
                  id="fullname" 
                  required 
                  placeholder=" " 
                  value={formData.fullname}
                  onChange={handleChange} 
                />
                <label htmlFor="fullname">Nama Lengkap</label>
              </div>

              {/* Email */}
              <div className="input-group">
                <input 
                  type="email" 
                  id="email" 
                  required 
                  placeholder=" " 
                  value={formData.email}
                  onChange={handleChange} 
                />
                <label htmlFor="email">Email</label>
              </div>

              {/* No. Handphone */}
              <div className="input-group">
                <input 
                  type="text" 
                  id="phone" 
                  required 
                  placeholder=" " 
                  value={formData.phone}
                  onChange={handleChange} 
                />
                <label htmlFor="phone">No Telepon</label>
              </div>

              {/* Password */}
              <div className="input-group password-input">
                <input 
                  type={showPassword ? "text" : "password"} 
                  id="password" 
                  required 
                  placeholder=" " 
                  value={formData.password}
                  onChange={handleChange} 
                />
                <label htmlFor="password">Password</label>
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="input-group password-input">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  id="confirmPassword" 
                  required 
                  placeholder=" " 
                  value={formData.confirmPassword}
                  onChange={handleChange} 
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>

              {/* Checkbox Terms */}
              <div className="form-options" style={{ marginTop: '16px' }}>
                <label className="checkbox-container">
                  <input 
                    type="checkbox" 
                    id="agreeTerms" 
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)} 
                  />
                  <span>Saya menyetujui syarat dan ketentuan</span>
                </label>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className={`btn-submit ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Memproses..." : "Sign Up"}
              </button>

              {/* Link to Login */}
              <p style={{ marginTop: "20px", textAlign: "center", fontSize: "13px", color: "#6B7280" }}>
                Sudah punya akun?{" "}
                <Link href="/login" style={{ color: "#4C1D95", fontWeight: "600" }}>
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}