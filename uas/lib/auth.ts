// lib/auth.ts
// Helper functions untuk authentication

/**
 * Cek apakah user sudah login
 */
export function isLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('userEmail');
}

/**
 * Ambil email user yang sedang login
 */
export function getCurrentUserEmail(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('userEmail');
}

/**
 * Ambil nama user yang sedang login
 */
export function getCurrentUserName(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('userName');
}

/**
 * Simpan data user setelah login
 */
export function setUserSession(email: string, name: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('userEmail', email);
  localStorage.setItem('userName', name);
}

/**
 * Hapus session user (logout)
 */
export function clearUserSession() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userName');
}

/**
 * Redirect ke login jika belum login
 */
export function requireAuth(router: any) {
  if (!isLoggedIn()) {
    alert('Anda belum login. Silakan login terlebih dahulu.');
    router.push('/login');
    return false;
  }
  return true;
}