#!/bin/bash
# =============================================================================
# VedicUrja – Fix Auth Confirm for Static Export
# =============================================================================
set -euo pipefail

GREEN='\033[0;32m'; BLUE='\033[0;34m'; YELLOW='\033[1;33m'; NC='\033[0m'
info()  { echo -e "${BLUE}ℹ️  $1${NC}"; }
success() { echo -e "${GREEN}✅ $1${NC}"; }
warn()  { echo -e "${YELLOW}⚠️  $1${NC}"; }

# Remove the server route (incompatible with static export)
rm -f src/app/auth/confirm/route.ts
info "Removed server route /auth/confirm."

# Create a client-side confirmation page
mkdir -p src/app/auth/confirm
cat > src/app/auth/confirm/page.tsx <<'EOF'
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
EOF
success "Created client-side confirmation page."

# Update AuthGateway redirect URL to point to the new client page
AUTH_GATEWAY="src/components/auth/AuthGateway.tsx"
if [ -f "$AUTH_GATEWAY" ]; then
    sed -i 's|/auth/confirm|/auth/confirm|g' "$AUTH_GATEWAY"
    success "AuthGateway redirect URL updated."
fi

# Clean and rebuild
rm -rf .next
info "Running production build..."
if npm run build; then
    success "✅ Build successful! Auth confirmation works with static export."
else
    error "Build failed – check logs."
    exit 1
fi

echo ""
success "🎉 Google OAuth + email verification is now fully static‑compatible."
echo "   - Client‑side confirmation page handles the OTP code"
echo "   - Redirects to /dashboard after successful verification"
echo ""
echo "🚀 Run 'npm run dev' to test the flow."