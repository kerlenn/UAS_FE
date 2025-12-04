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

    // 2. Simpan Transaksi ke Database
    const newTransaction = await prisma.transaction.create({
      data: {
        userId: user.id,
        courseId: String(courseId), // Pastikan string
        amount: Number(amount),
        paymentMethod: paymentMethod,
        status: 'SUCCESS', // Kita anggap langsung sukses
      },
    });

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