"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import '../styles/pembayaran.css';

export default function PembayaranPage() {
  const router = useRouter();
  
  // State untuk form input
  const [formData, setFormData] = useState({
    nama: '',
    telp: '',
    email: '',
    metode: ''
  });

  // Handler untuk perubahan input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Handler tombol bayar
  const handlePay = () => {
    const { nama, telp, email, metode } = formData;
    const errors: string[] = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nama.trim()) errors.push('Nama');
    if (!telp.trim()) errors.push('No Telpon');
    if (!email.trim()) errors.push('Email');
    else if (!emailRegex.test(email)) {
      alert('Format email tidak valid.');
      return;
    }
    if (!metode) errors.push('Metode Pembayaran');

    if (errors.length > 0) {
      alert('Harap isi kolom berikut: ' + errors.join(', '));
      return;
    }

    // Simulasi proses pembayaran berhasil
    alert('Pembayaran berhasil!');
    
    // Redirect ke halaman sukses
    router.push('/payment-success');
  };

  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <section className="form-section">
          <div className="form-group">
            <label htmlFor="nama">Nama</label>
            <input 
              type="text" 
              id="nama" 
              placeholder="Jhon Doe"
              value={formData.nama}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="telp">No Telpn</label>
            <input 
              type="number" 
              id="telp" 
              placeholder="+62 8## - #### - ####"
              value={formData.telp}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Example@com"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          
          <hr className="form-divider" />
          
          <div className="form-group">
            <label htmlFor="metode">Metode Pembayaran</label>
            <select 
              id="metode" 
              value={formData.metode} 
              onChange={handleInputChange}
            >
              <option value="">Silahkan Pilih Metode Pembayaran</option>
              <option value="cc">Kartu Kredit</option>
              <option value="va">Virtual Account</option>
              <option value="ewallet">E-Wallet</option>
              <option value="qris">Qris</option>
            </select>
          </div>
        </section>

        <aside className="summary-section">
          <Image 
            src="/adobeAE.jpg" 
            alt="Adobe After Effects Course" 
            width={400} 
            height={225}
            className="course-image"
            style={{ width: '100%', height: 'auto' }}
          />
          <h3>Adobe After Effects [2020]</h3>
          <p className="course-description">
            Kuasai Adobe After Effects dari dasar hingga mahir untuk mengubah ide-ide Anda dengan panduan lengkap dari pakar di bidangnya.
          </p>
          <p className="course-instructor">Dengan Instruktur Darius</p>
          <p className="course-price">Harga: <strong>Rp120,000</strong></p>
        </aside>
        
        <button className="btn-bayar" onClick={handlePay}>Bayar</button>
      </div>
    </div>
  );
}