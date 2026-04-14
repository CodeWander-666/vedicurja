import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { birthDate, birthTime, latitude, longitude } = await req.json();
    if (!birthDate || !birthTime || latitude == null || longitude == null) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // TODO: Replace with actual ephemeris calculation
    const chart = {
      ascendant: 'Leo',
      moonSign: 'Taurus',
      sunSign: 'Virgo',
      nakshatra: 'Hasta',
      planets: [],
      _note: 'Real calculation pending – upgrade to premium for full accuracy.',
    };

    await supabase.from('tool_usage').insert({
      tool_type: 'kundali',
      input_data: { birthDate, birthTime, latitude, longitude },
      result_summary: chart,
    });

    return NextResponse.json({ chart });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
