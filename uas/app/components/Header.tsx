// app/components/Header.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserIcon } from "./UserIcon";
import { useAuth } from "@/app/context/AuthContext";
import { useActiveSection } from "@/app/hooks/useActiveSection";

export default function Header() {
  const { isLoggedIn, user, logout, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { activeSection, isReady } = useActiveSection();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (isLoading) {
    return (
      <header className="sticky top-0 z-50 h-[70px] bg-gradient-to-r from-[#4FD1C5] via-[#63B3ED] via-[#667EEA] via-[#9F7AEA] to-[#B794F4] px-5 py-4 shadow-md md:px-10">
        <div className="relative mx-auto flex h-full w-full max-w-7xl items-center justify-between">
          <div className="flex-shrink-0 lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
            <Link href="#hero" className="flex items-center">
              <Image
                src="/Logo.png"
                alt="SkillUp! Logo"
                width={150}
                height={50}
                className="h-[40px] w-auto lg:h-[50px]"
                priority
              />
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 h-[70px] bg-gradient-to-r from-[#4FD1C5] via-[#63B3ED] via-[#667EEA] via-[#9F7AEA] to-[#B794F4] px-5 py-4 shadow-md md:px-10">
        <div className="relative mx-auto flex h-full w-full max-w-7xl items-center justify-between">

          {/* Header Kiri: Tampil di 'lg' (936px) ke atas */}
          <div className="flex-1 lg:flex-none">
            <nav className="hidden items-center gap-1 lg:flex">
              <Link
                href="#hero"
                className={`nav-btn w-full px-5 py-3 text-left ${isReady && activeSection === "hero" ? "bg-[#FF6B35]" : ""}`}
                onClick={toggleMobileMenu}
              >
                Halaman Utama
              </Link>
              <Link
                href="#courses"
                className={`nav-btn w-full px-5 py-3 text-left ${isReady && activeSection === "courses" ? "bg-[#FF6B35]" : ""}`}
                onClick={toggleMobileMenu}
              >
                Kursus
              </Link>
              <Link
                href="#contact"
                className={`nav-btn w-full px-5 py-3 text-left ${isReady && activeSection === "contact" ? "bg-[#FF6B35]" : ""}`}
                onClick={toggleMobileMenu}
              >
                Hubungi Kami
              </Link>
            </nav>
          </div>

          {/* Header Tengah: Logo */}
          <div className="flex-shrink-0 lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"> {/* Ganti md: menjadi lg: */}
            <Link href="#hero" className="flex items-center">
              <Image
                src="/Logo.png"
                alt="SkillUp! Logo"
                width={150}
                height={50}
                className="h-[40px] w-auto lg:h-[50px]" // h-[40px] di mobile, lg:h-[50px] di desktop
                priority
              />
            </Link>
          </div>

          {/* Header Kanan: Tampil di 'lg' (936px) ke atas */}
          <div className="flex flex-1 items-center justify-end gap-1.5 lg:flex-none"> {/* Ganti md: menjadi lg: */}
            {isLoggedIn ? (
              // Tampilan Logged In
              <div className="hidden items-center gap-1.5 lg:flex"> {/* Ganti md: menjadi lg: */}
                <span className="hidden text-xs font-semibold text-white lg:block">
                  Halo, {user?.fullname}!
                </span>
                <Link
                  href="/riwayat"
                  className="rounded-full bg-[#FF6B35] px-3 py-1.5 text-xs font-semibold text-white transition-all duration-300 ease-in-out hover:bg-[#e55a2e]"
                >
                  Riwayat Pembayaran
                </Link>
                <Link
                  href="/profile"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6B35] text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#e55a2e]"
                >
                  <UserIcon className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/"
                  onClick={(e) => {
                    logout(); // Logout dulu
                  }}
                  className="rounded-full border-2 border-white px-3 py-1.5 text-xs font-semibold text-white transition-all duration-300 ease-in-out hover:bg-white/20"
                >
                  Keluar
                </Link>
              </div>
            ) : (
              // Tampilan Logged Out
              <div className="hidden items-center gap-1.5 lg:flex"> {/* Ganti md: menjadi lg: */}
                <Link
                  href="/login"
                  className="rounded-full border-2 border-white px-4 py-2 text-xs font-semibold text-white transition-all duration-300 ease-in-out hover:bg-white/20"
                >
                  Masuk
                </Link>
                <Link
                  href="/signup"
                  className="rounded-full border-2 border-[#FF6B35] bg-[#FF6B35] px-4 py-2 text-xs font-semibold text-white transition-all duration-300 ease-in-out hover:border-[#e55a2e] hover:bg-[#e55a2e]"
                >
                  Daftar
                </Link>
              </div>
            )}

            {/* Tombol Hamburger: Sembunyi di 'lg' (936px) ke atas */}
            <button
              className="flex flex-col gap-1.5 lg:hidden" // Ganti md: menjadi lg:
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <span className="h-0.5 w-6 rounded-full bg-white transition-all duration-300 ease-in-out"></span>
              <span className="h-0.5 w-6 rounded-full bg-white transition-all duration-300 ease-in-out"></span>
              <span className="h-0.5 w-6 rounded-full bg-white transition-all duration-300 ease-in-out"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Menu Mobile: Sembunyi di 'lg' (936px) ke atas */}
      {isMobileMenuOpen && (
        <div className="fixed left-0 right-0 top-[70px] z-40 bg-gradient-to-r from-[#4FD1C5] via-[#63B3ED] via-[#667EEA] via-[#9F7AEA] to-[#B794F4] p-5 shadow-lg lg:hidden">
          <nav className="flex flex-col gap-2.5">
            <Link
              href="#hero"
              className={`nav-btn w-full px-5 py-3 text-left ${isReady && activeSection === "hero" ? "bg-[#FF6B35]" : ""}`}
              onClick={toggleMobileMenu}
            >
              Halaman Utama
            </Link>
            <Link
              href="#courses"
              className={`nav-btn w-full px-5 py-3 text-left ${isReady && activeSection === "courses" ? "bg-[#FF6B35]" : ""}`}
              onClick={toggleMobileMenu}
            >
              Kursus
            </Link>
            <Link
              href="#contact"
              className={`nav-btn w-full px-5 py-3 text-left ${isReady && activeSection === "contact" ? "bg-[#FF6B35]" : ""}`}
              onClick={toggleMobileMenu}
            >
              Hubungi Kami
            </Link>
          </nav>

          <div className="mt-4 flex flex-col gap-2.5 border-t border-white/20 pt-4">
            {isLoggedIn ? (
              // Tampilan Logged In (Mobile)
              <>
                <Link
                  href="/profile"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FF6B35] px-5 py-2.5 text-center text-sm font-semibold text-white"
                  onClick={toggleMobileMenu}
                >
                  <UserIcon className="h-4 w-4" />
                  Profil Saya
                </Link>
                <Link
                  href="/riwayat"
                  className="w-full rounded-full bg-[#FF6B35] px-5 py-2.5 text-center text-sm font-semibold text-white"
                  onClick={toggleMobileMenu}
                >
                  Riwayat Pembayaran
                </Link>
                <Link
                  href="/"
                  onClick={() => {
                    logout();
                    toggleMobileMenu();
                  }}
                  className="w-full rounded-full border-2 border-white px-5 py-2.5 text-center text-sm font-semibold text-white"
                >
                  Keluar
                </Link>
              </>
            ) : (
              // Tampilan Logged Out (Mobile)
              <>
                <Link
                  href="/login"
                  className="w-full rounded-full border-2 border-white px-5 py-2.5 text-center text-sm font-semibold text-white"
                  onClick={toggleMobileMenu}
                >
                  Masuk
                </Link>
                <Link
                  href="/signup"
                  className="w-full rounded-full border-2 border-[#FF6B35] bg-[#FF6B35] px-5 py-2.5 text-center text-sm font-semibold text-white"
                  onClick={toggleMobileMenu}
                >
                  Daftar
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Style global untuk .nav-btn */}
      <style jsx global>{`
        .nav-btn {
          color: white;
          padding: 10px 15px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 13px;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
          white-space: nowrap;
        }
        .nav-btn:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </>
  );
}