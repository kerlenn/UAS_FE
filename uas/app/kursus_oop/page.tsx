"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import "../styles/course-detail.css";

const CURRENT_COURSE_ID = 5; 

const courseVideos = [
  { title: "Tutorial Menggunakan Oracle Academy Dari Sisi Learner Mahasiswa atau Pelajar", url: "https://youtu.be/OaO26DDkUrg?si=Y8zmAl8_egm-wI3D", duration: "08:23", isFree: true },
  { title: "Membedakan Object Oriented dengan Sequential Programming - Belajar OOP Dengan Java", url: "https://youtu.be/sxYlPsOUdms?si=mj4Mq_n4qrwwVfwh", duration: "07:53", isFree: true },
  { title: "Greenfoot & Class Structure Method - Belajar OOP dengan Java", url: "https://youtu.be/upGTvTP7G9U?si=s7hcmtKGjtjhbjbE", duration: "09:00", isFree: false },
  { title: "Object VS Class with Wombat - Belajar OOP dengan Java", url: "https://youtu.be/OCLiTqCTufU?si=q1LijIRk72fL2XRI", duration: "09:45", isFree: false },
  { title: "Install JDK, Compile & Run Java dengan CMD Command Prompt - Belajar OOP dengan Java", url: "https://youtu.be/323Xx7-yQa0?si=04JLhW0ld0pHR9Z3", duration: "11:14", isFree: false },
  { title: "Overloading, This & Javadoc - Belajar OOP dengan Java", url: "https://youtu.be/GypRwMZWQUQ?si=FaxSBbrFy5nXOsNc", duration: "07:11", isFree: false },
  { title: "Apa itu Static? - Belajar OOP dengan Java", url: "https://youtu.be/NZ6UdEwa3KA?si=NlLTrkbNd3KmZzSv", duration: "03:48", isFree: false },
  { title: "Penggunaan OverRiding - Belajar OOP dengan Java", url: "https://youtu.be/RS55hmY_vxA?si=3Gly-NdBClRR8gbr", duration: "04:36", isFree: false },
  { title: "Abstract & Interface - Belajar OOP dengan Java", url: "https://youtu.be/YBIfd2zf0XE?si=cVtd4bShMG4CVrdq", duration: "07:43", isFree: false },
  { title: "Pengenalan Eclipse", url: "https://youtu.be/H8_NzE1pmp4?si=42NhFjEwKsSSJy6o", duration: "08:42", isFree: false },
];

export default function DetailOOPPage() {
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
                <Link href="/">← Home</Link> <span>&gt;</span> <Link href="/kursus">Kursus</Link> <span>&gt;</span> <p>Object Oriented Programming [2020]</p>
            </div>
            <div className="detail-content-wrapper">
                <div className="course-text-info">
                <h2>Object Oriented Programming [2020]</h2>
                <p className="course-description">
                  Pahami pilar-pilar OOP (Encapsulation, Inheritance, Polymorphism) untuk menulis kode yang lebih bersih, modular, dan reusable dalam proyek skala besar.
                </p>
                </div>
                <div className="course-media-placeholder">
                <Image src="/OOP.jpg" alt="OOP" width={800} height={450} style={{ width: "100%", height: "auto" }} />
                </div>
            </div>
            <div className="course-meta-info">
                <span>Instruktur: Darius</span>
                <span>Level: Professional</span>
                <span>Video: 10 Modul</span>
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
                  <li>Konsep Class dan Object.</li>
                  <li>Implementasi Inheritance dan Polymorphism.</li>
                  <li>Prinsip DRY (Don't Repeat Yourself).</li>
                  <li>Membuat kode yang mudah dirawat (Maintainable).</li>
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
                  <li>Menguasai dasar pemrograman prosedural.</li>
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
                        <p className="price">Rp 120.000</p>
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