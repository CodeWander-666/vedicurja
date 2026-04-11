'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function BookContent() {
  const searchParams = useSearchParams();
  const bookId = searchParams.get('bookId');
  return <div className="pt-24 container mx-auto px-6">Book: {bookId}</div>;
}

export default function BookPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookContent />
    </Suspense>
  );
}
