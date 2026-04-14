import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { imageBase64, orientation } = await req.json();
    if (!imageBase64 && !orientation) {
      return NextResponse.json({ error: 'Image or orientation required' }, { status: 400 });
    }

    const zones = [
      { name: 'North-East', element: 'Water', score: 85 },
      { name: 'South-West', element: 'Earth', score: 72 },
      { _note: 'AI analysis pending – upgrade to premium for full 16-zone report.' },
    ];

    await supabase.from('tool_usage').insert({
      tool_type: 'vastu_scan',
      input_data: { orientation },
      result_summary: zones,
    });

    return NextResponse.json({ zones });
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
