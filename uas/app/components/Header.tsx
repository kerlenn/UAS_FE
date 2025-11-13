// app/components/Header.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserIcon } from "./UserIcon";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Gunakan 'xl' (extra large) sebagai batas breakpoint agar di laptop (1118px) masuk mode mobile */}
      <header className="sticky-top header-gradient py-3 position-relative">
        <div className="container-fluid px-4 px-md-5">
          <div className="d-flex align-items-center justify-content-between">
            
            {/* Kiri: Navigasi Desktop (Hanya muncul di XL ke atas) */}
            <div className="d-none d-xl-flex align-items-center gap-2">
              <Link href="#hero" className="nav-link-custom active">Halaman Utama</Link>
              <Link href="#courses" className="nav-link-custom">Kursus</Link>
              <Link href="#contact" className="nav-link-custom">Hubungi Kami</Link>
            </div>

            {/* Tengah: Logo */}
            <div className="position-absolute top-50 start-50 translate-middle">
              <Link href="#hero" className="d-flex align-items-center">
                {/* Logo Mobile (muncul di bawah XL) */}
                <Image src="/Logo.png" alt="SkillUp! Logo" width={150} height={50} style={{ height: '40px', width: 'auto' }} className="d-xl-none" />
                {/* Logo Desktop (muncul di XL ke atas) */}
                <Image src="/Logo.png" alt="SkillUp! Logo" width={150} height={50} style={{ height: '50px', width: 'auto' }} className="d-none d-xl-block" />
              </Link>
            </div>

            {/* Kanan: Auth / Hamburger */}
            <div className="d-flex align-items-center gap-2 ms-auto">
              {/* Desktop Auth (Hanya muncul di XL ke atas) */}
              <div className="d-none d-xl-flex align-items-center gap-2">
                {isLoggedIn ? (
                  <>
                    <span className="text-white fw-bold small me-2">Halo, User!</span>
                    <Link href="/riwayat" className="btn-custom-orange">Riwayat</Link>
                    <Link href="/profile" className="btn-custom-orange rounded-circle d-flex align-items-center justify-content-center p-0" style={{width: '35px', height: '35px'}}><UserIcon className="text-white" /></Link>
                    <button onClick={() => setIsLoggedIn(false)} className="btn-custom-outline">Keluar</button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="btn-custom-outline">Masuk</Link>
                    <Link href="/signup" className="btn-custom-orange">Daftar</Link>
                  </>
                )}
              </div>

              {/* Mobile Hamburger (Muncul di bawah XL) */}
              <button 
                className="d-xl-none btn border-0 p-0 d-flex flex-column gap-1 justify-content-center align-items-end"
                onClick={toggleMobileMenu}
                style={{ width: '30px', height: '30px' }}
              >
                <span className="w-100 bg-white rounded" style={{ height: '3px' }}></span>
                <span className="w-100 bg-white rounded" style={{ height: '3px' }}></span>
                <span className="w-100 bg-white rounded" style={{ height: '3px' }}></span>
              </button>
            </div>
          </div>
        </div>

        {/* --- MOBILE MENU DROPDOWN --- */}
        {/* Menu ini muncul jika toggle aktif DAN layar di bawah XL */}
        {isMobileMenuOpen && (
          <div className="mobile-menu-wrapper p-4 shadow d-xl-none">
            <div className="d-flex flex-column gap-2 mb-3">
              <Link href="#hero" className="nav-link-custom ps-3 text-white" onClick={toggleMobileMenu}>Halaman Utama</Link>
              <Link href="#courses" className="nav-link-custom ps-3 text-white" onClick={toggleMobileMenu}>Kursus</Link>
              <Link href="#contact" className="nav-link-custom ps-3 text-white" onClick={toggleMobileMenu}>Hubungi Kami</Link>
            </div>
            
            <hr className="border-white opacity-50 my-3"/>

            <div className="d-grid gap-3">
              {isLoggedIn ? (
                <>
                  <Link href="/profile" className="btn-custom-orange" onClick={toggleMobileMenu}>Profil Saya</Link>
                  <Link href="/riwayat" className="btn-custom-orange" onClick={toggleMobileMenu}>Riwayat Pembayaran</Link>
                  <button onClick={() => { setIsLoggedIn(false); toggleMobileMenu(); }} className="btn-custom-outline">Keluar</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="btn-custom-outline" onClick={toggleMobileMenu}>Masuk</Link>
                  <Link href="/signup" className="btn-custom-orange" onClick={toggleMobileMenu}>Daftar</Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}