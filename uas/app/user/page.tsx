"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import '../styles/user.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { UserIcon } from '../components/UserIcon';

export default function UserPage() {
  const [formData, setFormData] = useState({
    namaLengkap: 'ker',
    email: 'k@gmail.com',
    noTelepon: '081234567890',
    feedback: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSimpanPerubahan = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Data disimpan:', formData);
    alert('Perubahan berhasil disimpan!');
  };

  const handleHapusAkun = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus akun? Tindakan ini tidak dapat dibatalkan.')) {
      console.log('Akun dihapus');
      alert('Akun berhasil dihapus');
    }
  };

  const handleKirimFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.feedback.trim()) {
      alert('Mohon isi feedback terlebih dahulu');
      return;
    }
    console.log('Feedback dikirim:', formData.feedback);
    alert('Feedback berhasil dikirim!');
    setFormData({ ...formData, feedback: '' });
  };

  return (
    <>
      <main className="user-page-container">
        <div className="container py-5">
          <div className="row g-4">
            
            {/* Kolom Kiri - Avatar & Feedback */}
            <div className="col-lg-5">
              
              {/* Avatar Card */}
              <div className="user-avatar-card">
                <div className="avatar-circle">
                  <UserIcon />
                </div>
              </div>

              {/* Feedback Card */}
              <div className="feedback-card">
                <h3 className="feedback-title">Feedback</h3>
                <form onSubmit={handleKirimFeedback}>
                  <textarea
                    name="feedback"
                    className="feedback-textarea"
                    placeholder="Tulis feedback Anda di sini..."
                    rows={6}
                    value={formData.feedback}
                    onChange={handleChange}
                  />
                  <button type="submit" className="btn-feedback-submit">
                    Kirim Feedback
                  </button>
                </form>
              </div>
            </div>

            {/* Kolom Kanan - Form Data User */}
            <div className="col-lg-7">
              <div className="user-form-card">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="form-card-title">Nama Lengkap</h2>
                  <button className="btn-back" onClick={() => window.history.back()}>
                    ← Kembali ke Beranda
                  </button>
                </div>

                <form onSubmit={handleSimpanPerubahan}>
                  
                  {/* Nama Lengkap */}
                  <div className="form-group-user">
                    <label className="form-label-user">Nama Lengkap</label>
                    <input
                      type="text"
                      name="namaLengkap"
                      className="form-input-user"
                      placeholder="ker"
                      value={formData.namaLengkap}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="form-group-user">
                    <label className="form-label-user">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-input-user"
                      placeholder="k@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* No Telepon */}
                  <div className="form-group-user">
                    <label className="form-label-user">No Telepon</label>
                    <input
                      type="tel"
                      name="noTelepon"
                      className="form-input-user"
                      placeholder="081234567890"
                      value={formData.noTelepon}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Tombol Aksi */}
                  <div className="button-group">
                    <button type="submit" className="btn-simpan">
                      Simpan Perubahan
                    </button>
                    <button 
                      type="button" 
                      className="btn-hapus"
                      onClick={handleHapusAkun}
                    >
                      Hapus Akun
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}