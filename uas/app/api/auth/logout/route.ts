// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Untuk localStorage-based auth, logout dilakukan di client side
    // API ini hanya untuk konsistensi atau jika nanti ada server-side session
    
    return NextResponse.json(
      { message: 'Logout berhasil' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Logout Error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}