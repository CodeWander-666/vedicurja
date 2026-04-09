import { ChatPanel } from "@/components/sections/dashboard/ChatPanel";
import { VideoCallFrame } from "@/components/sections/dashboard/VideoCallFrame";
import { WhiteboardCanvas } from "@/components/sections/dashboard/WhiteboardCanvas";

interface PageProps {
  params: Promise<{ roomId: string }>;
}

export default async function MeetingRoom({ params }: PageProps) {
  const { roomId } = await params;
  return (
    <div className="flex h-screen">
      <ChatPanel roomId={roomId} />
      <VideoCallFrame roomId={roomId} />
      <WhiteboardCanvas roomId={roomId} />
    </div>
  );
}
