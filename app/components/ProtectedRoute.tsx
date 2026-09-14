"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isLoggedIn } from '@/lib/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoggedIn()) {
        alert('Anda belum login. Silakan login terlebih dahulu.');
        router.push('/login');
      } else {
        setIsChecking(false);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [router]);

  if (isChecking) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}