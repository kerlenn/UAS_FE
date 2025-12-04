import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userEmail, content } = body;

    if (!userEmail || !content) {
      return NextResponse.json(
        { error: 'Email dan isi feedback wajib diisi' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User tidak ditemukan' },
        { status: 404 }
      );
    }

    const newFeedback = await prisma.feedback.create({
      data: {
        content,
        userEmail,
      },
    });

    return NextResponse.json(
      { message: 'Feedback berhasil dikirim', feedback: newFeedback },
      { status: 201 }
    );

  } catch (error) {
    console.error('Feedback Error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}