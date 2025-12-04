import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email wajib diisi' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        fullname: true,
        email: true,
        phone: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(user, { status: 200 });

  } catch (error) {
    console.error('Get User Error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { email, fullname, phone } = body;

    if (!email || !fullname) {
      return NextResponse.json(
        { error: 'Email dan Nama Lengkap wajib diisi' },
        { status: 400 }
      );
    }

    if (fullname.trim().length < 3) {
      return NextResponse.json(
        { error: 'Nama minimal 3 huruf' },
        { status: 400 }
      );
    }

    if (phone) {
      const phoneRegex = /^(62|08)\d{9,}$/;
      if (!phoneRegex.test(phone)) {
        return NextResponse.json(
          { error: 'No telepon harus minimal 11 digit dan dimulai dengan 62 atau 08' },
          { status: 400 }
        );
      }
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

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        fullname,
        phone,
      },
      select: {
        id: true,
        fullname: true,
        email: true,
        phone: true,
      },
    });

    return NextResponse.json(
      { message: 'Data berhasil diperbarui', user: updatedUser },
      { status: 200 }
    );

  } catch (error) {
    console.error('Update User Error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}