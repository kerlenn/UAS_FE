import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { email, oldPassword, newPassword } = body;

    if (!email || !oldPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi' },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: 'Password baru minimal 8 karakter' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User tidak ditemukan' },
        { status: 404 }
      );
    }

    if (user.password !== oldPassword) {
      return NextResponse.json(
        { error: 'Password lama tidak sesuai' },
        { status: 401 }
      );
    }

    await prisma.user.update({
      where: { email },
      data: {
        password: newPassword,
      },
    });

    return NextResponse.json(
      { message: 'Password berhasil diubah' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Change Password Error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}