'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ServiceContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  return <div className="pt-24 container mx-auto px-6">Service: {slug}</div>;
}

export default function ServicePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServiceContent />
    </Suspense>
  );
}
