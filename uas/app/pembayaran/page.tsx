"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import '../styles/pembayaran.css';

const coursesData = [
  {
    id: 1,
    title: "Adobe After Effects [2020]",
    description: "Kuasai motion graphics dan efek visual dari dasar hingga mahir dengan panduan lengkap dari pakar di bidangnya.",
    instructor: "Darius",
    image: "/AdobeEA.jpeg",
    price: 120000,
  },
  {
    id: 2,
    title: "Kuliah Struktur Data [2020]",
    description: "Pelajari konsep fundamental struktur data seperti Array, Linked List, Stack, dan Queue untuk membangun algoritma yang efisien.",
    instructor: "Darius",
    image: "/StrukturData.jpg",
    price: 230000,
  },
  {
    id: 3,
    title: "Roblox Studio untuk Prototyping Game [2025]",
    description: "Belajar membuat game pertamamu di platform Roblox. Mulai dari desain level, scripting dasar dengan Lua, hingga publikasi.",
    instructor: "Darius",
    image: "/Roblox.jpg",
    price: 0,
  },
  {
    id: 4,
    title: "Blender 3D Modelling [2020]",
    description: "Ciptakan model 3D yang menakjubkan dari nol. Pelajari teknik-teknik sculpting, texturing, dan rendering di Blender.",
    instructor: "Darius",
    image: "/Blender.jpg",
    price: 50000,
  },
  {
    id: 5,
    title: "Object Oriented Programming [2020]",
    description: "Pahami pilar-pilar OOP (Encapsulation, Inheritance, Polymorphism) untuk menulis kode yang lebih bersih, modular, dan reusable.",
    instructor: "Darius",
    image: "/OOP.jpg",
    price: 80000,
  }
];

function PembayaranContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedCourse, setSelectedCourse] = useState(coursesData[0]); 

  const [formData, setFormData] = useState({
    nama: '',
    telp: '',
    email: '',
    metode: ''
  });

  useEffect(() => {
    // 1. Cek Login (Hanya untuk Auto-fill, TIDAK ADA Redirect/Larangan)
    const user = localStorage.getItem('currentUser');
    
    if (user) {
      try {
        const userData = JSON.parse(user);
        setFormData(prev => ({
          ...prev,
          nama: userData.fullname || '',
          email: userData.email || ''
        }));
      } catch (e) {
        console.error("Error parsing user data", e);
      }
    }

    // 2. Cek Kursus yang dipilih berdasarkan ID di URL
    const courseId = searchParams.get('id');
    if (courseId) {
      const foundCourse = coursesData.find(c => c.id === parseInt(courseId));
      if (foundCourse) {
        setSelectedCourse(foundCourse);
      }
    }
    
    setIsLoading(false);
  }, [router, searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

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

    alert(`Pembayaran untuk kursus ${selectedCourse.title} berhasil!`);
    router.push('/payment-success');
  };

  if (isLoading) return null;

  return (
    <div className="checkout-container">
      <div className="checkout-card">
        <section className="form-section">
          <h2 className="mb-4 fw-bold">Checkout</h2>
          <div className="form-group">
            <label htmlFor="nama">Nama</label>
            <input type="text" id="nama" placeholder="Jhon Doe" value={formData.nama} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="telp">No Telpn</label>
            <input type="number" id="telp" placeholder="+62 8## - #### - ####" value={formData.telp} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Example@com" value={formData.email} onChange={handleInputChange} />
          </div>
          <hr className="form-divider" />
          <div className="form-group">
            <label htmlFor="metode">Metode Pembayaran</label>
            <select id="metode" value={formData.metode} onChange={handleInputChange}>
              <option value="">Silahkan Pilih Metode Pembayaran</option>
              <option value="cc">Kartu Kredit</option>
              <option value="va">Virtual Account</option>
              <option value="ewallet">E-Wallet</option>
              <option value="qris">Qris</option>
            </select>
          </div>
        </section>

        <aside className="summary-section">
          <div className="position-relative w-100 mb-3" style={{ height: '200px' }}>
            <Image 
              src={selectedCourse.image} 
              alt={selectedCourse.title} 
              fill
              style={{ objectFit: 'cover', borderRadius: '10px' }}
            />
          </div>
          <h3>{selectedCourse.title}</h3>
          <p className="course-description">
            {selectedCourse.description}
          </p>
          <p className="course-instructor">Dengan Instruktur {selectedCourse.instructor}</p>
          <p className="course-price">
            Harga: <strong>{selectedCourse.price === 0 ? 'Gratis' : `Rp${selectedCourse.price.toLocaleString('id-ID')}`}</strong>
          </p>
        </aside>
        
        <button className="btn-bayar" onClick={handlePay}>Bayar Sekarang</button>
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