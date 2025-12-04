"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "../styles/course-detail.css";

const CURRENT_COURSE_ID = 4; 

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
                <Link href="/">← Home</Link> <span>&gt;</span> <Link href="/kursus">Kursus</Link> <span>&gt;</span> <p>Blender 3D Modelling [2020]</p>
            </div>
            <div className="detail-content-wrapper">
                <div className="course-text-info">
                <h2>Blender 3D Modelling [2020]</h2>
                <p className="course-description">
                  Ciptakan model 3D yang menakjubkan dari nol. Pelajari teknik-teknik sculpting, texturing, dan rendering di Blender untuk kebutuhan game asset atau animasi.
                </p>
                </div>
                <div className="course-media-placeholder">
                <Image src="/Blender.jpg" alt="Blender 3D" width={800} height={450} style={{ width: "100%", height: "auto" }} />
                </div>
            </div>
            <div className="course-meta-info">
                <span>Instruktur: Darius</span>
                <span>Level: Intermediate</span>
                <span>Video: 9 Modul</span>
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
                  <li>Menguasai tools dasar Blender.</li>
                  <li>Membuat model 3D Hard Surface dan Organic.</li>
                  <li>Memahami Material dan Shading Nodes.</li>
                  <li>Teknik Lighting untuk presentasi produk.</li>
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
                  <li>Mouse dengan 3 tombol (Scroll wheel).</li>
                  <li>Laptop/PC dengan RAM minimal 8GB disarankan.</li>
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
                        <p className="price">Rp 50.000</p>
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