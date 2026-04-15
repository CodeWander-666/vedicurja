'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import SmoothScroll from '@/components/global/ScrollSmoother';

function StatusContent() {
  const params = useSearchParams();
  const success = params.get('success');
  return (
    <div className="text-center">
      <h1 className="font-serif text-3xl mb-4">{success ? 'Payment Successful!' : 'Payment Cancelled'}</h1>
      <p className="mb-8">{success ? 'Your simulated payment was processed.' : 'You cancelled the payment.'}</p>
      <Link href="/dashboard" className="luxury-button">Go to Dashboard</Link>
    </div>
  );
}

export default function PaymentStatusPage() {
  return (
    <>
      <Header />
      <SmoothScroll>
        <main className="pt-32 pb-20 min-h-screen bg-vastu-parchment">
          <div className="max-w-lg mx-auto">
            <Suspense fallback={<div>Loading...</div>}>
              <StatusContent />
            </Suspense>
          </div>
        </main>
      </SmoothScroll>
    </>
  );
}
