"use client";

import React, { useState, useEffect, FormEvent, ChangeEvent, FocusEvent } from "react";
import Link from "next/link";
import "../styles/signUp.css";

type User = {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  password: string;
  createdAt: string;
};

type FieldStatus = "idle" | "error" | "success";

const USERS_KEY = "users";

function ensureUsersInitialized() {
  if (typeof window === "undefined") return;
  const existing = window.localStorage.getItem(USERS_KEY);
  if (!existing) {
    window.localStorage.setItem(USERS_KEY, JSON.stringify([]));
  }
}

function getAllUsers(): User[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(USERS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as User[];
  } catch {
    return [];
  }
}

function addUser(user: User) {
  if (typeof window === "undefined") return;
  const existing = getAllUsers();
  existing.push(user);
  window.localStorage.setItem(USERS_KEY, JSON.stringify(existing));
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string) {
  // Harus mulai dengan 08 dan 10-16 digit, hanya angka
  return /^08\d{8,14}$/.test(phone);
}

function isValidName(name: string) {
  return name.length >= 3 && name.length <= 32 && !/\d/.test(name);
}

export default function SignUpPage() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [fieldStatus, setFieldStatus] = useState<{
    fullname: FieldStatus;
    email: FieldStatus;
    phone: FieldStatus;
    password: FieldStatus;
    confirmPassword: FieldStatus;
  }>({
    fullname: "idle",
    email: "idle",
    phone: "idle",
    password: "idle",
    confirmPassword: "idle",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    ensureUsersInitialized();
  }, []);

  const setField = (name: keyof typeof fieldStatus, status: FieldStatus) => {
    setFieldStatus((prev) => ({ ...prev, [name]: status }));
  };

  const validateSingleField = (
    name: keyof typeof fieldStatus,
    value: string
  ): boolean => {
    if (name === "fullname") {
      if (!value.trim()) {
        setField("fullname", "error");
        return false;
      }
      if (!isValidName(value.trim())) {
        setField("fullname", "error");
        return false;
      }
      setField("fullname", "success");
      return true;
    }

    if (name === "email") {
      if (!value.trim() || !isValidEmail(value.trim())) {
        setField("email", "error");
        return false;
      }
      setField("email", "success");
      return true;
    }

    if (name === "phone") {
      if (!value.trim() || !isValidPhone(value.trim())) {
        setField("phone", "error");
        return false;
      }
      setField("phone", "success");
      return true;
    }

    if (name === "password") {
      if (!value || value.length < 8) {
        setField("password", "error");
        return false;
      }
      setField("password", "success");
      return true;
    }

    if (name === "confirmPassword") {
      if (!value || value !== password) {
        setField("confirmPassword", "error");
        return false;
      }
      setField("confirmPassword", "success");
      return true;
    }

    return true;
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "fullname") validateSingleField("fullname", value);
    if (id === "email") validateSingleField("email", value);
    if (id === "phone") validateSingleField("phone", value);
    if (id === "password") validateSingleField("password", value);
    if (id === "confirmPassword") validateSingleField("confirmPassword", value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setErrorMessage("");
    setSuccessMessage("");

    if (id === "fullname") {
      setFullname(value);
      setField("fullname", "idle");
    } else if (id === "email") {
      setEmail(value);
      setField("email", "idle");
    } else if (id === "phone") {
      setPhone(value);
      setField("phone", "idle");
    } else if (id === "password") {
      setPassword(value);
      setField("password", "idle");
    } else if (id === "confirmPassword") {
      setConfirmPassword(value);
      setField("confirmPassword", "idle");
    } else if (id === "agreeTerms" && type === "checkbox") {
      setAgreeTerms(checked);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const trimmedName = fullname.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPhone || !password || !confirmPassword) {
      setErrorMessage("Harap isi semua field");
      return;
    }

    if (!isValidName(trimmedName)) {
      setErrorMessage("Nama lengkap harus 3-32 karakter dan tidak boleh mengandung angka");
      setField("fullname", "error");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setErrorMessage("Format email tidak valid");
      setField("email", "error");
      return;
    }

    const users = getAllUsers();
    if (users.some((u) => u.email === trimmedEmail)) {
      setErrorMessage("Email sudah terdaftar");
      setField("email", "error");
      return;
    }

    if (!isValidPhone(trimmedPhone)) {
      setErrorMessage("Nomor handphone harus dimulai dengan 08 dan terdiri dari 10-16 digit angka");
      setField("phone", "error");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Kata sandi minimal 8 karakter");
      setField("password", "error");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Konfirmasi kata sandi tidak sama");
      setField("confirmPassword", "error");
      return;
    }

    if (!agreeTerms) {
      setErrorMessage("Anda harus menyetujui syarat dan ketentuan");
      return;
    }

    const newUser: User = {
      id: Date.now(),
      fullname: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      password,
      createdAt: new Date().toISOString(),
    };

    setIsSubmitting(true);
    addUser(newUser);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage("Akun berhasil dibuat! Silakan login.");
      if (typeof window !== "undefined") {
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      }
    }, 1000);
  };

  return (
    <div className="signup-page">
      <div className="auth-container">
        {/* Back to Home */}
        <div className="back-home">
          <Link href="/home" className="btn-back-home">
            <i className="fas fa-arrow-left" />
            Kembali ke Beranda
          </Link>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <Link href="/login">
            <button className="tab-btn" type="button">
              Login
            </button>
          </Link>
          <button className="tab-btn active" type="button">
            Sign Up
          </button>
        </div>

        {/* Card */}
        <div className="auth-card">
          {/* Welcome section */}
          <div className="welcome-section">
            <div className="logo-badge">Logo</div>
            <h1 className="welcome-title">Bergabung Sekarang!</h1>
            <p className="welcome-text">
              Buat akun untuk mulai belajar dan kelola perjalanan belajar Anda
              dengan lebih terstruktur dan terarah.
            </p>
          </div>

          {/* Form section */}
          <div className="form-section">
            <form id="signupForm" className="auth-form" onSubmit={handleSubmit}>
              <div className="form-header">
                <h2 className="form-title">Sign Up</h2>
              </div>

              {/* Fullname */}
              <div
                className={
                  "input-group " +
                  (fieldStatus.fullname === "error"
                    ? "error"
                    : fieldStatus.fullname === "success"
                    ? "success"
                    : "")
                }
              >
                <input
                  type="text"
                  id="fullname"
                  required
                  placeholder=" "
                  value={fullname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="fullname">Nama Lengkap</label>
              </div>

              {/* Email */}
              <div
                className={
                  "input-group " +
                  (fieldStatus.email === "error"
                    ? "error"
                    : fieldStatus.email === "success"
                    ? "success"
                    : "")
                }
              >
                <input
                  type="email"
                  id="email"
                  required
                  placeholder=" "
                  value={email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="email">Email</label>
              </div>

              {/* Phone */}
              <div
                className={
                  "input-group " +
                  (fieldStatus.phone === "error"
                    ? "error"
                    : fieldStatus.phone === "success"
                    ? "success"
                    : "")
                }
              >
                <input
                  type="text"
                  id="phone"
                  required
                  placeholder=" "
                  value={phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="phone">No. Handphone</label>
              </div>

              {/* Password */}
              <div
                className={
                  "input-group " +
                  (fieldStatus.password === "error"
                    ? "error"
                    : fieldStatus.password === "success"
                    ? "success"
                    : "")
                }
              >
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    required
                    placeholder=" "
                    value={password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"} />
                  </button>
                </div>
                <label htmlFor="password">Password</label>
              </div>

              {/* Confirm Password */}
              <div
                className={
                  "input-group " +
                  (fieldStatus.confirmPassword === "error"
                    ? "error"
                    : fieldStatus.confirmPassword === "success"
                    ? "success"
                    : "")
                }
              >
                <div className="password-input">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    required
                    placeholder=" "
                    value={confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() =>
                      setShowConfirmPassword((prev) => !prev)
                    }
                  >
                    <i
                      className={
                        showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"
                      }
                    />
                  </button>
                </div>
                <label htmlFor="confirmPassword">Konfirmasi Password</label>
              </div>

              {/* Terms */}
              <div className="form-options" style={{ marginBottom: 10 }}>
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    checked={agreeTerms}
                    onChange={handleChange}
                  />
                  Saya menyetujui syarat dan ketentuan
                </label>
              </div>

              {/* Messages */}
              <div
                className="error-message"
                style={{ display: errorMessage ? "block" : "none" }}
              >
                {errorMessage}
              </div>
              <div
                className="success-message"
                style={{ display: successMessage ? "block" : "none" }}
              >
                {successMessage}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className={`btn-submit ${isSubmitting ? "loading" : ""}`}
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? "Memproses..." : "Sign Up"}</span>
              </button>

              {/* Text link ke login */}
              <p
                style={{
                  marginTop: "14px",
                  fontSize: "13px",
                  color: "#4B5563",
                  textAlign: "center",
                }}
              >
                Sudah punya akun?{" "}
                <Link
                  href="/login"
                  style={{ color: "#4C1D95", textDecoration: "underline" }}
                >
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
