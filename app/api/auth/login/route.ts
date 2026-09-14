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

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: 'Email atau password salah' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: 'Login berhasil', user },
      { status: 200 }
    );

  } catch (error) {
    console.error("Login API Error:", error);

    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}