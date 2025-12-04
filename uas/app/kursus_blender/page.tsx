"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "../styles/course-detail.css";

const CURRENT_COURSE_ID = 4; 

// Data Video berdasarkan DetailBlender.html
const courseVideos = [
  { title: "User Interface - Blender 3D Modeling", url: "https://youtu.be/_l7fshHOsPA?si=Tqy4otutfVb_Q4en", duration: "05:50", isFree: true },
  { title: "Move, Rotate, Scale Object - Blender 3D Modelling", url: "https://youtu.be/7sJ_jO6NHxA?si=7dTy9ZlrhK_cOOxY", duration: "04:37", isFree: true },
  // Video Berbayar
  { title: "Edit Mode - Blender 3D Modeling", url: "https://youtu.be/WBQEZwJAWrc?si=xQWkQbuU296-AWR9", duration: "05:03", isFree: false },
  { title: "Extrude - Blender 3D Modeling", url: "https://youtu.be/hsLD4XkMNO4?si=taCgOeDE5Hcn92N3", duration: "05:10", isFree: false },
  { title: "Loop Cut & Delete - Blender 3D Modeling", url: "https://youtu.be/0G0Idtn8XlM?si=FQj_QCBzugS5WEyH", duration: "05:23", isFree: false },
  { title: "Knife, Bisect & Bevel Tool - Blender 3D Modeling", url: "https://youtu.be/pbq0ExxuhCw?si=qowRM0dQcEwQwPA8", duration: "03:20", isFree: false },
  { title: "Shading, Texturing & UV Unwrap - Blender 3D Modeling", url: "https://youtu.be/R9C7chSsHEY?si=9jYtT_jWyQ9OhP0V", duration: "10:48", isFree: false },
  { title: "Modifier: Mirror, Boolean, Simple Deform, Subdivision", url: "https://youtu.be/gnngKZj13Yk?si=0TQLPak7IOvlLqjN", duration: "07:11", isFree: false },
  { title: "Basic Rigging & Posing", url: "https://youtu.be/XWveG_boJdo?si=l1hh5t3X0Z7tApKT", duration: "10:11", isFree: false },
];

