"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { clearUserSession, isLoggedIn } from '@/lib/auth';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    if (window.confirm('Apakah Anda yakin ingin logout?')) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
        });

        clearUserSession();

        alert('Logout berhasil');

        router.push('/login');
        
      } catch (error) {
        console.error('Logout Error:', error);
        alert('Terjadi kesalahan saat logout');
      }
    }
  };

  if (!isLoggedIn()) {
    return null;
  }

  return (
    <button 
      onClick={handleLogout}
      className="btn-logout"
      style={{
        padding: '8px 16px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
      }}
    >
      Logout
    </button>
  );
}