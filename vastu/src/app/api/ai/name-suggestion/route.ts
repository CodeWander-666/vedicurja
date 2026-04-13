import { NextResponse } from 'next/server';
export async function POST(req: Request) {
  const body = await req.json();
  // Generate 108 names
  return NextResponse.json({ message: '108 names generated', data: body });
}
