"use client";

import { useState, FormEvent } from "react";
import "./styles/home.css";
import Header from '@/app/components/Header'


export default function HomePage() {
  const [contactMessage, setContactMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  // Validasi nomor HP: harus mulai dengan 08 dan panjang 10–16 digit
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

    setTimeout(() => {
      setContactMessage(null);
    }, 5000);
  };

  return (
    <>

      {/* Wrapper khusus halaman home supaya CSS-nya ter-scope */}
      <div className="home-page">
        <main className="main-content">
          {/* Hero Section */}
          <section className="hero-card" id="hero">
            <div className="hero-left">
              <h2>Saatnya Membangun Masa Depan Pengalaman Anda</h2>
              <p>
                Belajar keahlian yang paling dicari bersama para mitra dan institusi
                terbaik.
              </p>
            </div>
            <div className="hero-right">
              <div
                onClick={() => window.open("https://youtube.com/watch?v=...", "_blank")}
                className="video-link"
                style={{ cursor: "pointer" }}
              >
                <div className="video-placeholder" />
              </div>
            </div>
          </section>

          {/* Courses Section */}
          <section className="career-section" id="courses">
            <h2>Siap Menata Ulang Karier Anda?</h2>
            <p>Berikut kursus yang siap membantu ada mencapai karir mu:</p>

            <div className="courses-grid">
              <a
                href="/DetailBlender.html"
                target="_blank"
                rel="noopener noreferrer"
                className="course-card"
              >
                <div className="course-image">
                  <img src="/static/Blender.jpg" alt="Blender 3D" />
                </div>
                <div className="course-info">
                  <h3>Blender 3D Modelling [2020]</h3>
                  <p>Dengan Instruktur Darius</p>
                  <small>Beginner • 6 Video</small>
                </div>
              </a>

              <a
                href="/DetailAdobe.html"
                target="_blank"
                rel="noopener noreferrer"
                className="course-card"
              >
                <div className="course-image">
                  <img src="/static/AdobeEA.jpeg" alt="Adobe After Effects" />
                </div>
                <div className="course-info">
                  <h3>Adobe After Effect [2020]</h3>
                  <p>Dengan Instruktur Darius</p>
                  <small>Beginner • 6 Video</small>
                </div>
              </a>

              <a
                href="/DetailStruktur.html"
                target="_blank"
                rel="noopener noreferrer"
                className="course-card"
              >
                <div className="course-image">
                  <img src="/static/StrukturData.jpg" alt="Struktur Data" />
                </div>
                <div className="course-info">
                  <h3>Kuliah Struktur Data [2020]</h3>
                  <p>Dengan Instruktur Darius</p>
                  <small>Beginner • 6 Video</small>
                </div>
              </a>
            </div>

            <div className="more-courses">
              <a href="produkList.html" className="more-btn">
                Lebih Banyak...
              </a>
            </div>
          </section>

          {/* Contact Section */}
          <section className="contact-section" id="contact">
            <div className="contact-left">
              <h2>Hubungi Kami</h2>
              <p>Kami siap membantu anda untuk menjawab pertanyaan.</p>
            </div>

            <div className="contact-right">
              <div className="contact-form">
                <h3>Kirim Pertanyaan</h3>
                <form id="contactForm" onSubmit={handleContactSubmit}>
                  <div className="form-row">
                    <input type="text" name="name" placeholder="Nama Lengkap" required />
                    <input
                      type="text"
                      name="phone"
                      placeholder="Nomor Telepon"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Pilih Topik Pertanyaan"
                    required
                  />
                  <textarea name="message" placeholder="Pesan" rows={4} required />

                  {contactMessage && (
                    <div className={`form-message ${contactMessage.type}`}>
                      {contactMessage.text}
                    </div>
                  )}

                  <button type="submit" className="submit-btn">
                    Kirim
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
