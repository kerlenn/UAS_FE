// lib/auth.ts
// Helper functions untuk authentication

export interface UserSessionData {
  id?: number;
  email: string;
  fullname: string;
  phone?: string | null;
}

/**
 * Cek apakah user sudah login
 */
export function isLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem('currentUser') || !!localStorage.getItem('userEmail');
}

/**
 * Ambil data objek user yang sedang login
 */
export function getCurrentUser(): UserSessionData | null {
  if (typeof window === 'undefined') return null;
  const userStr = localStorage.getItem('currentUser');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
  const email = localStorage.getItem('userEmail');
  const fullname = localStorage.getItem('userName');
  if (email && fullname) {
    return { email, fullname };
  }
  return null;
}

/**
 * Ambil email user yang sedang login
 */
export function getCurrentUserEmail(): string | null {
  if (typeof window === 'undefined') return null;
  const user = getCurrentUser();
  if (user?.email) return user.email;
  return localStorage.getItem('userEmail');
}

/**
 * Ambil nama user yang sedang login
 */
export function getCurrentUserName(): string | null {
  if (typeof window === 'undefined') return null;
  const user = getCurrentUser();
  if (user?.fullname) return user.fullname;
  return localStorage.getItem('userName');
}

/**
 * Simpan data user setelah login
 */
export function setUserSession(userData: UserSessionData | string, name?: string) {
  if (typeof window === 'undefined') return;
  if (typeof userData === 'string') {
    const email = userData;
    const fullname = name || '';
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', fullname);
    localStorage.setItem('currentUser', JSON.stringify({ email, fullname }));
  } else {
    localStorage.setItem('currentUser', JSON.stringify(userData));
    localStorage.setItem('userEmail', userData.email);
    localStorage.setItem('userName', userData.fullname);
  }
}

/**
 * Hapus session user (logout)
 */
export function clearUserSession() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('currentUser');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userName');
  localStorage.removeItem('purchasedCourses');
}

/**
 * Redirect ke login jika belum login
 */
export function requireAuth(router: { push: (url: string) => void }) {
  if (!isLoggedIn()) {
    alert('Anda belum login. Silakan login terlebih dahulu.');
    router.push('/login');
    return false;
  }
  return true;
}