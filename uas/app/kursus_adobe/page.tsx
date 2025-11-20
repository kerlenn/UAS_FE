// uas/app/kursus/adobe-after-effects/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./detail.css";

export default function DetailAdobePage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("manfaat"); 
  const pathname = usePathname(); 

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

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
                    grafis gerak tercanggih di pasar multimedia saat ini. Dengan
                    serangkaian fitur terbaru yang ditambahkan ke platform andalan
                    ini, hadir pula serangkaian fitur yang bertujuan untuk
                    menciptakan alur kerja yang lebih efisien. Membuat konten yang
                    bermakna untuk berbagai format tujuan kini semakin mudah.
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

                {/* STICKY NAV */}
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
                  <li>
                    Menguasai teknik-teknik praktis dan modern yang digunakan
                    oleh para profesional motion graphics dalam pekerjaan mereka
                    sehari-hari.
                  </li>
                  <li>
                    Mempelajari tools, panel, dan fitur-fitur esensial yang
                    dipakai animator profesional, termasuk layers, keyframes,
                    efek, dan masking.
                  </li>
                  <li>
                    Menerapkan keahlian baru Anda pada proyek-proyek dunia nyata
                    dan membangun portofolio motion graphics yang kuat.
                  </li>
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
                  <span className="skill-tag">Masking</span>
                  <span className="skill-tag">Rendering</span>
                  <span className="skill-tag">Keyframe Animation</span>
                  <span className="skill-tag">Motion Tracking</span>
                  <span className="skill-tag">Tipografi Kinetik</span>
                  <span className="skill-tag">Visual Storytelling</span>
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
                      <a href="https://www.youtube.com/watch?v=n3pQoPflhF0" target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-play-circle me-2"></i>
                        <span className="video-title">Import & Play Video - Tutorial After Effects</span>
                        <span className="video-label">Gratis</span>
                        <span className="video-duration">06:44</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.youtube.com/watch?v=Z4sm8UObRxc" target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-play-circle me-2"></i>
                        <span className="video-title">Main Efek - Tutorial After Effects</span>
                        <span className="video-label">Gratis</span>
                        <span className="video-duration">05:57</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.youtube.com/watch?v=GOz38pr3Cbw" target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-play-circle me-2"></i>
                        <span className="video-title">Ganti Warna Pakaian - Tutorial After Effects</span>
                        <span className="video-duration">05:13</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.youtube.com/watch?v=1-ke7XeMgIk" target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-play-circle me-2"></i>
                        <span className="video-title">Time Vary Animation Untuk Objek & Efek</span>
                        <span className="video-duration">10:31</span>
                      </a>
                    </li>

                    {isExpanded && (
                      <>
                        <li>
                          <a href="https://www.youtube.com/watch?v=87xmhun_2GM" target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-play-circle me-2"></i>
                            <span className="video-title">Green Screen Mudah - Tutorial After Effects</span>
                            <span className="video-duration">03:04</span>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.youtube.com/watch?v=C8n0sBkpjVc" target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-play-circle me-2"></i>
                            <span className="video-title">Manipulasi Waktu, Slow Motion, Stop Time & Reverse</span>
                            <span className="video-duration">03:52</span>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.youtube.com/watch?v=tP2GYEvBJlo" target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-play-circle me-2"></i>
                            <span className="video-title">Motion Tracking - Tutorial After Effects</span>
                            <span className="video-duration">07:02</span>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.youtube.com/watch?v=PdgiQPtq-G4" target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-play-circle me-2"></i>
                            <span className="video-title">Camera Tracking - Tutorial After Effects</span>
                            <span className="video-duration">06:04</span>
                          </a>
                        </li>
                        <li>
                          <a href="https://www.youtube.com/watch?v=j19XQ8bAhPI" target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-play-circle me-2"></i>
                            <span className="video-title">Parallax Effect, 2.5D dan Animasi Puppet</span>
                            <span className="video-duration">09:44</span>
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
                  <li>
                    Tidak dibutuhkan pengalaman di bidang desain atau animasi.
                    Kursus ini dirancang khusus untuk pemula dan semua materi akan
                    diajarkan dari nol.
                  </li>
                  <li>
                    Komputer PC (64-bit) dengan koneksi internet. Sangat
                    disarankan memiliki RAM minimal 16GB agar software berjalan
                    dengan lancar.
                  </li>
                  <li>
                    Software Adobe After Effects sudah terinstal. Anda bisa
                    memanfaatkan versi uji coba (free trial) gratis yang resmi
                    dari Adobe untuk memulai kursus ini.
                  </li>
                  <li>
                    Kemauan dan semangat yang tinggi untuk belajar dan berkreasi!
                  </li>
                </ul>
              </div>
            </div>

            <aside className="purchase-sidebar">
              <div className="purchase-box">
                <h2>Beli Kursus</h2>
                <p className="price">Rp 120.000</p>
                <p className="student-count">
                  <i className="fas fa-fire me-2" style={{color: 'var(--primary-orange)'}}></i>
                  <span>458 Pelajar sudah mendaftar</span>
                </p>
                <div className="action-buttons">
                  <Link href="/pembayaran" className="btn-purchase primary">
                    Beli Langsung
                  </Link>
                  <Link href="#" className="btn-purchase secondary">
                    Tambah Keranjang
                  </Link>
                </div>
                <div className="includes-section">
                  <p>Sudah termasuk:</p>
                  <ul>
                    <li>
                      <i className="fas fa-circle-play me-2"></i> 9 Video Pembelajaran
                    </li>
                    <li>
                      <i className="fas fa-infinity me-2"></i> Akses Selamanya
                    </li>
                    <li>
                      <i className="fas fa-file-arrow-down me-2"></i> File Aset
                    </li>
                    <li>
                      <i className="fas fa-trophy me-2"></i> Sertifikat Penyelesaian
                    </li>
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