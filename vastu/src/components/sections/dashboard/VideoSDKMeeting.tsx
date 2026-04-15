'use client';
import { useEffect, useState } from 'react';
import { generateToken } from '@/lib/videosdk/generateToken';

interface VideoSDKMeetingProps {
  meetingId: string;
  participantName: string;
  onLeave: () => void;
}

export default function VideoSDKMeeting({ meetingId, participantName, onLeave }: VideoSDKMeetingProps) {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    generateToken(meetingId, `user-${Date.now()}`).then(setToken).catch(err => setError(err.message));
  }, [meetingId]);

  useEffect(() => {
    if (!token) return;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://sdk.videosdk.live/rtc-js-prebuilt/0.3.31/rtc-js-prebuilt.js';
    script.onload = () => {
      const config = {
        name: participantName,
        meetingId: meetingId,
        apiKey: process.env.NEXT_PUBLIC_VIDEOSDK_API_KEY,
        containerId: 'videosdk-container',
        micEnabled: false,
        webcamEnabled: false,
        participantCanToggleSelfWebcam: true,
        participantCanToggleSelfMic: true,
        chatEnabled: true,
        screenShareEnabled: true,
        raiseHandEnabled: true,
        brandingEnabled: true,
        brandLogoURL: 'https://vedicurja.com/logo.svg',
        brandName: 'VedicUrja',
        poweredBy: false,
        topbarEnabled: true,
        animationsEnabled: true,
        token: token,
      };
      const meeting = new (window as any).VideoSDKMeeting();
      meeting.init(config);
    };
    document.head.appendChild(script);

    return () => {
      // Clean up if needed
    };
  }, [token, meetingId, participantName]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100 rounded-xl">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100 rounded-xl">
        <div className="w-8 h-8 border-4 border-prakash-gold border-t-transparent rounded-full animate-spin mr-3" />
        <span>Loading meeting...</span>
      </div>
    );
  }

  return (
    <div id="videosdk-container" className="w-full h-full" />
  );
}
