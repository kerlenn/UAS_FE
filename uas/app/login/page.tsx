"use client";

import React, { useState, useEffect, FormEvent, ChangeEvent, FocusEvent } from "react";
import Link from "next/link";
import "../styles/login.css";

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
const CURRENT_USER_KEY = "currentUser";

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

function setCurrentUser(user: User) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [fieldStatus, setFieldStatus] = useState<{
    email: FieldStatus;
    password: FieldStatus;
  }>({
    email: "idle",
    password: "idle",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    ensureUsersInitialized();
  }, []);

  const validateField = (name: "email" | "password", value: string) => {
    if (name === "email") {
      if (!value.trim() || !isValidEmail(value.trim())) {
        setFieldStatus((prev) => ({ ...prev, email: "error" }));
        return false;
      }
      setFieldStatus((prev) => ({ ...prev, email: "success" }));
      return true;
    }
    if (name === "password") {
      if (!value || value.length < 8) {
        setFieldStatus((prev) => ({ ...prev, password: "error" }));
        return false;
      }
      setFieldStatus((prev) => ({ ...prev, password: "success" }));
      return true;
    }
    return true;
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "loginEmail") {
      validateField("email", value);
    } else if (id === "loginPassword") {
      validateField("password", value);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    if (id === "loginEmail") {
      setEmail(value);
      setFieldStatus((prev) => ({ ...prev, email: "idle" }));
      setErrorMessage("");
    } else if (id === "loginPassword") {
      setPassword(value);
      setFieldStatus((prev) => ({ ...prev, password: "idle" }));
      setErrorMessage("");
    } else if (id === "rememberMe" && type === "checkbox") {
      setRememberMe(checked);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setErrorMessage("Email harus diisi");
      setFieldStatus((prev) => ({ ...prev, email: "error" }));
      return;
    }

    if (!password) {
      setErrorMessage("Kata sandi harus diisi");
      setFieldStatus((prev) => ({ ...prev, password: "error" }));
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setErrorMessage("Format email tidak valid");
      setFieldStatus((prev) => ({ ...prev, email: "error" }));
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Kata sandi minimal 8 karakter");
      setFieldStatus((prev) => ({ ...prev, password: "error" }));
      return;
    }

    const users = getAllUsers();
    const user = users.find(
      (u) => u.email === trimmedEmail && u.password === password
    );

    if (!user) {
      setErrorMessage("Email atau kata sandi salah");
      setFieldStatus((prev) => ({
        ...prev,
        email: "error",
        password: "error",
      }));
      return;
    }

    setCurrentUser(user);
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(`Selamat datang, ${user.fullname}!`);
      if (typeof window !== "undefined") {
        window.location.href = "/"; // ganti dengan route home kamu
      }
    }, 1000);
  };

  return (
    <div className="login-page">
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
          <button className="tab-btn active" type="button">
            Login
          </button>
          <Link href="/signup">
            <button className="tab-btn" type="button">
              Sign Up
            </button>
          </Link>
        </div>

        {/* Card */}
        <div className="auth-card">
          {/* Welcome section */}
          <div className="welcome-section">
            <div className="logo-badge">Logo</div>
            <h1 className="welcome-title">Selamat Datang!</h1>
            <p className="welcome-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
              risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
              nec, ultricies sed, dolor.
            </p>
          </div>

          {/* Form section */}
          <div className="form-section">
            <form id="loginForm" className="auth-form" onSubmit={handleSubmit}>
              <div className="form-header">
                <h2 className="form-title">Login</h2>
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
                  id="loginEmail"
                  required
                  placeholder=" "
                  value={email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <label htmlFor="loginEmail">Email</label>
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
                    id="loginPassword"
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
                <label htmlFor="loginPassword">Password</label>
              </div>

              {/* Options: remember + forgot */}
              <div className="form-options">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={handleChange}
                  />
                  Remember me
                </label>
                <a href="#" className="forgot-password">
                  Lupa password?
                </a>
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
                <span>{isSubmitting ? "Memproses..." : "Login"}</span>
              </button>

              {/* Text link ke signup */}
              <p
                style={{
                  marginTop: "14px",
                  fontSize: "13px",
                  color: "#4B5563",
                  textAlign: "center",
                }}
              >
                Belum punya akun?{" "}
                <Link
                  href="/signup"
                  style={{ color: "#4C1D95", textDecoration: "underline" }}
                >
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
