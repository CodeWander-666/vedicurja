import { NextResponse } from 'next/server';
import { calculateChart } from '@/lib/kundali/calculator';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { birthDate, birthTime, location } = await req.json();

    if (!birthDate || !birthTime || !location) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const [year, month, day] = birthDate.split('-').map(Number);
    const [hour, minute] = birthTime.split(':').map(Number);
    const date = new Date(year, month - 1, day, hour, minute);

    const chart = calculateChart({
      date,
      lat: location.lat,
      lng: location.lng
    });

    // Log usage
    await supabase.from('tool_usage').insert({
      tool_type: 'kundali',
      input_data: { birthDate, birthTime, location },
      result_summary: { ascendant: chart.ascendant, moonSign: chart.moonSign },
      ip_address: req.headers.get('x-forwarded-for') || null
    });

    return NextResponse.json({ chart });
  } catch (error) {
    console.error('Kundali API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
