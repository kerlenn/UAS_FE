"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './histori.css';
import { allCourses } from '@/lib/courses'; // Import data statis kursus

// Tipe data dari API
interface Transaction {
  id: number;
  courseId: string;
  amount: number;
  status: string;
  createdAt: string;
  paymentMethod: string;
}

export default function HistoriPembelianPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'SUCCESS' | 'PENDING' | 'FAILED'>('all');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  // 1. Fetch Data saat halaman dimuat
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil data user dari localStorage
        const userJson = localStorage.getItem('currentUser');
        if (!userJson) {
            setLoading(false);
            return;
        }

        const userData = JSON.parse(userJson);
        setUserName(userData.fullname || 'User');

        // Panggil API Histori
        const res = await fetch(`/api/transactions/list?email=${userData.email}`);
        if (res.ok) {
          const data = await res.json();
          setTransactions(data);
        }
      } catch (error) {
        console.error("Gagal memuat histori:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 2. Filter Data
  const filteredData = activeFilter === 'all' 
    ? transactions 
    : transactions.filter(item => item.status === activeFilter);

  // 3. Helper Functions
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', { 
      year: 'numeric', month: 'long', day: 'numeric' 
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency', currency: 'IDR', minimumFractionDigits: 0
    }).format(price);
  };

  // Mencari detail kursus dari file static berdasarkan ID dari database
  const getCourseDetail = (idString: string) => {
    const courseId = parseInt(idString);
    const course = allCourses.find(c => c.id === courseId);
    return course || {
      title: 'Kursus Tidak Ditemukan',
      image: '/placeholder.jpg',
      slug: '#',
      instructor: '-'
    };
  };

  // Badge Style
  const getStatusBadge = (status: string) => {
    const badges: any = {
      'SUCCESS': { text: 'Berhasil', class: 'status-success' },
      'PENDING': { text: 'Pending', class: 'status-pending' },
      'FAILED': { text: 'Gagal', class: 'status-failed' }
    };
    return badges[status] || badges['SUCCESS'];
  };

  return (
    <main className="histori-container">
        <div className="container py-5">
          
          <div className="histori-header mb-5">
            <h1 className="histori-title">📋 Histori Pembelian Saya</h1>
            <p className="histori-subtitle">Halo, <strong>{userName}</strong>! Berikut riwayat pembelian kamu.</p>
          </div>

          <div className="filter-tabs mb-4">
            <button className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>
              Semua
            </button>
            <button className={`filter-btn ${activeFilter === 'SUCCESS' ? 'active' : ''}`} onClick={() => setActiveFilter('SUCCESS')}>
              ✅ Berhasil
            </button>
          </div>

          {loading ? (
            <p className="text-center text-white">Memuat data...</p>
          ) : filteredData.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🛒</div>
              <h3>Belum Ada Pembelian</h3>
              <p>Kamu belum membeli kursus apapun.</p>
              <Link href="/#courses" className="btn-explore">
                Jelajahi Kursus
              </Link>
            </div>
          ) : (
            <div className="row g-4">
              {filteredData.map((trx) => {
                const badge = getStatusBadge(trx.status);
                const courseDetail = getCourseDetail(trx.courseId);
                
                return (
                  <div key={trx.id} className="col-12 col-md-6 col-lg-4">
                    <div className="histori-card">
                      
                      <div className="card-image-wrapper">
                        <Image 
                          src={courseDetail.image} 
                          alt={courseDetail.title}
                          width={400} height={250}
                          className="card-image"
                          style={{objectFit: 'cover'}}
                        />
                        <span className={`status-badge ${badge.class}`}>
                          {badge.text}
                        </span>
                      </div>

                      <div className="card-body-custom">
                        <h3 className="course-title">{courseDetail.title}</h3>
                        
                        <div className="card-info">
                          <div className="info-row">
                            <span className="info-label">📅 Tanggal:</span>
                            <span className="info-value">{formatDate(trx.createdAt)}</span>
                          </div>
                          <div className="info-row">
                            <span className="info-label">💰 Harga:</span>
                            <span className="info-value price">{formatPrice(trx.amount)}</span>
                          </div>
                          <div className="info-row">
                            <span className="info-label">💳 Metode:</span>
                            <span className="info-value">{trx.paymentMethod}</span>
                          </div>
                        </div>

                        <div className="card-actions">
                          <Link href={courseDetail.slug} className="btn-access">
                            🎓 Akses Materi
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </main>
  );
}