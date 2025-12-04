"use client";

import React, { useState } from 'react';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
}

export default function ChangePasswordModal({ isOpen, onClose, userEmail }: ChangePasswordModalProps) {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMessage('Password baru dan konfirmasi password tidak sama');
      return;
    }

    if (formData.newPassword.length < 8) {
      setErrorMessage('Password baru minimal 8 karakter');
      return;
    }

    if (formData.oldPassword === formData.newPassword) {
      setErrorMessage('Password baru tidak boleh sama dengan password lama');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/user/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userEmail,
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Password berhasil diubah!');
        setFormData({
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        onClose();
      } else {
        setErrorMessage(data.error || 'Gagal mengubah password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setErrorMessage('Terjadi kesalahan saat mengubah password');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Ubah Password</h3>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {errorMessage && (
            <div className="error-alert">
              {errorMessage}
            </div>
          )}

          {/* Password Lama */}
          <div className="form-group-modal">
            <label>Password Lama</label>
            <div className="password-input-wrapper">
              <input
                type={showOldPassword ? 'text' : 'password'}
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                placeholder="Masukkan password lama"
                required
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* Password Baru */}
          <div className="form-group-modal">
            <label>Password Baru</label>
            <div className="password-input-wrapper">
              <input
                type={showNewPassword ? 'text' : 'password'}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Masukkan password baru"
                required
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            <small style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.85rem' }}>
              Minimal 8 karakter
            </small>
          </div>

          {/* Konfirmasi Password Baru */}
          <div className="form-group-modal">
            <label>Konfirmasi Password Baru</label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Ulangi password baru"
                required
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* Tombol */}
          <div className="modal-buttons">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn-submit-modal"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Memproses...' : 'Ubah Password'}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          backdrop-filter: blur(8px);
        }

        .modal-content {
          background: linear-gradient(135deg, #9F7AEA 0%, #B794F4 100%);
          border-radius: 24px;
          padding: 0;
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 40px rgba(159, 122, 234, 0.4);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 32px 32px 20px;
          border-bottom: 2px solid rgba(255, 255, 255, 0.2);
        }

        .modal-header h3 {
          margin: 0;
          font-size: 1.75rem;
          font-weight: 700;
          color: white;
        }

        .modal-close {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.3);
          font-size: 1.5rem;
          cursor: pointer;
          color: white;
          padding: 4px 12px;
          border-radius: 50px;
          transition: all 0.3s ease;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-close:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
          transform: rotate(90deg);
        }

        .modal-form {
          padding: 32px;
        }

        .form-group-modal {
          margin-bottom: 24px;
        }

        .form-group-modal label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: white;
          font-size: 16px;
        }

        .password-input-wrapper {
          position: relative;
        }

        .password-input-wrapper input {
          width: 100%;
          padding: 16px 50px 16px 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          color: white;
          font-size: 15px;
          transition: all 0.3s ease;
        }

        .password-input-wrapper input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        .password-input-wrapper input:focus {
          outline: none;
          border-color: rgba(255, 255, 255, 0.5);
          background: rgba(255, 255, 255, 0.2);
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
        }

        .toggle-password-btn {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.2rem;
          padding: 6px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .toggle-password-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .form-group-modal small {
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.85rem;
          margin-top: 4px;
          display: block;
        }

        .error-alert {
          background: rgba(255, 107, 53, 0.2);
          border: 2px solid rgba(255, 107, 53, 0.4);
          backdrop-filter: blur(10px);
          color: white;
          padding: 14px 18px;
          border-radius: 16px;
          margin-bottom: 24px;
          font-size: 0.95rem;
          font-weight: 600;
        }

        .modal-buttons {
          display: flex;
          gap: 12px;
          margin-top: 32px;
        }

        .btn-cancel,
        .btn-submit-modal {
          flex: 1;
          padding: 16px 24px;
          border-radius: 50px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 16px;
        }

        .btn-cancel {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
        }

        .btn-cancel:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
        }

        .btn-submit-modal {
          background: linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%);
          border: none;
          color: white;
          box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
        }

        .btn-submit-modal:hover:not(:disabled) {
          background: linear-gradient(135deg, #e55a2e 0%, #e67a35 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
        }

        .btn-cancel:disabled,
        .btn-submit-modal:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .modal-content {
            width: 95%;
            margin: 20px;
          }

          .modal-header {
            padding: 24px 24px 16px;
          }

          .modal-header h3 {
            font-size: 1.5rem;
          }

          .modal-form {
            padding: 24px;
          }

          .modal-buttons {
            flex-direction: column;
            gap: 12px;
          }

          .btn-cancel,
          .btn-submit-modal {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}