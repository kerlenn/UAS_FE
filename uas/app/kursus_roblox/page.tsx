"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "../styles/course-detail.css";

const CURRENT_COURSE_ID = 3; 

const courseVideos = [
  { title: "Instalasi & Basic Roblox Studio", url: "https://www.youtube.com/watch?v=bRSWT-UEeCU", duration: "06:46", isFree: true },
  { title: "Terrain Editor & Generator", url: "https://www.youtube.com/watch?v=_hQAXqfT5O0", duration: "06:04", isFree: true },
  { title: "ToolBox & Device Server Play", url: "https://www.youtube.com/watch?v=AL-xUl7lUiA", duration: "05:41", isFree: true },
  { title: "Suara Ketika Menabrak Objek", url: "https://www.youtube.com/watch?v=62y7MlUTWos", duration: "05:21", isFree: true },
  { title: "Menggunakan AI Assistant", url: "https://www.youtube.com/watch?v=0-B7eikcwIc", duration: "07:22", isFree: true },
];

export default function DetailRobloxPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("manfaat");
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false); 

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const checkAuth = setTimeout(() => {
      if (typeof window !== "undefined") {
        const user = localStorage.getItem("currentUser");
        setIsLoggedIn(!!user);

        const savedPurchases = localStorage.getItem('purchasedCourses');
        if (savedPurchases) {
            const purchasedList = JSON.parse(savedPurchases);
            if (purchasedList.includes(CURRENT_COURSE_ID)) {
                setHasPurchased(true);
            }
        }
      }
    }, 0);
    return () => clearTimeout(checkAuth);
  }, []);

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
    const videosToShow = isExpanded ? courseVideos : courseVideos.slice(0, 3);

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
                <p>Roblox Studio untuk Prototyping Game</p>
            </div>

            <div className="detail-content-wrapper">
                <div className="course-text-info">
                <h2>Roblox Studio untuk Prototyping Game [2025]</h2>
                <p className="course-description">
                    Belajar membuat game pertamamu di platform Roblox. Mulai dari desain level, scripting dasar dengan Lua, hingga publikasi. 
                    Kursus ini dirancang untuk pemula absolut.
                </p>
                </div>
                <div className="course-media-placeholder">
                <Image
                    src="/Roblox.jpg"
                    alt="Roblox Studio Game Prototyping"
                    width={800}
                    height={450}
                    style={{ width: "100%", height: "auto" }}
                />
                </div>
            </div>

            <div className="course-meta-info">
                <span>Instruktur: Darius</span>
                <span>Waktu Total: 31 menit</span>
                <span>Rilis: 15 Januari 2025</span>
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
                  <li>Menguasai navigasi dan antarmuka Roblox Studio.</li>
                  <li>Dasar membangun dunia game & terrain editor.</li>
                  <li>Scripting fundamental menggunakan Lua.</li>
                  <li>Menerbitkan game ke platform Roblox.</li>
                </ul>
              </div>

              <div className="skills-acquired">
                <h2>Keahlian yang akan Anda dapatkan:</h2>
                <div className="skills-tags">
                  <span className="skill-tag">Game Prototyping</span>
                  <span className="skill-tag">Level Design</span>
                  <span className="skill-tag">Lua Scripting</span>
                  <span className="skill-tag">3D Environment</span>
                </div>
              </div>

              <div className="course-content-section" id="kursus">
                <div className="course-content-header">
                  <div className="header-text">
                    <h2>Konten Kursus:</h2>
                    <p>{courseVideos.length} Video - Total 31 menit</p>
                  </div>
                  {!hasPurchased && <span className="promo-btn">Semua Video Gratis!</span>}
                </div>

                <div className="video-list-container">
                  {!isLoggedIn && (
                    <div className="alert alert-warning mb-3 text-center" role="alert">
                      <i className="fas fa-exclamation-circle me-2"></i>
                      Silakan <Link href="/login" className="fw-bold text-dark text-decoration-underline">Login</Link> untuk mengakses video.
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
                  <li>Komputer/Laptop yang mampu menjalankan Roblox Studio.</li>
                  <li>Akun Roblox (Gratis).</li>
                  <li>Koneksi Internet stabil.</li>
                </ul>
              </div>
            </div>

            <aside className="purchase-sidebar">
              <div className="purchase-box">
                {hasPurchased ? (
                    <div className="alert alert-success fw-bold text-center">
                        <i className="fas fa-check-circle me-2 mb-2" style={{fontSize: '2rem'}}></i><br/>
                        Anda sudah terdaftar. <br/>
                        <span className="fw-normal small">Silakan akses materi di samping.</span>
                    </div>
                ) : (
                    <>
                        <h2>Daftar Kursus</h2>
                        <p className="price">Gratis</p>
                        <p className="student-count">
                        <i className="fas fa-fire me-2" style={{color: 'var(--primary-orange)'}}></i>
                        <span>783 Pelajar sudah mendaftar</span>
                        </p>
                        <div className="action-buttons">
                        <Link href={`/pembayaran?id=${CURRENT_COURSE_ID}`} className="btn-purchase primary">
                            Daftar Sekarang
                        </Link>
                        </div>
                    </>
                )}
                
                <div className="includes-section">
                  <p>Sudah termasuk:</p>
                  <ul>
                    <li><i className="fas fa-circle-play me-2"></i> {courseVideos.length} Video Pembelajaran</li>
                    <li><i className="fas fa-infinity me-2"></i> Akses Selamanya</li>
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