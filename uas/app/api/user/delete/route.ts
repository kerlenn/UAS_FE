import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User tidak ditemukan' },
        { status: 404 }
      );
    }

    await prisma.feedback.deleteMany({
      where: { userEmail: email },
    });

    await prisma.transaction.deleteMany({
      where: { userId: existingUser.id },
    });

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