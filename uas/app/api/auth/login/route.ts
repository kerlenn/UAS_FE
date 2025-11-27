import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email dan Password wajib diisi' },
        { status: 400 }
      );
    }

    // Cari user berdasarkan email di database
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    // Jika user tidak ditemukan ATAU password salah
    // (Catatan: Ini perbandingan password polos. Di real app wajib pakai bcrypt!)
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'Email atau password salah' },
        { status: 401 }
      );
    }

    // Login Sukses
    // Di real app, di sini kita akan buat Session / JWT Token.
    // Untuk sekarang, kita kembalikan data user saja.
    return NextResponse.json(
      { message: 'Login berhasil', user },
      { status: 200 }
    );

  } catch (error) {
    // Kita log errornya supaya ESLint senang & kita bisa debugging
    console.error("Login API Error:", error);

    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}