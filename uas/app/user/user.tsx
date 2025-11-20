import React, { useState, useEffect } from 'react';
import './user.css';

interface UserProfile {
  fullname: string;
  email: string;
  phone: string;
}

const UserProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    fullname: '',
    email: '',
    phone: ''
  });
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    // Simulasi load data user dari localStorage atau API
    const userData = {
      fullname: 'John Doe',
      email: 'john.doe@example.com',
      phone: '081234567890'
    };
    setProfile(userData);
  }, []);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile updated:', profile);
    alert('Perubahan berhasil disimpan!');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus akun? Tindakan ini tidak dapat dibatalkan.')) {
      console.log('Account deleted');
      alert('Akun berhasil dihapus!');
      // Handle account deletion
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.trim()) {
      console.log('Feedback submitted:', feedback);
      alert('Terima kasih atas feedback Anda!');
      setFeedback('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleBackHome = () => {
    window.location.href = '/home.html';
  };

  return (
    <>
      {/* Back to Home Button */}
      <div className="back-home">
        <button className="btn-back-home" onClick={handleBackHome}>
          <i className="fas fa-arrow-left"></i>
          Kembali ke Beranda
        </button>
      </div>

      {/* Profile Container */}
      <div className="profile-container">
        <div className="profile-content">
          {/* Left Section */}
          <div className="profile-left">
            {/* Avatar Section */}
            <div className="avatar-section">
              <div className="avatar">
                <div className="avatar-icon"></div>
                <div className="avatar-body"></div>
              </div>
            </div>

            {/* Feedback Section */}
            <div className="feedback-section">
              <h3 className="feedback-title">Feedback</h3>
              <div>
                <textarea 
                  className="feedback-textarea"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tulis feedback Anda di sini..."
                />
                <button 
                  className="btn-feedback"
                  onClick={handleFeedbackSubmit}
                >
                  Kirim Feedback
                </button>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="profile-right">
            <div>
              <div className="form-group">
                <label className="form-label">Nama Lengkap</label>
                <input 
                  type="text" 
                  className="form-input" 
                  id="fullname"
                  value={profile.fullname}
                  onChange={handleInputChange}
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-input" 
                  id="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  placeholder="Masukkan email"
                />
              </div>

              <div className="form-group">
                <label className="form-label">No Telepon</label>
                <input 
                  type="tel" 
                  className="form-input" 
                  id="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                  placeholder="Masukkan nomor telepon"
                />
              </div>

              <div className="button-group">
                <button 
                  className="btn btn-primary"
                  onClick={handleProfileSubmit}
                >
                  Simpan Perubahan
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={handleDeleteAccount}
                >
                  Hapus Akun
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;