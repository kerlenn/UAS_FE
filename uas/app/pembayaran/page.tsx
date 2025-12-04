"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { allCourses } from '@/lib/courses'; // Import data dari file pusat
import '../styles/pembayaran.css';

function PembayaranContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Ambil ID dari URL
  const courseIdParam = searchParams.get('id');
  
  // Default ke kursus pertama (Adobe) hanya jika ID tidak ditemukan/salah
  const [selectedCourse, setSelectedCourse] = useState(allCourses[0]);

  // State form
  const [formData, setFormData] = useState({
    nama: '',
    telp: '',
    email: '',
    metode: ''
  });

  useEffect(() => {
    // 1. Cek Login
    const user = localStorage.getItem('currentUser');
    if (!user) {
      alert('Anda harus login terlebih dahulu.');
      router.push('/login');
      return;
    }

    try {
      const userData = JSON.parse(user);
      setFormData(prev => ({
        ...prev,
        nama: userData.fullname || '',
        email: userData.email || '',
        telp: userData.phone || ''
      }));
    } catch (e) {
      console.error(e);
    }

    // 2. Cari kursus berdasarkan ID
    if (courseIdParam) {
      const foundCourse = allCourses.find(c => c.id === parseInt(courseIdParam));
      if (foundCourse) {
        setSelectedCourse(foundCourse);
      }
    }
  }, [router, courseIdParam]);

  // Handler input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  // Handler bayar
  const handlePay = async () => {
    const { nama, telp, email, metode } = formData;
    
    // Validasi
    if (!nama || !telp || !email) {
      alert('Harap lengkapi data diri.');
      return;
    }
    // Jika berbayar tapi metode kosong
    if (selectedCourse.price > 0 && !metode) {
      alert('Harap pilih metode pembayaran.');
      return;
    }

    try {
      // 1. Panggil API untuk simpan ke Database
      const response = await fetch('/api/transaction/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email, // Email user yg login
          courseId: selectedCourse.id,
          amount: selectedCourse.price,
          paymentMethod: selectedCourse.price === 0 ? 'FREE' : metode,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Gagal memproses pembayaran');
      }

      // 2. Simpan ke LocalStorage (Opsional: untuk backup client-side state)
      const savedPurchases = localStorage.getItem('purchasedCourses');
      let purchasedCourses: number[] = savedPurchases ? JSON.parse(savedPurchases) : [];
      if (!purchasedCourses.includes(selectedCourse.id)) {
          purchasedCourses.push(selectedCourse.id);
          localStorage.setItem('purchasedCourses', JSON.stringify(purchasedCourses));
      }

      // 3. Sukses & Redirect
      alert(`Pembayaran berhasil!`);
      router.push(`/payment-success?courseId=${selectedCourse.id}`);

    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat memproses transaksi.');
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <section className="form-section">
          <div className="form-group">
            <label htmlFor="nama">Nama</label>
            <input type="text" id="nama" value={formData.nama} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="telp">No. Telepon</label>
            <input type="tel" id="telp" value={formData.telp} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={formData.email} onChange={handleInputChange} />
          </div>
          
          <hr className="form-divider" />
          
          {selectedCourse.price > 0 ? (
            <div className="form-group">
                <label htmlFor="metode">Metode Pembayaran</label>
                <select id="metode" value={formData.metode} onChange={handleInputChange}>
                <option value="">-- Pilih --</option>
                <option value="cc">Kartu Kredit</option>
                <option value="va">Virtual Account</option>
                <option value="ewallet">E-Wallet</option>
                </select>
            </div>
          ) : (
            <div className="alert alert-success">Kursus ini Gratis!</div>
          )}
        </section>

        <aside className="summary-section">
          {/* Gambar Dinamis */}
          <Image 
            src={selectedCourse.image} 
            alt={selectedCourse.title} 
            width={400} height={225} 
            style={{width: '100%', height: 'auto', borderRadius: '10px', marginBottom: '15px'}}
          />
          
          {/* Judul */}
          <h3>{selectedCourse.title}</h3>
          
          {/* Deskripsi */}
          <p className="course-description" style={{ fontSize: '0.9em', opacity: 0.9, lineHeight: '1.6', marginBottom: '10px' }}>
            {selectedCourse.description}
          </p>

          {/* Instruktur */}
          <p className="course-instructor" style={{ marginBottom: 'auto', opacity: 0.8, fontSize: '0.9em' }}>
            {selectedCourse.instructor}
          </p>

          {/* Harga */}
          <p className="course-price">
            Total: <strong>{selectedCourse.price === 0 ? 'GRATIS' : `Rp${selectedCourse.price.toLocaleString('id-ID')}`}</strong>
          </p>
        </aside>
        
        <button className="btn-bayar" onClick={handlePay}>
            {selectedCourse.price === 0 ? 'Daftar Sekarang' : 'Bayar Sekarang'}
        </button>
      </div>
    </div>
  );
}

export default function PembayaranPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PembayaranContent />
    </Suspense>
  );
}