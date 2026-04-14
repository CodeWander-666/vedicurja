import { NextResponse } from 'next/server';
import syllables from '@/data/nakshatra-syllables.json';

export async function POST(req: Request) {
  try {
    const { nakshatra } = await req.json();
    if (!nakshatra) {
      return NextResponse.json({ error: 'Nakshatra required' }, { status: 400 });
    }
    const list = (syllables as Record<string, string[]>)[nakshatra] || [];
    return NextResponse.json({ syllables: list });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
