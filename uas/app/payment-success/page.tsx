import React from 'react';
import Link from 'next/link';
import '../styles/payment-success.css';

export default function PaymentSuccessPage() {
  return (
    <main className="success-container">
      <div className="success-card">
        <div className="success-icon">
          <i className="fas fa-check"></i>
        </div>
        <h1 className="success-title">Payment Success</h1>
      </div>
      <Link href="/" className="btn-home">
        Home
      </Link>
    </main>
  );
}