export default function DetailBlenderPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("manfaat");
  
  // State User
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false); 

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Cek Login
  useEffect(() => {
    // 1. Cek Login
    const checkAuth = setTimeout(() => {
      if (typeof window !== "undefined") {
        const user = localStorage.getItem("currentUser");
        setIsLoggedIn(!!user);

        // 2. Cek Pembelian dari LocalStorage
        const savedPurchases = localStorage.getItem('purchasedCourses');
        if (savedPurchases) {
            const purchasedList = JSON.parse(savedPurchases);
            // Cek apakah ID kursus saat ini ada di daftar pembelian
            if (purchasedList.includes(CURRENT_COURSE_ID)) {
                setHasPurchased(true);
            }
        }
      }
    }, 0);
    return () => clearTimeout(checkAuth);
  }, []);

  // Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['manfaat', 'kursus', 'syarat'];
      let currentActive = 'manfaat';

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          if (section.getBoundingClientRect().top <= 120) { 
            currentActive = sections[i];
            break;
          }
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderVideoList = () => {
    const videosToShow = isExpanded ? courseVideos : courseVideos.slice(0, 4);

    return videosToShow.map((video, index) => {
      const isAccessible = isLoggedIn && (video.isFree || hasPurchased);

      let statusBadge;
      if (!isLoggedIn) {
        statusBadge = <span className="badge bg-warning text-dark ms-auto">Login</span>;
      } else if (!isAccessible) {
        statusBadge = <span className="badge bg-secondary ms-auto">Premium</span>;
      } else if (video.isFree) {
        statusBadge = <span className="video-label ms-auto">Gratis</span>;
      } else {
        // Jika berbayar tapi sudah dibeli
        statusBadge = <span className="badge bg-success ms-auto">Terbuka</span>;
      }

      return (
        <li key={index} className={!isAccessible ? "locked-video" : ""}>
          {isAccessible ? (
            <a href={video.url} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-play-circle me-2"></i>
              <span className="video-title">{video.title}</span>
              {statusBadge}
              <span className="video-duration ms-3">{video.duration}</span>
            </a>
          ) : (
            <div className="d-flex align-items-center p-3 text-muted" style={{cursor: 'not-allowed', opacity: 0.7}}>
              <i className="fas fa-lock me-2"></i>
              <span className="video-title">{video.title}</span>
              {statusBadge}
              <span className="video-duration ms-3">{video.duration}</span>
            </div>
          )}
        </li>
      );
    });
  };

  return (
    <div className="detail-page-wrapper">
      <div className="container">
        <main>
          <section className="course-detail-header">
            <div className="breadcrumbs">
                <Link href="/">← Home</Link>
                <span>&gt;</span>
                <Link href="/kursus">Kursus</Link>
                <span>&gt;</span>
                <p>Blender 3D Modeling [2020]</p>
            </div>

            <div className="detail-content-wrapper">
                <div className="course-text-info">
                <h2>Blender 3D Modeling [2020]</h2>
                <p className="course-description">
                    Blender 3D adalah salah satu platform kreasi 3D paling komprehensif yang tersedia di pasar kreatif saat ini. 
                    Sebagai software open-source yang didukung oleh komunitas global yang masif, Blender menawarkan rangkaian fitur canggih 
                    yang mencakup keseluruhan alur kerja 3D, mulai dari pemodelan, pematungan digital (sculpting), animasi, hingga rendering fotorealistis.
                </p>
                </div>
                <div className="course-media-placeholder">
                <Image
                    src="/Blender.jpg"
                    alt="Blender 3D Modeling"
                    width={800}
                    height={450}
                    style={{ width: "100%", height: "auto" }}
                />
                </div>
            </div>

            <div className="course-meta-info">
                <span>Instruktur: Darius</span>
                <span>Waktu Total: 58 menit</span>
                <span>Rilis: 12 Oktober 2021</span>
            </div>
          </section>

          <div className="course-content-wrapper">
            <div className="main-content-col">
                <nav className="sticky-nav">
                    <ul>
                    <li><a href="#manfaat" className={activeSection === 'manfaat' ? 'active' : ''}>Manfaat</a></li>
                    <li><a href="#kursus" className={activeSection === 'kursus' ? 'active' : ''}>Kursus</a></li>
                    <li><a href="#syarat" className={activeSection === 'syarat' ? 'active' : ''}>Syarat</a></li>
                    </ul>
                </nav>

              <div className="learning-objectives" id="manfaat">
                <h2>Yang akan Anda pelajari:</h2>
                <ul>
                  <li>Menguasai dasar-dasar navigasi dan antarmuka (interface) di dalam Blender.</li>
                  <li>Mempelajari teknik-teknik fundamental 3D modeling (Extrude, Loop Cut, Bevel).</li>
                  <li>Memahami cara memberikan material, tekstur, dan warna pada objek 3D (Shading & UV Unwrapping).</li>
                  <li>Menerapkan berbagai macam modifier non-destruktif untuk mempercepat proses modeling.</li>
                  <li>Mendapatkan pengenalan dasar tentang rigging untuk mempersiapkan karakter 3D.</li>
                </ul>
              </div>

              <div className="skills-acquired">
                <h2>Keahlian yang akan Anda dapatkan:</h2>
                <div className="skills-tags">
                  <span className="skill-tag">3D Modeling</span>
                  <span className="skill-tag">Digital Sculpting</span>
                  <span className="skill-tag">UV Unwrapping</span>
                  <span className="skill-tag">Texturing & Shading</span>
                  <span className="skill-tag">Lighting</span>
                  <span className="skill-tag">Rendering</span>
                  <span className="skill-tag">Rigging Karakter</span>
                </div>
              </div>

              <div className="course-content-section" id="kursus">
                <div className="course-content-header">
                  <div className="header-text">
                    <h2>Konten Kursus:</h2>
                    <p>{courseVideos.length} Video - Total 58 menit</p>
                  </div>
                  {!hasPurchased && <span className="promo-btn">Dua Video Pertama Gratis!</span>}
                </div>

                <div className="video-list-container">
                  {!isLoggedIn && (
                    <div className="alert alert-warning mb-3 text-center" role="alert">
                      <i className="fas fa-exclamation-circle me-2"></i>
                      Silakan <Link href="/login" className="fw-bold text-dark text-decoration-underline">Login</Link> untuk mengakses video gratis.
                    </div>
                  )}

                  <ul className="video-list">
                    {renderVideoList()}
                  </ul>
                  
                  <button className="show-more-btn" onClick={toggleExpand}>
                    {isExpanded ? (
                      <>Lebih sedikit <i className="fas fa-chevron-up ms-1"></i></>
                    ) : (
                      <>Lebih banyak <i className="fas fa-chevron-down ms-1"></i></>
                    )}
                  </button>
                </div>
              </div>

              <div className="requirements-section" id="syarat">
                <h2>Syarat:</h2>
                <ul>
                  <li>Tidak perlu pengalaman 3D sebelumnya. Kursus ini dirancang untuk pemula sejati.</li>
                  <li>Komputer atau Laptop (64-bit) dengan koneksi internet.</li>
                  <li>Software Blender sudah terinstal (Gratis di blender.org).</li>
                  <li>Rasa ingin tahu dan kesabaran untuk belajar.</li>
                </ul>
              </div>
            </div>

            <aside className="purchase-sidebar">
              <div className="purchase-box">
                {hasPurchased ? (
                    <div className="alert alert-success fw-bold text-center">
                        <i className="fas fa-check-circle me-2 mb-2" style={{fontSize: '2rem'}}></i><br/>
                        Anda sudah membeli kursus ini. <br/>
                        <span className="fw-normal small">Silakan akses materi di samping.</span>
                    </div>
                ) : (
                    <>
                        <h2>Beli Kursus</h2>
                        {/* Harga disesuaikan dengan daftar di halaman list (Rp 50.000) agar konsisten */}
                        <p className="price">Rp 50.000</p>
                        <p className="student-count">
                        <i className="fas fa-fire me-2" style={{color: 'var(--primary-orange)'}}></i>
                        <span>556 Pelajar sudah mendaftar</span>
                        </p>
                        <div className="action-buttons">
                        <Link href="/pembayaran?id=4" className="btn-purchase primary">
                            Beli Langsung
                        </Link>
                        </div>
                    </>
                )}
                
                <div className="includes-section">
                  <p>Sudah termasuk:</p>
                  <ul>
                    <li><i className="fas fa-circle-play me-2"></i> {courseVideos.length} Video Pembelajaran</li>
                    <li><i className="fas fa-infinity me-2"></i> Akses Selamanya</li>
                    <li><i className="fas fa-file-arrow-down me-2"></i> File Aset</li>
                    <li><i className="fas fa-trophy me-2"></i> Sertifikat Penyelesaian</li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}