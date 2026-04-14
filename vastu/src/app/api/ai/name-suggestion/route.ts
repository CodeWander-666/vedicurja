import { NextResponse } from 'next/server';
import syllables from '@/data/nakshatra-syllables.json';

export async function POST(req: Request) {
  try {
    const { nakshatra } = await req.json();
    
    if (!nakshatra) {
      return NextResponse.json({ error: 'Nakshatra required' }, { status: 400 });
    }

    const nakshatraSyllables = (syllables as Record<string, string[]>)[nakshatra];
    if (!nakshatraSyllables) {
      return NextResponse.json({ error: 'Invalid Nakshatra' }, { status: 400 });
    }

    return NextResponse.json({
      syllables: nakshatraSyllables.map(s => ({
        syllable: s,
        description: `Names starting with '${s}' are auspicious for ${nakshatra} natives.`
      }))
    });
  } catch (error) {
    console.error('Name suggestion error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
