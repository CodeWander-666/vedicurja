'use client';
import * as Sentry from "@sentry/nextjs";

interface SentryErrorBoundaryProps {
  children: React.ReactNode;
}

export default function SentryErrorBoundary({ children }: SentryErrorBoundaryProps) {
  return (
    <Sentry.ErrorBoundary fallback={<div className="p-8 text-center">Something went wrong.</div>}>
      {children}
    </Sentry.ErrorBoundary>
  );
}
