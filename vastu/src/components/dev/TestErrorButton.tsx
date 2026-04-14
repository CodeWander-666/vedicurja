'use client';
export default function TestErrorButton() {
  return (
    <button
      onClick={() => { throw new Error("Sentry Test Error – VedicUrja"); }}
      className="fixed bottom-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded-full text-sm opacity-50 hover:opacity-100"
    >
      Test Sentry
    </button>
  );
}
