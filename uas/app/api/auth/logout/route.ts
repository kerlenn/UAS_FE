import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    return NextResponse.json(
      { message: 'Logout berhasil' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Logout Error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    );
  }
}