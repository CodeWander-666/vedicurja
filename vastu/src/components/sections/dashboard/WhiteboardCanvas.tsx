interface WhiteboardCanvasProps {
  roomId: string;
}

export function WhiteboardCanvas({ roomId }: WhiteboardCanvasProps) {
  return <div>Whiteboard Canvas - Room {roomId}</div>;
}
