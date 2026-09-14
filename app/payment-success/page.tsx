"use client";

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { allCourses } from '@/lib/courses';
import '../styles/payment-success.css';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');

  const purchasedCourse = allCourses.find(c => c.id === Number(courseId));

  return (
    <main className="success-container">
      <div className="success-card">
        <div className="success-icon">
          <i className="fas fa-check"></i>
        </div>
        <h1 className="success-title">Pembayaran Berhasil!</h1>
        
        {purchasedCourse && (
            <p className="mt-3 text-secondary">
                Selamat! Anda telah terdaftar di kursus <br/>
                <strong>{purchasedCourse.title}</strong>
            </p>
        )}
      </div>
      <div className="d-flex gap-3 mt-4 flex-wrap justify-content-center">
        <Link href="/" className="btn-home" style={{ backgroundColor: '#6c757d', boxShadow: 'none' }}>
          Kembali ke Home
        </Link>
        {purchasedCourse && (
            <Link 
                href={purchasedCourse.slug} 
                className="btn-home"
                style={{ 
                    backgroundColor: '#5B21B6', // Warna Ungu Kursus
                    boxShadow: '0 4px 15px rgba(91, 33, 182, 0.4)' 
                }}
            >
                Mulai Belajar <i className="fas fa-arrow-right ms-2"></i>
            </Link>
        )}
      </div>
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Memuat data transaksi...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}