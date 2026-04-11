'use client';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function MeetingContent() {
  const searchParams = useSearchParams();
  const roomId = searchParams.get('roomId');

  if (!roomId) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-2xl text-[#1A2A3A] mb-4">Meeting Room</h2>
          <p className="text-[#1A2A3A]/60">Please provide a room ID to join.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <div className="w-80 border-r p-4">Chat Panel - Room: {roomId}</div>
      <div className="flex-1 p-4">Video Call - Room: {roomId}</div>
      <div className="w-96 border-l p-4">Whiteboard - Room: {roomId}</div>
    </div>
  );
}

export default function MeetingPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <MeetingContent />
    </Suspense>
  );
}
