'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function InsightContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  return <div className="pt-24 container mx-auto px-6">Insight: {slug}</div>;
}

export default function InsightPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InsightContent />
    </Suspense>
  );
}
