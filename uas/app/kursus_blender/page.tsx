"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "../styles/course-detail.css";

export default function DetailBlenderPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("manfaat");

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // ScrollSpy Effect untuk Sticky Nav
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['manfaat', 'kursus', 'syarat'];
      let currentActive = 'manfaat';

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          // 120px offset untuk kompensasi header sticky
          if (section.getBoundingClientRect().top <= 150) { 
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
                <p>Blender 3D Modeling [2021]</p>
            </div>

            <div className="detail-content-wrapper">
                <div className="course-text-info">
                <h2>Blender 3D Modeling [2021]</h2>
                <p className="course-description">
                    Blender 3D adalah salah satu platform kreasi 3D paling komprehensif yang tersedia di pasar kreatif saat ini. Sebagai software open-source yang didukung oleh komunitas global yang masif, Blender menawarkan rangkaian fitur canggih yang mencakup keseluruhan alur kerja 3D, mulai dari pemodelan, pematungan digital (sculpting), animasi, hingga rendering fotorealistis dengan engine Cycles dan real-time dengan Eevee.
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
                    <li>
                        <a href="#manfaat" className={activeSection === 'manfaat' ? 'active' : ''}>Manfaat</a>
                    </li>
                    <li>
                        <a href="#kursus" className={activeSection === 'kursus' ? 'active' : ''}>Kursus</a>
                    </li>
                    <li>
                        <a href="#syarat" className={activeSection === 'syarat' ? 'active' : ''}>Syarat</a>
                    </li>
                    </ul>
                </nav>

              <div className="learning-objectives" id="manfaat">
                <h2>Yang akan Anda pelajari:</h2>
                <ul>
                  <li>Menguasai dasar-dasar navigasi dan antarmuka (interface) di dalam Blender untuk alur kerja yang efisien.</li>
                  <li>Mempelajari teknik-teknik fundamental 3D modeling, mulai dari manipulasi objek dasar hingga penggunaan tool esensial seperti Extrude, Loop Cut, dan Bevel.</li>
                  <li>Memahami cara memberikan material, tekstur, dan warna pada objek 3D (Shading & UV Unwrapping) untuk menciptakan model yang realistis.</li>
                  <li>Menerapkan berbagai macam modifier non-destruktif untuk mempercepat proses modeling dan membuat bentuk yang kompleks.</li>
                  <li>Mendapatkan pengenalan dasar tentang rigging untuk mempersiapkan karakter 3D Anda agar dapat digerakkan dan diposekan.</li>
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
                  <span className="skill-tag">3D Animation</span>
                  <span className="skill-tag">Rigging Karakter</span>
                </div>
              </div>

              <div className="course-content-section" id="kursus">
                <div className="course-content-header">
                  <div className="header-text">
                    <h2>Konten Kursus:</h2>
                    <p>9 Video - Total 58 menit</p>
                  </div>
                  <span className="promo-btn">Dua Video Pertama Gratis!</span>
                </div>

                <div className="video-list-container">
                  <ul className="video-list">
                    <li>
                      <a href="https://youtu.be/_l7fshHOsPA?si=Tqy4otutfVb_Q4en" target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-play-circle me-2"></i>
                        <span className="video-title">User Interface - Blender 3D Modeling</span>
                        <span className="video-label">Gratis</span>
                        <span className="video-duration">05:50</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://youtu.be/7sJ_jO6NHxA?si=7dTy9ZlrhK_cOOxY" target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-play-circle me-2"></i>
                        <span className="video-title">Move, Rotate, Scale Object - Blender 3D Modelling</span>
                        <span className="video-label">Gratis</span>
                        <span className="video-duration">04:37</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://youtu.be/WBQEZwJAWrc?si=xQWkQbuU296-AWR9" target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-play-circle me-2"></i>
                        <span className="video-title">Edit Mode - Blender 3D Modeling</span>
                        <span className="video-duration">05:03</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://youtu.be/hsLD4XkMNO4?si=taCgOeDE5Hcn92N3" target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-play-circle me-2"></i>
                        <span className="video-title">Extrude - Blender 3D Modeling</span>
                        <span className="video-duration">05:10</span>
                      </a>
                    </li>

                    {isExpanded && (
                      <>
                        <li>
                          <a href="https://youtu.be/0G0Idtn8XlM?si=FQj_QCBzugS5WEyH" target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-play-circle me-2"></i>
                            <span className="video-title">Loop Cut & Delete - Blender 3D Modeling</span>
                            <span className="video-duration">05:23</span>
                          </a>
                        </li>
                        <li>
                          <a href="https://youtu.be/pbq0ExxuhCw?si=qowRM0dQcEwQwPA8" target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-play-circle me-2"></i>
                            <span className="video-title">Knife, Bisect & Bevel Tool</span>
                            <span className="video-duration">03:20</span>
                          </a>
                        </li>
                        <li>
                          <a href="https://youtu.be/R9C7chSsHEY?si=9jYtT_jWyQ9OhP0V" target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-play-circle me-2"></i>
                            <span className="video-title">Shading, Texturing & UV Unwrap</span>
                            <span className="video-duration">10:48</span>
                          </a>
                        </li>
                        <li>
                          <a href="https://youtu.be/gnngKZj13Yk?si=0TQLPak7IOvlLqjN" target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-play-circle me-2"></i>
                            <span className="video-title">Modifier: Mirror, Boolean, Simple Deform</span>
                            <span className="video-duration">07:11</span>
                          </a>
                        </li>
                        <li>
                          <a href="https://youtu.be/XWveG_boJdo?si=l1hh5t3X0Z7tApKT" target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-play-circle me-2"></i>
                            <span className="video-title">Basic Rigging & Posing</span>
                            <span className="video-duration">10:11</span>
                          </a>
                        </li>
                      </>
                    )}
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
                  <li>Disarankan menggunakan mouse dengan 3 tombol (termasuk scroll wheel) untuk navigasi yang optimal.</li>
                  <li>Software Blender sudah terinstal (Gratis dari blender.org).</li>
                  <li>Rasa ingin tahu dan kesabaran untuk belajar.</li>
                </ul>
              </div>
            </div>

            <aside className="purchase-sidebar">
              <div className="purchase-box">
                <h2>Beli Kursus</h2>
                <p className="price">Rp 50.000</p>
                <p className="student-count">
                  <i className="fas fa-fire me-2" style={{color: 'var(--primary-orange)'}}></i>
                  <span>458 Pelajar sudah mendaftar</span>
                </p>
                <div className="action-buttons">
                  <Link href="/pembayaran?id=4" className="btn-purchase primary">
                    Beli Langsung
                  </Link>
                  <Link href="#" className="btn-purchase secondary">
                    Tambah Keranjang
                  </Link>
                </div>
                <div className="includes-section">
                  <p>Sudah termasuk:</p>
                  <ul>
                    <li><i className="fas fa-circle-play me-2"></i> 9 Video Pembelajaran</li>
                    <li><i className="fas fa-infinity me-2"></i> Akses Selamanya</li>
                    <li><i className="fas fa-file-arrow-down me-2"></i> File Aset</li>
                    <li><i className="fas fa-trophy me-2"></i> Sertifikat Penyelesaian</li>
                  </ul>
                </div>
                <div className="share-link mt-3">
                  <i className="fas fa-share-nodes me-2"></i>
                  Bagikan Kursus Ini
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}