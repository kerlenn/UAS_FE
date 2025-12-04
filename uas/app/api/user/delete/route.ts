// app/api/user/delete/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// DELETE - Hapus akun user
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email wajib diisi' },
        { status: 400 }
      );
    }

    // Cek apakah user ada
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User tidak ditemukan' },
        { status: 404 }
      );
    }

    // Hapus semua feedback user terlebih dahulu (karena ada relasi)
    await prisma.feedback.deleteMany({
      where: { userEmail: email },
    });

    // Hapus semua transaksi user
    await prisma.transaction.deleteMany({
      where: { userId: existingUser.id },
    });

    // Hapus user
    await prisma.user.delete({
      where: { email },
    });

    return NextResponse.json(
      { message: 'Akun berhasil dihapus' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Delete User Error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}