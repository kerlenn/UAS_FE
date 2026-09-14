import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullname, email, phone, password } = body;

    if (!fullname || !email || !password) {
      return NextResponse.json(
        { error: 'Nama, Email, dan Password wajib diisi' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email ini sudah terdaftar, gunakan email lain.' },
        { status: 400 }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        fullname,
        email,
        phone,
        password,
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