'use client';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LuxuryCursor } from '@/components/global/LuxuryCursor';
import { SoundController } from '@/components/global/SoundController';
import { SmoothScroll } from '@/components/global/ScrollSmoother';
import GradientBackground from '@/components/global/GradientBackground';
import { HeroButton } from '@/components/global/HeroButton';
import { useSound } from '@/hooks/useSound';
import { supabase } from '@/lib/supabaseClient';

function PaymentStatusContent() {
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get('payment_status');
  const paymentRequestId = searchParams.get('payment_request_id');
  const [loading, setLoading] = useState(true);
  const { play } = useSound();

  const isSuccess = paymentStatus === 'Credit';

  useEffect(() => {
    if (isSuccess) {
      play('success');
    } else {
      play('clickSecondary');
    }
    setLoading(false);
  }, [isSuccess, play]);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="text-8xl mb-6">{isSuccess ? '✅' : '❌'}</div>
      <h1 className="font-serif text-4xl md:text-5xl text-[#1A2A3A] mb-4">
        {isSuccess ? 'Payment Successful!' : 'Payment Failed'}
      </h1>
      <p className="text-lg text-[#1A2A3A]/70 mb-8">
        {isSuccess
          ? 'Thank you for your payment. Your premium access has been unlocked.'
          : 'There was an issue processing your payment. Please try again or contact support.'}
      </p>
      <div className="flex gap-4 justify-center">
        {isSuccess ? (
          <>
            <HeroButton href="/dashboard">Go to Dashboard</HeroButton>
            <HeroButton href="/free-tools">Explore More Tools</HeroButton>
          </>
        ) : (
          <>
            <HeroButton href="/free-tools">Try Again</HeroButton>
            <HeroButton href="/contact">Contact Support</HeroButton>
          </>
        )}
      </div>
    </div>
  );
}

export default function PaymentStatusPage() {
  return (
    <>
      <LuxuryCursor />
      <SoundController />
      <Header />
      <SmoothScroll>
        <main className="relative z-10 pt-32 pb-20 min-h-screen">
          <GradientBackground />
          <div className="container mx-auto px-6 max-w-4xl">
            <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
              <PaymentStatusContent />
            </Suspense>
          </div>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
