"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "../styles/signUp.css"; // Pastikan CSS kamu ada di sini

export default function SignUpPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
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
      // Kirim data ke API yang baru kita buat di langkah 1
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
        <div className="back-home">
          <Link href="/" className="btn-back-home">
             Kembali ke Beranda
          </Link>
        </div>

        <div className="auth-card">
          <div className="form-section">
            <form className="auth-form" onSubmit={handleSubmit}>
              <h2 className="form-title">Sign Up</h2>
              
              {errorMessage && (
                <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>
                  {errorMessage}
                </div>
              )}

              <div className="input-group">
                <input type="text" id="fullname" required placeholder=" " onChange={handleChange} />
                <label htmlFor="fullname">Nama Lengkap</label>
              </div>

              <div className="input-group">
                <input type="email" id="email" required placeholder=" " onChange={handleChange} />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-group">
                <input type="text" id="phone" required placeholder=" " onChange={handleChange} />
                <label htmlFor="phone">No. Handphone</label>
              </div>

              <div className="input-group">
                <input type="password" id="password" required placeholder=" " onChange={handleChange} />
                <label htmlFor="password">Password</label>
              </div>

              <div className="input-group">
                <input type="password" id="confirmPassword" required placeholder=" " onChange={handleChange} />
                <label htmlFor="confirmPassword">Confirm Password</label>
              </div>

              <div className="form-options">
                <label className="checkbox-container">
                  <input 
                    type="checkbox" 
                    id="agreeTerms" 
                    onChange={(e) => setAgreeTerms(e.target.checked)} 
                  />
                  Saya menyetujui syarat dan ketentuan
                </label>
              </div>

              <button type="submit" className="btn-submit" disabled={isSubmitting}>
                {isSubmitting ? "Memproses..." : "Sign Up"}
              </button>

              <p style={{ marginTop: "14px", textAlign: "center" }}>
                Sudah punya akun? <Link href="/login" style={{ color: "#4C1D95" }}>Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}