'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function StoryContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  return <div className="pt-24 container mx-auto px-6">Client Story: {slug}</div>;
}

export default function StoryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StoryContent />
    </Suspense>
  );
}
