// uas/app/kursus_data_struktur/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../styles/course-detail.css";

export default function DetailDataStrukturPage() {
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
                <p>Struktur Data [2020]</p>
            </div>

            <div className="detail-content-wrapper">
                <div className="course-text-info">
                <h2>Kuliah Struktur Data [2020]</h2>
                <p className="course-description">
                    Struktur data adalah fondasi dari ilmu komputer modern dan merupakan komponen inti dalam rekayasa perangkat lunak yang efisien. Dengan memahami bagaimana cara menyimpan, mengatur, dan mengelola data secara efektif, seorang pengembang dapat merancang algoritma yang lebih cepat dan solusi yang lebih optimal. Menguasai konsep fundamental seperti array, linked list, stack, dan tree akan membuka jalan untuk membangun aplikasi yang kuat dan berskala besar.
                </p>
                </div>
                <div className="course-media-placeholder">
                <Image
                    src="/StrukturData.jpg"
                    alt="Struktur Data"
                    width={800}
                    height={450}
                    style={{ width: "100%", height: "auto" }}
                />
                </div>
            </div>

            <div className="course-meta-info">
                <span>Instruktur: Darius</span>
                <span>Waktu Total: 1 jam 10 menit</span>
                <span>Rilis: 25 November 2020</span>
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
                    Memahami konsep dasar dan pentingnya struktur data dalam pemrograman yang efisien.
                  </li>
                  <li>
                    Mempelajari implementasi Array, termasuk penggunaan Array di dalam Structure untuk mengelola data yang kompleks.
                  </li>
                  <li>
                    Menguasai konsep struktur data non-linear seperti Tree, Binary Tree, dan Graph serta aplikasinya dalam menyelesaikan masalah.
                  </li>
                  <li>
                    Membangun fondasi yang kuat untuk mempelajari algoritma dan struktur data tingkat lanjut.
                  </li>
                </ul>
              </div>

              <div className="skills-acquired">
                <h2>Keahlian yang akan Anda dapatkan:</h2>
                <div className="skills-tags">
                  <span className="skill-tag">Analisis Algoritma</span>
                  <span className="skill-tag">Struktur Data</span>
                  <span className="skill-tag">Manajemen Memori</span>
                  <span className="skill-tag">Problem Solving</span>
                  <span className="skill-tag">Array & Linked List</span>
                  <span className="skill-tag">Stack & Queue</span>
                  <span className="skill-tag">Trees & Graphs</span>
                  <span className="skill-tag">Hash Tables</span>
                  <span className="skill-tag">Kompleksitas Waktu (Big O)</span>
                  <span className="skill-tag">Rekursi</span>
                  <span className="skill-tag">Optimasi Kode</span>
                  <span className="skill-tag">Dasar C++</span>
                </div>
              </div>

              <div className="course-content-section" id="kursus">
                <div className="course-content-header">
                  <div className="header-text">
                    <h2>Konten Kursus:</h2>
                    <p>13 Video - Total 1 jam 10 menit</p>
                  </div>
                  <span className="promo-btn">Dua Video Pertama Gratis!</span>
                </div>

                <div className="video-list-container">
                  <ul className="video-list">
                    <li>
                      <a href="https://youtu.be/RoKfhtE2G6c?si=VZ1XG8UyOwp0oi-c" target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-play-circle me-2"></i>
                        <span className="video-title">Stack - Struktur Data</span>
                        <span className="video-label">Gratis</span>
                        <span className="video-duration">07:16</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://youtu.be/GC3jA6Cym1E?si=4zavVRDqhFNtbE-c" target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-play-circle me-2"></i>
                        <span className="video-title">Queue - Struktur Data</span>
                        <span className="video-label">Gratis</span>
                        <span className="video-duration">06:23</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://youtu.be/M9i_-UVpRmE?si=IwMe7Ag7I-hRnGZf" target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-play-circle me-2"></i>
                        <span className="video-title">Hash - Struktur Data</span>
                        <span className="video-duration">08:29</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://youtu.be/uX1HmvKbaU8?si=RBlEK47GN-4D3mlZ" target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-play-circle me-2"></i>
                        <span className="video-title">Binary Search Tree - Struktur Data</span>
                        <span className="video-duration">03:13</span>
                      </a>
                    </li>

                    {isExpanded && (
                      <>
                        <li>
                          <a href="https://youtu.be/4eBfmPa4124?si=3O0dVxkOwVZCcgBg" target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-play-circle me-2"></i>
                            <span className="video-title">Tree Travelsal - Struktur Data</span>
                            <span className="video-duration">05:35</span>
                          </a>
                        </li>
                        <li>
                          <a href="https://youtu.be/d5C1MqDZDZQ?si=vkbk_fKQlSv7ZQNL" target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-play-circle me-2"></i>
                            <span className="video-title">Avl Tree - Struktur Data</span>
                            <span className="video-duration">04:47</span>
                          </a>
                        </li>
                        <li>
                          <a href="https://youtu.be/_gq_t5byFcU?si=QhpFe2NB315erjpr" target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-play-circle me-2"></i>
                            <span className="video-title">Heap - Struktur Data</span>
                            <span className="video-duration">02:49</span>
                          </a>
                        </li>
                        <li>
                          <a href="https://youtu.be/9PR8tl3KspQ?si=4HEwQ-i6423V1_Nx" target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-play-circle me-2"></i>
                            <span className="video-title">Huffman Code - Struktur Data</span>
                            <span className="video-duration">03:03</span>
                          </a>
                        </li>
                        <li>
                          <a href="https://youtu.be/xtcna3thBYI?si=iuyru-fpBU4Qz011" target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-play-circle me-2"></i>
                            <span className="video-title">Graph BFS & DFS - Struktur Data</span>
                            <span className="video-duration">06:48</span>
                          </a>
                        </li>
                        <li>
                          <a href="https://youtu.be/sX7x54uyPzY?si=6F1bDumVr7qmPlXf" target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-play-circle me-2"></i>
                            <span className="video-title">Algoritma Dijikstra Graph - Struktur Data</span>
                            <span className="video-duration">07:31</span>
                          </a>
                        </li>
                        <li>
                          <a href="https://youtu.be/MgdeDVP2CvU?si=gWmoF_i76J6FMq-4" target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-play-circle me-2"></i>
                            <span className="video-title">Minimum Spanning Tree - Struktur Data</span>
                            <span className="video-duration">04:22</span>
                          </a>
                        </li>
                        <li>
                          <a href="https://youtu.be/455nDoUvbw4?si=6-ej9u5UN7ewwcQW" target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-play-circle me-2"></i>
                            <span className="video-title">Topological Ordering Sort - Struktur Data</span>
                            <span className="video-duration">03:01</span>
                          </a>
                        </li>
                        <li>
                          <a href="https://youtu.be/LrQUQCjkFJ0?si=xktj98NSGzRFojQR" target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-play-circle me-2"></i>
                            <span className="video-title">Critical Path Analysis Pada Task Network - Struktur Data</span>
                            <span className="video-duration">05:44</span>
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
                    Memiliki pemahaman dasar tentang logika pemrograman. Pengalaman dengan bahasa C++ akan sangat membantu, meskipun konsepnya dapat diterapkan ke bahasa lain.
                  </li>
                  <li>
                    Komputer atau laptop dengan koneksi internet untuk mengakses video dan materi pembelajaran.
                  </li>
                  <li>
                    Sebuah code editor (seperti Visual Studio Code, Sublime Text, dll.) dan compiler C++ yang sudah terinstal untuk dapat mengikuti dan mencoba langsung contoh-contoh kode.
                  </li>
                  <li>
                    Keinginan kuat untuk memecahkan masalah, berpikir secara logis, dan memahami bagaimana cara menulis kode yang efisien.
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
                      <i className="fas fa-circle-play me-2"></i> 13 Video Pembelajaran
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