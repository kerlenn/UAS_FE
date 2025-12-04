import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, courseId, amount, paymentMethod } = body;

    // 1. Cari User ID berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 });
    }

    // 2. CEK APAKAH SUDAH PERNAH BELI (TAMBAHAN INI)
    const existingTransaction = await prisma.transaction.findFirst({
      where: {
        userId: user.id,
        courseId: String(courseId),
        status: 'SUCCESS'
      }
    });

    if (existingTransaction) {
      return NextResponse.json(
        { error: 'Anda sudah membeli kursus ini' },
        { status: 400 }
      );
    }

    // 3. Simpan Transaksi ke Database
    const newTransaction = await prisma.transaction.create({
      data: {
        userId: user.id,
        courseId: String(courseId),
        amount: Number(amount),
        paymentMethod: paymentMethod || 'free',
        status: 'SUCCESS',
      },
    });

    console.log('✅ Transaction created:', newTransaction);

    return NextResponse.json(
      { message: 'Transaksi berhasil', data: newTransaction },
      { status: 201 }
    );

  } catch (error) {
    console.error('Create Transaction Error:', error);
    return NextResponse.json(
      { error: 'Gagal memproses transaksi' },
      { status: 500 }
    );
  }
}