"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "../styles/course-detail.css";

const CURRENT_COURSE_ID = 2; 

const courseVideos = [
  { title: "Stack - Struktur Data", url: "https://youtu.be/RoKfhtE2G6c?si=VZ1XG8UyOwp0oi-c", duration: "07:16", isFree: true },
  { title: "Queue - Struktur Data", url: "https://youtu.be/GC3jA6Cym1E?si=4zavVRDqhFNtbE-c", duration: "06:23", isFree: true },
  { title: "Hash - Struktur Data", url: "https://youtu.be/M9i_-UVpRmE?si=IwMe7Ag7I-hRnGZf", duration: "08:29", isFree: false },
  { title: "Binary Search Tree - Struktur Data", url: "https://youtu.be/uX1HmvKbaU8?si=RBlEK47GN-4D3mlZ", duration: "03:13", isFree: false },
  { title: "Tree Travelsal - Struktur Data", url: "https://youtu.be/4eBfmPa4124?si=3O0dVxkOwVZCcgBg", duration: "05:35", isFree: false },
  { title: "Avl Tree - Struktur Data", url: "https://youtu.be/d5C1MqDZDZQ?si=vkbk_fKQlSv7ZQNL", duration: "04:47", isFree: false },
  { title: "Heap - Struktur Data", url: "https://youtu.be/_gq_t5byFcU?si=QhpFe2NB315erjpr", duration: "02:49", isFree: false },
  { title: "Huffman Code - Struktur Data", url: "https://youtu.be/9PR8tl3KspQ?si=4HEwQ-i6423V1_Nx", duration: "03:03", isFree: false },
  { title: "Graph BFS & DFS - Struktur Data", url: "https://youtu.be/xtcna3thBYI?si=iuyru-fpBU4Qz011", duration: "06:48", isFree: false },
  { title: "Algoritma Dijikstra Graph - Struktur Data", url: "https://youtu.be/sX7x54uyPzY?si=6F1bDumVr7qmPlXf", duration: "07:31", isFree: false },
  { title: "Minimum Spanning Tree - Struktur Data", url: "https://youtu.be/MgdeDVP2CvU?si=gWmoF_i76J6FMq-4", duration: "04:22", isFree: false },
  { title: "Topological Ordering Sort - Struktur Data", url: "https://youtu.be/455nDoUvbw4?si=6-ej9u5UN7ewwcQW", duration: "03:01", isFree: false },
  { title: "Critical Path Analysis Pada Task Network", url: "https://youtu.be/LrQUQCjkFJ0?si=xktj98NSGzRFojQR", duration: "05:44", isFree: false },
];

export default function DetailDataStrukturPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("manfaat");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasPurchased, setHasPurchased] = useState(false); 

  const toggleExpand = () => setIsExpanded(!isExpanded);

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
        if (section && section.getBoundingClientRect().top <= 120) { 
            currentActive = sections[i];
            break;
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
      if (!isLoggedIn) statusBadge = <span className="badge bg-warning text-dark ms-auto">Login</span>;
      else if (!isAccessible) statusBadge = <span className="badge bg-secondary ms-auto">Premium</span>;
      else if (video.isFree) statusBadge = <span className="video-label ms-auto">Gratis</span>;
      else statusBadge = <span className="badge bg-success ms-auto">Terbuka</span>;

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
                <Link href="/">← Home</Link> <span>&gt;</span> <Link href="/kursus">Kursus</Link> <span>&gt;</span> <p>Kuliah Struktur Data [2020]</p>
            </div>
            <div className="detail-content-wrapper">
                <div className="course-text-info">
                <h2>Kuliah Struktur Data [2020]</h2>
                <p className="course-description">
                  Pelajari konsep fundamental struktur data seperti Array, Linked List, Stack, dan Queue untuk membangun algoritma yang efisien dan optimal.
                </p>
                </div>
                <div className="course-media-placeholder">
                <Image src="/StrukturData.jpg" alt="Struktur Data" width={800} height={450} style={{ width: "100%", height: "auto" }} />
                </div>
            </div>
            <div className="course-meta-info">
                <span>Instruktur: Darius</span>
                <span>Level: Intermediate</span>
                <span>Video: 13 Modul</span>
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
                  <li>Memahami konsep memori dan pointer.</li>
                  <li>Mengimplementasikan Stack, Queue, dan Linked List.</li>
                  <li>Memahami Tree dan Graph traversal.</li>
                  <li>Analisis kompleksitas algoritma dasar.</li>
                </ul>
              </div>

              <div className="course-content-section" id="kursus">
                <div className="course-content-header">
                  <div className="header-text">
                    <h2>Konten Kursus:</h2>
                    <p>{courseVideos.length} Video</p>
                  </div>
                </div>
                <div className="video-list-container">
                  {!isLoggedIn && <div className="alert alert-warning mb-3 text-center">Silakan <Link href="/login" className="fw-bold">Login</Link> untuk akses video.</div>}
                  <ul className="video-list">{renderVideoList()}</ul>
                  <button className="show-more-btn" onClick={toggleExpand}>
                    {isExpanded ? <>Lebih sedikit <i className="fas fa-chevron-up ms-1"></i></> : <>Lebih banyak <i className="fas fa-chevron-down ms-1"></i></>}
                  </button>
                </div>
              </div>

              <div className="requirements-section" id="syarat">
                <h2>Syarat:</h2>
                <ul>
                  <li>Pemahaman dasar algoritma dan pemrograman (C++ atau Java disarankan).</li>
                </ul>
              </div>
            </div>

            <aside className="purchase-sidebar">
              <div className="purchase-box">
                {hasPurchased ? (
                    <div className="alert alert-success fw-bold text-center">
                        <i className="fas fa-check-circle me-2 mb-2" style={{fontSize: '2rem'}}></i><br/>
                        Anda sudah membeli kursus ini.
                    </div>
                ) : (
                    <>
                        <h2>Beli Kursus</h2>
                        <p className="price">Rp 230.000</p>
                        <Link href={`/pembayaran?id=${CURRENT_COURSE_ID}`} className="btn-purchase primary">Beli Langsung</Link>
                    </>
                )}
                <div className="includes-section"><p>Sudah termasuk:</p><ul><li>Akses Selamanya</li><li>Sertifikat</li></ul></div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}