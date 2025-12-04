"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/user.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { UserIcon } from '../components/UserIcon';
import ProtectedRoute from '../components/ProtectedRoute';
import ChangePasswordModal from '../components/ChangePasswordModal';
import { getCurrentUserEmail, clearUserSession } from '@/lib/auth';

function UserPageContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    namaLengkap: '',
    email: '',
    noTelepon: '',
    feedback: ''
  });

  const userEmail = getCurrentUserEmail() || '';

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

    if (formData.namaLengkap.trim().length < 3) {
      alert('Nama minimal 3 huruf');
      return;
    }

    // ✅ VALIDASI CLIENT-SIDE: No HP minimal 11 digit dan dimulai dengan 62 atau 08
    if (formData.noTelepon) {
      const phoneRegex = /^(62|08)\d{9,}$/;
      if (!phoneRegex.test(formData.noTelepon)) {
        alert('No telepon harus minimal 11 digit dan dimulai dengan 62 atau 08');
        return;
      }
    }
    
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
          clearUserSession();
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
                      placeholder="Masukkan nama lengkap (min 3 huruf)"
                      value={formData.namaLengkap}
                      onChange={handleChange}
                      minLength={3}
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
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', cursor: 'not-allowed' }}
                    />
                    <small style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.85rem' }}>
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
                      placeholder="08xxxxxxxxxx atau 62xxxxxxxxxx"
                      value={formData.noTelepon}
                      onChange={handleChange}
                      pattern="^(62|08)\d{9,}$"
                      title="No telepon harus minimal 11 digit dan dimulai dengan 62 atau 08"
                    />
                    <small style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.85rem' }}>
                      Minimal 11 digit, dimulai dengan 08 atau 62
                    </small>
                  </div>

                  {/* Tombol Aksi */}
                  <div className="button-group">
                    <button type="submit" className="btn-simpan">
                      Simpan Perubahan
                    </button>
                    <button 
                      type="button" 
                      className="btn-ubah-password"
                      onClick={() => setIsPasswordModalOpen(true)}
                    >
                      Ubah Password
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

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        userEmail={formData.email}
      />
    </>
  );
}

export default function UserPage() {
  return (
    <ProtectedRoute>
      <UserPageContent />
    </ProtectedRoute>
  );
}