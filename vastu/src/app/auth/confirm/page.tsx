'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function ConfirmPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const code = searchParams.get('code');
    if (!code) {
      setStatus('error');
      setMessage('No confirmation code found.');
      return;
    }

    supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
      if (error) {
        setStatus('error');
        setMessage(error.message);
      } else {
        setStatus('success');
        setMessage('Email confirmed! Redirecting to dashboard...');
        setTimeout(() => router.push('/dashboard'), 2000);
      }
    });
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-vastu-parchment">
      <div className="text-center">
        {status === 'loading' && (
          <div className="w-12 h-12 border-4 border-prakash-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        )}
        {status === 'success' && <div className="text-6xl mb-4">✅</div>}
        {status === 'error' && <div className="text-6xl mb-4">❌</div>}
        <p className="font-serif text-xl text-nidra-indigo">{message}</p>
        {status === 'error' && (
          <button
            onClick={() => router.push('/signin')}
            className="mt-6 luxury-button px-6 py-3"
          >
            Return to Sign In
          </button>
        )}
      </div>
    </div>
  );
}
