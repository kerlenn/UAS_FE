"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "../styles/course-detail.css";

const CURRENT_COURSE_ID = 1; 

const courseVideos = [
  { title: "Import & Play Video - Tutorial After Effects", url: "https://www.youtube.com/watch?v=n3pQoPflhF0", duration: "06:44", isFree: true },
  { title: "Main Efek - Tutorial After Effects", url: "https://www.youtube.com/watch?v=Z4sm8UObRxc", duration: "05:57", isFree: true },
  { title: "Ganti Warna Pakaian - Tutorial After Effects", url: "https://www.youtube.com/watch?v=GOz38pr3Cbw", duration: "05:13", isFree: false },
  { title: "Time Vary Animation Untuk Objek & Efek", url: "https://www.youtube.com/watch?v=1-ke7XeMgIk", duration: "10:31", isFree: false },
  { title: "Green Screen Mudah - Tutorial After Effects", url: "https://www.youtube.com/watch?v=87xmhun_2GM", duration: "03:04", isFree: false },
  { title: "Manipulasi Waktu, Slow Motion, Stop Time & Reverse", url: "https://www.youtube.com/watch?v=C8n0sBkpjVc", duration: "03:52", isFree: false },
  { title: "Motion Tracking - Tutorial After Effects", url: "https://www.youtube.com/watch?v=tP2GYEvBJlo", duration: "07:02", isFree: false },
  { title: "Camera Tracking - Tutorial After Effects", url: "https://www.youtube.com/watch?v=PdgiQPtq-G4", duration: "06:04", isFree: false },
  { title: "Parallax Effect, 2.5D dan Animasi Puppet", url: "https://www.youtube.com/watch?v=j19XQ8bAhPI", duration: "09:44", isFree: false },
];

export default function DetailAdobePage() {
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
    const videosToShow = isExpanded ? courseVideos : courseVideos.slice(0, 4);

    return videosToShow.map((video, index) => {
      const isAccessible = isLoggedIn && (video.isFree || hasPurchased);

      let statusBadge;
      if (!isLoggedIn) {
        statusBadge = <span className="badge bg-warning text-dark ms-auto">Login</span>;
      } else if (!isAccessible) {
        statusBadge = <span className="badge bg-secondary ms-auto">Premium</span>; // Terkunci
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
                <p>Adobe After Effects [2020]</p>
            </div>

            <div className="detail-content-wrapper">
                <div className="course-text-info">
                <h2>Adobe After Effects [2020]</h2>
                <p className="course-description">
                    Adobe After Effects 2020 adalah salah satu platform pengeditan
                    grafis gerak tercanggih di pasar multimedia saat ini.
                </p>
                </div>
                <div className="course-media-placeholder">
                <Image
                    src="/AdobeEA.jpeg"
                    alt="adobe after Effect"
                    width={800}
                    height={450}
                    style={{ width: "100%", height: "auto" }}
                />
                </div>
            </div>

            <div className="course-meta-info">
                <span>Instruktur: Darius</span>
                <span>Waktu Total: 58 menit</span>
                <span>Rilis: 20 Juni 2020</span>
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
                  <li>Menguasai teknik-teknik praktis dan modern.</li>
                  <li>Mempelajari tools, panel, dan fitur-fitur esensial.</li>
                  <li>Menerapkan keahlian baru pada proyek dunia nyata.</li>
                </ul>
              </div>

              <div className="skills-acquired">
                <h2>Keahlian yang akan Anda dapatkan:</h2>
                <div className="skills-tags">
                  <span className="skill-tag">Motion Graphics</span>
                  <span className="skill-tag">Komposisi Video</span>
                  <span className="skill-tag">Green Screen</span>
                  <span className="skill-tag">Color Grading</span>
                  <span className="skill-tag">Animasi 2D</span>
                  <span className="skill-tag">Efek Visual (VFX)</span>
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
                  <li>Tidak dibutuhkan pengalaman di bidang desain atau animasi.</li>
                  <li>Komputer PC (64-bit) dengan koneksi internet.</li>
                  <li>Software Adobe After Effects sudah terinstal.</li>
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
                        <p className="price">Rp 120.000</p>
                        <p className="student-count">
                        <i className="fas fa-fire me-2" style={{color: 'var(--primary-orange)'}}></i>
                        <span>458 Pelajar sudah mendaftar</span>
                        </p>
                        <div className="action-buttons">
                        <Link href={`/pembayaran?id=${CURRENT_COURSE_ID}`} className="btn-purchase primary">
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