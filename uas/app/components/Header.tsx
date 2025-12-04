// app/components/Header.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserIcon } from "./UserIcon";
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  // Cek status login saat component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("currentUser");
      if (user) {
        try {
          const userData = JSON.parse(user);
          setIsLoggedIn(true);
          setUserName(userData.fullname || "User");
        } catch (error) {
          console.error("Error parsing user data:", error);
          localStorage.removeItem("currentUser");
        }
      }
    }
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser");
      setIsLoggedIn(false);
      setUserName("");
      setIsMobileMenuOpen(false);
      alert("Berhasil logout!");
      router.push("/");
    }
  };

  return (
    <>
      <header className="sticky-top header-gradient py-3 position-relative">
        <div className="container-fluid px-4 px-md-5">
          <div className="d-flex align-items-center justify-content-between">
            
            {/* Kiri: Navigasi Desktop */}
            <div className="d-none d-xl-flex align-items-center gap-3">
              <Link 
                href="/" 
                className={`nav-link-custom ${pathname === '/' ? 'active' : ''}`}
              >
                Halaman Utama
              </Link>
              <Link 
                href="/kursus" 
                className={`nav-link-custom ${pathname === '/kursus' ? 'active' : ''}`}
              >
                Kursus
              </Link>
              <Link 
                href="/#contact" 
                className="nav-link-custom"
              >
                Hubungi Kami
              </Link>
            </div>

            {/* Tengah: Logo */}
            <div className="position-absolute top-50 start-50 translate-middle">
              <Link href="/" className="d-flex align-items-center">
                <Image 
                  src="/Logo.png" 
                  alt="SkillUp! Logo" 
                  width={150} 
                  height={50} 
                  style={{ height: '40px', width: 'auto' }} 
                  className="d-xl-none" 
                />
                <Image 
                  src="/Logo.png" 
                  alt="SkillUp! Logo" 
                  width={150} 
                  height={50} 
                  style={{ height: '50px', width: 'auto' }} 
                  className="d-none d-xl-block" 
                />
              </Link>
            </div>

            {/* Kanan: Auth / Hamburger */}
            <div className="d-flex align-items-center gap-3 ms-auto">
              {/* Desktop Auth */}
              <div className="d-none d-xl-flex align-items-center gap-3">
                {isLoggedIn ? (
                  <>
                    <span className="text-white fw-bold small me-1">
                      Halo, {userName}!
                    </span>
                    
                    {/* Tombol Histori Pembelian - Dipercantik */}
                    <Link 
                      href="/histori" 
                      className="btn-custom-outline px-3 py-1 rounded-pill fw-semibold"
                      style={{
                        transition: 'all 0.3s ease',
                        boxShadow: '0 2px 8px rgba(255,255,255,0.1)'
                      }}
                    >
                      Histori Pembelian
                    </Link>
                    
                    {/* Icon Profile - Dipercantik dengan Hover Effect */}
                    <Link 
                      href="/user" 
                      className="btn-custom-orange rounded-circle d-flex align-items-center justify-content-center p-0 position-relative"
                      style={{
                        width: '42px', 
                        height: '42px',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 12px rgba(255,140,66,0.4)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,140,66,0.6)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,140,66,0.4)';
                      }}
                    >
                      <UserIcon className="text-white" />
                    </Link>
                    
                    {/* Tombol Keluar - Dipercantik */}
                    <button 
                      onClick={handleLogout} 
                      className="btn-custom-outline px-3 py-1 rounded-pill fw-semibold"
                      style={{
                        transition: 'all 0.3s ease',
                        boxShadow: '0 2px 8px rgba(255,255,255,0.1)'
                      }}
                    >
                      Keluar
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/login" 
                      className="btn-custom-outline px-4 py-2 rounded-pill fw-semibold"
                      style={{
                        transition: 'all 0.3s ease',
                        boxShadow: '0 2px 8px rgba(255,255,255,0.1)'
                      }}
                    >
                      Masuk
                    </Link>
                    <Link 
                      href="/signup" 
                      className="btn-custom-orange px-4 py-2 rounded-pill fw-semibold"
                      style={{
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 12px rgba(255,140,66,0.4)'
                      }}
                    >
                      Daftar
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Hamburger */}
              <button 
                className="d-xl-none btn border-0 p-0 d-flex flex-column gap-1 justify-content-center align-items-end"
                onClick={toggleMobileMenu}
                style={{ 
                  width: '30px', 
                  height: '30px',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <span className="w-100 bg-white rounded" style={{ height: '3px' }}></span>
                <span className="w-100 bg-white rounded" style={{ height: '3px' }}></span>
                <span className="w-100 bg-white rounded" style={{ height: '3px' }}></span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu-wrapper p-4 shadow d-xl-none">
            <div className="d-flex flex-column gap-2 mb-3">
              <Link 
                href="/" 
                className={`nav-link-custom ps-3 text-white ${pathname === '/' ? 'active' : ''}`} 
                onClick={toggleMobileMenu}
              >
                Halaman Utama
              </Link>
              <Link 
                href="/kursus" 
                className={`nav-link-custom ps-3 text-white ${pathname === '/kursus' ? 'active' : ''}`} 
                onClick={toggleMobileMenu}
              >
                Kursus
              </Link>
              <Link 
                href="/#contact" 
                className="nav-link-custom ps-3 text-white" 
                onClick={toggleMobileMenu}
              >
                Hubungi Kami
              </Link>
            </div>
            
            <hr className="border-white opacity-50 my-3"/>

            <div className="d-grid gap-3">
              {isLoggedIn ? (
                <>
                  <div className="text-white text-center fw-bold mb-2 py-2 px-3 rounded-pill" 
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    👋 Halo, {userName}!
                  </div>
                  <Link 
                    href="/user" 
                    className="btn-custom-orange rounded-pill py-3 fw-semibold" 
                    onClick={toggleMobileMenu}
                    style={{
                      boxShadow: '0 4px 12px rgba(255,140,66,0.4)'
                    }}
                  >
                    👤 Profil Saya
                  </Link>
                  <Link 
                    href="/pembayaran" 
                    className="btn-custom-orange rounded-pill py-3 fw-semibold" 
                    onClick={toggleMobileMenu}
                    style={{
                      boxShadow: '0 4px 12px rgba(255,140,66,0.4)'
                    }}
                  >
                    Histori Pembelian
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    className="btn-custom-outline rounded-pill py-3 fw-semibold"
                    style={{
                      boxShadow: '0 2px 8px rgba(255,255,255,0.1)'
                    }}
                  >
                    Keluar
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="btn-custom-outline rounded-pill py-3 fw-semibold" 
                    onClick={toggleMobileMenu}
                    style={{
                      boxShadow: '0 2px 8px rgba(255,255,255,0.1)'
                    }}
                  >
                    Masuk
                  </Link>
                  <Link 
                    href="/signup" 
                    className="btn-custom-orange rounded-pill py-3 fw-semibold" 
                    onClick={toggleMobileMenu}
                    style={{
                      boxShadow: '0 4px 12px rgba(255,140,66,0.4)'
                    }}
                  >
                    ✨ Daftar
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}