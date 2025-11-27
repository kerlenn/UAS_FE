import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Pastikan import ini mengarah ke file prisma.ts

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullname, email, phone, password } = body;

    // Validasi input kosong
    if (!fullname || !email || !password) {
      return NextResponse.json(
        { error: 'Nama, Email, dan Password wajib diisi' },
        { status: 400 }
      );
    }

    // Cek apakah email sudah dipakai
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email ini sudah terdaftar, gunakan email lain.' },
        { status: 400 }
      );
    }

    // Simpan ke Database
    const newUser = await prisma.user.create({
      data: {
        fullname,
        email,
        phone,
        password, // Nanti di real project harus di-hash!
      },
    });

    return NextResponse.json(
      { message: 'Registrasi Berhasil', user: newUser },
      { status: 201 }
    );

  } catch (error) {
    console.error('Register Error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}