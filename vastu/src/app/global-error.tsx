'use client';
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center text-center p-6">
          <h2 className="font-serif text-3xl text-red-600 mb-4">Something went wrong!</h2>
          <p className="text-gray-600 mb-6">Our team has been notified.</p>
          <button
            onClick={() => reset()}
            className="bg-[#C88A5D] text-white px-6 py-2 rounded-full"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
