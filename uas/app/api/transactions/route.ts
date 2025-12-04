import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email required' },
        { status: 400 }
      );
    }

    // Cari user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User tidak ditemukan' },
        { status: 404 }
      );
    }

    // Ambil semua transaksi SUCCESS
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: user.id,
        status: 'SUCCESS'
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(transactions);

  } catch (error) {
    console.error('List Transaction Error:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data' },
      { status: 500 }
    );
  }
}