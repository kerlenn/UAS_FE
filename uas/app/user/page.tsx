"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '../styles/user.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { UserIcon } from '../components/UserIcon';
import { getCurrentUserEmail, clearUserSession } from '@/lib/auth';

export default function UserPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    namaLengkap: '',
    email: '',
    noTelepon: '',
    feedback: ''
  });

  // Ambil email dari localStorage (di-set saat login berhasil)
  const userEmail = getCurrentUserEmail() || '';

  // Fetch data user saat page load
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/user?email=${userEmail}`);
        const data = await response.json();

        if (response.ok) {
          setFormData({
            namaLengkap: data.fullname,
            email: data.email,
            noTelepon: data.phone || '',
            feedback: ''
          });
        } else {
          alert(data.error || 'Gagal memuat data user');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        alert('Terjadi kesalahan saat memuat data');
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchUserData();
    } else {
      // Jika tidak ada userEmail, redirect ke login
      setLoading(false);
      alert('Anda belum login. Silakan login terlebih dahulu.');
      router.push('/login');
    }
  }, [userEmail]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSimpanPerubahan = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          fullname: formData.namaLengkap,
          phone: formData.noTelepon,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Perubahan berhasil disimpan!');
        console.log('Data disimpan:', data);
      } else {
        alert(data.error || 'Gagal menyimpan perubahan');
      }
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Terjadi kesalahan saat menyimpan data');
    }
  };

  const handleHapusAkun = async () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus akun? Tindakan ini tidak dapat dibatalkan.')) {
      try {
        const response = await fetch('/api/user/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert('Akun berhasil dihapus');
          // Hapus session menggunakan helper function
          clearUserSession();
          // Redirect ke halaman login
          router.push('/login');
        } else {
          alert(data.error || 'Gagal menghapus akun');
        }
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Terjadi kesalahan saat menghapus akun');
      }
    }
  };

  const handleKirimFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.feedback.trim()) {
      alert('Mohon isi feedback terlebih dahulu');
      return;
    }

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: formData.email,
          content: formData.feedback,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Feedback berhasil dikirim!');
        setFormData({ ...formData, feedback: '' });
        console.log('Feedback dikirim:', data);
      } else {
        alert(data.error || 'Gagal mengirim feedback');
      }
    } catch (error) {
      console.error('Error sending feedback:', error);
      alert('Terjadi kesalahan saat mengirim feedback');
    }
  };

  if (loading) {
    return (
      <main className="user-page-container">
        <div className="container py-5">
          <div className="text-center">
            <p>Loading...</p>
          </div>
        </div>
      </main>
    );
  }

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
                  <h2 className="form-card-title">Data Pengguna</h2>
                  <button className="btn-back" onClick={() => router.push('/')}>
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
                      placeholder="Masukkan nama lengkap"
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
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled
                      style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                    />
                    <small style={{ color: '#666', fontSize: '0.85rem' }}>
                      Email tidak dapat diubah
                    </small>
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