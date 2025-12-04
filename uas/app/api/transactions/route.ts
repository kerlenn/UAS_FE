// uas/app/api/transactions/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic'; // Pastikan tidak di-cache statis

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email diperlukan' }, { status: 400 });
    }

    // 1. Cari User ID berdasarkan Email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 });
    }

    // 2. Ambil Transaksi user tersebut beserta data Kursusnya
    // Pastikan relasi di schema.prisma sudah benar (Transaction -> Course)
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: user.id,
        status: 'SUCCESS' // Hanya ambil yang sukses (opsional, sesuaikan kebutuhan)
      },
      include: {
        course: true, // Sertakan detail kursus (judul, gambar, dll dari DB)
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(transactions, { status: 200 });

  } catch (error) {
    console.error('Fetch Transactions Error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}