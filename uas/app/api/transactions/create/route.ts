import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, courseId, amount, paymentMethod } = body;

    if (!email || !courseId || amount === undefined) {
      return NextResponse.json(
        { error: 'Data transaksi tidak lengkap' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User tidak ditemukan' },
        { status: 404 }
      );
    }

    const existingTransaction = await prisma.transaction.findFirst({
      where: {
        userId: user.id,
        courseId: Number(courseId),
        status: "SUCCESS" 
      }
    });

    if (existingTransaction) {
      return NextResponse.json(
        { message: 'Anda sudah memiliki kursus ini', transaction: existingTransaction },
        { status: 200 }
      );
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        userId: user.id,
        courseId: Number(courseId), 
        amount: Number(amount),
        paymentMethod: paymentMethod || 'free',
        status: 'SUCCESS', 
      },
    });

    return NextResponse.json(
      { message: 'Transaksi berhasil', transaction: newTransaction },
      { status: 201 }
    );

  } catch (error) {
    console.error('Create Transaction Error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat memproses transaksi' },
      { status: 500 }
    );
  }
}