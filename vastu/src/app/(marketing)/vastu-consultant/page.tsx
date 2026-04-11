'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function CityContent() {
  const searchParams = useSearchParams();
  const city = searchParams.get('city');
  return <div className="pt-24 container mx-auto px-6">Vastu Consultant in {city}</div>;
}

export default function CityPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CityContent />
    </Suspense>
  );
}
