// app/page.tsx
"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";


export default function HomePage() {
  const [contactMessage, setContactMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const isValidPhone = (phone: string): boolean => {
    return /^08\d{8,14}$/.test(phone);
  };

  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string).trim();
    const phone = (formData.get("phone") as string).trim();
    const subject = (formData.get("subject") as string).trim();
    const message = (formData.get("message") as string).trim();

    if (!name || !phone || !subject || !message) {
      setContactMessage({ text: "Harap isi semua field", type: "error" });
      return;
    }

    if (!isValidPhone(phone)) {
      setContactMessage({
        text: "Nomor handphone harus dimulai dengan 08 dan terdiri dari 10-16 digit",
        type: "error",
      });
      return;
    }

    setContactMessage({
      text: "Pesan Anda berhasil dikirim. Tim kami akan segera menghubungi Anda.",
      type: "success",
    });
    e.currentTarget.reset();
    setTimeout(() => setContactMessage(null), 5000);
  };

  return (
    <div className="py-4">
      <main className="container">
        
        {/* === HERO SECTION === */}
        <section className="main-card-wrapper p-4 p-lg-5" id="hero">
          <div className="row align-items-center gy-4">
            <div className="col-12 col-lg-6 text-center text-lg-start">
              <h2 className="fw-bold mb-3 text-dark" style={{ fontSize: '2rem' }}>
                Saatnya Membangun Masa Depan Pengalaman Anda
              </h2>
              <p className="text-secondary mb-4" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                Belajar keahlian yang paling dicari bersama para mitra dan institusi terbaik.
              </p>
            </div>
            <div className="col-12 col-lg-6 d-flex justify-content-center justify-content-lg-end">
              <div className="position-relative bg-dark rounded-4 shadow d-flex align-items-center justify-content-center" 
                   style={{ width: '100%', maxWidth: '320px', height: '200px', cursor: 'pointer', transition: 'transform 0.3s ease' }}
                   onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                   onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <a href="https://youtube.com/watch?v=..." target="_blank" rel="noopener noreferrer" className="text-decoration-none w-100 h-100 d-flex align-items-center justify-content-center">
                  <div className="text-white" style={{ fontSize: '3rem', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>▶</div>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* === COURSES SECTION === */}
        <section className="main-card-wrapper" id="courses">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3 text-dark" style={{ fontSize: '1.75rem' }}>Siap Menata Ulang Karier Anda?</h2>
            <p className="text-secondary">Berikut kursus yang siap membantu ada mencapai karir mu:</p>
          </div>

          <div className="row g-4 justify-content-center">
            {/* Course 1 */}
            <div className="col-12 col-md-6 col-lg-4">
              <a href="/DetailBlender.html" className="text-decoration-none">
                <div className="course-card h-100 d-block">
                  <div className="position-relative w-100" style={{ height: '180px' }}>
                    <Image src="/Blender.jpg" alt="Blender 3D" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className="course-info-bg">
                    <h5>Blender 3D Modelling [2020]</h5>
                    <p>Dengan Instruktur Darius</p>
                    <small>Beginner • 6 Video</small>
                  </div>
                </div>
              </a>
            </div>

            {/* Course 2 */}
            <div className="col-12 col-md-6 col-lg-4">
              <a href="/DetailAdobe.html" className="text-decoration-none">
                <div className="course-card h-100 d-block">
                  <div className="position-relative w-100" style={{ height: '180px' }}>
                    <Image src="/AdobeEA.jpeg" alt="Adobe After Effects" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className="course-info-bg">
                    <h5>Adobe After Effect [2020]</h5>
                    <p>Dengan Instruktur Darius</p>
                    <small>Beginner • 6 Video</small>
                  </div>
                </div>
              </a>
            </div>

            {/* Course 3 */}
            <div className="col-12 col-md-6 col-lg-4">
              <a href="/DetailStruktur.html" className="text-decoration-none">
                <div className="course-card h-100 d-block">
                  <div className="position-relative w-100" style={{ height: '180px' }}>
                    <Image src="/StrukturData.jpg" alt="Struktur Data" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className="course-info-bg">
                    <h5>Kuliah Struktur Data [2020]</h5>
                    <p>Dengan Instruktur Darius</p>
                    <small>Beginner • 6 Video</small>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div className="text-center mt-5">
            <Link href="/kursus" className="btn-custom-orange">
              Lebih Banyak...
            </Link>
          </div>
        </section>

        {/* === CONTACT SECTION === */}
        <section className="main-card-wrapper" id="contact">
          <div className="row g-5 align-items-start">
            
            {/* PERUBAHAN DISINI: Added ps-lg-5 ps-4 untuk geser teks ke kanan */}
            <div className="col-12 col-lg-6 ps-lg-5 ps-4">
              <h2 className="fw-bold mb-3 text-dark" style={{ fontSize: '1.75rem' }}>Hubungi Kami</h2>
              <p className="text-secondary">Kami siap membantu anda untuk menjawab pertanyaan.</p>
            </div>

            <div className="col-12 col-lg-6">
              <div className="contact-form-wrapper"> 
                <h3 className="fw-bold mb-4 text-center fs-5">Kirim Pertanyaan</h3>
                <form id="contactForm" onSubmit={handleContactSubmit}>
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <input type="text" name="name" className="form-control contact-input" placeholder="Nama Lengkap" required />
                    </div>
                    <div className="col-md-6">
                      <input type="text" name="phone" className="form-control contact-input" placeholder="Nomor Telepon" required />
                    </div>
                  </div>
                  <div className="mb-3">
                    <input type="text" name="subject" className="form-control contact-input" placeholder="Pilih Topik Pertanyaan" required />
                  </div>
                  <div className="mb-3">
                    <textarea name="message" className="form-control contact-input" placeholder="Pesan" rows={4} required></textarea>
                  </div>
                  {contactMessage && (
                    <div className={`alert ${contactMessage.type === 'success' ? 'alert-success' : 'alert-danger'} mb-3 py-2 fs-6`} role="alert">
                      {contactMessage.text}
                    </div>
                  )}
                  <button type="submit" className="submit-btn-custom mt-2">
                    Kirim
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}