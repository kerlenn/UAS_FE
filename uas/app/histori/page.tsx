"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './histori.css';

// Interface untuk data pembelian
interface HistoriPembelian {
  id: string;
  courseTitle: string;
  courseImage: string;
  purchaseDate: string;
  price: number;
  status: 'success' | 'pending' | 'failed';
  transactionId: string;
  courseSlug?: string;
}

export default function HistoriPembelianPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'success' | 'pending' | 'failed'>('all');
  const [userName, setUserName] = useState('User');
  
  // Data dummy - nanti bisa diganti dengan fetch dari API
  const [historiData] = useState<HistoriPembelian[]>([
    {
      id: '1',
      courseTitle: 'Web Development Masterclass 2024',
      courseImage: '/courses/web-dev.jpg', // Ganti dengan path image kamu
      purchaseDate: '2024-01-15',
      price: 299000,
      status: 'success',
      transactionId: 'TRX-001-2024',
      courseSlug: 'web-development'
    },
    {
      id: '2',
      courseTitle: 'Digital Marketing Complete Course',
      courseImage: '/courses/digital-marketing.jpg',
      purchaseDate: '2024-01-10',
      price: 199000,
      status: 'success',
      transactionId: 'TRX-002-2024',
      courseSlug: 'digital-marketing'
    },
    {
      id: '3',
      courseTitle: 'UI/UX Design Fundamentals',
      courseImage: '/courses/uiux.jpg',
      purchaseDate: '2024-01-08',
      price: 249000,
      status: 'pending',
      transactionId: 'TRX-003-2024',
      courseSlug: 'uiux-design'
    },
    {
      id: '4',
      courseTitle: 'Python Programming for Beginners',
      courseImage: '/courses/python.jpg',
      purchaseDate: '2024-01-05',
      price: 179000,
      status: 'failed',
      transactionId: 'TRX-004-2024',
      courseSlug: 'python-programming'
    }
  ]);

  // Get user name from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('currentUser');
      if (user) {
        try {
          const userData = JSON.parse(user);
          setUserName(userData.fullname || 'User');
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    }
  }, []);

  // Filter data berdasarkan status
  const filteredData = activeFilter === 'all' 
    ? historiData 
    : historiData.filter(item => item.status === activeFilter);

  // Format tanggal
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Format harga
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Status badge styling
  const getStatusBadge = (status: string) => {
    const badges = {
      success: { text: 'Berhasil', class: 'status-success' },
      pending: { text: 'Pending', class: 'status-pending' },
      failed: { text: 'Gagal', class: 'status-failed' }
    };
    return badges[status as keyof typeof badges] || badges.success;
  };

  return (
    <main className="histori-container">
        <div className="container py-5">
          
          {/* Header Section */}
          <div className="histori-header mb-5">
            <h1 className="histori-title">📋 Histori Pembelian Saya</h1>
            <p className="histori-subtitle">Halo, <strong>{userName}</strong>! Berikut adalah riwayat pembelian kursus kamu.</p>
          </div>

          {/* Filter Tabs */}
          <div className="filter-tabs mb-4">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              Semua ({historiData.length})
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'success' ? 'active' : ''}`}
              onClick={() => setActiveFilter('success')}
            >
              ✅ Berhasil ({historiData.filter(d => d.status === 'success').length})
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'pending' ? 'active' : ''}`}
              onClick={() => setActiveFilter('pending')}
            >
              ⏳ Pending ({historiData.filter(d => d.status === 'pending').length})
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'failed' ? 'active' : ''}`}
              onClick={() => setActiveFilter('failed')}
            >
              ❌ Gagal ({historiData.filter(d => d.status === 'failed').length})
            </button>
          </div>

          {/* Content Section */}
          {filteredData.length === 0 ? (
            // Empty State
            <div className="empty-state">
              <div className="empty-icon">🛒</div>
              <h3>Belum Ada Pembelian</h3>
              <p>Kamu belum memiliki riwayat pembelian di kategori ini.</p>
              <Link href="/kursus" className="btn-explore">
                Jelajahi Kursus
              </Link>
            </div>
          ) : (
            // Histori Cards
            <div className="row g-4">
              {filteredData.map((item) => {
                const statusBadge = getStatusBadge(item.status);
                
                return (
                  <div key={item.id} className="col-12 col-md-6 col-lg-4">
                    <div className="histori-card">
                      
                      {/* Course Image */}
                      <div className="card-image-wrapper">
                        <Image 
                          src={item.courseImage} 
                          alt={item.courseTitle}
                          width={400}
                          height={250}
                          className="card-image"
                          onError={(e) => {
                            // Fallback jika gambar tidak ada
                            e.currentTarget.src = 'https://via.placeholder.com/400x250/667EEA/FFFFFF?text=Kursus';
                          }}
                        />
                        <span className={`status-badge ${statusBadge.class}`}>
                          {statusBadge.text}
                        </span>
                      </div>

                      {/* Card Body */}
                      <div className="card-body-custom">
                        <h3 className="course-title">{item.courseTitle}</h3>
                        
                        <div className="card-info">
                          <div className="info-row">
                            <span className="info-label">📅 Tanggal:</span>
                            <span className="info-value">{formatDate(item.purchaseDate)}</span>
                          </div>
                          <div className="info-row">
                            <span className="info-label">💰 Harga:</span>
                            <span className="info-value price">{formatPrice(item.price)}</span>
                          </div>
                          <div className="info-row">
                            <span className="info-label">🔖 ID Transaksi:</span>
                            <span className="info-value transaction-id">{item.transactionId}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="card-actions">
                          {item.status === 'success' && (
                            <Link 
                              href={`/kursus/${item.courseSlug}`} 
                              className="btn-access"
                            >
                              🎓 Akses Kursus
                            </Link>
                          )}
                          {item.status === 'pending' && (
                            <button className="btn-payment">
                              💳 Selesaikan Pembayaran
                            </button>
                          )}
                          {item.status === 'failed' && (
                            <button className="btn-retry">
                              🔄 Coba Lagi
                            </button>
                          )}
                          <button className="btn-detail">
                            📄 Detail
                          </button>
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