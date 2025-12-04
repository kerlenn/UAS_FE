// app/api/user/change-password/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PUT - Ubah password user
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { email, oldPassword, newPassword } = body;

    // Validasi input
    if (!email || !oldPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Semua field wajib diisi' },
        { status: 400 }
      );
    }

    // Validasi panjang password baru
    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Password baru minimal 6 karakter' },
        { status: 400 }
      );
    }

    // Cari user berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User tidak ditemukan' },
        { status: 404 }
      );
    }

    // Validasi password lama
    // CATATAN: Di real app pakai bcrypt.compare()
    if (user.password !== oldPassword) {
      return NextResponse.json(
        { error: 'Password lama tidak sesuai' },
        { status: 401 }
      );
    }

    // Update password
    // CATATAN: Di real app, hash password baru dengan bcrypt sebelum disimpan
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