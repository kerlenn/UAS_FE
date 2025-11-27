"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "../styles/login.css"; 

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      // Panggil API Login yang baru kita buat
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Gagal login');
      }

      // Jika sukses
      alert(`Selamat datang kembali, ${data.user.fullname}!`);
      
      // Simpan data user sederhana ke localStorage (opsional, buat nampilin nama di home)
      // Nanti idealnya pakai Context/Session
      if (typeof window !== "undefined") {
        localStorage.setItem("currentUser", JSON.stringify(data.user));
      }

      router.push("/"); // Pindah ke Home

    } catch (error) {
      // Cek apakah error ini benar-benar sebuah Error standard
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
        <div className="back-home">
          <Link href="/" className="btn-back-home">Kembali ke Beranda</Link>
        </div>

        <div className="auth-card">
          <div className="form-section">
            <form className="auth-form" onSubmit={handleSubmit}>
              <h2 className="form-title">Login</h2>

              {errorMessage && (
                <div className="error-message" style={{ color: 'red', marginBottom: '15px' }}>
                  {errorMessage}
                </div>
              )}

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

              <div className="input-group">
                <input 
                  type="password" 
                  id="loginPassword" 
                  required 
                  placeholder=" " 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="loginPassword">Password</label>
              </div>

              <button type="submit" className="btn-submit" disabled={isSubmitting}>
                {isSubmitting ? "Memproses..." : "Login"}
              </button>

              <p style={{ marginTop: "14px", textAlign: "center" }}>
                Belum punya akun? <Link href="/signup" style={{ color: "#4C1D95" }}>Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}