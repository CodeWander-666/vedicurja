import { NextResponse } from 'next/server';

const vastuZones = [
  { name: 'North-East', element: 'Water', ideal: true },
  { name: 'East', element: 'Air', ideal: true },
  { name: 'South-East', element: 'Fire', ideal: true },
  { name: 'South', element: 'Earth', ideal: false },
  { name: 'South-West', element: 'Earth', ideal: true },
  { name: 'West', element: 'Space', ideal: false },
  { name: 'North-West', element: 'Air', ideal: false },
  { name: 'North', element: 'Water', ideal: true },
];

export async function POST(req: Request) {
  try {
    const { orientation } = await req.json();
    
    // For free tier, we return basic zone scores based on ideal placement
    const zones = vastuZones.map(zone => ({
      name: zone.name,
      element: zone.element,
      score: zone.ideal ? 85 + Math.floor(Math.random() * 15) : 40 + Math.floor(Math.random() * 30),
      recommendation: zone.ideal 
        ? `Ideal placement – maintain this zone.`
        : `Consider shifting to ${zone.element}‑friendly area.`
    }));
    
    return NextResponse.json({ zones });
  } catch (error) {
    console.error('Vastu scan error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
