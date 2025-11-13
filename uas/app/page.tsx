// app/page.tsx
"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";

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
    <div className="py-5"> {/* Padding atas bawah untuk body */}
      <main className="container">
        
        {/* === HERO SECTION === */}
        {/* Menggunakan container-fluid agar lebih lebar mirip desain asli */}
        <section className="main-card-wrapper text-center p-5" id="hero">
          <div className="row justify-content-center">
            <div className="col-12"> {/* Gunakan col-12 agar full width di dalam kartu */}
              
              <h1 className="display-4 fw-bold mb-4 text-dark">
                Saatnya Membangun Masa Depan Pengalaman<br className="d-none d-md-block" /> Anda
              </h1>
              
              <p className="lead text-secondary mb-5 mx-auto" style={{ maxWidth: '800px' }}>
                Belajar keahlian yang paling dicari bersama para mitra dan institusi terbaik.
              </p>
              
              {/* Video Placeholder - Lebih Besar */}
              <div className="d-flex justify-content-center">
                <div className="ratio ratio-16x9 bg-dark rounded-4 shadow" style={{ maxWidth: '800px', width: '100%' }}>
                  <a
                    href="https://youtube.com/watch?v=..."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="d-flex align-items-center justify-content-center text-decoration-none h-100 w-100"
                  >
                    <div className="text-white text-center">
                      {/* Icon Play Bootstrap */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === COURSES SECTION === */}
        <section className="main-card-wrapper" id="courses">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Siap Menata Ulang Karier Anda?</h2>
            <p className="text-muted">Berikut kursus yang siap membantu ada mencapai karir mu:</p>
          </div>

          <div className="row g-4 justify-content-center">
            {/* Course 1 */}
            <div className="col-12 col-md-6 col-lg-4">
              <a href="/DetailBlender.html" className="text-decoration-none">
                <div className="card course-card h-100">
                  <div className="position-relative w-100" style={{ height: '200px' }}>
                    <Image 
                      src="/static/Blender.jpg" 
                      className="card-img-top" 
                      alt="Blender 3D" 
                      fill
                      style={{ objectFit: 'cover' }} 
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="card-body course-info-bg">
                    <h5 className="card-title fw-bold text-white">Blender 3D Modelling [2020]</h5>
                    <p className="card-text small text-white-50 mb-1">Dengan Instruktur Darius</p>
                    <small className="text-warning">Beginner • 6 Video</small>
                  </div>
                </div>
              </a>
            </div>

            {/* Course 2 */}
            <div className="col-12 col-md-6 col-lg-4">
              <a href="/DetailAdobe.html" className="text-decoration-none">
                <div className="card course-card h-100">
                  <div className="position-relative w-100" style={{ height: '200px' }}>
                    <Image 
                      src="/static/AdobeEA.jpeg" 
                      className="card-img-top" 
                      alt="Adobe After Effects"
                      fill
                      style={{ objectFit: 'cover' }} 
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="card-body course-info-bg">
                    <h5 className="card-title fw-bold text-white">Adobe After Effect [2020]</h5>
                    <p className="card-text small text-white-50 mb-1">Dengan Instruktur Darius</p>
                    <small className="text-warning">Beginner • 6 Video</small>
                  </div>
                </div>
              </a>
            </div>

            {/* Course 3 */}
            <div className="col-12 col-md-6 col-lg-4">
              <a href="/DetailStruktur.html" className="text-decoration-none">
                <div className="card course-card h-100">
                  <div className="position-relative w-100" style={{ height: '200px' }}>
                    <Image 
                      src="/static/StrukturData.jpg" 
                      className="card-img-top" 
                      alt="Struktur Data"
                      fill
                      style={{ objectFit: 'cover' }} 
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="card-body course-info-bg">
                    <h5 className="card-title fw-bold text-white">Kuliah Struktur Data [2020]</h5>
                    <p className="card-text small text-white-50 mb-1">Dengan Instruktur Darius</p>
                    <small className="text-warning">Beginner • 6 Video</small>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div className="text-center mt-5">
            <a href="produkList.html" className="btn-custom-orange">
              Lebih Banyak...
            </a>
          </div>
        </section>

        {/* === CONTACT SECTION === */}
        <section className="main-card-wrapper" id="contact">
          <div className="row g-5 align-items-start">
            {/* Contact Left */}
            <div className="col-12 col-md-5">
              <h2 className="fw-bold mb-3 text-dark">Hubungi Kami</h2>
              <p className="text-secondary">Kami siap membantu anda untuk menjawab pertanyaan.</p>
            </div>

            {/* Contact Right (Form) */}
            <div className="col-12 col-md-7">
              {/* Menggunakan card biasa untuk form agar terlihat rapi di dalam section putih */}
              <div className="p-2"> 
                <h3 className="fw-bold mb-4 text-dark">Kirim Pertanyaan</h3>
                <form id="contactForm" onSubmit={handleContactSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <input type="text" name="name" className="form-control form-control-lg bg-light border-0" placeholder="Nama Lengkap" required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <input type="text" name="phone" className="form-control form-control-lg bg-light border-0" placeholder="Nomor Telepon" required />
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <input type="text" name="subject" className="form-control form-control-lg bg-light border-0" placeholder="Pilih Topik Pertanyaan" required />
                  </div>
                  
                  <div className="mb-3">
                    <textarea name="message" className="form-control form-control-lg bg-light border-0" placeholder="Pesan" rows={4} required></textarea>
                  </div>

                  {contactMessage && (
                    <div className={`alert ${contactMessage.type === 'success' ? 'alert-success' : 'alert-danger'} mb-3`} role="alert">
                      {contactMessage.text}
                    </div>
                  )}

                  <button type="submit" className="btn-custom-orange border-0 w-100 py-3">
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